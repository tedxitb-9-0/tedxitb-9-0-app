"use client";

import { useState } from "react";
import { toast } from "sonner";

type OrderStatus = "pending" | "paid" | "confirmed" | "cancelled";

export type AdminOrder = {
  id: string;
  orderType: string;
  status: OrderStatus;
  totalAmount: number;
  createdAt: Date;
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

export default function AdminOrdersTable({ initialOrders }: AdminOrdersTableProps) {
  const [orders, setOrders] = useState(initialOrders);
  const [savingOrderId, setSavingOrderId] = useState<string | null>(null);

  const handleSave = async (orderId: string, status: OrderStatus) => {
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
    return <div className="py-10 text-center text-navy/70">No orders found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-230">
        <thead>
          <tr className="border-b border-navy/10 text-left text-sm font-semibold text-navy">
            <th className="pb-3">Order ID</th>
            <th className="pb-3">User</th>
            <th className="pb-3">Email</th>
            <th className="pb-3">Type</th>
            <th className="pb-3">Amount</th>
            <th className="pb-3">Status</th>
            <th className="pb-3">Update Status</th>
            <th className="pb-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b border-navy/5 text-sm text-navy hover:bg-blue/5"
            >
              <td className="py-3 font-mono font-medium">{order.id.slice(0, 8).toUpperCase()}</td>
              <td className="py-3">{order.user.name}</td>
              <td className="py-3 text-navy/70">{order.user.email}</td>
              <td className="py-3">
                <span className="rounded-full bg-blue/10 px-3 py-1 text-xs font-semibold text-blue">
                  {order.orderType.replaceAll("_", " ")}
                </span>
              </td>
              <td className="py-3 font-semibold">{formatCurrency(order.totalAmount)}</td>
              <td className="py-3">
                <span className="rounded-full bg-navy/10 px-3 py-1 text-xs font-semibold capitalize text-navy">
                  {order.status}
                </span>
              </td>
              <td className="py-3">
                <div className="flex items-center gap-2">
                  <select
                    id={`status-${order.id}`}
                    defaultValue={order.status}
                    className="rounded-lg border border-navy/20 px-2 py-1 text-xs text-navy focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button
                    type="button"
                    disabled={savingOrderId === order.id}
                    onClick={() => {
                      const element = document.getElementById(
                        `status-${order.id}`,
                      ) as HTMLSelectElement | null;
                      if (!element) return;
                      void handleSave(order.id, element.value as OrderStatus);
                    }}
                    className="rounded-lg bg-blue px-2.5 py-1 text-xs font-semibold text-white transition-colors hover:bg-blue/90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {savingOrderId === order.id ? "Saving..." : "Save"}
                  </button>
                </div>
              </td>
              <td className="py-3 text-navy/70">{formatDate(order.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
