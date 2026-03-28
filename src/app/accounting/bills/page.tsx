"use client";

import React, { useMemo, useState } from "react";
import {
  DocumentTextIcon,
  MagnifyingGlassIcon,
  CurrencyDollarIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";

type BillStatus = "Draft" | "Received" | "Partial" | "Paid" | "Overdue" | "Void";

type BillRow = {
  id: string;
  number: string;
  vendorName: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  amountPaid: number;
  status: BillStatus;
};

const billsData: BillRow[] = [
  {
    id: "bill-1",
    number: "BILL-V-10402",
    vendorName: "CloudHost LLC",
    issueDate: "2025-10-05",
    dueDate: "2025-11-04",
    amount: 4_200,
    amountPaid: 4_200,
    status: "Paid",
  },
  {
    id: "bill-2",
    number: "BILL-V-10403",
    vendorName: "PrintCo Media",
    issueDate: "2025-11-12",
    dueDate: "2025-12-12",
    amount: 8_950,
    amountPaid: 4_000,
    status: "Partial",
  },
  {
    id: "bill-3",
    number: "BILL-V-10404",
    vendorName: "Office Supplies Plus",
    issueDate: "2025-12-01",
    dueDate: "2025-12-31",
    amount: 612,
    amountPaid: 0,
    status: "Received",
  },
  {
    id: "bill-4",
    number: "BILL-V-10405",
    vendorName: "Metro Catering",
    issueDate: "2025-08-20",
    dueDate: "2025-09-19",
    amount: 2_100,
    amountPaid: 0,
    status: "Overdue",
  },
  {
    id: "bill-5",
    number: "BILL-V-10406",
    vendorName: "Design Tools AB",
    issueDate: "2026-01-10",
    dueDate: "2026-02-09",
    amount: 1_890,
    amountPaid: 0,
    status: "Draft",
  },
];

function balance(b: BillRow) {
  return Math.max(0, b.amount - b.amountPaid);
}

function statusStyles(s: BillStatus) {
  switch (s) {
    case "Paid":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "Partial":
      return "bg-sky-100 text-sky-800 border-sky-200";
    case "Received":
      return "bg-violet-100 text-violet-800 border-violet-200";
    case "Overdue":
      return "bg-red-100 text-red-800 border-red-200";
    case "Void":
      return "bg-gray-200 text-gray-700 border-gray-300";
    case "Draft":
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

export default function BillsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return billsData.filter((row) => {
      const ok =
        !q ||
        row.number.toLowerCase().includes(q) ||
        row.vendorName.toLowerCase().includes(q);
      const okStatus = statusFilter === "All" || row.status === statusFilter;
      return ok && okStatus;
    });
  }, [search, statusFilter]);

  const outstanding = useMemo(
    () => filtered.reduce((s, b) => s + balance(b), 0),
    [filtered]
  );

  return (
    <div className="min-h-screen">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bills</h1>
          <p className="text-gray-600 mt-2">Vendor bills and amounts owed</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <DocumentTextIcon className="w-5 h-5" />
          New bill
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bills (filtered)</p>
              <p className="text-2xl font-bold text-gray-900">{filtered.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-indigo-100">
              <DocumentTextIcon className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bill total (filtered)</p>
              <p className="text-2xl font-bold text-gray-900">
                ${filtered.reduce((s, b) => s + b.amount, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <BuildingStorefrontIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Outstanding</p>
              <p className="text-2xl font-bold text-gray-900">
                ${outstanding.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-amber-100">
              <CurrencyDollarIcon className="w-6 h-6 text-amber-600" />
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
              placeholder="Search bill # or vendor…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="lg:w-44">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All statuses</option>
              <option value="Draft">Draft</option>
              <option value="Received">Received</option>
              <option value="Partial">Partial</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
              <option value="Void">Void</option>
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
                  Bill
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vendor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issued
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paid
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Balance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {row.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.vendorName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(row.issueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(row.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ${row.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    ${row.amountPaid.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${balance(row).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${statusStyles(
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
            No bills match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
