"use client";

import React, { useMemo, useState } from "react";
import {
  DocumentArrowDownIcon,
  MagnifyingGlassIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

type CreditNoteStatus = "Draft" | "Issued" | "Applied" | "Void";

type CreditNoteRow = {
  id: string;
  number: string;
  customerName: string;
  customerCompany: string;
  issueDate: string;
  invoiceRef: string;
  reason: string;
  amount: number;
  status: CreditNoteStatus;
};

const creditNotesData: CreditNoteRow[] = [
  {
    id: "cn-1",
    number: "CN-8891",
    customerName: "Sarah Johnson",
    customerCompany: "TechStart Inc",
    issueDate: "2025-12-01",
    invoiceRef: "INV-600214",
    reason: "Sales return SR-12004",
    amount: 2_150,
    status: "Applied",
  },
  {
    id: "cn-2",
    number: "CN-8892",
    customerName: "Mike Chen",
    customerCompany: "Digital Solutions",
    issueDate: "2025-11-05",
    invoiceRef: "INV-600215",
    reason: "Price adjustment",
    amount: 350,
    status: "Applied",
  },
  {
    id: "cn-3",
    number: "CN-8893",
    customerName: "Emily Rodriguez",
    customerCompany: "Creative Agency Co.",
    issueDate: "2025-11-22",
    invoiceRef: "INV-600216",
    reason: "Service credit — milestone delay",
    amount: 1_200,
    status: "Issued",
  },
  {
    id: "cn-4",
    number: "CN-8894",
    customerName: "David Wilson",
    customerCompany: "E-commerce Store",
    issueDate: "2026-01-04",
    invoiceRef: "INV-600217",
    reason: "Promotional goodwill",
    amount: 500,
    status: "Draft",
  },
];

function statusStyles(s: CreditNoteStatus) {
  switch (s) {
    case "Applied":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "Issued":
      return "bg-violet-100 text-violet-800 border-violet-200";
    case "Void":
      return "bg-red-100 text-red-800 border-red-200";
    case "Draft":
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

export default function CreditNotesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return creditNotesData.filter((row) => {
      const okSearch =
        !q ||
        row.number.toLowerCase().includes(q) ||
        row.customerName.toLowerCase().includes(q) ||
        row.customerCompany.toLowerCase().includes(q) ||
        row.invoiceRef.toLowerCase().includes(q) ||
        row.reason.toLowerCase().includes(q);
      const okStatus = statusFilter === "All" || row.status === statusFilter;
      return okSearch && okStatus;
    });
  }, [search, statusFilter]);

  const totalAmount = useMemo(
    () => filtered.reduce((s, r) => s + r.amount, 0),
    [filtered]
  );
  const openAmount = useMemo(
    () =>
      filtered
        .filter((r) => r.status === "Draft" || r.status === "Issued")
        .reduce((s, r) => s + r.amount, 0),
    [filtered]
  );

  return (
    <div className="min-h-screen">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Credit notes</h1>
          <p className="text-gray-600 mt-2">
            Reductions to customer balances, linked to invoices where applicable
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <DocumentArrowDownIcon className="w-5 h-5" />
          New credit note
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Notes (filtered)</p>
              <p className="text-2xl font-bold text-gray-900">{filtered.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-indigo-100">
              <DocumentArrowDownIcon className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total credit (filtered)</p>
              <p className="text-2xl font-bold text-gray-900">
                ${totalAmount.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-violet-100">
              <CurrencyDollarIcon className="w-6 h-6 text-violet-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unapplied / draft</p>
              <p className="text-2xl font-bold text-gray-900">
                ${openAmount.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-amber-100">
              <DocumentTextIcon className="w-6 h-6 text-amber-600" />
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
              placeholder="Search CN #, customer, invoice, reason…"
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
              <option value="Issued">Issued</option>
              <option value="Applied">Applied</option>
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
                  Credit note
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                      <DocumentArrowDownIcon className="w-5 h-5 text-gray-400" />
                      {row.number}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{row.customerName}</div>
                    <div className="text-sm text-gray-500">{row.customerCompany}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(row.issueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                    {row.invoiceRef}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate" title={row.reason}>
                    {row.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ${row.amount.toLocaleString()}
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
            No credit notes match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
