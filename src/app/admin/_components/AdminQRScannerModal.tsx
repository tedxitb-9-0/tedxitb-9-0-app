"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, Loader2 } from "lucide-react";
import { Scanner } from "@yudiel/react-qr-scanner";

interface AdminQRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (qrCode: string) => void;
  isProcessing: boolean;
}

export default function AdminQRScannerModal({
  isOpen,
  onClose,
  onScanSuccess,
  isProcessing,
}: AdminQRScannerModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isProcessing ? onClose : undefined}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-gray-100 p-4">
                <h3 className="text-lg font-bold text-gray-900">Scan Ticket QR Code</h3>
                <button
                  onClick={onClose}
                  disabled={isProcessing}
                  className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-4 relative">
                {isProcessing && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
                    <Loader2 className="h-8 w-8 animate-spin text-blue mb-2" />
                    <p className="font-semibold text-gray-900">Processing QR Code...</p>
                  </div>
                )}
                
                <div className="overflow-hidden rounded-xl bg-gray-100 aspect-square flex items-center justify-center">
                  <Scanner
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onScan={(result: any[]) => {
                      if (!isProcessing && result && !!result.length) {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
                        onScanSuccess(result[0].rawValue);
                      }
                    }}
                    components={{
                      finder: true,
                    }}
                  />
                </div>
                <p className="mt-4 text-center text-sm text-gray-500 font-medium">
                  Position the QR code within the frame to scan.
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
