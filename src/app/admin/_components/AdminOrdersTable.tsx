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
          {orders.map((order) => (
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
                  {order.orderType.replaceAll("_", " ")}
                </span>
              </td>
              <td className="py-3 font-semibold">
                {formatCurrency(order.totalAmount)}
              </td>
              <td className="py-3">
                <span className="bg-navy/10 text-navy rounded-full px-3 py-1 text-xs font-semibold capitalize">
                  {order.status}
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
          ))}
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
  );
}
