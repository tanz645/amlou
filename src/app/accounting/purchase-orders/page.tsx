"use client";

import React, { useMemo, useState } from "react";
import {
  ClipboardDocumentListIcon,
  MagnifyingGlassIcon,
  CurrencyDollarIcon,
  TruckIcon,
  ArchiveBoxXMarkIcon,
} from "@heroicons/react/24/outline";

type POStatus =
  | "Draft"
  | "Sent"
  | "Partial"
  | "Received"
  | "Billed"
  | "Cancelled";

type PORow = {
  id: string;
  number: string;
  vendorName: string;
  orderDate: string;
  expectedDate: string;
  amount: number;
  status: POStatus;
  linkedBill: string | null;
};

type PRStatus = "Draft" | "Authorized" | "Shipped" | "Credited" | "Closed";

type PRRow = {
  id: string;
  number: string;
  vendorName: string;
  returnDate: string;
  referencePO: string;
  amount: number;
  status: PRStatus;
  debitNote: string | null;
};

const ordersData: PORow[] = [
  {
    id: "po-1",
    number: "PO-88301",
    vendorName: "CloudHost LLC",
    orderDate: "2025-10-28",
    expectedDate: "2025-11-15",
    amount: 12_000,
    status: "Billed",
    linkedBill: "BILL-V-10402",
  },
  {
    id: "po-2",
    number: "PO-88302",
    vendorName: "PrintCo Media",
    orderDate: "2025-11-08",
    expectedDate: "2025-11-28",
    amount: 8_950,
    status: "Received",
    linkedBill: null,
  },
  {
    id: "po-3",
    number: "PO-88303",
    vendorName: "Office Supplies Plus",
    orderDate: "2025-12-02",
    expectedDate: "2025-12-20",
    amount: 1_240,
    status: "Partial",
    linkedBill: null,
  },
  {
    id: "po-4",
    number: "PO-88304",
    vendorName: "Design Tools AB",
    orderDate: "2026-01-06",
    expectedDate: "2026-01-30",
    amount: 3_600,
    status: "Sent",
    linkedBill: null,
  },
  {
    id: "po-5",
    number: "PO-88305",
    vendorName: "Metro Catering",
    orderDate: "2026-01-12",
    expectedDate: "2026-02-01",
    amount: 890,
    status: "Draft",
    linkedBill: null,
  },
];

const returnsData: PRRow[] = [
  {
    id: "pr-1",
    number: "PR-5501",
    vendorName: "PrintCo Media",
    returnDate: "2025-12-03",
    referencePO: "PO-88302",
    amount: 420,
    status: "Credited",
    debitNote: "DN-2201",
  },
  {
    id: "pr-2",
    number: "PR-5502",
    vendorName: "Office Supplies Plus",
    returnDate: "2025-12-18",
    referencePO: "PO-88303",
    amount: 180,
    status: "Shipped",
    debitNote: null,
  },
  {
    id: "pr-3",
    number: "PR-5503",
    vendorName: "CloudHost LLC",
    returnDate: "2026-01-05",
    referencePO: "PO-88301",
    amount: 0,
    status: "Draft",
    debitNote: null,
  },
];

function poStatusStyles(s: POStatus) {
  switch (s) {
    case "Billed":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "Received":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Partial":
      return "bg-sky-100 text-sky-800 border-sky-200";
    case "Sent":
      return "bg-violet-100 text-violet-800 border-violet-200";
    case "Cancelled":
      return "bg-red-100 text-red-800 border-red-200";
    case "Draft":
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

function prStatusStyles(s: PRStatus) {
  switch (s) {
    case "Credited":
    case "Closed":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "Shipped":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Authorized":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "Draft":
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

type View = "orders" | "returns";

export default function PurchaseOrdersPage() {
  const [view, setView] = useState<View>("orders");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const poStatuses = [
    "All",
    "Draft",
    "Sent",
    "Partial",
    "Received",
    "Billed",
    "Cancelled",
  ];
  const prStatuses = ["All", "Draft", "Authorized", "Shipped", "Credited", "Closed"];

  const filteredPO = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ordersData.filter((row) => {
      const ok =
        !q ||
        row.number.toLowerCase().includes(q) ||
        row.vendorName.toLowerCase().includes(q) ||
        (row.linkedBill && row.linkedBill.toLowerCase().includes(q));
      const okSt = statusFilter === "All" || row.status === statusFilter;
      return ok && okSt;
    });
  }, [search, statusFilter]);

  const filteredPR = useMemo(() => {
    const q = search.trim().toLowerCase();
    return returnsData.filter((row) => {
      const ok =
        !q ||
        row.number.toLowerCase().includes(q) ||
        row.vendorName.toLowerCase().includes(q) ||
        row.referencePO.toLowerCase().includes(q) ||
        (row.debitNote && row.debitNote.toLowerCase().includes(q));
      const okSt = statusFilter === "All" || row.status === statusFilter;
      return ok && okSt;
    });
  }, [search, statusFilter]);

  const openPoValue = useMemo(
    () =>
      filteredPO
        .filter((r) => r.status !== "Billed" && r.status !== "Cancelled")
        .reduce((s, r) => s + r.amount, 0),
    [filteredPO]
  );

  const pendingReturnValue = useMemo(
    () =>
      filteredPR
        .filter((r) => r.status !== "Credited" && r.status !== "Closed")
        .reduce((s, r) => s + r.amount, 0),
    [filteredPR]
  );

  const switchView = (v: View) => {
    setView(v);
    setStatusFilter("All");
    setSearch("");
  };

  return (
    <div className="min-h-screen">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Purchase orders</h1>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Commitments to vendors; purchase returns are on the second tab.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shrink-0"
          >
            <ClipboardDocumentListIcon className="w-5 h-5" />
            {view === "orders" ? "New purchase order" : "New purchase return"}
          </button>
        </div>

        <div
          className="mt-6 inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm"
          role="tablist"
        >
          <button
            type="button"
            role="tab"
            aria-selected={view === "orders"}
            onClick={() => switchView("orders")}
            className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              view === "orders"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <TruckIcon className="w-4 h-4" />
            Orders
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === "returns"}
            onClick={() => switchView("returns")}
            className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              view === "returns"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <ArchiveBoxXMarkIcon className="w-4 h-4" />
            Purchase returns
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {view === "orders" ? (
          <>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-600">POs (filtered)</p>
                  <p className="text-2xl font-bold text-gray-900">{filteredPO.length}</p>
                </div>
                <div className="p-3 rounded-lg bg-indigo-100">
                  <ClipboardDocumentListIcon className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-600">Open PO value</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${openPoValue.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100">
                  <TruckIcon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total (filtered)</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${filteredPO.reduce((s, r) => s + r.amount, 0).toLocaleString()}
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
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-600">Returns (filtered)</p>
                  <p className="text-2xl font-bold text-gray-900">{filteredPR.length}</p>
                </div>
                <div className="p-3 rounded-lg bg-amber-100">
                  <ArchiveBoxXMarkIcon className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending credit</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${pendingReturnValue.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-orange-100">
                  <CurrencyDollarIcon className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-600">Return value (filtered)</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${filteredPR.reduce((s, r) => s + r.amount, 0).toLocaleString()}
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
                  ? "Search PO #, vendor, bill…"
                  : "Search return #, PO, vendor…"
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
              {(view === "orders" ? poStatuses : prStatuses).map((s) => (
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
                    PO
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vendor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expected
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bill
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPO.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {row.number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.vendorName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(row.orderDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(row.expectedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      ${row.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {row.linkedBill ?? "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${poStatusStyles(
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
          {filteredPO.length === 0 && (
            <div className="text-center py-12 text-gray-500 text-sm">
              No purchase orders match your filters.
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
                    Vendor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    From PO
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Debit note
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPR.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {row.number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.vendorName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(row.returnDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {row.referencePO}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      ${row.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {row.debitNote ?? "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${prStatusStyles(
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
          {filteredPR.length === 0 && (
            <div className="text-center py-12 text-gray-500 text-sm">
              No purchase returns match your filters.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
