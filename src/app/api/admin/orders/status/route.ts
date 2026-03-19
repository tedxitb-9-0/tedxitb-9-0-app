import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getSession } from "~/server/better-auth/server";
import { db } from "~/server/db";
import { orders, user } from "~/server/db/schema";
import { sendPreEventConfirmedEmail } from "~/server/email/sendEmail";

const allowedStatuses = ["pending", "paid", "confirmed", "cancelled"] as const;

type AllowedStatus = (typeof allowedStatuses)[number];

export async function PATCH(request: Request) {
  const session = await getSession();

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const currentUser = await db.query.user.findFirst({
    where: eq(user.id, session.user.id),
  });

  if (currentUser?.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const body = (await request.json()) as {
    orderId?: unknown;
    status?: unknown;
  };

  if (typeof body.orderId !== "string" || typeof body.status !== "string") {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  if (!allowedStatuses.includes(body.status as AllowedStatus)) {
    return NextResponse.json({ message: "Invalid status" }, { status: 400 });
  }

  const existingOrder = await db.query.orders.findFirst({
    where: eq(orders.id, body.orderId),
    with: {
      user: true,
    },
  });

  if (!existingOrder) {
    return NextResponse.json({ message: "Order not found" }, { status: 404 });
  }

  const [updatedOrder] = await db
    .update(orders)
    .set({
      status: body.status as AllowedStatus,
      updatedAt: new Date(),
    })
    .where(eq(orders.id, body.orderId))
    .returning();

  if (!updatedOrder) {
    return NextResponse.json({ message: "Order not found" }, { status: 404 });
  }

  const shouldSendPreEventConfirmationEmail =
    existingOrder.orderType === "pre_event_ticket" &&
    existingOrder.status !== "confirmed" &&
    body.status === "confirmed";

  if (shouldSendPreEventConfirmationEmail) {
    try {
      const sendConfirmationEmail =
        sendPreEventConfirmedEmail as (to: string) => Promise<unknown>;

      await sendConfirmationEmail(existingOrder.user.email);
    } catch (error) {
      console.error("Failed to send pre-event confirmation email", error);
    }
  }

  return NextResponse.json({ success: true, order: updatedOrder });
}
