import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import PlainBackground from "~/_components/PlainBackground";
import { getSession } from "~/server/better-auth/server";
import { db } from "~/server/db";
import { user } from "~/server/db/schema";
import AdminOrdersTable from "./_components/AdminOrdersTable";
import type { AdminOrder } from "./_components/AdminOrdersTable";

export default async function AdminPage() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/signin");
  }

  const currentUser = await db.query.user.findFirst({
    where: eq(user.id, session.user.id),
  });

  if (currentUser?.role !== "admin") {
    redirect("/dashboard");
  }

  const allOrders = await db.query.orders.findMany({
    with: {
      user: true,
    },
    orderBy: (orders, { desc }) => [desc(orders.createdAt)],
  });

  const tableOrders: AdminOrder[] = allOrders.map((order) => ({
    id: order.id,
    orderType: order.orderType,
    status: order.status,
    totalAmount: order.totalAmount,
    createdAt: order.createdAt,
    user: {
      name: order.user.name,
      email: order.user.email,
    },
  }));

  return (
    <main className="min-h-screen">
      <PlainBackground color="blue">
        <div className="container relative z-40 mx-auto min-h-screen max-w-7xl px-4 py-16 md:py-24">
          <div className="mb-6 rounded-xl bg-white p-6 shadow-lg">
            <h1 className="text-2xl font-bold text-navy md:text-3xl">Admin Panel</h1>
            <p className="mt-1 text-sm text-navy/70 md:text-base">
              View and monitor all ticket and merchandise orders.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold text-navy">All Orders</h2>
            <AdminOrdersTable initialOrders={tableOrders} />
          </div>
        </div>
      </PlainBackground>
    </main>
  );
}
