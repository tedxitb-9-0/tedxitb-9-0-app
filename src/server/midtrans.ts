import "server-only";

import midtransClient from "midtrans-client";
import { env } from "~/env";

const snap = new midtransClient.Snap({
  isProduction: env.MIDTRANS_IS_PRODUCTION === "true",
  serverKey: env.MIDTRANS_SERVER_KEY,
  clientKey: env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
});

export type SnapCustomer = {
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
};

export type SnapTransactionInput = {
  orderId: string;
  amount: number;
  itemName: string;
  customer?: SnapCustomer;
};

export async function createSnapToken(input: SnapTransactionInput) {
  const transactionDetails = {
    transaction_details: {
      order_id: input.orderId,
      gross_amount: input.amount,
    },
    item_details: [
      {
        id: "item-1",
        price: input.amount,
        quantity: 1,
        name: input.itemName,
      },
    ],
    customer_details: input.customer
      ? {
          first_name: input.customer.firstName,
          last_name: input.customer.lastName,
          email: input.customer.email,
          phone: input.customer.phone,
        }
      : undefined,
  };

  const transaction = await snap.createTransaction(transactionDetails);
  return transaction.token as string;
}
