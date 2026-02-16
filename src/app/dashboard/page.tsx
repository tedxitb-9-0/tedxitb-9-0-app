"use client";

import { useSession, signOut } from "~/server/better-auth/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "motion/react";
import { api } from "~/trpc/react";
import PlainBackground from "~/_components/PlainBackground";
import OrdersList from "./_components/OrdersList";

export default function Dashboard() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  // Fetch user orders
  const { data: orders, isLoading: ordersLoading } = api.order.getUserOrders.useQuery(
    undefined,
    {
      enabled: !!session,
    },
  );

  // Protect the route - redirect if not authenticated
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/signin");
    }
  }, [session, isPending, router]);

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  // Loading state
  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-navy/20 border-t-blue"></div>
          <p className="text-navy">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - will redirect via useEffect
  if (!session) {
    return null;
  }

  return (
    <main className="min-h-screen">
      <PlainBackground color="blue">
        <div className="z-40 container mx-auto min-h-screen max-w-7xl px-4 py-8 py-24">
          <h1 className="sr-only">TEDxITB 9.0 Dashboard</h1>

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 rounded-xl bg-white p-6 shadow-lg"
          >
            <div className="flex flex-col items-center justify-between gap-2 text-center text-base md:flex-row md:text-left">
              <div className="flex items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-navy md:text-3xl">
                    Welcome back, {session.user.name}!
                  </h2>
                  <p className="text-lg text-navy/70">{session.user.email}</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="rounded-lg bg-red px-3 py-2 text-white transition-colors hover:cursor-pointer hover:bg-red/90 md:px-6 md:py-2"
              >
                Sign Out
              </button>
            </div>
          </motion.div>

          {/* Orders Section */}
          {ordersLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center">
                <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-blue"></div>
                <p className="text-white">Loading orders...</p>
              </div>
            </div>
          ) : (
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
            <OrdersList orders={orders as any} />
          )}
        </div>
      </PlainBackground>
    </main>
  );
}

