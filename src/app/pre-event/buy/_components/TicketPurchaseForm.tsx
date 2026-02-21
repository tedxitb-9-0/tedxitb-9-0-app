"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { motion } from "motion/react";
import { CldUploadWidget } from "next-cloudinary";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { env } from "~/env";
import { X, Upload, FileText } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

const ticketPurchaseSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  paymentProofUrl: z.string().min(1, "Please upload payment proof"),
});

type TicketPurchaseFormData = z.infer<typeof ticketPurchaseSchema>;

interface TicketPurchaseFormProps {
  userEmail?: string;
}

export default function TicketPurchaseForm({
  userEmail = "",
}: TicketPurchaseFormProps) {
  const router = useRouter();
  const [uploadError, setUploadError] = useState("");
  const [fileName, setFileName] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<TicketPurchaseFormData>({
    resolver: zodResolver(ticketPurchaseSchema),
    defaultValues: {
      fullName: "",
      email: userEmail,
      phoneNumber: "",
      paymentProofUrl: "",
    },
  });

  const uploadedProofUrl = watch("paymentProofUrl");

  const { data: ticketCountData, isPending: countPending } =
    api.order.getPreEventTicketCount.useQuery();

  const createOrder = api.order.createPreEventOrder.useMutation({
    onSuccess: (data) => {
      if (data?.id) {
        toast.success("Order created successfully!");
        router.push("/dashboard");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: TicketPurchaseFormData) => {
    createOrder.mutate(data);
  };

  // Determine current price based on backend limit logic
  const isEarlyBird = ticketCountData?.isEarlyBird ?? false;
  const priceValue = isEarlyBird ? 70000 : 80000;

  const ticketPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(priceValue);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl bg-white p-4 shadow-2xl sm:p-6 md:p-8"
    >
      <div className="mb-6 flex flex-col items-center justify-center">
        <Image
          src="/pre-event/ticketsale.png"
          width={1500}
          height={150}
          alt="pre-event ticket sale"
          className="w-[80%]"
        />

        {ticketCountData && (
          <div className="mt-4 flex items-center justify-center gap-2">
            {isEarlyBird && (
              <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-bold text-yellow-800 ring-1 ring-yellow-400">
                Early Bird
              </span>
            )}
            {!isEarlyBird && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-bold text-gray-800 ring-1 ring-gray-300">
                Regular
              </span>
            )}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="text-navy mb-2 block font-semibold"
          >
            Full Name
          </label>
          <input
            {...register("fullName")}
            id="fullName"
            className={`w-full rounded-lg border ${
              errors.fullName ? "border-red" : "border-navy/20"
            } text-navy focus:border-blue focus:ring-blue px-4 py-3 focus:ring-2 focus:outline-none`}
            placeholder="John Doe"
          />
          {errors.fullName && (
            <p className="text-red mt-1 text-sm">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="text-navy mb-2 block font-semibold">
            Email Address
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className={`w-full rounded-lg border ${
              errors.email ? "border-red" : "border-navy/20"
            } text-navy focus:border-blue focus:ring-blue px-4 py-3 focus:ring-2 focus:outline-none`}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-red mt-1 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label
            htmlFor="phoneNumber"
            className="text-navy mb-2 block font-semibold"
          >
            Phone Number
          </label>
          <input
            {...register("phoneNumber")}
            type="tel"
            id="phoneNumber"
            className={`w-full rounded-lg border ${
              errors.phoneNumber ? "border-red" : "border-navy/20"
            } text-navy focus:border-blue focus:ring-blue px-4 py-3 focus:ring-2 focus:outline-none`}
            placeholder="+62812345678"
          />
          {errors.phoneNumber && (
            <p className="text-red mt-1 text-sm">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        {/* Payment Instructions */}
        <div className="bg-blue/10 rounded-lg p-4">
          <h3 className="text-navy mb-2 font-semibold">
            Payment Instructions:
          </h3>
          <ol className="text-navy/80 ml-4 list-decimal space-y-1 text-sm">
            <li>Transfer the exact amount to the account below</li>
            <li>Take a screenshot of the successful transfer proof</li>
            <li>Upload your payment proof screenshot below</li>
            <li>Submit this form to complete your order</li>
          </ol>
        </div>

        {/* Payment BCA Info Display */}
        <div className="border-navy/10 rounded-lg border-2 p-5 text-center">
          <h3 className="text-navy mb-2 text-sm font-semibold tracking-wider uppercase">
            Transfer Destination
          </h3>
          <div className="flex flex-col items-center gap-1 rounded-md bg-gray-50 p-4">
            <span className="text-navy/60 text-sm font-medium">
              BCA (Bank Central Asia)
            </span>
            <span className="text-navy text-2xl font-bold tracking-widest text-[#0066AE] md:text-3xl">
              7773221741
            </span>
            <span className="text-navy/80 mt-1 font-medium">
              a.n. Muhammad Rafi Adinata Kusumah
            </span>
          </div>
          <div className="mt-4 border-t border-dashed border-gray-200 pt-4">
            <span className="text-navy/60 text-sm">Amount to Transfer:</span>
            <div className="text-purple mt-1 text-2xl font-bold">
              {countPending ? "..." : ticketPrice}
            </div>
            {ticketCountData?.isEarlyBird && (
              <p className="mt-1 text-xs font-semibold text-yellow-600">
                Early Bird Pricing Applied!
              </p>
            )}
          </div>
        </div>

        {/* Payment Proof Upload */}
        <div>
          <label className="text-navy mb-2 block font-semibold">
            Upload Payment Proof <span className="text-red">*</span>
          </label>
          {!uploadedProofUrl ? (
            <div>
              <CldUploadWidget
                uploadPreset={env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={(result) => {
                  if (
                    typeof result.info === "object" &&
                    "secure_url" in result.info
                  ) {
                    setValue("paymentProofUrl", result.info.secure_url);
                    setFileName(
                      result.info.original_filename || "Payment Proof",
                    );
                    void trigger("paymentProofUrl");
                    setUploadError("");
                    document.body.style.overflow = "auto";
                  }
                }}
                onQueuesEnd={() => {
                  document.body.style.overflow = "auto";
                }}
                onError={(err) => {
                  setUploadError("Failed to upload image");
                  console.error("Cloudinary error:", err);
                  document.body.style.overflow = "auto";
                }}
                onClose={() => {
                  document.body.style.overflow = "auto";
                }}
                options={{
                  multiple: false,
                  maxFiles: 1,
                  resourceType: "image",
                  clientAllowedFormats: ["png", "jpeg", "jpg"],
                  maxFileSize: 4000000,
                }}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="border-blue/40 bg-blue/5 text-blue hover:border-blue hover:bg-blue/10 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed px-6 py-4 text-sm font-semibold transition-all"
                  >
                    <Upload className="h-5 w-5" />
                    Upload Payment Proof
                  </button>
                )}
              </CldUploadWidget>
              <p className="text-navy/60 mt-2 text-xs">Max 4MB • JPG, PNG</p>
            </div>
          ) : (
            <div className="border-navy/10 flex items-center gap-3 rounded-lg border bg-gray-50 p-3">
              <div className="bg-blue/10 text-blue flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md">
                <FileText className="h-5 w-5" />
              </div>

              <div className="flex-1 overflow-hidden">
                <p className="text-navy truncate text-sm font-medium">
                  {fileName || "Payment Proof"}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-navy/60 text-xs">Uploaded</p>
                  <a
                    href={uploadedProofUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue text-xs hover:underline"
                  >
                    View
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setValue("paymentProofUrl", "");
                  setFileName("");
                  setUploadError("");
                }}
                className="text-navy/40 hover:text-red hover:bg-red/10 rounded-full p-2 transition-colors"
                title="Remove file"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          {(errors.paymentProofUrl?.message ?? uploadError) && (
            <p className="text-red mt-1 text-sm">
              {errors.paymentProofUrl?.message ?? uploadError}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={createOrder.isPending}
          className="from-blue to-purple w-full rounded-lg bg-gradient-to-r px-6 py-4 text-lg font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
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

        <p className="text-navy/60 text-center text-xs">
          By purchasing, you agree to our terms and conditions
        </p>
      </form>
    </motion.div>
  );
}
