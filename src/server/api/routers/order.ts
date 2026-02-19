import { z } from "zod";
import { eq, desc, and } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { orders } from "~/server/db/schema";
import { generateAttendanceQRString } from "~/lib/qrcode";

// Type definitions for ticket JSON
type PreEventTicketJson = {
  fullName: string;
  email: string;
  phoneNumber: string;
  ticketType: "pre_event";
};

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
        paymentProofUrl: z.string().min(1, "Payment proof is required"),
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

      const orderId = uuidv4();

      // Generate attendance QR code string
      const qrCode = generateAttendanceQRString(orderId);

      // Prepare ticket JSON
      const ticketJson: PreEventTicketJson = {
        fullName: input.fullName,
        email: input.email,
        phoneNumber: input.phoneNumber,
        ticketType: "pre_event",
      };

      // Ticket price
      const totalAmount = 50000; // 50,000 IDR

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
});
