"use client";

import React, { useMemo, useState } from "react";
import {
  DocumentTextIcon,
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

type InvoiceStatus = "Draft" | "Sent" | "Paid" | "Partial" | "Overdue";

type InvoiceRow = {
  id: string;
  number: string;
  clientName: string;
  clientCompany: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  amountPaid: number;
  status: InvoiceStatus;
};

const invoicesData: InvoiceRow[] = [
  {
    id: "inv-1",
    number: "INV-600214",
    clientName: "Sarah Johnson",
    clientCompany: "TechStart Inc",
    issueDate: "2025-11-02",
    dueDate: "2025-12-02",
    amount: 22_500,
    amountPaid: 10_000,
    status: "Partial",
  },
  {
    id: "inv-2",
    number: "INV-600215",
    clientName: "Mike Chen",
    clientCompany: "Digital Solutions",
    issueDate: "2025-10-18",
    dueDate: "2025-11-17",
    amount: 8_400,
    amountPaid: 8_400,
    status: "Paid",
  },
  {
    id: "inv-3",
    number: "INV-600216",
    clientName: "Emily Rodriguez",
    clientCompany: "Creative Agency Co.",
    issueDate: "2025-11-28",
    dueDate: "2025-12-28",
    amount: 41_200,
    amountPaid: 0,
    status: "Sent",
  },
  {
    id: "inv-4",
    number: "INV-600217",
    clientName: "David Wilson",
    clientCompany: "E-commerce Store",
    issueDate: "2025-09-05",
    dueDate: "2025-10-05",
    amount: 15_600,
    amountPaid: 0,
    status: "Overdue",
  },
  {
    id: "inv-5",
    number: "INV-600218",
    clientName: "Lisa Thompson",
    clientCompany: "Local Restaurant Group",
    issueDate: "2026-01-10",
    dueDate: "2026-02-09",
    amount: 5_925,
    amountPaid: 0,
    status: "Draft",
  },
  {
    id: "inv-6",
    number: "INV-600219",
    clientName: "Emily Rodriguez",
    clientCompany: "Creative Agency Co.",
    issueDate: "2025-08-12",
    dueDate: "2025-09-11",
    amount: 36_800,
    amountPaid: 36_800,
    status: "Paid",
  },
];

function balanceDue(inv: InvoiceRow) {
  return Math.max(0, inv.amount - inv.amountPaid);
}

function statusStyles(status: InvoiceStatus) {
  switch (status) {
    case "Paid":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "Partial":
      return "bg-sky-100 text-sky-800 border-sky-200";
    case "Sent":
      return "bg-violet-100 text-violet-800 border-violet-200";
    case "Overdue":
      return "bg-red-100 text-red-800 border-red-200";
    case "Draft":
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

export default function AccountingInvoicesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return invoicesData.filter((inv) => {
      const matchesSearch =
        !q ||
        inv.number.toLowerCase().includes(q) ||
        inv.clientName.toLowerCase().includes(q) ||
        inv.clientCompany.toLowerCase().includes(q);
      const matchesStatus =
        statusFilter === "All" || inv.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const outstanding = useMemo(
    () => filtered.reduce((s, inv) => s + balanceDue(inv), 0),
    [filtered]
  );
  const invoiced = useMemo(
    () => filtered.reduce((s, inv) => s + inv.amount, 0),
    [filtered]
  );

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
            <p className="text-gray-600 mt-2">
              Sales invoices, amounts, and payment status
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <DocumentTextIcon className="w-5 h-5" />
            New invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Invoices (filtered)</p>
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
              <p className="text-sm font-medium text-gray-600">Amount invoiced</p>
              <p className="text-2xl font-bold text-gray-900">
                ${invoiced.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <CalendarDaysIcon className="w-6 h-6 text-blue-600" />
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
              placeholder="Search invoice #, client, or company…"
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
              <option value="All">All statuses</option>
              <option value="Draft">Draft</option>
              <option value="Sent">Sent</option>
              <option value="Partial">Partial</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
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
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
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
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <DocumentTextIcon className="w-5 h-5 text-gray-400" />
                      <span className="text-sm font-semibold text-gray-900">
                        {inv.number}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {inv.clientName}
                    </div>
                    <div className="text-sm text-gray-500">{inv.clientCompany}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(inv.issueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(inv.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ${inv.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    ${inv.amountPaid.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${balanceDue(inv).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${statusStyles(
                        inv.status
                      )}`}
                    >
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">
            No invoices match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
