"use client";

import React, { useMemo, useState } from "react";
import {
  CurrencyDollarIcon,
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  BanknotesIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import {
  hrEmployees,
  estimatedGrossPerPay,
  HOURS_PER_YEAR_FT,
} from "@/data/accounting-hr";

type RunStatus = "Draft" | "Approved" | "Paid" | "Processing";

type Row = {
  id: string;
  period: string;
  payDate: string;
  employeesPaid: number;
  grossPay: number;
  taxesWithheld: number;
  netPay: number;
  status: RunStatus;
};

const data: Row[] = [
  {
    id: "pr-1",
    period: "2025-12",
    payDate: "2025-12-15",
    employeesPaid: 48,
    grossPay: 284_500,
    taxesWithheld: 71_200,
    netPay: 213_300,
    status: "Paid",
  },
  {
    id: "pr-2",
    period: "2026-01",
    payDate: "2026-01-15",
    employeesPaid: 49,
    grossPay: 291_200,
    taxesWithheld: 72_800,
    netPay: 218_400,
    status: "Approved",
  },
  {
    id: "pr-3",
    period: "2025-11",
    payDate: "2025-11-15",
    employeesPaid: 47,
    grossPay: 278_900,
    taxesWithheld: 69_700,
    netPay: 209_200,
    status: "Paid",
  },
  {
    id: "pr-4",
    period: "2026-02",
    payDate: "2026-02-15",
    employeesPaid: 0,
    grossPay: 0,
    taxesWithheld: 0,
    netPay: 0,
    status: "Draft",
  },
];

function statusStyles(s: RunStatus) {
  switch (s) {
    case "Paid":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "Approved":
      return "bg-violet-100 text-violet-800 border-violet-200";
    case "Processing":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Draft":
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

export default function PayrollPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [compSearch, setCompSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((row) => {
      const ok = !q || row.period.toLowerCase().includes(q);
      const okS = statusFilter === "All" || row.status === statusFilter;
      return ok && okS;
    });
  }, [search, statusFilter]);

  const latestPaidNet = useMemo(() => {
    const paid = filtered.filter((r) => r.status === "Paid" && r.netPay > 0);
    if (!paid.length) return 0;
    const sorted = [...paid].sort(
      (a, b) => new Date(b.payDate).getTime() - new Date(a.payDate).getTime()
    );
    return sorted[0].netPay;
  }, [filtered]);

  const payrollEligible = useMemo(
    () => hrEmployees.filter((e) => e.status === "Active" || e.status === "On leave"),
    []
  );

  const annualCashComp = useMemo(
    () => payrollEligible.reduce((s, e) => s + e.annualCompensation, 0),
    [payrollEligible]
  );

  const biweeklyEquivalent = useMemo(
    () => payrollEligible.reduce((s, e) => s + estimatedGrossPerPay(e), 0),
    [payrollEligible]
  );

  const compFiltered = useMemo(() => {
    const q = compSearch.trim().toLowerCase();
    return payrollEligible.filter(
      (e) =>
        !q ||
        e.name.toLowerCase().includes(q) ||
        e.employeeId.toLowerCase().includes(q) ||
        e.department.toLowerCase().includes(q)
    );
  }, [payrollEligible, compSearch]);

  return (
    <div className="min-h-screen">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payroll</h1>
          <p className="text-gray-600 mt-2">
            Pay runs and salary register — linked to employee compensation
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <BanknotesIcon className="w-5 h-5" />
          Run payroll
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-600">Runs (filtered)</p>
              <p className="text-2xl font-bold text-gray-900">{filtered.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-indigo-100">
              <CalendarDaysIcon className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Latest paid net (filtered)</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">${latestPaidNet.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-600">Annual cash comp (HR roster)</p>
              <p className="text-2xl font-bold text-gray-900">${annualCashComp.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">Active + on leave</p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-600">Est. gross / cycle (sum)</p>
              <p className="text-2xl font-bold text-emerald-800">
                ${Math.round(biweeklyEquivalent).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">Each emp. ÷ pay periods (mixed freq.)</p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-100">
              <UserGroupIcon className="w-6 h-6 text-emerald-700" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Salary &amp; wages register</h2>
        <p className="text-sm text-gray-600 mb-4">
          Source: employee records. Hourly uses {HOURS_PER_YEAR_FT} hrs for full-time annual equivalent.
        </p>
        <div className="relative max-w-md mb-4">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="search"
            placeholder="Search register by name, ID, department…"
            value={compSearch}
            onChange={(e) => setCompSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Basis / frequency
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Annual
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Est. gross / pay
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {compFiltered.map((e) => (
                <tr key={e.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{e.name}</div>
                    <div className="text-xs font-mono text-gray-500">{e.employeeId}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{e.department}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    <span className="font-medium text-gray-800">{e.payBasis}</span>
                    <span className="text-gray-400 mx-1">·</span>
                    {e.payFrequency}
                    {e.payBasis === "Hourly" && e.hourlyRate != null && (
                      <span className="block text-xs text-gray-500">${e.hourlyRate.toFixed(2)}/hr</span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-right text-gray-900">
                    ${e.annualCompensation.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-right text-emerald-800">
                    ${Math.round(estimatedGrossPerPay(e)).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {compFiltered.length === 0 && (
          <p className="text-center py-8 text-gray-500 text-sm">No rows match your search.</p>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Pay runs</h2>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search pay period (e.g. 2026-01)…"
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
              <option value="Processing">Processing</option>
              <option value="Approved">Approved</option>
              <option value="Paid">Paid</option>
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
                  Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pay date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employees
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gross
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Taxes
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Net pay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-semibold text-gray-900">
                    {row.period}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {row.employeesPaid === 0 && row.status === "Draft"
                      ? "—"
                      : new Date(row.payDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                    {row.employeesPaid || "—"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    {row.grossPay ? `$${row.grossPay.toLocaleString()}` : "—"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">
                    {row.taxesWithheld ? `$${row.taxesWithheld.toLocaleString()}` : "—"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-right text-emerald-700">
                    {row.netPay ? `$${row.netPay.toLocaleString()}` : "—"}
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
          <div className="text-center py-12 text-gray-500 text-sm">No payroll runs match your filters.</div>
        )}
      </div>
    </div>
  );
}
