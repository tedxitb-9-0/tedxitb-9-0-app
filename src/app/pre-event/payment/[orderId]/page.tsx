"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useSession } from "~/server/better-auth/client";
import { api } from "~/trpc/react";
import { motion } from "motion/react";
import ColorfulBackground from "~/_components/ColorfulBackground";
import PaymentQRDisplay from "./_components/PaymentQRDisplay";
import PaymentProofUpload from "./_components/PaymentProofUpload";

export default function PaymentPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.orderId as string;
  const { data: session, isPending: sessionPending } = useSession();

  // Fetch order details
  const {
    data: order,
    isLoading,
    refetch,
  } = api.order.getOrderById.useQuery(
    { orderId },
    { enabled: !!session && !!orderId },
  );

  // Protect the route
  useEffect(() => {
    if (!sessionPending && !session) {
      router.push("/signin");
    }
  }, [session, sessionPending, router]);

  // Loading state
  if (sessionPending || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-navy/20 border-t-blue" />
          <p className="text-navy">Loading order details...</p>
        </div>
      </div>
    );
  }

  // Not authenticated or no order
  if (!session || !order) {
    return null;
  }

  const ticketData = order.ticketJson as {
    fullName: string;
    email: string;
    phoneNumber: string;
    ticketType: string;
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: "bg-yellow-100 text-yellow-800",
      paid: "bg-blue-100 text-blue-800",
      confirmed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return badges[status as keyof typeof badges] ?? badges.pending;
  };

  const getStatusText = (status: string) => {
    if (order.paymentProofUrl && status === "pending") {
      return "Awaiting Confirmation";
    }
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <main className="min-h-screen">
      <ColorfulBackground showSmiles={false}>
        <div className="container relative z-30 mx-auto min-h-screen max-w-5xl px-4 py-16">
          <h1 className="sr-only">TEDxITB 9.0 Pre-Event Payment</h1>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h2 className="mb-2 text-4xl font-bold text-white">
              Complete Your Payment
            </h2>
            <p className="text-xl text-white/90">
              Order ID: <span className="font-mono">{order.id.slice(0, 8)}</span>
            </p>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 rounded-xl bg-white p-6 shadow-lg"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-800">Order Summary</h3>
              <span
                className={`rounded-full px-4 py-1 text-sm font-semibold ${getStatusBadge(order.status)}`}
              >
                {getStatusText(order.status)}
              </span>
            </div>
            <div className="grid gap-3 text-gray-700 md:grid-cols-2">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-semibold">{ticketData.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-semibold">{ticketData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="font-semibold">{ticketData.phoneNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Order Date</p>
                <p className="font-semibold">
                  {new Date(order.createdAt).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Payment QR */}
            <PaymentQRDisplay amount={order.totalAmount} />

            {/* Payment Proof Upload */}
            <PaymentProofUpload
              orderId={order.id}
              onUploadSuccess={() => refetch()}
            />
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex justify-center gap-4"
          >
            <Link
              href="/dashboard"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-gray-700 shadow-md transition-all hover:bg-gray-50 hover:shadow-lg"
            >
              View All Orders
            </Link>
            <Link
              href="/pre-event"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
            >
              Back to Pre-Event
            </Link>
          </motion.div>
        </div>
      </ColorfulBackground>
    </main>
  );
}
