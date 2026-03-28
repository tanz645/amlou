"use client";

import React, { useMemo, useState } from "react";
import {
  BanknotesIcon,
  MagnifyingGlassIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

type PaymentMethod =
  | "Bank transfer"
  | "Card"
  | "ACH"
  | "Check"
  | "Cash";

type PaymentStatus = "Cleared" | "Pending";

type PaymentRow = {
  id: string;
  receivedDate: string;
  customerName: string;
  customerCompany: string;
  amount: number;
  method: PaymentMethod;
  reference: string;
  invoiceNumbers: string;
  status: PaymentStatus;
};

const paymentsData: PaymentRow[] = [
  {
    id: "pay-1",
    receivedDate: "2025-11-20",
    customerName: "Sarah Johnson",
    customerCompany: "TechStart Inc",
    amount: 10_000,
    method: "Bank transfer",
    reference: "TXN-77821-ACME",
    invoiceNumbers: "INV-600214",
    status: "Cleared",
  },
  {
    id: "pay-2",
    receivedDate: "2025-11-03",
    customerName: "Mike Chen",
    customerCompany: "Digital Solutions",
    amount: 8_400,
    method: "ACH",
    reference: "ACH-4491023",
    invoiceNumbers: "INV-600215",
    status: "Cleared",
  },
  {
    id: "pay-3",
    receivedDate: "2025-10-28",
    customerName: "Emily Rodriguez",
    customerCompany: "Creative Agency Co.",
    amount: 18_500,
    method: "Card",
    reference: "CH-9F2K-LQ81",
    invoiceNumbers: "INV-600219",
    status: "Cleared",
  },
  {
    id: "pay-4",
    receivedDate: "2026-01-08",
    customerName: "David Wilson",
    customerCompany: "E-commerce Store",
    amount: 4_000,
    method: "Check",
    reference: "CHK-1840",
    invoiceNumbers: "INV-600217",
    status: "Pending",
  },
  {
    id: "pay-5",
    receivedDate: "2025-12-12",
    customerName: "Sarah Johnson",
    customerCompany: "TechStart Inc",
    amount: 2_500,
    method: "Bank transfer",
    reference: "TXN-88104-ACME",
    invoiceNumbers: "INV-600214",
    status: "Cleared",
  },
  {
    id: "pay-6",
    receivedDate: "2026-01-15",
    customerName: "Lisa Thompson",
    customerCompany: "Local Restaurant Group",
    amount: 1_200,
    method: "Cash",
    reference: "RCPT-Local-009",
    invoiceNumbers: "INV-600218",
    status: "Cleared",
  },
];

function methodStyles(method: PaymentMethod) {
  switch (method) {
    case "Bank transfer":
      return "bg-slate-100 text-slate-800 border-slate-200";
    case "ACH":
      return "bg-violet-100 text-violet-800 border-violet-200";
    case "Card":
      return "bg-indigo-100 text-indigo-800 border-indigo-200";
    case "Check":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "Cash":
    default:
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
  }
}

function statusStyles(status: PaymentStatus) {
  switch (status) {
    case "Cleared":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "Pending":
    default:
      return "bg-amber-100 text-amber-800 border-amber-200";
  }
}

export default function PaymentsHistoryPage() {
  const [search, setSearch] = useState("");
  const [methodFilter, setMethodFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const methods: PaymentMethod[] = [
    "Bank transfer",
    "Card",
    "ACH",
    "Check",
    "Cash",
  ];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return paymentsData.filter((row) => {
      const matchesSearch =
        !q ||
        row.customerName.toLowerCase().includes(q) ||
        row.customerCompany.toLowerCase().includes(q) ||
        row.reference.toLowerCase().includes(q) ||
        row.invoiceNumbers.toLowerCase().includes(q);
      const matchesMethod =
        methodFilter === "All" || row.method === methodFilter;
      const matchesStatus =
        statusFilter === "All" || row.status === statusFilter;
      return matchesSearch && matchesMethod && matchesStatus;
    });
  }, [search, methodFilter, statusFilter]);

  const totalReceived = useMemo(
    () => filtered.reduce((s, p) => s + p.amount, 0),
    [filtered]
  );

  const clearedTotal = useMemo(
    () =>
      filtered
        .filter((p) => p.status === "Cleared")
        .reduce((s, p) => s + p.amount, 0),
    [filtered]
  );

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Payments history
            </h1>
            <p className="text-gray-600 mt-2">
              Customer receipts and how they were applied to invoices
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <BanknotesIcon className="w-5 h-5" />
            Record payment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Payments (filtered)
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {filtered.length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <BanknotesIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total received</p>
              <p className="text-2xl font-bold text-gray-900">
                ${totalReceived.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Cleared total</p>
              <p className="text-2xl font-bold text-gray-900">
                ${clearedTotal.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-indigo-100">
              <CalendarDaysIcon className="w-6 h-6 text-indigo-600" />
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
              placeholder="Search customer, reference, or invoice…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="lg:w-44">
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
          <div className="lg:w-40">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All statuses</option>
              <option value="Cleared">Cleared</option>
              <option value="Pending">Pending</option>
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
                  Received
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
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
                  Invoice(s)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(row.receivedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                        <BanknotesIcon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {row.customerName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {row.customerCompany}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ${row.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${methodStyles(
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
                    {row.invoiceNumbers}
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
            No payments match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
