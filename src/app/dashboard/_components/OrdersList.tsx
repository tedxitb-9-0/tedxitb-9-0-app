"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import QRCodeModal from "./QRCodeModal";

interface Order {
  id: string;
  orderType: "pre_event_ticket" | "main_event_ticket" | "merchandise";
  status: "pending" | "paid" | "confirmed" | "cancelled";
  totalAmount: number;
  createdAt: Date;
  ticketJson?: {
    fullName: string;
    email: string;
    phoneNumber: string;
  } | null;
  merchJson?: null;
  qrCode?: string | null;
  paymentProofUrl?: string | null;
}

interface OrdersListProps {
  orders: Order[];
}

export default function OrdersList({ orders }: OrdersListProps) {
  const [selectedQR, setSelectedQR] = useState<{
    qrString: string;
    orderId: string;
    attendeeName: string;
  } | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");

  const handleViewQR = (
    qrString: string,
    orderId: string,
    attendeeName: string,
  ) => {
    setSelectedQR({ qrString, orderId, attendeeName });
  };

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    if (filterStatus !== "all" && order.status !== filterStatus) return false;
    if (filterType !== "all" && order.orderType !== filterType) return false;
    return true;
  });

  const getOrderTypeLabel = (type: string) => {
    const labels = {
      pre_event_ticket: "Pre-Event",
      main_event_ticket: "Main Event",
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

  const canViewQR = (order: Order) =>
    (order.orderType === "pre_event_ticket" ||
      order.orderType === "main_event_ticket") &&
    order.qrCode &&
    (order.status === "confirmed" || order.status === "paid");

  if (orders.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl bg-white p-12 text-center shadow-lg"
      >
        <div className="mb-4 flex justify-center">
          <svg
            className="h-24 w-24 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-2xl font-bold text-gray-800">
          No Orders Yet
        </h3>
        <p className="mb-6 text-gray-600">
          You haven&apos;t placed any orders. Start by getting your event tickets!
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl bg-white p-6 shadow-lg"
      >
        <h3 className="mb-6 text-2xl font-bold text-navy">My Orders</h3>

        {/* Stats Summary */}
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-lg bg-blue/10 p-4">
            <p className="text-sm text-blue">Total Orders</p>
            <p className="text-2xl font-bold text-navy">{orders.length}</p>
          </div>
          <div className="rounded-lg bg-[#10b981]/10 p-4">
            <p className="text-sm text-[#10b981]">Confirmed</p>
            <p className="text-2xl font-bold text-navy">
              {orders.filter((o) => o.status === "confirmed").length}
            </p>
          </div>
          <div className="rounded-lg bg-yellow/10 p-4">
            <p className="text-sm text-yellow">Pending</p>
            <p className="text-2xl font-bold text-navy">
              {orders.filter((o) => o.status === "pending").length}
            </p>
          </div>
          <div className="rounded-lg bg-purple/10 p-4">
            <p className="text-sm text-purple">Total Spent</p>
            <p className="text-2xl font-bold text-navy">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(
                orders
                  .filter((o) => o.status !== "cancelled")
                  .reduce((sum, o) => sum + o.totalAmount, 0),
              )}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4 border-b pb-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-navy">
              Type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="rounded-lg border border-navy/20 px-4 py-2 text-sm text-navy focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue"
            >
              <option value="all">All Types</option>
              <option value="pre_event_ticket">Pre-Event</option>
              <option value="main_event_ticket">Main Event</option>
              <option value="merchandise">Merchandise</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-navy">
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-lg border border-navy/20 px-4 py-2 text-sm text-navy focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        {filteredOrders.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-600">No orders match the selected filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-navy/10 text-left text-sm font-semibold text-navy">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b border-navy/5 hover:bg-blue/5"
                  >
                    <td className="py-4">
                      <span className="font-mono text-sm font-medium text-navy">
                        {order.id.slice(0, 8).toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="rounded-full bg-blue/10 px-3 py-1 text-xs font-semibold text-blue">
                        {getOrderTypeLabel(order.orderType)}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="text-sm">
                        <div className="font-medium text-navy">
                          {order.ticketJson?.fullName ?? "N/A"}
                        </div>
                        <div className="text-navy/60">
                          {order.ticketJson?.email ?? ""}
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="font-semibold text-navy">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(order.totalAmount)}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="text-sm text-navy/70">
                        {new Date(order.createdAt).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </td>
                    <td className="py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadge(order.status, !!order.paymentProofUrl)}`}
                      >
                        {getStatusText(order.status, !!order.paymentProofUrl)}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        {order.status === "pending" && !order.paymentProofUrl && (
                          <Link
                            href={`/pre-event/payment/${order.id}`}
                            className="rounded-lg bg-blue px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-purple"
                          >
                            Pay
                          </Link>
                        )}
                        {canViewQR(order) && (
                          <button
                            onClick={() =>
                              handleViewQR(
                                order.qrCode!,
                                order.id,
                                order.ticketJson?.fullName ?? "Attendee",
                              )
                            }
                            className="rounded-lg bg-gradient-to-r from-purple to-pink px-3 py-1.5 text-xs font-semibold text-white transition-all hover:opacity-90"
                          >
                            View QR
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* QR Code Modal */}
      {selectedQR && (
        <QRCodeModal
          isOpen={true}
          onClose={() => setSelectedQR(null)}
          qrString={selectedQR.qrString}
          orderInfo={{
            orderId: selectedQR.orderId,
            eventName: "TEDxITB 9.0 Pre-Event",
            attendeeName: selectedQR.attendeeName,
          }}
        />
      )}
    </>
  );
}
