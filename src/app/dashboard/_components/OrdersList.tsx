"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import QRCodeModal from "./QRCodeModal";
import OrderDetailsModal from "./OrderDetailsModal";
import { type Order } from "~/types/order";

interface OrdersListProps {
  orders: Order[];
}

export default function OrdersList({ orders }: OrdersListProps) {
  const [selectedQR, setSelectedQR] = useState<{
    qrString: string;
    orderId: string;
    attendeeName: string;
  } | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
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
        <h3 className="mb-2 text-2xl font-bold text-gray-800">No Orders Yet</h3>
        <p className="mb-6 text-gray-600">
          You haven&apos;t placed any orders. Start by getting your event
          tickets!
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
        <h3 className="text-navy mb-6 text-2xl font-bold">My Orders</h3>

        {/* Stats Summary */}
        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="bg-blue/10 rounded-lg p-3 md:p-4">
            <p className="text-blue text-xs md:text-sm">Total Orders</p>
            <p className="text-navy text-xl font-bold md:text-2xl">
              {orders.length}
            </p>
          </div>
          <div className="rounded-lg bg-[#10b981]/10 p-3 md:p-4">
            <p className="text-xs text-[#10b981] md:text-sm">Confirmed</p>
            <p className="text-navy text-xl font-bold md:text-2xl">
              {orders.filter((o) => o.status === "confirmed").length}
            </p>
          </div>
          <div className="bg-yellow/10 rounded-lg p-3 md:p-4">
            <p className="text-yellow text-xs md:text-sm">Pending</p>
            <p className="text-navy text-xl font-bold md:text-2xl">
              {orders.filter((o) => o.status === "pending").length}
            </p>
          </div>
          <div className="bg-purple/10 col-span-2 rounded-lg p-3 md:col-span-1 md:p-4">
            <p className="text-purple text-xs md:text-sm">Total Spent</p>
            <p className="text-navy text-xl font-bold md:text-2xl">
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
        <div className="mb-6 grid grid-cols-2 gap-3 border-b pb-4 md:flex md:flex-wrap md:gap-4">
          <div>
            <label className="text-navy mb-1 block text-sm font-medium">
              Type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border-navy/20 text-navy focus:border-blue focus:ring-blue w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none md:w-auto md:px-4"
            >
              <option value="all">All Types</option>
              <option value="pre_event_ticket">Pre-Event</option>
              <option value="main_event_ticket">Main Event</option>
              <option value="merchandise">Merchandise</option>
            </select>
          </div>

          <div>
            <label className="text-navy mb-1 block text-sm font-medium">
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border-navy/20 text-navy focus:border-blue focus:ring-blue w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none md:w-auto md:px-4"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-600">
              No orders match the selected filters
            </p>
          </div>
        ) : (
          <>
            {/* Mobile cards (< md) */}
            <div className="flex flex-col gap-4 md:hidden">
              {filteredOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-navy/10 rounded-xl border bg-gray-50 p-4"
                >
                  {/* Top row: type badge + status badge */}
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="bg-blue/10 text-blue rounded-full px-3 py-1 text-xs font-semibold">
                      {getOrderTypeLabel(order.orderType)}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadge(order.status, !!order.paymentProofUrl)}`}
                    >
                      {getStatusText(order.status, !!order.paymentProofUrl)}
                    </span>
                  </div>

                  {/* Order ID + Customer */}
                  <div className="mb-3">
                    <p className="text-navy/50 font-mono text-xs font-medium">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </p>
                    {order.ticketJson && (
                      <p className="text-navy mt-0.5 font-semibold">
                        {order.ticketJson.fullName}
                      </p>
                    )}
                    {order.ticketJson?.email && (
                      <p className="text-navy/60 text-sm">
                        {order.ticketJson.email}
                      </p>
                    )}
                  </div>

                  {/* Amount + Date */}
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-navy text-lg font-bold">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(order.totalAmount)}
                    </span>
                    <span className="text-navy/60 text-sm">
                      {new Date(order.createdAt).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {order.status === "pending" && !order.paymentProofUrl && (
                      <Link
                        href={`/pre-event/payment/${order.id}`}
                        className="bg-blue hover:bg-purple flex-1 rounded-lg px-3 py-2 text-center text-sm font-semibold text-white transition-colors"
                      >
                        Complete Payment
                      </Link>
                    )}
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors"
                    >
                      View Details
                    </button>
                    {canViewQR(order) && (
                      <button
                        onClick={() =>
                          handleViewQR(
                            order.qrCode!,
                            order.id,
                            order.ticketJson?.fullName ?? "Attendee",
                          )
                        }
                        className="from-purple to-pink flex-1 rounded-lg bg-linear-to-r px-3 py-2 text-sm font-semibold text-white transition-all hover:opacity-90"
                      >
                        View QR Code
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop table (md+) */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-navy/10 text-navy border-b text-left text-sm font-semibold">
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
                      className="border-navy/5 hover:bg-blue/5 border-b"
                    >
                      <td className="py-4">
                        <span className="text-navy font-mono text-sm font-medium">
                          {order.id.slice(0, 8).toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className="bg-blue/10 text-blue rounded-full px-3 py-1 text-xs font-semibold">
                          {getOrderTypeLabel(order.orderType)}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="text-sm">
                          <div className="text-navy font-medium">
                            {order.ticketJson?.fullName ?? "N/A"}
                          </div>
                          <div className="text-navy/60">
                            {order.ticketJson?.email ?? ""}
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="text-navy font-semibold">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                          }).format(order.totalAmount)}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className="text-navy/70 text-sm">
                          {new Date(order.createdAt).toLocaleDateString(
                            "id-ID",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
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
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors"
                          >
                            Details
                          </button>
                          {order.status === "pending" &&
                            !order.paymentProofUrl && (
                              <Link
                                href={`/pre-event/payment/${order.id}`}
                                className="bg-blue hover:bg-purple rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition-colors"
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
                              className="from-purple to-pink rounded-lg bg-linear-to-r px-3 py-1.5 text-xs font-semibold text-white transition-all hover:opacity-90"
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
          </>
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
      {/* Order Details Modal */}
      <OrderDetailsModal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
      />
    </>
  );
}
