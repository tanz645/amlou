"use client";

import React, { useMemo, useState } from "react";
import {
  BanknotesIcon,
  MagnifyingGlassIcon,
  CurrencyDollarIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";

type PayMethod =
  | "Bank transfer"
  | "ACH"
  | "Check"
  | "Card"
  | "Wire";

type PayStatus = "Cleared" | "Pending" | "Failed";

type Row = {
  id: string;
  paidDate: string;
  vendorName: string;
  amount: number;
  method: PayMethod;
  reference: string;
  billNumbers: string;
  status: PayStatus;
};

const data: Row[] = [
  {
    id: "vp-1",
    paidDate: "2025-11-02",
    vendorName: "CloudHost LLC",
    amount: 4_200,
    method: "ACH",
    reference: "TXN-OUT-99102",
    billNumbers: "BILL-V-10402",
    status: "Cleared",
  },
  {
    id: "vp-2",
    paidDate: "2025-11-28",
    vendorName: "PrintCo Media",
    amount: 4_000,
    method: "Bank transfer",
    reference: "WIRE-448291",
    billNumbers: "BILL-V-10403",
    status: "Cleared",
  },
  {
    id: "vp-3",
    paidDate: "2025-12-15",
    vendorName: "Office Supplies Plus",
    amount: 612,
    method: "Card",
    reference: "CH-VEN-7721",
    billNumbers: "BILL-V-10404",
    status: "Cleared",
  },
  {
    id: "vp-4",
    paidDate: "2026-01-14",
    vendorName: "Metro Catering",
    amount: 2_100,
    method: "Check",
    reference: "CHK-4402",
    billNumbers: "BILL-V-10405",
    status: "Pending",
  },
  {
    id: "vp-5",
    paidDate: "2025-10-08",
    vendorName: "Design Tools AB",
    amount: 990,
    method: "Wire",
    reference: "SWIFT-XX8821",
    billNumbers: "BILL-V-10399",
    status: "Cleared",
  },
];

function methodBadge(m: PayMethod) {
  switch (m) {
    case "Bank transfer":
      return "bg-slate-100 text-slate-800 border-slate-200";
    case "ACH":
      return "bg-violet-100 text-violet-800 border-violet-200";
    case "Card":
      return "bg-indigo-100 text-indigo-800 border-indigo-200";
    case "Check":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "Wire":
    default:
      return "bg-cyan-100 text-cyan-800 border-cyan-200";
  }
}

function statusBadge(s: PayStatus) {
  switch (s) {
    case "Cleared":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "Failed":
      return "bg-red-100 text-red-800 border-red-200";
    case "Pending":
    default:
      return "bg-amber-100 text-amber-800 border-amber-200";
  }
}

export default function VendorPaymentsPage() {
  const [search, setSearch] = useState("");
  const [methodFilter, setMethodFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const methods: PayMethod[] = ["Bank transfer", "ACH", "Check", "Card", "Wire"];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((row) => {
      const ok =
        !q ||
        row.vendorName.toLowerCase().includes(q) ||
        row.reference.toLowerCase().includes(q) ||
        row.billNumbers.toLowerCase().includes(q);
      const okM = methodFilter === "All" || row.method === methodFilter;
      const okS = statusFilter === "All" || row.status === statusFilter;
      return ok && okM && okS;
    });
  }, [search, methodFilter, statusFilter]);

  const total = useMemo(() => filtered.reduce((s, r) => s + r.amount, 0), [filtered]);
  const cleared = useMemo(
    () =>
      filtered.filter((r) => r.status === "Cleared").reduce((s, r) => s + r.amount, 0),
    [filtered]
  );

  return (
    <div className="min-h-screen">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vendor payments</h1>
          <p className="text-gray-600 mt-2">
            Outbound payments applied to vendor bills
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <BanknotesIcon className="w-5 h-5" />
          Pay vendor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-600">Payments (filtered)</p>
              <p className="text-2xl font-bold text-gray-900">{filtered.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <BanknotesIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-600">Total paid (filtered)</p>
              <p className="text-2xl font-bold text-gray-900">${total.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-600">Cleared total</p>
              <p className="text-2xl font-bold text-gray-900">${cleared.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-indigo-100">
              <BuildingStorefrontIcon className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search vendor, reference, bill…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="lg:w-40">
            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All methods</option>
              {methods.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div className="lg:w-36">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All statuses</option>
              <option value="Cleared">Cleared</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paid
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vendor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bill(s)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(row.paidDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {row.vendorName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ${row.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${methodBadge(
                        row.method
                      )}`}
                    >
                      {row.method}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-700">
                    {row.reference}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {row.billNumbers}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${statusBadge(
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
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">
            No vendor payments match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
