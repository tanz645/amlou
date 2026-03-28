"use client";

import React, { useMemo, useState } from "react";
import {
  BuildingOfficeIcon,
  MagnifyingGlassIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

type AssetStatus = "Active" | "Fully depreciated" | "Disposed";

type Row = {
  id: string;
  assetId: string;
  name: string;
  category: string;
  location: string;
  acquired: string;
  cost: number;
  netBookValue: number;
  status: AssetStatus;
};

const data: Row[] = [
  { id: "fa-1", assetId: "FA-1001", name: "Office leasehold improvements", category: "Leasehold", location: "HQ — Floor 3", acquired: "2023-06-01", cost: 85_000, netBookValue: 52_300, status: "Active" },
  { id: "fa-2", assetId: "FA-1002", name: "Server rack & UPS", category: "IT equipment", location: "Data closet", acquired: "2024-03-15", cost: 18_400, netBookValue: 12_100, status: "Active" },
  { id: "fa-3", assetId: "FA-1003", name: "Company vehicle", category: "Transport", location: "Parking B", acquired: "2022-11-20", cost: 42_000, netBookValue: 0, status: "Fully depreciated" },
  { id: "fa-4", assetId: "FA-1004", name: "Conference A/V kit", category: "Equipment", location: "HQ — Room A", acquired: "2025-01-10", cost: 6_200, netBookValue: 5_420, status: "Active" },
];

const categories = ["All", "Leasehold", "IT equipment", "Transport", "Equipment"];

function statusStyles(s: AssetStatus) {
  switch (s) {
    case "Active":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "Fully depreciated":
      return "bg-slate-100 text-slate-800 border-slate-200";
    case "Disposed":
    default:
      return "bg-red-100 text-red-800 border-red-200";
  }
}

export default function FixedAssetsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((row) => {
      const ok =
        !q ||
        row.name.toLowerCase().includes(q) ||
        row.assetId.toLowerCase().includes(q) ||
        row.location.toLowerCase().includes(q);
      const okC = category === "All" || row.category === category;
      return ok && okC;
    });
  }, [search, category]);

  const totalNBV = useMemo(() => filtered.reduce((s, r) => s + r.netBookValue, 0), [filtered]);

  return (
    <div className="min-h-screen">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fixed assets</h1>
          <p className="text-gray-600 mt-2">Capitalized assets, cost, and net book value</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <BuildingOfficeIcon className="w-5 h-5" />
          Register asset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Assets (filtered)</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{filtered.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-600">Net book value (filtered)</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">${totalNBV.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <CurrencyDollarIcon className="w-6 h-6 text-blue-600" />
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
              placeholder="Search asset name, ID, location…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="lg:w-48">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All categories" : c}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acquired</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">NBV</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-gray-900">{row.assetId}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-[180px] truncate">{row.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(row.acquired).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">${row.cost.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-right">${row.netBookValue.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${statusStyles(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">No assets match your filters.</div>
        )}
      </div>
    </div>
  );
}
