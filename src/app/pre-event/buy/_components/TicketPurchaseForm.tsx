"use client";

import { useEffect, useMemo, useState } from "react";
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
import { HEARD_FROM_OPTIONS, HEARD_FROM_VALUES } from "~/lib/heardFrom";
import { MBTI_OPTIONS, MBTI_VALUES } from "~/lib/mbti";
import {
    TICKET_EARLY_BIRD_PRICE_IDR,
    TICKET_REGULAR_BUNDLE_PRICE_PER_PERSON_IDR,
    TICKET_REGULAR_BUNDLE_TOTAL_IDR,
    TICKET_REGULAR_PRICE_IDR,
} from "~/lib/ticketPricing";

/** Shown under the success toast after checkout, before redirect to dashboard. */
const TICKET_ORDER_SUCCESS_FOLLOWUP =
    "Save the date: 10 May 2026. See you at TEDxITB 9.0.";

const nomorRekeningPattern = /^\d+\s+a\/n\s+.+\s+\(.+\)$/;

function createTicketPurchaseSchema(variant: "pre-event" | "main-event") {
    const eventPhrase = variant === "pre-event" ? "pre-event" : "main event";
    return z
        .object({
            fullName: z.string().min(1, "Full name is required"),
            email: z.string().email("Please enter a valid email"),
            phoneNumber: z
                .string()
                .min(10, "Phone number must be at least 10 digits"),
            mbti: z.enum(MBTI_VALUES, {
                message: "Please select your MBTI type",
            }),
            nomorRekening: z
                .string()
                .regex(
                    nomorRekeningPattern,
                    "Format must be: <number> a/n <name> (<bank name>)",
                ),
            paymentProofUrl: z.string().min(1, "Please upload payment proof"),
            heardFrom: z.enum(HEARD_FROM_VALUES, {
                message: `Please tell us where you heard about this ${eventPhrase}`,
            }),
            heardFromOther: z.string().optional(),
            bundleTwoPerson: z.boolean().optional(),
            companionFullName: z.string().optional(),
            companionEmail: z.string().optional(),
            companionPhoneNumber: z.string().optional(),
            companionMbti: z.enum(MBTI_VALUES).optional(),
        })
        .superRefine((data, ctx) => {
            if (data.heardFrom === "other" && !data.heardFromOther?.trim()) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `Please specify where you heard about this ${eventPhrase}`,
                    path: ["heardFromOther"],
                });
            }
            if (variant === "main-event" && data.bundleTwoPerson === true) {
                if (!data.companionFullName?.trim()) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message:
                            "Companion full name is required for a 2-person bundle",
                        path: ["companionFullName"],
                    });
                }
                if (!data.companionEmail?.trim()) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message:
                            "Companion email is required for a 2-person bundle",
                        path: ["companionEmail"],
                    });
                } else {
                    const emailCheck = z
                        .string()
                        .email("Please enter a valid companion email")
                        .safeParse(data.companionEmail);
                    if (!emailCheck.success) {
                        ctx.addIssue({
                            code: z.ZodIssueCode.custom,
                            message:
                                emailCheck.error.issues[0]?.message ??
                                "Invalid email",
                            path: ["companionEmail"],
                        });
                    }
                }
                if (
                    !data.companionPhoneNumber ||
                    data.companionPhoneNumber.length < 10
                ) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message:
                            "Companion phone number must be at least 10 digits for a 2-person bundle",
                        path: ["companionPhoneNumber"],
                    });
                }
                if (!data.companionMbti) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message:
                            "Please select companion MBTI for a 2-person bundle",
                        path: ["companionMbti"],
                    });
                }
            }
        });
}

type TicketPurchaseFormData = z.infer<
    ReturnType<typeof createTicketPurchaseSchema>
>;

interface TicketPurchaseFormProps {
    userEmail?: string;
    /** Which ticket flow: pre-event or main-event (separate order types and counts). */
    variant?: "pre-event" | "main-event";
}

export default function TicketPurchaseForm({
    userEmail = "",
    variant = "pre-event",
}: TicketPurchaseFormProps) {
    const router = useRouter();
    const [uploadError, setUploadError] = useState("");
    const [fileName, setFileName] = useState("");
    const isMainEvent = variant === "main-event";

    const ticketPurchaseSchema = useMemo(
        () => createTicketPurchaseSchema(variant),
        [variant],
    );

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        trigger,
        clearErrors,
        formState: { errors },
    } = useForm<TicketPurchaseFormData>({
        resolver: zodResolver(ticketPurchaseSchema),
        defaultValues: {
            fullName: "",
            email: userEmail,
            phoneNumber: "",
            mbti: undefined,
            nomorRekening: "",
            paymentProofUrl: "",
            heardFrom: undefined,
            heardFromOther: "",
            bundleTwoPerson: false,
            companionFullName: "",
            companionEmail: "",
            companionPhoneNumber: "",
            companionMbti: undefined,
        },
    });

    const uploadedProofUrl = watch("paymentProofUrl");
    const heardFrom = watch("heardFrom");
    const bundleTwoPerson = watch("bundleTwoPerson");

    const preCountQuery = api.order.getPreEventTicketCount.useQuery(undefined, {
        enabled: variant === "pre-event",
    });
    const mainCountQuery = api.order.getMainEventTicketCount.useQuery(
        undefined,
        {
            enabled: variant === "main-event",
        },
    );

    const ticketCountData =
        variant === "pre-event" ? preCountQuery.data : mainCountQuery.data;
    const mainTicketCount = mainCountQuery.data;
    const countPending =
        variant === "pre-event"
            ? preCountQuery.isPending
            : mainCountQuery.isPending;

    const createPreEventOrder = api.order.createPreEventOrder.useMutation({
        onSuccess: (data) => {
            if (data?.id) {
                toast.success("Order created successfully!", {
                    description: TICKET_ORDER_SUCCESS_FOLLOWUP,
                });
                router.push("/dashboard");
            }
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const createMainEventOrder = api.order.createMainEventOrder.useMutation({
        onSuccess: (data) => {
            if (data?.id) {
                toast.success("Order created successfully!", {
                    description: TICKET_ORDER_SUCCESS_FOLLOWUP,
                });
                router.push("/dashboard");
            }
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    useEffect(() => {
        if (variant !== "main-event") return;
        if (
            mainTicketCount?.isEarlyBird ||
            mainTicketCount?.bundleTwoPersonAvailable === false
        ) {
            setValue("bundleTwoPerson", false);
        }
    }, [
        variant,
        mainTicketCount?.isEarlyBird,
        mainTicketCount?.bundleTwoPersonAvailable,
        setValue,
    ]);

    useEffect(() => {
        if (!bundleTwoPerson) {
            setValue("companionFullName", "");
            setValue("companionEmail", "");
            setValue("companionPhoneNumber", "");
            setValue("companionMbti", undefined);
        }
    }, [bundleTwoPerson, setValue]);

    const onSubmit = (data: TicketPurchaseFormData) => {
        if (variant === "pre-event") {
            createPreEventOrder.mutate({
                fullName: data.fullName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                mbti: data.mbti,
                nomorRekening: data.nomorRekening,
                paymentProofUrl: data.paymentProofUrl,
                heardFrom: data.heardFrom,
                heardFromOther: data.heardFromOther,
            });
        } else {
            createMainEventOrder.mutate({
                fullName: data.fullName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                mbti: data.mbti,
                nomorRekening: data.nomorRekening,
                paymentProofUrl: data.paymentProofUrl,
                heardFrom: data.heardFrom,
                heardFromOther: data.heardFromOther,
                bundleTwoPerson: data.bundleTwoPerson ?? false,
                companionFullName: data.bundleTwoPerson
                    ? data.companionFullName
                    : undefined,
                companionEmail: data.bundleTwoPerson
                    ? data.companionEmail
                    : undefined,
                companionPhoneNumber: data.bundleTwoPerson
                    ? data.companionPhoneNumber
                    : undefined,
                companionMbti: data.bundleTwoPerson
                    ? data.companionMbti
                    : undefined,
            });
        }
    };

    const createPending =
        variant === "pre-event"
            ? createPreEventOrder.isPending
            : createMainEventOrder.isPending;

    // Determine current price based on backend limit logic
    const isEarlyBird = ticketCountData?.isEarlyBird ?? false;
    const isMainBundle =
        variant === "main-event" &&
        !isEarlyBird &&
        bundleTwoPerson &&
        mainTicketCount?.bundleTwoPersonAvailable !== false;
    const priceValue = isEarlyBird
        ? TICKET_EARLY_BIRD_PRICE_IDR
        : isMainBundle
          ? TICKET_REGULAR_BUNDLE_TOTAL_IDR
          : TICKET_REGULAR_PRICE_IDR;

    const fmtIdr = (n: number) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(n);

    const ticketPrice = fmtIdr(priceValue);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl bg-white p-4 shadow-2xl sm:p-6 md:p-8"
        >
            <div className="mb-6 flex flex-col items-center justify-center">
                <Image
                    src={
                        variant === "main-event"
                            ? "/main-event/main-event-tickets.webp"
                            : "/pre-event/ticketsale.png"
                    }
                    width={1500}
                    height={150}
                    alt={
                        variant === "main-event"
                            ? "main event ticket sale"
                            : "pre-event ticket sale"
                    }
                    className="w-[80%]"
                />

                {ticketCountData && (
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
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
                        {variant === "main-event" &&
                            !isEarlyBird &&
                            bundleTwoPerson &&
                            mainTicketCount?.bundleTwoPersonAvailable && (
                                <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-bold text-purple-900 ring-1 ring-purple-400">
                                    2-person bundle
                                </span>
                            )}
                    </div>
                )}
            </div>

            {ticketCountData?.isSoldOut ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <h2 className="mb-3 text-4xl font-black tracking-tight text-[#E62B1E] md:text-5xl">
                        SOLD OUT
                    </h2>
                    <p className="text-lg font-bold text-gray-800 md:text-xl">
                        All {variant === "main-event" ? "main event" : "pre-event"} tickets have been fully claimed.
                    </p>
                    <p className="mt-2 font-medium text-gray-600">
                        Thank you for your overwhelming enthusiasm!
                    </p>
                </div>
            ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {variant === "main-event" && mainTicketCount && (
                    <div>
                        <label
                            htmlFor="bundleTwoPerson"
                            className="text-navy mb-2 block font-semibold"
                        >
                            Bundling option
                        </label>
                        <select
                            id="bundleTwoPerson"
                            value={
                                bundleTwoPerson === true ? "bundle" : "single"
                            }
                            disabled={countPending}
                            onChange={(event) => {
                                setValue(
                                    "bundleTwoPerson",
                                    event.target.value === "bundle",
                                    {
                                        shouldValidate: true,
                                    },
                                );
                            }}
                            className={`w-full rounded-lg border ${
                                errors.bundleTwoPerson
                                    ? "border-red"
                                    : "border-navy/20"
                            } text-navy focus:border-blue focus:ring-blue px-4 py-3 focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60`}
                        >
                            <option value="single">
                                1 person - {fmtIdr(TICKET_REGULAR_PRICE_IDR)}{" "}
                                (Regular single)
                            </option>
                            <option
                                value="bundle"
                                disabled={
                                    mainTicketCount.isEarlyBird ||
                                    mainTicketCount.bundleTwoPersonAvailable ===
                                        false
                                }
                            >
                                2-person bundle -{" "}
                                {fmtIdr(
                                    TICKET_REGULAR_BUNDLE_PRICE_PER_PERSON_IDR,
                                )}
                                /person (
                                {fmtIdr(TICKET_REGULAR_BUNDLE_TOTAL_IDR)} total)
                            </option>
                        </select>
                        {errors.bundleTwoPerson && (
                            <p className="text-red mt-1 text-sm">
                                {errors.bundleTwoPerson.message}
                            </p>
                        )}
                        {mainTicketCount.isEarlyBird && (
                            <p className="text-navy/70 mt-1 text-xs">
                                Bundle pricing applies during Regular period
                                only (not Early Bird).
                            </p>
                        )}
                        {!mainTicketCount.isEarlyBird &&
                            mainTicketCount.bundleTwoPersonAvailable ===
                                false && (
                                <p className="text-red mt-1 text-xs">
                                    Not enough tickets left for a 2-person
                                    bundle. Choose 1 person or check back later.
                                </p>
                            )}
                    </div>
                )}

                {variant === "main-event" && bundleTwoPerson && (
                    <div className="text-navy border-navy/10 border-t pt-6 text-base font-bold">
                        First Attendee
                    </div>
                )}

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
                        <p className="text-red mt-1 text-sm">
                            {errors.fullName.message}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label
                        htmlFor="email"
                        className="text-navy mb-2 block font-semibold"
                    >
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
                        <p className="text-red mt-1 text-sm">
                            {errors.email.message}
                        </p>
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

                {/* MBTI */}
                <div>
                    <label
                        htmlFor="mbti"
                        className="text-navy mb-2 block font-semibold"
                    >
                        MBTI
                    </label>
                    <select
                        {...register("mbti")}
                        id="mbti"
                        className={`w-full rounded-lg border ${
                            errors.mbti ? "border-red" : "border-navy/20"
                        } text-navy focus:border-blue focus:ring-blue px-4 py-3 focus:ring-2 focus:outline-none`}
                        onChange={(event) => {
                            const value = event.target
                                .value as TicketPurchaseFormData["mbti"];
                            setValue("mbti", value, { shouldValidate: true });
                        }}
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Select MBTI type
                        </option>
                        {MBTI_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {errors.mbti && (
                        <p className="text-red mt-1 text-sm">
                            {errors.mbti.message}
                        </p>
                    )}
                </div>

                {variant === "main-event" && bundleTwoPerson && (
                    <>
                        <div className="text-navy border-navy/10 border-t pt-6 text-base font-bold">
                            Second Attendee
                        </div>
                        <div>
                            <label
                                htmlFor="companionFullName"
                                className="text-navy mb-2 block font-semibold"
                            >
                                Full name
                            </label>
                            <input
                                {...register("companionFullName")}
                                id="companionFullName"
                                className={`w-full rounded-lg border ${
                                    errors.companionFullName
                                        ? "border-red"
                                        : "border-navy/20"
                                } text-navy focus:border-blue focus:ring-blue px-4 py-3 focus:ring-2 focus:outline-none`}
                                placeholder="Jane Doe"
                            />
                            {errors.companionFullName && (
                                <p className="text-red mt-1 text-sm">
                                    {errors.companionFullName.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="companionEmail"
                                className="text-navy mb-2 block font-semibold"
                            >
                                Email
                            </label>
                            <input
                                {...register("companionEmail")}
                                type="email"
                                id="companionEmail"
                                className={`w-full rounded-lg border ${
                                    errors.companionEmail
                                        ? "border-red"
                                        : "border-navy/20"
                                } text-navy focus:border-blue focus:ring-blue px-4 py-3 focus:ring-2 focus:outline-none`}
                                placeholder="jane@example.com"
                            />
                            {errors.companionEmail && (
                                <p className="text-red mt-1 text-sm">
                                    {errors.companionEmail.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="companionPhoneNumber"
                                className="text-navy mb-2 block font-semibold"
                            >
                                Phone number
                            </label>
                            <input
                                {...register("companionPhoneNumber")}
                                type="tel"
                                id="companionPhoneNumber"
                                className={`w-full rounded-lg border ${
                                    errors.companionPhoneNumber
                                        ? "border-red"
                                        : "border-navy/20"
                                } text-navy focus:border-blue focus:ring-blue px-4 py-3 focus:ring-2 focus:outline-none`}
                                placeholder="+62812345678"
                            />
                            {errors.companionPhoneNumber && (
                                <p className="text-red mt-1 text-sm">
                                    {errors.companionPhoneNumber.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="companionMbti"
                                className="text-navy mb-2 block font-semibold"
                            >
                                MBTI
                            </label>
                            <select
                                {...register("companionMbti")}
                                id="companionMbti"
                                className={`w-full rounded-lg border ${
                                    errors.companionMbti
                                        ? "border-red"
                                        : "border-navy/20"
                                } text-navy focus:border-blue focus:ring-blue px-4 py-3 focus:ring-2 focus:outline-none`}
                                onChange={(event) => {
                                    const value = event.target
                                        .value as TicketPurchaseFormData["companionMbti"];
                                    setValue("companionMbti", value, {
                                        shouldValidate: true,
                                    });
                                }}
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    Select MBTI type
                                </option>
                                {MBTI_OPTIONS.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            {errors.companionMbti && (
                                <p className="text-red mt-1 text-sm">
                                    {errors.companionMbti.message}
                                </p>
                            )}
                        </div>
                    </>
                )}

                {/* Nomor Rekening */}
                <div>
                    <label
                        htmlFor="nomorRekening"
                        className="text-navy mb-2 block font-semibold"
                    >
                        Bank Account
                    </label>
                    <input
                        {...register("nomorRekening")}
                        id="nomorRekening"
                        className={`w-full rounded-lg border ${
                            errors.nomorRekening
                                ? "border-red"
                                : "border-navy/20"
                        } text-navy focus:border-blue focus:ring-blue px-4 py-3 focus:ring-2 focus:outline-none`}
                        placeholder="1234567890 a/n Nama Lengkap (BCA)"
                    />
                    {errors.nomorRekening && (
                        <p className="text-red mt-1 text-sm">
                            {errors.nomorRekening.message}
                        </p>
                    )}
                </div>

                {/* Discovery Source */}
                <div>
                    <label
                        htmlFor="heardFrom"
                        className="text-navy mb-2 block font-semibold"
                    >
                        Let us know where you heard about this{" "}
                        {variant === "main-event" ? "main event" : "pre-event"}
                    </label>
                    <select
                        {...register("heardFrom")}
                        id="heardFrom"
                        className={`w-full rounded-lg border ${
                            errors.heardFrom ? "border-red" : "border-navy/20"
                        } text-navy focus:border-blue focus:ring-blue px-4 py-3 focus:ring-2 focus:outline-none`}
                        onChange={(event) => {
                            const value = event.target
                                .value as TicketPurchaseFormData["heardFrom"];
                            setValue("heardFrom", value, {
                                shouldValidate: true,
                            });
                            if (value !== "other") {
                                setValue("heardFromOther", "");
                                clearErrors("heardFromOther");
                            }
                        }}
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Select one option
                        </option>
                        {HEARD_FROM_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {errors.heardFrom && (
                        <p className="text-red mt-1 text-sm">
                            {errors.heardFrom.message}
                        </p>
                    )}
                </div>

                {heardFrom === "other" && (
                    <div>
                        <label
                            htmlFor="heardFromOther"
                            className="text-navy mb-2 block font-semibold"
                        >
                            Other: please specify
                        </label>
                        <input
                            {...register("heardFromOther")}
                            id="heardFromOther"
                            className={`w-full rounded-lg border ${
                                errors.heardFromOther
                                    ? "border-red"
                                    : "border-navy/20"
                            } text-navy focus:border-blue focus:ring-blue px-4 py-3 focus:ring-2 focus:outline-none`}
                            placeholder="Write your source"
                        />
                        {errors.heardFromOther && (
                            <p className="text-red mt-1 text-sm">
                                {errors.heardFromOther.message}
                            </p>
                        )}
                    </div>
                )}

                {/* Payment Instructions */}
                <div className="bg-blue/10 rounded-lg p-4">
                    <h3 className="text-navy mb-2 font-semibold">
                        Payment Instructions:
                    </h3>
                    <ol className="text-navy/80 ml-4 list-decimal space-y-1 text-sm">
                        <li>Transfer the exact amount to the account below</li>
                        <li>
                            Take a screenshot of the successful transfer proof
                        </li>
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
                        <span className="text-navy/60 text-sm">
                            Amount to Transfer:
                        </span>
                        <div className="text-purple mt-1 text-2xl font-bold">
                            {countPending ? "..." : ticketPrice}
                        </div>
                        {isEarlyBird && (
                            <p className="mt-1 text-xs font-semibold text-yellow-600">
                                Early Bird Pricing Applied!
                            </p>
                        )}
                        {variant === "main-event" &&
                            isMainBundle &&
                            !countPending && (
                                <p className="text-navy/70 mt-2 text-xs">
                                    2-person bundle:{" "}
                                    {fmtIdr(
                                        TICKET_REGULAR_BUNDLE_PRICE_PER_PERSON_IDR,
                                    )}{" "}
                                    x 2 ={" "}
                                    {fmtIdr(TICKET_REGULAR_BUNDLE_TOTAL_IDR)}
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
                                uploadPreset={
                                    env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                                }
                                onSuccess={(result) => {
                                    if (
                                        typeof result.info === "object" &&
                                        "secure_url" in result.info
                                    ) {
                                        setValue(
                                            "paymentProofUrl",
                                            result.info.secure_url,
                                        );
                                        setFileName(
                                            result.info.original_filename ||
                                                "Payment Proof",
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
                                    clientAllowedFormats: [
                                        "png",
                                        "jpeg",
                                        "jpg",
                                    ],
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
                            <p className="text-navy/60 mt-2 text-xs">
                                Max 4MB • JPG, PNG
                            </p>
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
                                    <p className="text-navy/60 text-xs">
                                        Uploaded
                                    </p>
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
                    disabled={createPending}
                    className="from-blue to-purple w-full rounded-lg bg-gradient-to-r px-6 py-4 text-lg font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {createPending ? (
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
            )}
        </motion.div>
    );
}
