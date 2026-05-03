"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { QrCode } from "lucide-react";
import { api } from "~/trpc/react";

import { type Order } from "~/types/order";
import AdminOrderDetailsModal from "./AdminOrderDetailsModal";
import AdminQRScannerModal from "./AdminQRScannerModal";
import { getTicketSlotCount } from "~/lib/ticketCapacity";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const scanOrderMutation = api.order.scanOrder.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
      setIsScannerOpen(false);
      
      if (data.order) {
        const newOrder = data.order as AdminOrder;
        setOrders((prev) => 
          prev.some((o) => o.id === newOrder.id)
            ? prev.map((o) => (o.id === newOrder.id ? newOrder : o))
            : [newOrder, ...prev]
        );
        setSelectedOrder(newOrder);
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to scan QR code");
    },
  });

  const handleScanSuccess = (qrCode: string) => {
    if (!scanOrderMutation.isPending) {
      scanOrderMutation.mutate({ qrCode });
    }
  };

  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      // Reset to page 1 only if the search query actually changed the debounced value, 
      // but doing it here is fine as it fires on every valid debounce
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleFilterTypeChange = (value: string) => {
    setFilterType(value);
    setCurrentPage(1);
  };

  const handleFilterStatusChange = (value: string) => {
    setFilterStatus(value);
    setCurrentPage(1);
  };

  const filteredOrders = orders.filter((order) => {
    if (filterStatus !== "all" && order.status !== filterStatus) return false;
    if (filterType !== "all" && order.orderType !== filterType) return false;
    
    if (debouncedSearchQuery.trim() !== "") {
      const query = debouncedSearchQuery.toLowerCase();
      const matchesId = order.id.toLowerCase().includes(query);
      const matchesName = order.user.name.toLowerCase().includes(query);
      const matchesEmail = order.user.email.toLowerCase().includes(query);
      if (!matchesId && !matchesName && !matchesEmail) return false;
    }

    return true;
  });

  const isTicketFilter = filterType === "pre_event_ticket" || filterType === "main_event_ticket";
  const isMerchFilter = filterType === "merchandise";
  
  const totalSalesAmount = filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalTicketsSold = filteredOrders.reduce((sum, order) => sum + (isTicketFilter ? getTicketSlotCount(order) : 0), 0);
  
  const totalMerchSold = filteredOrders.reduce((sum, order) => {
    if (isMerchFilter && order.merchJson && Array.isArray(order.merchJson.cartItems)) {
      return sum + order.merchJson.cartItems.reduce((itemSum, item) => itemSum + item.quantity, 0);
    }
    return sum;
  }, 0);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE) || 1;
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
      attended: "bg-purple-100 text-purple-800",
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
      {/* Action Bar */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setIsScannerOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-blue px-4 py-2 font-semibold text-white transition-colors hover:bg-blue/90"
        >
          <QrCode className="h-5 w-5" />
          Scan QR
        </button>
      </div>

      {/* Filters & Search */}
      <div className="mb-6 flex flex-col gap-4 border-b border-navy/10 pb-4 md:flex-row md:items-end md:justify-between w-full">
        <div className="w-full md:max-w-xs">
          <label className="text-navy mb-1 block text-sm font-medium">Search Orders</label>
          <input
            type="text"
            placeholder="Search by ID, Name, or Email"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="border-navy/20 text-navy focus:border-blue focus:ring-blue w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 md:flex md:gap-4">
          <div>
            <label className="text-navy mb-1 block text-sm font-medium">Type</label>
            <select
              value={filterType}
              onChange={(e) => handleFilterTypeChange(e.target.value)}
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
              onChange={(e) => handleFilterStatusChange(e.target.value)}
              className="border-navy/20 text-navy focus:border-blue focus:ring-blue w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none md:w-auto md:px-4"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="attended">Attended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Metrics */}
      {(isTicketFilter || isMerchFilter) && (
        <div className="mb-6 grid grid-cols-2 gap-4 md:flex md:gap-6">
          <div className="rounded-xl border border-navy/10 bg-blue/5 p-4 shadow-sm min-w-40">
            <p className="text-navy/70 text-xs font-semibold uppercase tracking-wider">
              {isTicketFilter ? "Tickets Count" : "Items Count"}
            </p>
            <p className="text-navy mt-1 text-2xl font-bold">
              {isTicketFilter ? totalTicketsSold : totalMerchSold}
            </p>
          </div>
          <div className="rounded-xl border border-navy/10 bg-blue/5 p-4 shadow-sm min-w-48">
            <p className="text-navy/70 text-xs font-semibold uppercase tracking-wider">Total Amount</p>
            <p className="text-navy mt-1 text-2xl font-bold">{formatCurrency(totalSalesAmount)}</p>
          </div>
        </div>
      )}

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
            {paginatedOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-navy/70">
                  No orders match the selected filters.
                </td>
              </tr>
            ) : (
              paginatedOrders.map((order) => (
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between border-t border-navy/10 pt-4">
            <div className="text-navy/70 text-sm">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredOrders.length)} of{" "}
              {filteredOrders.length} orders
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-navy/20 px-3 py-1.5 text-sm font-medium text-navy disabled:opacity-50 transition-colors hover:bg-navy/5"
              >
                Previous
              </button>
              <div className="flex items-center px-4 text-sm text-navy font-medium">
                Page {currentPage} of {totalPages}
              </div>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-navy/20 px-3 py-1.5 text-sm font-medium text-navy disabled:opacity-50 transition-colors hover:bg-navy/5"
              >
                Next
              </button>
            </div>
          </div>
        )}

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

        {/* QR Scanner Modal */}
        <AdminQRScannerModal
          isOpen={isScannerOpen}
          onClose={() => setIsScannerOpen(false)}
          onScanSuccess={handleScanSuccess}
          isProcessing={scanOrderMutation.isPending}
        />
      </div>
    </div>
  );
}
