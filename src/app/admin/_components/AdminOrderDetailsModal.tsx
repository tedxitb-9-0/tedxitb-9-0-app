"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink } from "lucide-react";
import React, { useState, useEffect } from "react";
import { type AdminOrder } from "./AdminOrdersTable";
import { getHeardFromLabel } from "~/lib/heardFrom";

interface AdminOrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: AdminOrder | null;
  onSaveStatus: (orderId: string, status: string) => Promise<void>;
  isSaving: boolean;
}

export default function AdminOrderDetailsModal({
  isOpen,
  onClose,
  order,
  onSaveStatus,
  isSaving,
}: AdminOrderDetailsModalProps) {
  const [selectedStatus, setSelectedStatus] = useState(order?.status ?? "pending");

  // Reset local state when order changes
  useEffect(() => {
    if (order) {
      setSelectedStatus(order.status);
    }
  }, [order]);

  if (!order) return null;

  const getOrderTypeLabel = (type: string) => {
    const labels = {
      pre_event_ticket: "Pre-Event Ticket",
      main_event_ticket: "Main Event Ticket",
      merchandise: "Merchandise",
    };
    return labels[type as keyof typeof labels] ?? type;
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

  const isMerch = order.orderType === "merchandise";
  const pData = isMerch ? order.merchJson : order.ticketJson;
  const ticketData = !isMerch ? order.ticketJson : null;
  const heardFromValue =
    ticketData?.heardFrom
      ? getHeardFromLabel(ticketData.heardFrom)
      : null;
  const heardFromOtherValue =
    ticketData?.heardFrom === "other" ? ticketData.heardFromOther : null;

  const handleSave = async () => {
    await onSaveStatus(order.id, selectedStatus);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isSaving ? onClose : undefined}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="pointer-events-auto relative w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] rounded-2xl bg-white shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-100 p-6 bg-gray-50/50">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Order Details
                  </h3>
                  <p className="text-sm font-mono text-gray-500 mt-1">
                    #{order.id}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  disabled={isSaving}
                  className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto">
                {/* Meta details */}
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Status</p>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadge(order.status, !!order.paymentProofUrl)}`}
                    >
                      {getStatusText(order.status, !!order.paymentProofUrl)}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Type</p>
                    <span className="inline-flex bg-blue/10 text-blue rounded-full px-3 py-1 text-xs font-semibold">
                      {getOrderTypeLabel(order.orderType)}
                    </span>
                  </div>
                </div>

                {/* Customer Details */}
                {pData && (
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-gray-900 mb-3">Customer Information</h4>
                    <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-100">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Name</span>
                        <span className="text-sm font-medium text-gray-900">{pData.fullName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Email</span>
                        <span className="text-sm font-medium text-gray-900">{pData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Phone</span>
                        <span className="text-sm font-medium text-gray-900">{pData.phoneNumber}</span>
                      </div>
                      {typeof ticketData?.nomorRekening === "string" &&
                        ticketData.nomorRekening && (
                        <div className="flex justify-between gap-4">
                          <span className="text-sm text-gray-500">Nomor Rekening</span>
                          <span className="text-right text-sm font-medium text-gray-900">{ticketData.nomorRekening}</span>
                        </div>
                        )}
                      {heardFromValue && (
                        <div className="flex justify-between gap-4">
                          <span className="text-sm text-gray-500">Heard From</span>
                          <span className="text-right text-sm font-medium text-gray-900">{heardFromValue}</span>
                        </div>
                      )}
                      {heardFromOtherValue && (
                        <div className="flex justify-between gap-4">
                          <span className="text-sm text-gray-500">Other Source</span>
                          <span className="text-right text-sm font-medium text-gray-900">{heardFromOtherValue}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Merchandise Details */}
                {isMerch && order.merchJson?.cartItems && order.merchJson.cartItems.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-gray-900 mb-3">Items Ordered</h4>
                    <div className="border border-gray-100 rounded-xl overflow-hidden">
                      {order.merchJson.cartItems.map((item, i: number) => (
                        <div key={i} className="flex justify-between items-center p-3 border-b border-gray-100 last:border-0 bg-white">
                          <span className="text-sm text-gray-700">
                            {item.quantity}x {item.merchandise?.name ?? "Item"}
                          </span>
                          <span className="text-sm font-medium text-gray-900">
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 0,
                            }).format((item.merchandise?.price ?? 0) * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Payment Information */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-3">Payment Summary</h4>
                  <div className="bg-pink-50/50 rounded-xl p-4 border border-pink-100 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Amount</span>
                      <span className="text-lg font-bold text-pink-600">{formattedAmount}</span>
                    </div>
                    {order.paymentProofUrl && (
                      <div className="flex justify-between items-center border-t border-pink-100/50 pt-3">
                        <span className="text-sm text-gray-600">Payment Proof</span>
                        <a
                          href={order.paymentProofUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-pink-600 bg-pink-100 px-3 py-1 rounded-full flex items-center gap-1 hover:bg-pink-200 transition-colors"
                        >
                          View Receipt <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="border-t border-gray-100 p-6 bg-gray-50 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="w-full sm:w-auto flex items-center gap-3">
                  <label htmlFor="modal-status-select" className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                    Status:
                  </label>
                  <select
                    id="modal-status-select"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as AdminOrder["status"])}
                    disabled={isSaving}
                    className="border-gray-300 text-gray-900 focus:border-blue focus:ring-blue rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none w-full sm:w-40 disabled:opacity-60"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="w-full sm:w-auto flex space-x-3 justify-end items-center">
                  <button
                    onClick={onClose}
                    disabled={isSaving}
                    className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-300 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving || selectedStatus === order.status}
                    className="rounded-lg bg-blue px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue/90 disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
