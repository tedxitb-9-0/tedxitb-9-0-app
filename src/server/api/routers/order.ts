import { z } from "zod";
import { eq, desc, and, gte } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { createTRPCRouter, protectedProcedure, adminProcedure } from "../trpc";
import { orders } from "~/server/db/schema";
import { generateAttendanceQRString } from "~/lib/qrcode";
import { HEARD_FROM_VALUES } from "~/lib/heardFrom";
import { MBTI_VALUES } from "~/lib/mbti";
import {
    TICKET_REGULAR_CAP,
    TICKET_TOTAL_CAP,
    logTicketCapacityDebug,
    partitionTicketsByTier,
    resolveNextTicketOffer,
    startOfTodayWib,
} from "~/lib/ticketCapacity";
import {
    TICKET_REGULAR_BUNDLE_PRICE_PER_PERSON_IDR,
    TICKET_REGULAR_BUNDLE_TOTAL_IDR,
    TICKET_REGULAR_PRICE_IDR,
    isMerchandiseSalesActive,
} from "~/lib/ticketPricing";

const heardFromEnum = z.enum(HEARD_FROM_VALUES);
const mbtiEnum = z.enum(MBTI_VALUES);
const nomorRekeningPattern = /^\d+\s+a\/n\s+.+\s+\(.+\)$/;

export const orderRouter = createTRPCRouter({
    /**
     * Create a new pre-event ticket order
     */
    createPreEventOrder: protectedProcedure
        .input(
            z
                .object({
                    fullName: z.string().min(1, "Full name is required"),
                    email: z.string().email("Valid email is required"),
                    phoneNumber: z
                        .string()
                        .min(10, "Phone number must be at least 10 digits"),
                    mbti: mbtiEnum,
                    nomorRekening: z
                        .string()
                        .regex(
                            nomorRekeningPattern,
                            "Nomor rekening must follow: <number> a/n <name> (<bank name>)",
                        ),
                    paymentProofUrl: z
                        .string()
                        .min(1, "Payment proof is required"),
                    heardFrom: heardFromEnum,
                    heardFromOther: z.string().optional(),
                })
                .superRefine((data, ctx) => {
                    if (
                        data.heardFrom === "other" &&
                        !data.heardFromOther?.trim()
                    ) {
                        ctx.addIssue({
                            code: z.ZodIssueCode.custom,
                            message:
                                "Please specify where you heard about this pre-event",
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

            const startOfToday = startOfTodayWib();
            const existingTickets = await ctx.db.query.orders.findMany({
                where: and(
                    eq(orders.orderType, "pre_event_ticket"),
                    gte(orders.createdAt, startOfToday),
                ),
            });

            const validTickets = existingTickets.filter(
                (order) => order.status !== "cancelled",
            );
            const counts = partitionTicketsByTier(validTickets);
            const offer = resolveNextTicketOffer(counts);
            logTicketCapacityDebug("createPreEventOrder", {
                startOfTodayWib: startOfToday,
                dbRowCount: existingTickets.length,
                validOrderCount: validTickets.length,
                earlyBirdCount: counts.earlyBirdCount,
                regularCount: counts.regularCount,
                offer,
            });
            if (!offer) {
                throw new Error(
                    "We're sorry, but all pre-event tickets are currently sold out.",
                );
            }

            const totalAmount = offer.priceIdr;
            const ticketTier = offer.tier;

            const orderId = uuidv4();

            // Generate attendance QR code string
            const qrCode = generateAttendanceQRString(orderId);

            // Prepare ticket JSON
            const ticketJson = {
                fullName: input.fullName,
                email: input.email,
                phoneNumber: input.phoneNumber,
                mbti: input.mbti,
                nomorRekening: input.nomorRekening,
                ticketType: "pre_event",
                tier: ticketTier,
                heardFrom: input.heardFrom,
                heardFromOther:
                    input.heardFrom === "other"
                        ? input.heardFromOther?.trim()
                        : null,
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
     * Create a new main-event ticket order (same flow as pre-event; separate capacity pool)
     */
    createMainEventOrder: protectedProcedure
        .input(
            z
                .object({
                    fullName: z.string().min(1, "Full name is required"),
                    email: z.string().email("Valid email is required"),
                    phoneNumber: z
                        .string()
                        .min(10, "Phone number must be at least 10 digits"),
                    mbti: mbtiEnum,
                    nomorRekening: z
                        .string()
                        .regex(
                            nomorRekeningPattern,
                            "Nomor rekening must follow: <number> a/n <name> (<bank name>)",
                        ),
                    paymentProofUrl: z
                        .string()
                        .min(1, "Payment proof is required"),
                    heardFrom: heardFromEnum,
                    heardFromOther: z.string().optional(),
                    bundleTwoPerson: z.boolean().optional().default(false),
                    companionFullName: z.string().optional(),
                    companionEmail: z.string().optional(),
                    companionPhoneNumber: z.string().optional(),
                    companionMbti: mbtiEnum.optional(),
                })
                .superRefine((data, ctx) => {
                    if (
                        data.heardFrom === "other" &&
                        !data.heardFromOther?.trim()
                    ) {
                        ctx.addIssue({
                            code: z.ZodIssueCode.custom,
                            message:
                                "Please specify where you heard about this main event",
                            path: ["heardFromOther"],
                        });
                    }
                    if (data.bundleTwoPerson) {
                        if (!data.companionFullName?.trim()) {
                            ctx.addIssue({
                                code: z.ZodIssueCode.custom,
                                message:
                                    "Companion full name is required for a 2-person bundle",
                                path: ["companionFullName"],
                            });
                        }
                        if (!data.companionEmail?.trim()) {
                            ctx.addIssue({
                                code: z.ZodIssueCode.custom,
                                message:
                                    "Companion email is required for a 2-person bundle",
                                path: ["companionEmail"],
                            });
                        } else if (
                            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                                data.companionEmail,
                            )
                        ) {
                            ctx.addIssue({
                                code: z.ZodIssueCode.custom,
                                message: "Valid companion email is required",
                                path: ["companionEmail"],
                            });
                        }
                        if (
                            !data.companionPhoneNumber ||
                            data.companionPhoneNumber.length < 10
                        ) {
                            ctx.addIssue({
                                code: z.ZodIssueCode.custom,
                                message:
                                    "Companion phone number must be at least 10 digits for a 2-person bundle",
                                path: ["companionPhoneNumber"],
                            });
                        }
                        if (!data.companionMbti) {
                            ctx.addIssue({
                                code: z.ZodIssueCode.custom,
                                message:
                                    "Companion MBTI is required for a 2-person bundle",
                                path: ["companionMbti"],
                            });
                        }
                    }
                }),
        )
        .mutation(async ({ ctx, input }) => {
            const userId = ctx.session.user.id;

            const existingOrder = await ctx.db.query.orders.findFirst({
                where: and(
                    eq(orders.userId, userId),
                    eq(orders.orderType, "main_event_ticket"),
                ),
            });

            if (existingOrder) {
                throw new Error(
                    "You already have a main event ticket order. Each user can only order one main event ticket.",
                );
            }

            // Count ALL main event tickets (not just today) for proper capacity tracking
            const allExistingTickets = await ctx.db.query.orders.findMany({
                where: eq(orders.orderType, "main_event_ticket"),
            });

            const validTickets = allExistingTickets.filter(
                (order) => order.status !== "cancelled",
            );
            const counts = partitionTicketsByTier(validTickets);
            const offer = resolveNextTicketOffer(counts);
            const bundleTwoPerson = input.bundleTwoPerson === true;
            logTicketCapacityDebug("createMainEventOrder", {
                totalDbRowCount: allExistingTickets.length,
                validOrderCount: validTickets.length,
                earlyBirdCount: counts.earlyBirdCount,
                regularCount: counts.regularCount,
                offer,
            });

            if (bundleTwoPerson) {
                if (offer?.tier !== "Regular") {
                    throw new Error(
                        "The 2-person bundle is only available at Regular price (not during Early Bird).",
                    );
                }
                // Check regular pool capacity (140 max)
                if (counts.regularCount + 2 > TICKET_REGULAR_CAP) {
                    throw new Error(
                        "Not enough Regular tickets left for a 2-person bundle. Try a single ticket or check availability later.",
                    );
                }
                // Check total main event hard cap (170 max) - prevents overflow at 169 total
                const totalCount = counts.earlyBirdCount + counts.regularCount;
                if (totalCount + 2 > TICKET_TOTAL_CAP) {
                    throw new Error(
                        "Not enough total tickets left for a 2-person bundle. Only single tickets remain.",
                    );
                }
            } else if (!offer) {
                throw new Error(
                    "We're sorry, but all main event tickets are currently sold out.",
                );
            }

            let totalAmount: number;
            let ticketTier: "Early Bird" | "Regular";
            let ticketJson: Record<string, unknown>;

            if (bundleTwoPerson) {
                totalAmount = TICKET_REGULAR_BUNDLE_TOTAL_IDR;
                ticketTier = "Regular";
                ticketJson = {
                    fullName: input.fullName,
                    email: input.email,
                    phoneNumber: input.phoneNumber,
                    mbti: input.mbti,
                    nomorRekening: input.nomorRekening,
                    ticketType: "main_event",
                    tier: ticketTier,
                    bundle: "two_person",
                    pricePerPersonIdr:
                        TICKET_REGULAR_BUNDLE_PRICE_PER_PERSON_IDR,
                    bundleTotalIdr: TICKET_REGULAR_BUNDLE_TOTAL_IDR,
                    compareAtSingleRegularPerPersonIdr:
                        TICKET_REGULAR_PRICE_IDR,
                    heardFrom: input.heardFrom,
                    heardFromOther:
                        input.heardFrom === "other"
                            ? input.heardFromOther?.trim()
                            : null,
                    companion: {
                        fullName: input.companionFullName?.trim(),
                        email: input.companionEmail?.trim(),
                        phoneNumber: input.companionPhoneNumber,
                        mbti: input.companionMbti,
                    },
                };
            } else {
                totalAmount = offer.priceIdr;
                ticketTier = offer.tier;
                ticketJson = {
                    fullName: input.fullName,
                    email: input.email,
                    phoneNumber: input.phoneNumber,
                    mbti: input.mbti,
                    nomorRekening: input.nomorRekening,
                    ticketType: "main_event",
                    tier: ticketTier,
                    heardFrom: input.heardFrom,
                    heardFromOther:
                        input.heardFrom === "other"
                            ? input.heardFromOther?.trim()
                            : null,
                };
            }

            const orderId = uuidv4();

            const qrCode = generateAttendanceQRString(orderId);

            const [newOrder] = await ctx.db
                .insert(orders)
                .values({
                    id: orderId,
                    userId,
                    orderType: "main_event_ticket",
                    status: "pending",
                    totalAmount,
                    ticketJson,
                    qrCode,
                    paymentProofUrl: input.paymentProofUrl,
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
            z
                .object({
                    fullName: z.string().min(1, "Full name is required"),
                    email: z.string().email("Valid email is required"),
                    phoneNumber: z
                        .string()
                        .min(10, "Phone number must be at least 10 digits"),
                    paymentProofUrl: z
                        .string()
                        .min(1, "Payment proof is required"),
                    deliveryMethod: z.enum([
                        "pickup_itb_jatinangor",
                        "pickup_itb_ganesa",
                        "delivery_shipping",
                        "pickup_main_event",
                    ]),
                    shippingAddress: z.string().optional(),
                    cartItems: z.array(z.any()), // Assuming cartItems can be anything from the frontend for now
                    totalAmount: z
                        .number()
                        .min(0, "Total amount cannot be negative"),
                })
                .superRefine((data, ctx) => {
                    if (
                        data.deliveryMethod === "delivery_shipping" &&
                        !data.shippingAddress?.trim()
                    ) {
                        ctx.addIssue({
                            code: z.ZodIssueCode.custom,
                            message:
                                "Shipping address is required for delivery",
                            path: ["shippingAddress"],
                        });
                    }
                }),
        )
        .mutation(async ({ ctx, input }) => {
            if (!isMerchandiseSalesActive()) {
                throw new Error("Merchandise sales are now closed.");
            }

            const userId = ctx.session.user.id;
            const orderId = uuidv4();

            // Prepare merchandise JSON
            const merchJson = {
                fullName: input.fullName,
                email: input.email,
                phoneNumber: input.phoneNumber,
                deliveryMethod: input.deliveryMethod,
                shippingAddress:
                    input.deliveryMethod === "delivery_shipping"
                        ? (input.shippingAddress?.trim() ?? "")
                        : null,
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
                paymentProofBase64: z
                    .string()
                    .min(1, "Payment proof is required"),
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
                throw new Error(
                    "Unauthorized: This order does not belong to you",
                );
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
        const startOfToday = startOfTodayWib();
        const existingTickets = await ctx.db.query.orders.findMany({
            where: and(
                eq(orders.orderType, "pre_event_ticket"),
                gte(orders.createdAt, startOfToday),
            ),
        });

        const validTickets = existingTickets.filter(
            (order) => order.status !== "cancelled",
        );
        const counts = partitionTicketsByTier(validTickets);
        const offer = resolveNextTicketOffer(counts);
        logTicketCapacityDebug("getPreEventTicketCount", {
            startOfTodayWib: startOfToday,
            dbRowCount: existingTickets.length,
            validOrderCount: validTickets.length,
            earlyBirdCount: counts.earlyBirdCount,
            regularCount: counts.regularCount,
            offer,
        });

        return {
            count: counts.earlyBirdCount + counts.regularCount,
            earlyBirdCount: counts.earlyBirdCount,
            regularCount: counts.regularCount,
            isEarlyBird: offer?.tier === "Early Bird",
            isSoldOut: offer === null,
        };
    }),

    /**
     * Get the current count of main-event tickets (separate pool from pre-event)
     */
    getMainEventTicketCount: protectedProcedure.query(async ({ ctx }) => {
        // Count ALL main event tickets (not just today) for proper capacity tracking
        const allExistingTickets = await ctx.db.query.orders.findMany({
            where: eq(orders.orderType, "main_event_ticket"),
        });

        const validTickets = allExistingTickets.filter(
            (order) => order.status !== "cancelled",
        );
        const counts = partitionTicketsByTier(validTickets);
        const offer = resolveNextTicketOffer(counts);
        logTicketCapacityDebug("getMainEventTicketCount", {
            totalDbRowCount: allExistingTickets.length,
            validOrderCount: validTickets.length,
            earlyBirdCount: counts.earlyBirdCount,
            regularCount: counts.regularCount,
            offer,
        });

        const regularSlotsRemaining = TICKET_REGULAR_CAP - counts.regularCount;
        const totalSlotsRemaining =
            TICKET_TOTAL_CAP - (counts.earlyBirdCount + counts.regularCount);

        return {
            count: counts.earlyBirdCount + counts.regularCount,
            earlyBirdCount: counts.earlyBirdCount,
            regularCount: counts.regularCount,
            isEarlyBird: offer?.tier === "Early Bird",
            isSoldOut: offer === null,
            bundleTwoPersonAvailable:
                offer?.tier === "Regular" &&
                regularSlotsRemaining >= 2 &&
                totalSlotsRemaining >= 2,
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
                status: z.enum([
                    "pending",
                    "paid",
                    "confirmed",
                    "cancelled",
                    "attended",
                ]),
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
                throw new Error(
                    "Unauthorized: This order does not belong to you",
                );
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
            }),
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
