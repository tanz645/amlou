"use client";

import React, { useMemo, useState } from "react";
import {
  DocumentArrowUpIcon,
  MagnifyingGlassIcon,
  CurrencyDollarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

type ClaimStatus = "Draft" | "Submitted" | "Approved" | "Paid" | "Rejected";

type Row = {
  id: string;
  number: string;
  submittedBy: string;
  department: string;
  submittedDate: string;
  category: string;
  description: string;
  amount: number;
  status: ClaimStatus;
};

const data: Row[] = [
  {
    id: "ec-1",
    number: "EXP-24091",
    submittedBy: "Alex Rivera",
    department: "Client Services",
    submittedDate: "2025-11-14",
    category: "Travel",
    description: "Client visit — flights & hotel",
    amount: 1_842,
    status: "Approved",
  },
  {
    id: "ec-2",
    number: "EXP-24092",
    submittedBy: "Jordan Lee",
    department: "Sales",
    submittedDate: "2025-11-22",
    category: "Meals",
    description: "Prospect dinner (policy within limit)",
    amount: 186,
    status: "Paid",
  },
  {
    id: "ec-3",
    number: "EXP-24093",
    submittedBy: "Sam Okonkwo",
    department: "Operations",
    submittedDate: "2025-12-02",
    category: "Software",
    description: "Annual Figma seat top-up",
    amount: 432,
    status: "Submitted",
  },
  {
    id: "ec-4",
    number: "EXP-24094",
    submittedBy: "Alex Rivera",
    department: "Client Services",
    submittedDate: "2026-01-08",
    category: "Equipment",
    description: "USB-C dock replacement",
    amount: 129,
    status: "Draft",
  },
  {
    id: "ec-5",
    number: "EXP-24095",
    submittedBy: "Priya Nair",
    department: "Marketing",
    submittedDate: "2025-10-30",
    category: "Travel",
    description: "Conference registration",
    amount: 899,
    status: "Rejected",
  },
];

const categories = ["All", "Travel", "Meals", "Software", "Equipment", "Other"];

function statusStyles(s: ClaimStatus) {
  switch (s) {
    case "Paid":
    case "Approved":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "Submitted":
      return "bg-violet-100 text-violet-800 border-violet-200";
    case "Rejected":
      return "bg-red-100 text-red-800 border-red-200";
    case "Draft":
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

export default function ExpenseClaimsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((row) => {
      const ok =
        !q ||
        row.number.toLowerCase().includes(q) ||
        row.submittedBy.toLowerCase().includes(q) ||
        row.description.toLowerCase().includes(q) ||
        row.department.toLowerCase().includes(q);
      const okS = statusFilter === "All" || row.status === statusFilter;
      const okC = categoryFilter === "All" || row.category === categoryFilter;
      return ok && okS && okC;
    });
  }, [search, statusFilter, categoryFilter]);

  const total = useMemo(() => filtered.reduce((s, r) => s + r.amount, 0), [filtered]);
  const awaiting = useMemo(
    () =>
      filtered
        .filter((r) => r.status === "Submitted" || r.status === "Draft")
        .reduce((s, r) => s + r.amount, 0),
    [filtered]
  );

  return (
    <div className="min-h-screen">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Expense claims</h1>
          <p className="text-gray-600 mt-2">
            Employee expenses awaiting approval or reimbursement
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <DocumentArrowUpIcon className="w-5 h-5" />
          New claim
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-600">Claims (filtered)</p>
              <p className="text-2xl font-bold text-gray-900">{filtered.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-indigo-100">
              <DocumentArrowUpIcon className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-600">Amount (filtered)</p>
              <p className="text-2xl font-bold text-gray-900">${total.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <CurrencyDollarIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-600">Draft + submitted</p>
              <p className="text-2xl font-bold text-gray-900">${awaiting.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-amber-100">
              <UserIcon className="w-6 h-6 text-amber-600" />
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
              placeholder="Search claim #, person, description…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="lg:w-44">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All categories" : c}
                </option>
              ))}
            </select>
          </div>
          <div className="lg:w-44">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All statuses</option>
              <option value="Draft">Draft</option>
              <option value="Submitted">Submitted</option>
              <option value="Approved">Approved</option>
              <option value="Paid">Paid</option>
              <option value="Rejected">Rejected</option>
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
                  Claim
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitter
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {row.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{row.submittedBy}</div>
                    <div className="text-sm text-gray-500">{row.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(row.submittedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {row.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate" title={row.description}>
                    {row.description}
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
            No expense claims match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
