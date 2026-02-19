"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { generateQRCodeImage } from "~/lib/qrcode";
import Image from "next/image";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrString: string;
  orderInfo: {
    orderId: string;
    eventName: string;
    attendeeName: string;
  };
}

export default function QRCodeModal({
  isOpen,
  onClose,
  qrString,
  orderInfo,
}: QRCodeModalProps) {
  const [qrImageUrl, setQrImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen && qrString) {
      setIsLoading(true);
      setError("");
      generateQRCodeImage(qrString)
        .then((dataUrl) => {
          setQrImageUrl(dataUrl);
          setIsLoading(false);
        })
        .catch((err) => {
          setError("Failed to generate QR code");
          setIsLoading(false);
          console.error(err);
        });
    }
  }, [isOpen, qrString]);

  const handleDownload = () => {
    if (!qrImageUrl) return;

    const link = document.createElement("a");
    link.href = qrImageUrl;
    link.download = `tedxitb-ticket-${orderInfo.orderId.slice(0, 8)}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Content */}
          <div className="text-center">
            <h3 className="mb-2 text-2xl font-bold text-gray-800">
              Your Attendance QR Code
            </h3>
            <p className="mb-6 text-sm text-gray-600">
              Show this QR code at the venue for check-in
            </p>

            {/* QR Code Display */}
            <div className="mb-6 flex justify-center">
              {isLoading ? (
                <div className="flex h-64 w-64 items-center justify-center rounded-lg border-2 border-gray-200 bg-gray-50">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
                </div>
              ) : error ? (
                <div className="flex h-64 w-64 items-center justify-center rounded-lg border-2 border-red-200 bg-red-50 p-4 text-center">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              ) : (
                <div className="overflow-hidden rounded-lg border-2 border-gray-200 bg-white p-4 shadow-md">
                  <Image
                    src={qrImageUrl}
                    alt="Attendance QR Code"
                    width={256}
                    height={256}
                    className="h-64 w-64"
                    unoptimized
                  />
                </div>
              )}
            </div>

            {/* Order Info */}
            <div className="mb-6 rounded-lg bg-blue-50 p-4 text-left text-sm">
              <div className="mb-2">
                <span className="font-semibold text-gray-700">Event:</span>{" "}
                <span className="text-gray-600">{orderInfo.eventName}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-gray-700">Name:</span>{" "}
                <span className="text-gray-600">{orderInfo.attendeeName}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Order ID:</span>{" "}
                <span className="font-mono text-xs text-gray-600">
                  {orderInfo.orderId}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                disabled={!qrImageUrl}
                className="flex-1 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Download QR
              </button>
              <button
                onClick={onClose}
                className="flex-1 rounded-lg border-2 border-gray-300 px-4 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
