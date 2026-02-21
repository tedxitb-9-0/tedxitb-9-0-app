import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getSession } from "~/server/better-auth/server";
import { db } from "~/server/db";
import { orders, user } from "~/server/db/schema";

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

  return NextResponse.json({ success: true, order: updatedOrder });
}
