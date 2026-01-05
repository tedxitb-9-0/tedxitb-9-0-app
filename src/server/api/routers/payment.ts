import { randomUUID } from "crypto";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { createSnapToken } from "~/server/midtrans";

export const paymentRouter = createTRPCRouter({
  createSnapToken: publicProcedure
    .input(
      z.object({
        amount: z.number().int().positive(),
        itemName: z.string().min(1),
        customer: z
          .object({
            firstName: z.string().min(1),
            lastName: z.string().min(1).optional(),
            email: z.string().email().optional(),
            phone: z.string().min(6).optional(),
          })
          .optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const orderId = `tedx-${randomUUID()}`;
      const token = await createSnapToken({
        orderId,
        amount: input.amount,
        itemName: input.itemName,
        customer: input.customer,
      });

      return { token, orderId };
    }),
});
