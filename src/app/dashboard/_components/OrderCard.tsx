"use client";

import { useState } from "react";
import Link from "next/link";
import { type Order } from "~/types/order";

interface OrderCardProps {
  order: Order;
  onViewQR?: (qrCode: string, orderId: string, attendeeName: string) => void;
}

export default function OrderCard({ order, onViewQR }: OrderCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getOrderTypeLabel = (type: string) => {
    const labels = {
      pre_event_ticket: "Pre-Event Ticket",
      main_event_ticket: "Main Event Ticket",
      merchandise: "Merchandise",
    };
    return labels[type as keyof typeof labels] ?? type;
  };

  const getOrderTypeBadge = (type: string) => {
    const badges = {
      pre_event_ticket: "bg-blue-100 text-blue-800",
      main_event_ticket: "bg-purple-100 text-purple-800",
      merchandise: "bg-pink-100 text-pink-800",
    };
    return badges[type as keyof typeof badges] ?? "bg-gray-100 text-gray-800";
  };

  const getStatusBadge = (status: string, hasProof: boolean) => {
    if (status === "pending" && hasProof) {
      return "bg-yellow-100 text-yellow-800";
    }
    const badges = {
      pending: "bg-orange-100 text-orange-800",
      paid: "bg-blue-100 text-blue-800",
      confirmed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return badges[status as keyof typeof badges] ?? badges.pending;
  };

  const getStatusText = (status: string, hasProof: boolean) => {
    if (status === "pending" && hasProof) {
      return "Awaiting Confirmation";
    }
    if (status === "pending") {
      return "Pending Payment";
    }
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formattedAmount = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(order.totalAmount);

  const formattedDate = new Date(order.createdAt).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const canViewQR =
    (order.orderType === "pre_event_ticket" ||
      order.orderType === "main_event_ticket") &&
    order.qrCode &&
    (order.status === "confirmed" || order.status === "paid");

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-shadow hover:shadow-lg">
      <div className="p-5">
        {/* Header */}
        <div className="mb-3 flex items-start justify-between">
          <div>
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getOrderTypeBadge(order.orderType)}`}
            >
              {getOrderTypeLabel(order.orderType)}
            </span>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadge(order.status, !!order.paymentProofUrl)}`}
          >
            {getStatusText(order.status, !!order.paymentProofUrl)}
          </span>
        </div>

        {/* Order Info */}
        <div className="mb-3">
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-mono text-sm font-semibold text-gray-800">
            {order.id.slice(0, 8).toUpperCase()}
          </p>
        </div>

        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Amount</p>
            <p className="text-xl font-bold text-gray-900">{formattedAmount}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Date</p>
            <p className="text-sm font-semibold text-gray-800">
              {formattedDate}
            </p>
          </div>
        </div>

        {/* Expandable Details */}
        {order.ticketJson && (
          <div className="mt-3">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex w-full items-center justify-between text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
            >
              <span>{isExpanded ? "Hide" : "Show"} Details</span>
              <svg
                className={`h-5 w-5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isExpanded && (
              <div className="mt-3 space-y-2 rounded-lg bg-gray-50 p-3 text-sm">
                <div>
                  <span className="text-gray-600">Name:</span>{" "}
                  <span className="font-semibold text-gray-800">
                    {order.ticketJson.fullName}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Email:</span>{" "}
                  <span className="font-semibold text-gray-800">
                    {order.ticketJson.email}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Phone:</span>{" "}
                  <span className="font-semibold text-gray-800">
                    {order.ticketJson.phoneNumber}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          {order.status === "pending" && !order.paymentProofUrl && (
            <Link
              href={`/pre-event/payment/${order.id}`}
              className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Complete Payment
            </Link>
          )}

          {canViewQR && onViewQR && (
            <button
              onClick={() =>
                onViewQR(
                  order.qrCode!,
                  order.id,
                  order.ticketJson?.fullName ?? "Attendee",
                )
              }
              className="flex-1 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:from-purple-700 hover:to-pink-700"
            >
              View QR Code
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
