"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { motion } from "motion/react";
import { UploadButton } from "~/utils/uploadthing";

interface TicketPurchaseFormProps {
  userEmail?: string;
}

export default function TicketPurchaseForm({
  userEmail = "",
}: TicketPurchaseFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: userEmail,
    phoneNumber: "",
  });
  const [uploadedProofUrl, setUploadedProofUrl] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadError, setUploadError] = useState("");

  const createOrder = api.order.createPreEventOrder.useMutation({
    onSuccess: (data) => {
      // Redirect to dashboard to view order
      if (data?.id) {
        router.push("/dashboard");
      }
    },
    onError: (error) => {
      setErrors({ submit: error.message });
    },
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (formData.phoneNumber.length < 10) {
      newErrors.phoneNumber = "Phone number must be at least 10 digits";
    }

    if (!uploadedProofUrl) {
      newErrors.paymentProof = "Please upload payment proof before submitting";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    // Create order with payment proof
    createOrder.mutate({
      ...formData,
      paymentProofUrl: uploadedProofUrl,
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const ticketPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(50000);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl bg-white p-4 shadow-2xl sm:p-6 md:p-8"
    >
      <h2 className="mb-2 text-center text-2xl font-bold text-navy sm:text-3xl">
        Pre-Event Ticket
      </h2>
      <p className="mb-6 text-center text-lg font-semibold text-purple sm:text-xl">
        {ticketPrice}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="mb-2 block font-semibold text-navy">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            className={`w-full rounded-lg border ${errors.fullName ? "border-red" : "border-navy/20"
              } px-4 py-3 text-navy focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue`}
            placeholder="John Doe"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red">{errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-2 block font-semibold text-navy">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`w-full rounded-lg border ${errors.email ? "border-red" : "border-navy/20"
              } px-4 py-3 text-navy focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue`}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red">{errors.email}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phoneNumber" className="mb-2 block font-semibold text-navy">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            className={`w-full rounded-lg border ${errors.phoneNumber ? "border-red" : "border-navy/20"
              } px-4 py-3 text-navy focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue`}
            placeholder="+62812345678"
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red">{errors.phoneNumber}</p>
          )}
        </div>

        {/* Payment Instructions */}
        <div className="rounded-lg bg-blue/10 p-4">
          <h3 className="mb-2 font-semibold text-navy">Payment Instructions:</h3>
          <ol className="ml-4 list-decimal space-y-1 text-sm text-navy/80">
            <li>Scan the QR code below or transfer to the account details</li>
            <li>Enter the exact amount: {ticketPrice}</li>
            <li>Complete the payment</li>
            <li>Upload your payment proof screenshot below</li>
            <li>Submit this form to complete your order</li>
          </ol>
        </div>

        {/* Payment QR Display */}
        <div className="rounded-lg border-2 border-navy/10 p-4">
          <h3 className="mb-3 text-center font-semibold text-navy">
            Scan to Pay
          </h3>
          <div className="flex justify-center">
            <div className="relative h-48 w-48 overflow-hidden rounded-lg border-2 border-navy/20 bg-gray-100">
              <div className="flex h-full items-center justify-center p-4">
                <div className="flex flex-col items-center text-center">
                  <svg className="mb-2 h-16 w-16 text-navy/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
                  </svg>
                  <p className="text-xs text-navy/60">Payment QR</p>
                  <p className="mt-1 text-xs text-navy/40">Add at /public/payment/qr-payment.png</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Proof Upload */}
        <div>
          <label className="mb-2 block font-semibold text-navy">
            Upload Payment Proof <span className="text-red">*</span>
          </label>
          {!uploadedProofUrl ? (
            <div>
              <UploadButton
                endpoint="paymentProofUploader"
                onClientUploadComplete={(res) => {
                  const fileUrl = res?.[0]?.url;
                  if (fileUrl) {
                    setUploadedProofUrl(fileUrl);
                    setUploadError("");
                    // Clear payment proof error if it exists
                    if (errors.paymentProof) {
                      setErrors((prev) => {
                        const newErrors = { ...prev };
                        delete newErrors.paymentProof;
                        return newErrors;
                      });
                    }
                  }
                }}
                onUploadError={(error: Error) => {
                  setUploadError(error.message);
                }}
                appearance={{
                  button:
                    "ut-ready:bg-blue ut-ready:hover:bg-purple ut-uploading:cursor-not-allowed ut-uploading:bg-gray-400 after:bg-purple",
                  allowedContent: "hidden",
                }}
              />
              <p className="mt-1 text-xs text-navy/60">
                Max 4MB • JPG, PNG
              </p>
            </div>
          ) : (
            <div className="relative">
              <div className="relative overflow-hidden rounded-lg border-2 border-blue/20">
                <img
                  src={uploadedProofUrl}
                  alt="Payment proof"
                  className="h-auto w-full max-w-sm"
                />
              </div>
              <button
                type="button"
                onClick={() => setUploadedProofUrl("")}
                className="mt-2 text-sm text-red hover:underline"
              >
                Remove and upload different image
              </button>
            </div>
          )}
          {(errors.paymentProof ?? uploadError) && (
            <p className="mt-1 text-sm text-red">
              {errors.paymentProof ?? uploadError}
            </p>
          )}
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="rounded-lg bg-red/10 p-4 text-sm text-red">
            {errors.submit}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={createOrder.isPending}
          className="w-full rounded-lg bg-gradient-to-r from-blue to-purple px-6 py-4 text-lg font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
        >
          {createOrder.isPending ? (
            <span className="flex items-center justify-center gap-2">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Creating Order...
            </span>
          ) : (
            "Complete Purchase"
          )}
        </button>

        <p className="text-center text-xs text-navy/60">
          By purchasing, you agree to our terms and conditions
        </p>
      </form>
    </motion.div>
  );
}
