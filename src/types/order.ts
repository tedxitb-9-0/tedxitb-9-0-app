import { z } from "zod";
import { HEARD_FROM_VALUES } from "~/lib/heardFrom";
import { MBTI_VALUES } from "~/lib/mbti";

export const ticketJsonSchema = z.object({
  fullName: z.string(),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string(),
  mbti: z.enum(MBTI_VALUES).optional(),
  nomorRekening: z.string().optional(),
  ticketType: z.string().optional(),
  tier: z.string().optional(),
  heardFrom: z.enum(HEARD_FROM_VALUES).optional(),
  heardFromOther: z.string().nullable().optional(),
  bundle: z.string().optional(),
  companion: z
    .object({
      fullName: z.string().optional(),
      email: z.string().optional(),
      phoneNumber: z.string().optional(),
      mbti: z.string().optional(),
    })
    .optional()
    .nullable(),
});

export const cartItemSchema = z.object({
  quantity: z.number(),
  merchandise: z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
  }),
});

export const merchJsonSchema = z.object({
  fullName: z.string(),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string(),
  deliveryMethod: z.enum([
    "pickup_itb_jatinangor",
    "pickup_itb_ganesa",
    "delivery_shipping",
    "pickup_main_event",
  ]),
  shippingAddress: z.string().nullable().optional(),
  cartItems: z.array(cartItemSchema),
});

export const orderSchema = z.object({
  id: z.string(),
  orderType: z.enum(["pre_event_ticket", "main_event_ticket", "merchandise"]),
  status: z.enum(["pending", "paid", "confirmed", "cancelled", "attended"]),
  totalAmount: z.number(),
  createdAt: z.date(),
  ticketJson: ticketJsonSchema.nullable().optional(),
  merchJson: merchJsonSchema.nullable().optional(),
  qrCode: z.string().nullable().optional(),
  paymentProofUrl: z.string().nullable().optional(),
});

export type Order = z.infer<typeof orderSchema>;
export type TicketJson = z.infer<typeof ticketJsonSchema>;
export type MerchJson = z.infer<typeof merchJsonSchema>;
