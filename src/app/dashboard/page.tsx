import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { getSession } from "~/server/better-auth/server";
import { api } from "~/trpc/server";
import PlainBackground from "~/_components/PlainBackground";
import OrdersList from "./_components/OrdersList";
import DashboardClient from "./_components/DashboardClient";
import { db } from "~/server/db";
import { user } from "~/server/db/schema";

export default async function Dashboard() {
  // Server-side auth check
  const session = await getSession();

  // Redirect if not authenticated
  if (!session) {
    redirect("/signin");
  }

  // Fetch user orders server-side
  const orders = await api.order.getUserOrders();

  const currentUser = await db.query.user.findFirst({
    where: eq(user.id, session.user.id),
  });

  const isAdmin = currentUser?.role === "admin";

  return (
    <main className="min-h-screen">
      <PlainBackground color="blue">
        <div className="z-40 container mx-auto min-h-screen max-w-7xl px-4 py-16 md:py-24">
          <h1 className="sr-only">TEDxITB 9.0 Dashboard</h1>

          <DashboardClient
            userName={session.user.name}
            userEmail={session.user.email}
            isAdmin={isAdmin}
          >
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any */}
            <OrdersList orders={orders as any} />
          </DashboardClient>
        </div>
      </PlainBackground>
    </main>
  );
}
