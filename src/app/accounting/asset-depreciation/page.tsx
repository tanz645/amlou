"use client";

import React, { useMemo, useState } from "react";
import {
  CalculatorIcon,
  MagnifyingGlassIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

type Row = {
  id: string;
  assetId: string;
  assetName: string;
  period: string;
  method: string;
  openingNBV: number;
  depreciation: number;
  closingNBV: number;
};

const data: Row[] = [
  { id: "d1", assetId: "FA-1001", assetName: "Office leasehold improvements", period: "2025-12", method: "Straight-line", openingNBV: 53_900, depreciation: 1_600, closingNBV: 52_300 },
  { id: "d2", assetId: "FA-1002", assetName: "Server rack & UPS", period: "2025-12", method: "Straight-line", openingNBV: 12_600, depreciation: 500, closingNBV: 12_100 },
  { id: "d3", assetId: "FA-1004", assetName: "Conference A/V kit", period: "2025-12", method: "Straight-line", openingNBV: 5_500, depreciation: 80, closingNBV: 5_420 },
  { id: "d4", assetId: "FA-1001", assetName: "Office leasehold improvements", period: "2025-11", method: "Straight-line", openingNBV: 55_500, depreciation: 1_600, closingNBV: 53_900 },
];

const periods = ["All", "2025-12", "2025-11"];

export default function AssetDepreciationPage() {
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((row) => {
      const ok =
        !q ||
        row.assetId.toLowerCase().includes(q) ||
        row.assetName.toLowerCase().includes(q);
      const okP = period === "All" || row.period === period;
      return ok && okP;
    });
  }, [search, period]);

  const periodDepreciation = useMemo(
    () => filtered.reduce((s, r) => s + r.depreciation, 0),
    [filtered]
  );

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Asset depreciation</h1>
        <p className="text-gray-600 mt-2">Periodic depreciation runs by fixed asset</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-600">Lines (filtered)</p>
              <p className="text-2xl font-bold text-gray-900">{filtered.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-violet-100">
              <CalendarDaysIcon className="w-6 h-6 text-violet-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-600">Depreciation (filtered)</p>
              <p className="text-2xl font-bold text-gray-900">${periodDepreciation.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <CalculatorIcon className="w-6 h-6 text-blue-600" />
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
              placeholder="Search asset ID or name…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="lg:w-36">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {periods.map((p) => (
                <option key={p} value={p}>
                  {p === "All" ? "All periods" : p}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Opening NBV</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Depreciation</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Closing NBV</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-800">{row.period}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{row.assetName}</div>
                    <div className="text-xs text-gray-500">{row.assetId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.method}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">${row.openingNBV.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-right text-red-700">
                    ${row.depreciation.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-right">${row.closingNBV.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">No depreciation lines match your filters.</div>
        )}
      </div>
    </div>
  );
}
