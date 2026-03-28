"use client";

import React, { useMemo, useState } from "react";
import {
  ClipboardDocumentListIcon,
  MagnifyingGlassIcon,
  CurrencyDollarIcon,
  TruckIcon,
  ArchiveBoxXMarkIcon,
} from "@heroicons/react/24/outline";

type SalesOrderStatus =
  | "Draft"
  | "Confirmed"
  | "Shipped"
  | "Partial"
  | "Invoiced"
  | "Cancelled";

type SalesOrderRow = {
  id: string;
  number: string;
  clientName: string;
  clientCompany: string;
  orderDate: string;
  expectedShip: string;
  amount: number;
  status: SalesOrderStatus;
  linkedInvoice: string | null;
};

type SalesReturnStatus =
  | "Draft"
  | "Authorized"
  | "Received"
  | "Credited"
  | "Closed";

type SalesReturnRow = {
  id: string;
  number: string;
  clientName: string;
  clientCompany: string;
  returnDate: string;
  referenceOrder: string;
  amount: number;
  status: SalesReturnStatus;
  creditNote: string | null;
};

const ordersData: SalesOrderRow[] = [
  {
    id: "so-1",
    number: "SO-240891",
    clientName: "Sarah Johnson",
    clientCompany: "TechStart Inc",
    orderDate: "2025-10-28",
    expectedShip: "2025-11-15",
    amount: 22_500,
    status: "Partial",
    linkedInvoice: "INV-600214",
  },
  {
    id: "so-2",
    number: "SO-240892",
    clientName: "Mike Chen",
    clientCompany: "Digital Solutions",
    orderDate: "2025-11-01",
    expectedShip: "2025-11-20",
    amount: 8_400,
    status: "Confirmed",
    linkedInvoice: null,
  },
  {
    id: "so-3",
    number: "SO-240893",
    clientName: "Emily Rodriguez",
    clientCompany: "Creative Agency Co.",
    orderDate: "2025-11-10",
    expectedShip: "2025-11-30",
    amount: 41_200,
    status: "Shipped",
    linkedInvoice: null,
  },
  {
    id: "so-4",
    number: "SO-240894",
    clientName: "David Wilson",
    clientCompany: "E-commerce Store",
    orderDate: "2025-09-22",
    expectedShip: "2025-10-05",
    amount: 15_600,
    status: "Invoiced",
    linkedInvoice: "INV-600217",
  },
  {
    id: "so-5",
    number: "SO-240895",
    clientName: "Lisa Thompson",
    clientCompany: "Local Restaurant Group",
    orderDate: "2026-01-05",
    expectedShip: "2026-01-25",
    amount: 5_925,
    status: "Draft",
    linkedInvoice: null,
  },
];

const returnsData: SalesReturnRow[] = [
  {
    id: "sr-1",
    number: "SR-12004",
    clientName: "Sarah Johnson",
    clientCompany: "TechStart Inc",
    returnDate: "2025-12-01",
    referenceOrder: "SO-240891",
    amount: 2_150,
    status: "Credited",
    creditNote: "CN-8891",
  },
  {
    id: "sr-2",
    number: "SR-12005",
    clientName: "Emily Rodriguez",
    clientCompany: "Creative Agency Co.",
    returnDate: "2025-11-18",
    referenceOrder: "SO-240893",
    amount: 4_800,
    status: "Received",
    creditNote: null,
  },
  {
    id: "sr-3",
    number: "SR-12006",
    clientName: "David Wilson",
    clientCompany: "E-commerce Store",
    returnDate: "2025-12-10",
    referenceOrder: "SO-240894",
    amount: 890,
    status: "Authorized",
    creditNote: null,
  },
  {
    id: "sr-4",
    number: "SR-12007",
    clientName: "Mike Chen",
    clientCompany: "Digital Solutions",
    returnDate: "2026-01-12",
    referenceOrder: "SO-240892",
    amount: 0,
    status: "Draft",
    creditNote: null,
  },
];

function orderStatusStyles(status: SalesOrderStatus) {
  switch (status) {
    case "Invoiced":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "Shipped":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Partial":
      return "bg-sky-100 text-sky-800 border-sky-200";
    case "Confirmed":
      return "bg-violet-100 text-violet-800 border-violet-200";
    case "Cancelled":
      return "bg-red-100 text-red-800 border-red-200";
    case "Draft":
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

function returnStatusStyles(status: SalesReturnStatus) {
  switch (status) {
    case "Credited":
    case "Closed":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "Received":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Authorized":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "Draft":
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

type View = "orders" | "returns";

export default function SalesOrdersPage() {
  const [view, setView] = useState<View>("orders");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const orderStatuses = [
    "All",
    "Draft",
    "Confirmed",
    "Partial",
    "Shipped",
    "Invoiced",
    "Cancelled",
  ];
  const returnStatuses = [
    "All",
    "Draft",
    "Authorized",
    "Received",
    "Credited",
    "Closed",
  ];

  const filteredOrders = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ordersData.filter((row) => {
      const matchesSearch =
        !q ||
        row.number.toLowerCase().includes(q) ||
        row.clientName.toLowerCase().includes(q) ||
        row.clientCompany.toLowerCase().includes(q) ||
        (row.linkedInvoice && row.linkedInvoice.toLowerCase().includes(q));
      const matchesStatus =
        statusFilter === "All" || row.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const filteredReturns = useMemo(() => {
    const q = search.trim().toLowerCase();
    return returnsData.filter((row) => {
      const matchesSearch =
        !q ||
        row.number.toLowerCase().includes(q) ||
        row.clientName.toLowerCase().includes(q) ||
        row.clientCompany.toLowerCase().includes(q) ||
        row.referenceOrder.toLowerCase().includes(q) ||
        (row.creditNote && row.creditNote.toLowerCase().includes(q));
      const matchesStatus =
        statusFilter === "All" || row.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const orderOpenValue = useMemo(
    () =>
      filteredOrders
        .filter((o) => o.status !== "Invoiced" && o.status !== "Cancelled")
        .reduce((s, o) => s + o.amount, 0),
    [filteredOrders]
  );

  const returnValuePending = useMemo(
    () =>
      filteredReturns
        .filter((r) => r.status !== "Credited" && r.status !== "Closed")
        .reduce((s, r) => s + r.amount, 0),
    [filteredReturns]
  );

  const handleViewChange = (next: View) => {
    setView(next);
    setStatusFilter("All");
    setSearch("");
  };

  return (
    <div className="min-h-screen">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sales orders</h1>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Open orders and fulfilment status. Sales returns live here too—use
              the tab below instead of a separate menu item.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shrink-0"
          >
            <ClipboardDocumentListIcon className="w-5 h-5" />
            {view === "orders" ? "New sales order" : "New sales return"}
          </button>
        </div>

        <div
          className="mt-6 inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm"
          role="tablist"
          aria-label="Sales documents"
        >
          <button
            type="button"
            role="tab"
            aria-selected={view === "orders"}
            onClick={() => handleViewChange("orders")}
            className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              view === "orders"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <TruckIcon className="w-4 h-4" />
            Orders
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === "returns"}
            onClick={() => handleViewChange("returns")}
            className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              view === "returns"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <ArchiveBoxXMarkIcon className="w-4 h-4" />
            Sales returns
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {view === "orders" ? (
          <>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Orders (filtered)
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {filteredOrders.length}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-indigo-100">
                  <ClipboardDocumentListIcon className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Open order value
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${orderOpenValue.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100">
                  <TruckIcon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    All orders (filtered total)
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    $
                    {filteredOrders
                      .reduce((s, o) => s + o.amount, 0)
                      .toLocaleString()}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-green-100">
                  <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Returns (filtered)
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {filteredReturns.length}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-amber-100">
                  <ArchiveBoxXMarkIcon className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Pending credit value
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${returnValuePending.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-orange-100">
                  <CurrencyDollarIcon className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Return value (filtered)
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    $
                    {filteredReturns
                      .reduce((s, r) => s + r.amount, 0)
                      .toLocaleString()}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-violet-100">
                  <ArchiveBoxXMarkIcon className="w-6 h-6 text-violet-600" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder={
                view === "orders"
                  ? "Search SO #, customer, invoice…"
                  : "Search return #, SO ref, customer…"
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="lg:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {(view === "orders" ? orderStatuses : returnStatuses).map((s) => (
                <option key={s} value={s}>
                  {s === "All" ? "All statuses" : s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {view === "orders" ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ship by
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <ClipboardDocumentListIcon className="w-5 h-5 text-gray-400" />
                        <span className="text-sm font-semibold text-gray-900">
                          {row.number}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {row.clientName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {row.clientCompany}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(row.orderDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(row.expectedShip).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      ${row.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {row.linkedInvoice ?? "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${orderStatusStyles(
                          row.status
                        )}`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredOrders.length === 0 && (
            <div className="text-center py-12 text-gray-500 text-sm">
              No sales orders match your filters.
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Return
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Return date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    From order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Credit note
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReturns.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <ArchiveBoxXMarkIcon className="w-5 h-5 text-gray-400" />
                        <span className="text-sm font-semibold text-gray-900">
                          {row.number}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {row.clientName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {row.clientCompany}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(row.returnDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {row.referenceOrder}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      ${row.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {row.creditNote ?? "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${returnStatusStyles(
                          row.status
                        )}`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredReturns.length === 0 && (
            <div className="text-center py-12 text-gray-500 text-sm">
              No sales returns match your filters.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
