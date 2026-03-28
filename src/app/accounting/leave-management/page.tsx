"use client";

import React, { useMemo, useState } from "react";
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

type LeaveType = "PTO" | "Sick" | "Parental" | "Unpaid";

type Row = {
  id: string;
  employee: string;
  department: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  status: "Requested" | "Approved" | "Denied" | "Cancelled";
};

const data: Row[] = [
  {
    id: "lv-1",
    employee: "Priya Nair",
    department: "Marketing",
    type: "PTO",
    startDate: "2026-01-20",
    endDate: "2026-01-24",
    days: 5,
    status: "Approved",
  },
  {
    id: "lv-2",
    employee: "Alex Rivera",
    department: "Client Services",
    type: "Sick",
    startDate: "2026-01-09",
    endDate: "2026-01-10",
    days: 2,
    status: "Approved",
  },
  {
    id: "lv-3",
    employee: "Chris Park",
    department: "Finance",
    type: "PTO",
    startDate: "2026-02-03",
    endDate: "2026-02-07",
    days: 5,
    status: "Requested",
  },
  {
    id: "lv-4",
    employee: "Jordan Lee",
    department: "Sales",
    type: "Parental",
    startDate: "2026-03-01",
    endDate: "2026-04-11",
    days: 30,
    status: "Approved",
  },
];

const types: (LeaveType | "All")[] = ["All", "PTO", "Sick", "Parental", "Unpaid"];

function typeBadge(t: LeaveType) {
  switch (t) {
    case "PTO":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Sick":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "Parental":
      return "bg-violet-100 text-violet-800 border-violet-200";
    case "Unpaid":
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

function statusStyles(s: Row["status"]) {
  switch (s) {
    case "Approved":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "Requested":
      return "bg-violet-100 text-violet-800 border-violet-200";
    case "Denied":
      return "bg-red-100 text-red-800 border-red-200";
    case "Cancelled":
    default:
      return "bg-gray-200 text-gray-700 border-gray-300";
  }
}

export default function LeaveManagementPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((row) => {
      const ok =
        !q ||
        row.employee.toLowerCase().includes(q) ||
        row.department.toLowerCase().includes(q);
      const okT = typeFilter === "All" || row.type === typeFilter;
      const okS = statusFilter === "All" || row.status === statusFilter;
      return ok && okT && okS;
    });
  }, [search, typeFilter, statusFilter]);

  const pendingDays = useMemo(
    () =>
      filtered.filter((r) => r.status === "Requested").reduce((s, r) => s + r.days, 0),
    [filtered]
  );

  return (
    <div className="min-h-screen">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leave management</h1>
          <p className="text-gray-600 mt-2">Requests, approvals, and time off balances (summary)</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <CalendarDaysIcon className="w-5 h-5" />
          Request leave
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-600">Requests (filtered)</p>
              <p className="text-2xl font-bold text-gray-900">{filtered.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-indigo-100">
              <CalendarDaysIcon className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Days pending approval</p>
          <p className="text-2xl font-bold text-amber-700 mt-1">{pendingDays}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Total days (filtered)</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {filtered.reduce((s, r) => s + r.days, 0)}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search employee or department…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="lg:w-36">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {types.map((t) => (
                <option key={t} value={t}>
                  {t === "All" ? "All types" : t}
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
              <option value="Requested">Requested</option>
              <option value="Approved">Approved</option>
              <option value="Denied">Denied</option>
              <option value="Cancelled">Cancelled</option>
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
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  From
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  To
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Days
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
                    <div className="text-sm font-medium text-gray-900">{row.employee}</div>
                    <div className="text-sm text-gray-500">{row.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${typeBadge(
                        row.type
                      )}`}
                    >
                      {row.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(row.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(row.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                    {row.days}
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
          <div className="text-center py-12 text-gray-500 text-sm">No leave requests match your filters.</div>
        )}
      </div>
    </div>
  );
}
