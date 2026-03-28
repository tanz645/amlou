"use client";

import React, { useMemo, useState } from "react";
import {
  UserIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  EnvelopeIcon,
  PhoneIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import {
  hrEmployees,
  estimatedGrossPerPay,
  type EmploymentStatus,
  type HREmployee,
} from "@/data/accounting-hr";

const departments = ["All", "Client Services", "Sales", "Operations", "Marketing", "Finance"];

function statusStyles(s: EmploymentStatus) {
  switch (s) {
    case "Active":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "On leave":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "Terminated":
    default:
      return "bg-gray-200 text-gray-700 border-gray-300";
  }
}

function payBasisBadge(emp: HREmployee) {
  return emp.payBasis === "Salary"
    ? "bg-slate-100 text-slate-800 border-slate-200"
    : "bg-blue-100 text-blue-800 border-blue-200";
}

export default function EmployeesPage() {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return hrEmployees.filter((row) => {
      const ok =
        !q ||
        row.name.toLowerCase().includes(q) ||
        row.employeeId.toLowerCase().includes(q) ||
        row.email.toLowerCase().includes(q) ||
        row.jobTitle.toLowerCase().includes(q);
      const okD = dept === "All" || row.department === dept;
      const okS = statusFilter === "All" || row.status === statusFilter;
      return ok && okD && okS;
    });
  }, [search, dept, statusFilter]);

  const activeCount = useMemo(
    () => filtered.filter((r) => r.status === "Active").length,
    [filtered]
  );

  const eligible = useMemo(
    () => filtered.filter((r) => r.status !== "Terminated"),
    [filtered]
  );

  const totalAnnualSalaries = useMemo(
    () =>
      eligible.reduce((s, r) => s + (r.annualSalary ?? 0), 0),
    [eligible]
  );

  const hourlyCount = useMemo(
    () => eligible.filter((r) => r.payBasis === "Hourly").length,
    [eligible]
  );

  return (
    <div className="min-h-screen">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employee records</h1>
          <p className="text-gray-600 mt-2">
            Authoritative salary and wage rates for payroll. Variable pay (bonuses, commissions) is
            applied when you run payroll, not stored here.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <UserIcon className="w-5 h-5" />
          Add employee
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-600">People (filtered)</p>
              <p className="text-2xl font-bold text-gray-900">{filtered.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <UserGroupIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Active (filtered)</p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">{activeCount}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-600">Total annual salaries</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ${totalAnnualSalaries.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Salaried only (excl. terminated){hourlyCount ? ` · ${hourlyCount} hourly` : ""}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Departments in view</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {new Set(filtered.map((r) => r.department)).size}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search name, ID, email, title…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="lg:w-48">
            <select
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d === "All" ? "All departments" : d}
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
              <option value="Active">Active</option>
              <option value="On leave">On leave</option>
              <option value="Terminated">Terminated</option>
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
                  Department / Title
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Annual salary
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hourly wage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Schedule
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Base gross / pay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Manager
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start
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
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{row.name}</div>
                        <div className="text-xs font-mono text-gray-500">{row.employeeId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{row.department}</div>
                    <div className="text-sm text-gray-500">{row.jobTitle}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-right text-gray-900">
                    {row.annualSalary != null ? (
                      `$${row.annualSalary.toLocaleString()}`
                    ) : (
                      <span className="text-gray-400 font-normal">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    {row.hourlyRate != null ? (
                      <span className="font-medium text-gray-900">${row.hourlyRate.toFixed(2)}</span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full border ${payBasisBadge(
                        row
                      )}`}
                    >
                      {row.payBasis}
                    </span>
                    <div className="text-xs text-gray-600 mt-1">{row.payFrequency}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-emerald-800">
                    ${Math.round(estimatedGrossPerPay(row)).toLocaleString()}
                    <span className="block text-[11px] font-normal text-gray-500">excl. bonus</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <EnvelopeIcon className="w-4 h-4 shrink-0 text-gray-400" />
                      <span className="truncate max-w-[160px]">{row.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-0.5">
                      <PhoneIcon className="w-4 h-4 shrink-0 text-gray-400" />
                      {row.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{row.manager}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(row.startDate).toLocaleDateString()}
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
            No employees match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
