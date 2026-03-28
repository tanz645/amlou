"use client";

import React, { useMemo, useState } from "react";
import {
  ShieldCheckIcon,
  MagnifyingGlassIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

type Row = {
  id: string;
  planName: string;
  carrier: string;
  type: "Medical" | "Dental" | "Vision" | "401(k)" | "Life";
  employerCostPerEmployee: number;
  enrolledEmployees: number;
  effectiveYear: number;
};

const data: Row[] = [
  {
    id: "ben-1",
    planName: "PPO Select",
    carrier: "Summit Health",
    type: "Medical",
    employerCostPerEmployee: 428,
    enrolledEmployees: 44,
    effectiveYear: 2026,
  },
  {
    id: "ben-2",
    planName: "Dental Plus",
    carrier: "BrightSmile",
    type: "Dental",
    employerCostPerEmployee: 38,
    enrolledEmployees: 41,
    effectiveYear: 2026,
  },
  {
    id: "ben-3",
    planName: "Vision Basic",
    carrier: "BrightSmile",
    type: "Vision",
    employerCostPerEmployee: 9,
    enrolledEmployees: 28,
    effectiveYear: 2026,
  },
  {
    id: "ben-4",
    planName: "401(k) match — 4%",
    carrier: "RetireWell",
    type: "401(k)",
    employerCostPerEmployee: 0,
    enrolledEmployees: 36,
    effectiveYear: 2026,
  },
  {
    id: "ben-5",
    planName: "Group term life",
    carrier: "Guardian Life",
    type: "Life",
    employerCostPerEmployee: 14,
    enrolledEmployees: 48,
    effectiveYear: 2026,
  },
];

const types = ["All", "Medical", "Dental", "Vision", "401(k)", "Life"] as const;

function typeBadge(t: Row["type"]) {
  switch (t) {
    case "Medical":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Dental":
    case "Vision":
      return "bg-cyan-100 text-cyan-800 border-cyan-200";
    case "401(k)":
      return "bg-violet-100 text-violet-800 border-violet-200";
    case "Life":
    default:
      return "bg-slate-100 text-slate-800 border-slate-200";
  }
}

export default function BenefitsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((row) => {
      const ok =
        !q ||
        row.planName.toLowerCase().includes(q) ||
        row.carrier.toLowerCase().includes(q);
      const okT = typeFilter === "All" || row.type === typeFilter;
      return ok && okT;
    });
  }, [search, typeFilter]);

  const monthlyEmployerEst = useMemo(
    () =>
      filtered.reduce(
        (s, r) => s + r.employerCostPerEmployee * r.enrolledEmployees,
        0
      ),
    [filtered]
  );

  return (
    <div className="min-h-screen">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Benefits</h1>
          <p className="text-gray-600 mt-2">
            Plans, carriers, enrollment, and indicative employer cost
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ShieldCheckIcon className="w-5 h-5" />
          Manage plans
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-600">Plans (filtered)</p>
              <p className="text-2xl font-bold text-gray-900">{filtered.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-indigo-100">
              <ShieldCheckIcon className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-600">Enrolled (sum)</p>
              <p className="text-2xl font-bold text-gray-900">
                {filtered.reduce((s, r) => s + r.enrolledEmployees, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-violet-100">
              <UserGroupIcon className="w-6 h-6 text-violet-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-600">Est. employer / month</p>
              <p className="text-2xl font-bold text-gray-900">${monthlyEmployerEst.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">Fixed $ lines × enrollment (mock)</p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
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
              placeholder="Search plan or carrier…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="lg:w-40">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {types.map((t) => (
                <option key={t} value={t}>
                  {t === "All" ? "All benefit types" : t}
                </option>
              ))}
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
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Carrier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Year
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enrolled
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employer / emp / mo
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{row.planName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${typeBadge(
                        row.type
                      )}`}
                    >
                      {row.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{row.carrier}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.effectiveYear}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                    {row.enrolledEmployees}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-800">
                    {row.type === "401(k)"
                      ? "Match %"
                      : `$${row.employerCostPerEmployee.toLocaleString()}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">No benefit plans match your filters.</div>
        )}
      </div>
    </div>
  );
}
