"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { motion } from "motion/react";
import { UploadButton } from "~/utils/uploadthing";

interface PaymentProofUploadProps {
  orderId: string;
  onUploadSuccess?: () => void;
}

export default function PaymentProofUpload({
  orderId,
  onUploadSuccess,
}: PaymentProofUploadProps) {
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const uploadProof = api.order.updatePaymentProof.useMutation({
    onSuccess: () => {
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-xl bg-white p-6 shadow-lg"
    >
      <h3 className="mb-4 text-2xl font-bold text-navy">
        Upload Payment Proof
      </h3>

      <div className="space-y-4">
        {/* Upload Button */}
        {!uploadedUrl && !uploadProof.isSuccess && (
          <div>
            <label className="mb-2 block text-sm font-medium text-navy">
              Screenshot or Photo of Payment
            </label>
            <UploadButton
              endpoint="paymentProofUploader"
              onClientUploadComplete={(res) => {
                const fileUrl = res?.[0]?.url;
                if (fileUrl) {
                  setUploadedUrl(fileUrl);
                  setError("");
                  // Save to database
                  uploadProof.mutate({
                    orderId,
                    paymentProofBase64: fileUrl, // Now storing URL instead of base64
                  });
                }
              }}
              onUploadError={(error: Error) => {
                setError(error.message);
              }}
              appearance={{
                button:
                  "ut-ready:bg-blue ut-ready:hover:bg-purple ut-uploading:cursor-not-allowed ut-uploading:bg-gray-400 after:bg-purple",
                allowedContent: "hidden",
              }}
            />
            <p className="mt-1 text-xs text-gray-500">
              Accepted formats: JPG, PNG (Max 4MB)
            </p>
          </div>
        )}

        {/* Preview */}
        {uploadedUrl && (
          <div className="relative">
            <p className="mb-2 text-sm font-medium text-navy">Preview:</p>
            <div className="relative overflow-hidden rounded-lg border-2 border-blue/20">
              <img
                src={uploadedUrl}
                alt="Payment proof preview"
                className="h-auto w-full max-w-md"
              />
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="rounded-lg bg-red/10 p-4 text-sm text-red">
            {error}
          </div>
        )}

        {/* Success Message */}
        {uploadProof.isSuccess && !error && (
          <div className="rounded-lg bg-[#10b981]/10 p-4 text-sm text-[#10b981]">
            ✓ Payment proof uploaded successfully! Your order is now awaiting
            confirmation.
          </div>
        )}

        {/* Uploading State */}
        {uploadProof.isPending && (
          <div className="flex items-center justify-center gap-2 rounded-lg bg-blue/10 p-4">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue border-t-transparent" />
            <span className="text-sm text-blue">Saving to order...</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

