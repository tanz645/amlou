"use client";

import React, { useMemo, useState } from "react";
import {
  ClockIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

type TimesheetStatus = "Submitted" | "Approved" | "Draft";

type Row = {
  id: string;
  employee: string;
  department: string;
  weekOf: string;
  clientProject: string;
  billableHours: number;
  nonBillableHours: number;
  status: TimesheetStatus;
};

const data: Row[] = [
  {
    id: "tt-1",
    employee: "Alex Rivera",
    department: "Client Services",
    weekOf: "2026-01-06",
    clientProject: "TechStart — Retainer",
    billableHours: 32,
    nonBillableHours: 8,
    status: "Approved",
  },
  {
    id: "tt-2",
    employee: "Sam Okonkwo",
    department: "Operations",
    weekOf: "2026-01-06",
    clientProject: "Internal — process",
    billableHours: 0,
    nonBillableHours: 40,
    status: "Submitted",
  },
  {
    id: "tt-3",
    employee: "Priya Nair",
    department: "Marketing",
    weekOf: "2025-12-30",
    clientProject: "Campaign builds",
    billableHours: 24,
    nonBillableHours: 12,
    status: "Approved",
  },
  {
    id: "tt-4",
    employee: "Chris Park",
    department: "Finance",
    weekOf: "2026-01-06",
    clientProject: "Internal — payroll close",
    billableHours: 0,
    nonBillableHours: 6,
    status: "Draft",
  },
];

function statusStyles(s: TimesheetStatus) {
  switch (s) {
    case "Approved":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "Submitted":
      return "bg-violet-100 text-violet-800 border-violet-200";
    case "Draft":
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

export default function TimeTrackingPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((row) => {
      const ok =
        !q ||
        row.employee.toLowerCase().includes(q) ||
        row.clientProject.toLowerCase().includes(q) ||
        row.department.toLowerCase().includes(q);
      const okS = statusFilter === "All" || row.status === statusFilter;
      return ok && okS;
    });
  }, [search, statusFilter]);

  const totalBillable = useMemo(
    () => filtered.reduce((s, r) => s + r.billableHours, 0),
    [filtered]
  );
  const totalHours = useMemo(
    () =>
      filtered.reduce((s, r) => s + r.billableHours + r.nonBillableHours, 0),
    [filtered]
  );

  return (
    <div className="min-h-screen">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Time tracking</h1>
          <p className="text-gray-600 mt-2">Weekly timesheets, billable vs non-billable hours</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ClockIcon className="w-5 h-5" />
          Log time
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-600">Timesheets (filtered)</p>
              <p className="text-2xl font-bold text-gray-900">{filtered.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-indigo-100">
              <ClockIcon className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Billable hours (filtered)</p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">{totalBillable} h</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Total hours (filtered)</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totalHours} h</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search employee, project, department…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="lg:w-40">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All statuses</option>
              <option value="Draft">Draft</option>
              <option value="Submitted">Submitted</option>
              <option value="Approved">Approved</option>
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
                  Week of
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project / work
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Billable
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Non-billable
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
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
                    {new Date(row.weekOf).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{row.employee}</div>
                    <div className="text-sm text-gray-500">{row.department}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 max-w-xs truncate">{row.clientProject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-emerald-700">
                    {row.billableHours} h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">
                    {row.nonBillableHours} h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-gray-900">
                    {row.billableHours + row.nonBillableHours} h
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
          <div className="text-center py-12 text-gray-500 text-sm">No timesheets match your filters.</div>
        )}
      </div>
    </div>
  );
}
