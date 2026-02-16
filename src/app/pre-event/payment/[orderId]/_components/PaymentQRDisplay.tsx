"use client";

import Image from "next/image";
import { motion } from "motion/react";

interface PaymentQRDisplayProps {
  amount: number;
}

export default function PaymentQRDisplay({ amount }: PaymentQRDisplayProps) {
  // Format currency
  const formattedAmount = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl bg-white p-6 shadow-lg"
    >
      <h3 className="mb-4 text-center text-2xl font-bold text-gray-800">
        Payment Information
      </h3>

      <div className="mb-6 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-4">
        <p className="text-center text-sm text-gray-600">Total Amount</p>
        <p className="text-center text-3xl font-bold text-gray-900">
          {formattedAmount}
        </p>
      </div>

      <div className="mb-6">
        <p className="mb-4 text-center text-sm font-medium text-gray-700">
          Scan the QR code below to make payment:
        </p>
        <div className="flex justify-center">
          {/* Placeholder for payment QR - User will add this asset */}
          <div className="relative h-64 w-64 overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-100">
            <div className="flex h-full items-center justify-center">
              <Image
                src="/payment/qr-payment.png"
                alt="Payment QR Code"
                width={256}
                height={256}
                className="h-full w-full object-contain"
                onError={(e) => {
                  // Fallback if image doesn't exist yet
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="flex flex-col items-center justify-center p-4 text-center">
                        <svg class="mb-2 h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
                        </svg>
                        <p class="text-sm text-gray-500">Payment QR Code</p>
                        <p class="mt-1 text-xs text-gray-400">Placeholder - Add asset at /public/payment/qr-payment.png</p>
                      </div>
                    `;
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2 rounded-lg bg-blue-50 p-4 text-sm text-gray-700">
        <p className="font-semibold text-blue-900">Payment Instructions:</p>
        <ol className="ml-4 list-decimal space-y-1">
          <li>Scan the QR code with your banking app or e-wallet</li>
          <li>Enter the exact amount shown above</li>
          <li>Complete the payment</li>
          <li>Upload your payment proof below</li>
        </ol>
      </div>
    </motion.div>
  );
}
