import { z } from "zod";
import { eq, desc, and } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { createTRPCRouter, protectedProcedure, adminProcedure } from "../trpc";
import { orders } from "~/server/db/schema";
import { generateAttendanceQRString } from "~/lib/qrcode";
import { HEARD_FROM_VALUES } from "~/lib/heardFrom";

const heardFromEnum = z.enum(HEARD_FROM_VALUES);
const nomorRekeningPattern = /^\d+\s+a\/n\s+.+\s+\(.+\)$/;

export const orderRouter = createTRPCRouter({
  /**
   * Create a new pre-event ticket order
   */
  createPreEventOrder: protectedProcedure
    .input(
      z.object({
        fullName: z.string().min(1, "Full name is required"),
        email: z.string().email("Valid email is required"),
        phoneNumber: z
          .string()
          .min(10, "Phone number must be at least 10 digits"),
        nomorRekening: z
          .string()
          .regex(
            nomorRekeningPattern,
            "Nomor rekening must follow: <number> a/n <name> (<bank name>)",
          ),
        paymentProofUrl: z.string().min(1, "Payment proof is required"),
        heardFrom: heardFromEnum,
        heardFromOther: z.string().optional(),
      }).superRefine((data, ctx) => {
        if (data.heardFrom === "other" && !data.heardFromOther?.trim()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Please specify where you heard about this pre-event",
            path: ["heardFromOther"],
          });
        }
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      // Check if user already has a pre-event ticket order
      const existingOrder = await ctx.db.query.orders.findFirst({
        where: and(
          eq(orders.userId, userId),
          eq(orders.orderType, "pre_event_ticket"),
        ),
      });

      if (existingOrder) {
        throw new Error(
          "You already have a pre-event ticket order. Each user can only order one pre-event ticket.",
        );
      }

      // Calculate how many pre-event tickets have already been ordered
      // (ignoring cancelled orders to reflect true capacity)
      const existingTickets = await ctx.db.query.orders.findMany({
        where: and(
          eq(orders.orderType, "pre_event_ticket"),
          // Include pending, paid, and confirmed, exclude cancelled
          // If you have a specific "valid" state, adjust this accordingly
        ),
      });

      // Filter out cancelled orders for capacity planning
      const validTickets = existingTickets.filter(
        (order) => order.status !== "cancelled",
      );
      const currentTicketCount = validTickets.length;

      // Hard limit of 100 tickets
      if (currentTicketCount >= 100) {
        throw new Error(
          "We're sorry, but all pre-event tickets are currently sold out.",
        );
      }

      // Determine Pricing Tier (First 30 are early bird 70k, remaining 70 are regular 80k)
      const isEarlyBird = currentTicketCount < 30;
      const totalAmount = isEarlyBird ? 70000 : 80000;
      const ticketTier = isEarlyBird ? "Early Bird" : "Regular";

      const orderId = uuidv4();

      // Generate attendance QR code string
      const qrCode = generateAttendanceQRString(orderId);

      // Prepare ticket JSON
      const ticketJson = {
        fullName: input.fullName,
        email: input.email,
        phoneNumber: input.phoneNumber,
        nomorRekening: input.nomorRekening,
        ticketType: "pre_event",
        tier: ticketTier,
        heardFrom: input.heardFrom,
        heardFromOther:
          input.heardFrom === "other" ? input.heardFromOther?.trim() : null,
      };

      // Create the order with payment proof - status is "pending" awaiting admin confirmation
      const [newOrder] = await ctx.db
        .insert(orders)
        .values({
          id: orderId,
          userId,
          orderType: "pre_event_ticket",
          status: "pending", // Still pending until admin confirms payment
          totalAmount,
          ticketJson,
          qrCode,
          paymentProofUrl: input.paymentProofUrl, // Include payment proof
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      return newOrder;
    }),

  /**
   * Create a new merchandise order
   */
  createMerchandiseOrder: protectedProcedure
    .input(
      z.object({
        fullName: z.string().min(1, "Full name is required"),
        email: z.string().email("Valid email is required"),
        phoneNumber: z
          .string()
          .min(10, "Phone number must be at least 10 digits"),
        paymentProofUrl: z.string().min(1, "Payment proof is required"),
        cartItems: z.array(z.any()), // Assuming cartItems can be anything from the frontend for now
        totalAmount: z.number().min(0, "Total amount cannot be negative"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const orderId = uuidv4();

      // Prepare merchandise JSON
      const merchJson = {
        fullName: input.fullName,
        email: input.email,
        phoneNumber: input.phoneNumber,
        cartItems: input.cartItems,
      };

      // Create the order with payment proof - status is "pending" awaiting admin confirmation
      const [newOrder] = await ctx.db
        .insert(orders)
        .values({
          id: orderId,
          userId,
          orderType: "merchandise",
          status: "pending", // Still pending until admin confirms payment
          totalAmount: input.totalAmount,
          merchJson,
          paymentProofUrl: input.paymentProofUrl,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      return newOrder;
    }),

  /**
   * Update order with payment proof (base64 image)
   */
  updatePaymentProof: protectedProcedure
    .input(
      z.object({
        orderId: z.string().uuid(),
        paymentProofBase64: z.string().min(1, "Payment proof is required"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      // Verify the order belongs to the user
      const order = await ctx.db.query.orders.findFirst({
        where: eq(orders.id, input.orderId),
      });

      if (!order) {
        throw new Error("Order not found");
      }

      if (order.userId !== userId) {
        throw new Error("Unauthorized: This order does not belong to you");
      }

      // Update the order with payment proof
      const [updatedOrder] = await ctx.db
        .update(orders)
        .set({
          paymentProofUrl: input.paymentProofBase64,
          updatedAt: new Date(),
        })
        .where(eq(orders.id, input.orderId))
        .returning();

      return updatedOrder;
    }),

  /**
   * Check if the current user already has a pre-event ticket order
   */
  hasPreEventTicket: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const existingOrder = await ctx.db.query.orders.findFirst({
      where: and(
        eq(orders.userId, userId),
        eq(orders.orderType, "pre_event_ticket"),
      ),
    });

    return { hasTicket: !!existingOrder };
  }),

  /**
   * Get the current count of pre-event tickets to determine availability and early bird
   */
  getPreEventTicketCount: protectedProcedure.query(async ({ ctx }) => {
    const existingTickets = await ctx.db.query.orders.findMany({
      where: eq(orders.orderType, "pre_event_ticket"),
    });

    // Filter out canceled orders
    const validCount = existingTickets.filter(
      (order) => order.status !== "cancelled",
    ).length;

    return {
      count: validCount,
      isEarlyBird: validCount < 30,
      isSoldOut: validCount >= 100,
    };
  }),

  /**
   * Get all orders for the logged-in user
   */
  getUserOrders: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const userOrders = await ctx.db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId))
      .orderBy(desc(orders.createdAt));

    return userOrders;
  }),

  /**
   * Get all orders (admin only)
   */
  getAllOrders: adminProcedure.query(async ({ ctx }) => {
    const allOrders = await ctx.db.query.orders.findMany({
      with: {
        user: true,
      },
      orderBy: [desc(orders.createdAt)],
    });

    return allOrders;
  }),

  /**
   * Update order status (admin only)
   */
  updateOrderStatus: adminProcedure
    .input(
      z.object({
        orderId: z.string().uuid(),
        status: z.enum(["pending", "paid", "confirmed", "cancelled", "attended"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [updatedOrder] = await ctx.db
        .update(orders)
        .set({
          status: input.status,
          updatedAt: new Date(),
        })
        .where(eq(orders.id, input.orderId))
        .returning();

      if (!updatedOrder) {
        throw new Error("Order not found");
      }

      return updatedOrder;
    }),

  /**
   * Get a specific order by ID
   */
  getOrderById: protectedProcedure
    .input(
      z.object({
        orderId: z.string().uuid(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const order = await ctx.db.query.orders.findFirst({
        where: eq(orders.id, input.orderId),
      });

      if (!order) {
        throw new Error("Order not found");
      }

      if (order.userId !== userId) {
        throw new Error("Unauthorized: This order does not belong to you");
      }

      return order;
    }),

  /**
   * Scan ticket QR code and mark order as attended
   */
  scanOrder: adminProcedure
    .input(
      z.object({
        qrCode: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existingOrder = await ctx.db.query.orders.findFirst({
        where: eq(orders.qrCode, input.qrCode),
        with: {
          user: true,
        },
      });

      if (!existingOrder) {
        throw new Error("Order not found. Invalid QR code.");
      }

      if (existingOrder.status === "cancelled") {
        throw new Error("Order is cancelled and cannot be attended.");
      }

      if (existingOrder.status === "attended") {
        return { message: "Already attended", order: existingOrder };
      }

      const [updatedOrder] = await ctx.db
        .update(orders)
        .set({
          status: "attended",
          updatedAt: new Date(),
        })
        .where(eq(orders.id, existingOrder.id))
        .returning();

      if (!updatedOrder) {
        throw new Error("Failed to update order status");
      }

      return {
        message: "Order fetched and attended successfully",
        order: { ...updatedOrder, user: existingOrder.user },
      };
    }),
});
