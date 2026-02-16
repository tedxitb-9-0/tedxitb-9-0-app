import { redirect } from "next/navigation";
import { getSession } from "~/server/better-auth/server";
import { api } from "~/trpc/server";
import PlainBackground from "~/_components/PlainBackground";
import OrdersList from "./_components/OrdersList";
import DashboardClient from "./_components/DashboardClient";

export default async function Dashboard() {
  // Server-side auth check
  const session = await getSession();

  // Redirect if not authenticated
  if (!session) {
    redirect("/signin");
  }

  // Fetch user orders server-side
  const orders = await api.order.getUserOrders();

  return (
    <main className="min-h-screen">
      <PlainBackground color="blue">
        <div className="z-40 container mx-auto min-h-screen max-w-7xl px-4 py-8 py-24">
          <h1 className="sr-only">TEDxITB 9.0 Dashboard</h1>

          <DashboardClient
            userName={session.user.name}
            userEmail={session.user.email}
          >
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any */}
            <OrdersList orders={orders as any} />
          </DashboardClient>
        </div>
      </PlainBackground>
    </main>
  );
}
