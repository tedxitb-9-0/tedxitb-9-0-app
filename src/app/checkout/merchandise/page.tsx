"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "~/server/better-auth/client";
import ColorfulBackground from "~/_components/ColorfulBackground";
import { motion } from "motion/react";

export default function MerchandiseCheckoutPage() {
  const router = useRouter();
  const { data: session, isPending: sessionPending } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!sessionPending && !session) {
      router.push("/signin");
    }
  }, [session, sessionPending, router]);

  if (sessionPending || !mounted) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="border-navy/20 border-t-pink-600 mb-4 h-12 w-12 animate-spin rounded-full border-4" />
          <p className="text-navy">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <ColorfulBackground showSmiles={false}>
      <div className="relative z-30 container mx-auto flex min-h-screen items-center justify-center px-4 py-24">
        <h1 className="sr-only">TEDxITB 9.0 Merchandise Checkout</h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-lg rounded-2xl border-2 border-red-200 bg-white p-8 text-center shadow-2xl"
        >
          <div className="mb-4 rounded-full bg-red-100 p-4 inline-flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="font-titan text-3xl font-bold text-red-600">
            Merchandise Sales Are Closed
          </h2>
          <p className="mt-4 text-gray-600">
            Thank you for your interest! Merchandise purchases are no longer
            available. If you have already placed an order, you can check its
            status on your dashboard.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="mt-6 rounded-xl bg-pink-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-pink-700"
          >
            Go to Dashboard
          </button>
        </motion.div>
      </div>
    </ColorfulBackground>
  );
}
