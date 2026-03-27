import { z } from "zod";
import { HEARD_FROM_VALUES } from "~/lib/heardFrom";

export const ticketJsonSchema = z.object({
  fullName: z.string(),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string(),
  nomorRekening: z.string().optional(),
  ticketType: z.string().optional(),
  tier: z.string().optional(),
  heardFrom: z.enum(HEARD_FROM_VALUES).optional(),
  heardFromOther: z.string().nullable().optional(),
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
