"use client";

import Script from "next/script";
import { useState } from "react";

import { env } from "~/env";
import { api } from "~/trpc/react";

declare global {
  interface Window {
    snap?: {
      pay: (
        token: string,
        options?: {
          onSuccess?: (result: unknown) => void;
          onPending?: (result: unknown) => void;
          onError?: (result: unknown) => void;
          onClose?: () => void;
        },
      ) => void;
    };
  }
}

const snapSrc =
  env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true"
    ? "https://app.midtrans.com/snap/snap.js"
    : "https://app.sandbox.midtrans.com/snap/snap.js";

export default function PaymentPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [isSnapReady, setIsSnapReady] = useState(false);
  const createSnapToken = api.payment.createSnapToken.useMutation();

  const handlePay = async () => {
    setStatus(null);

    if (!isSnapReady || !window.snap) {
      setStatus("Snap is still loading. Please wait a moment.");
      return;
    }

    try {
      const { token } = await createSnapToken.mutateAsync({
        amount: 150000,
        itemName: "TEDxITB 9.0 Ticket",
        customer: {
          firstName: "Guest",
        },
      });

      window.snap.pay(token, {
        onSuccess: () => setStatus("Payment success."),
        onPending: () => setStatus("Payment pending."),
        onError: () => setStatus("Payment failed."),
        onClose: () => setStatus("Payment popup closed."),
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create transaction.";
      setStatus(message);
    }
  };

  return (
    <main className="min-h-screen w-full bg-white px-6 py-16">
      <Script
        src={snapSrc}
        data-client-key={env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="afterInteractive"
        onLoad={() => setIsSnapReady(true)}
      />

      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-2xl border border-red-200 bg-red-50/40 p-8 shadow-xl">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-500">
            Payment Demo
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-red-900">
            Midtrans Snap Checkout
          </h1>
          <p className="mt-3 text-sm text-red-700">
            Click the button to open the Snap popup for a test transaction.
          </p>
        </div>

        <div className="rounded-xl border border-red-200 bg-white p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-lg font-semibold text-red-900">
                TEDxITB 9.0 Ticket
              </p>
              <p className="text-sm text-red-600">IDR 150,000</p>
            </div>
            <button
              type="button"
              onClick={handlePay}
              disabled={createSnapToken.isPending}
              className="rounded-full bg-red-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {createSnapToken.isPending ? "Preparing..." : "Pay with Snap"}
            </button>
          </div>
        </div>

        {status ? (
          <p className="rounded-lg border border-red-200 bg-white/80 px-4 py-3 text-sm text-red-700">
            {status}
          </p>
        ) : null}
      </div>
    </main>
  );
}
