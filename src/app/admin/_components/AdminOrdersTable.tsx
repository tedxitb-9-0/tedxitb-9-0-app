"use client";

import { useState } from "react";
import { toast } from "sonner";

import { type Order } from "~/types/order";
import AdminOrderDetailsModal from "./AdminOrderDetailsModal";

export type AdminOrder = Order & {
  user: {
    name: string;
    email: string;
  };
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);

const formatDate = (value: Date) =>
  new Date(value).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

interface AdminOrdersTableProps {
  initialOrders: AdminOrder[];
}

export default function AdminOrdersTable({
  initialOrders,
}: AdminOrdersTableProps) {
  const [orders, setOrders] = useState(initialOrders);
  const [savingOrderId, setSavingOrderId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredOrders = orders.filter((order) => {
    if (filterStatus !== "all" && order.status !== filterStatus) return false;
    if (filterType !== "all" && order.orderType !== filterType) return false;
    return true;
  });

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

  const handleSave = async (orderId: string, status: Order["status"]) => {
    const previousOrders = orders;

    setSavingOrderId(orderId);
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId
          ? {
            ...order,
            status,
          }
          : order,
      ),
    );

    try {
      const response = await fetch("/api/admin/orders/status", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      toast.success("Order status updated");
    } catch {
      setOrders(previousOrders);
      toast.error("Failed to update order status");
    } finally {
      setSavingOrderId(null);
    }
  };

  if (!orders.length) {
    return (
      <div className="text-navy/70 py-10 text-center">No orders found.</div>
    );
  }

  return (
    <div>
      {/* Filters */}
      <div className="mb-6 grid grid-cols-2 gap-3 border-b border-navy/10 pb-4 md:flex md:flex-wrap md:gap-4">
        <div>
          <label className="text-navy mb-1 block text-sm font-medium">Type</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border-navy/20 text-navy focus:border-blue focus:ring-blue w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none md:w-auto md:px-4"
          >
            <option value="all">All Types</option>
            <option value="pre_event_ticket">Pre-Event Ticket</option>
            <option value="main_event_ticket">Main Event Ticket</option>
            <option value="merchandise">Merchandise</option>
          </select>
        </div>

        <div>
          <label className="text-navy mb-1 block text-sm font-medium">Status</label>
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

      <div className="overflow-x-auto">
        <table className="w-full min-w-230">
          <thead>
            <tr className="border-navy/10 text-navy border-b text-left text-sm font-semibold">
              <th className="pb-3">Order ID</th>
              <th className="pb-3">User</th>
              <th className="pb-3">Type</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Details</th>
              <th className="pb-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-navy/70">
                  No orders match the selected filters.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-navy/5 text-navy hover:bg-blue/5 border-b text-sm"
                >
                  <td className="py-3 font-mono font-medium">
                    {order.id.slice(0, 8).toUpperCase()}
                  </td>
                  <td className="py-3">{order.user.name}</td>
                  <td className="py-3">
                    <span className="bg-blue/10 text-blue rounded-full px-3 py-1 text-xs font-semibold">
                      {getOrderTypeLabel(order.orderType)}
                    </span>
                  </td>
                  <td className="py-3 font-semibold">
                    {formatCurrency(order.totalAmount)}
                  </td>
                  <td className="py-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadge(order.status, !!order.paymentProofUrl)}`}
                    >
                      {getStatusText(order.status, !!order.paymentProofUrl)}
                    </span>
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-800 transition-colors hover:bg-gray-200"
                    >
                      View
                    </button>
                  </td>
                  <td className="text-navy/70 py-3">
                    {formatDate(order.createdAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Admin Order Details Modal */}
        <AdminOrderDetailsModal
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          order={selectedOrder}
          onSaveStatus={async (orderId, status) => {
            await handleSave(orderId, status as Order["status"]);
          }}
          isSaving={savingOrderId === selectedOrder?.id}
        />
      </div>
    </div>
  );
}
