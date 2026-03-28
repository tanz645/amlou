"use client";

import React, { useMemo, useState } from "react";
import {
  CalculatorIcon,
  MagnifyingGlassIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

type Method = "FIFO" | "WAC";

type Row = {
  id: string;
  sku: string;
  name: string;
  warehouse: string;
  qtyOnHand: number;
  method: Method;
  unitValue: number;
  totalValue: number;
  asOf: string;
};

const data: Row[] = [
  { id: "iv-1", sku: "SKU-TSH-001", name: "Organic tee — black / M", warehouse: "Main DC", qtyOnHand: 420, method: "WAC", unitValue: 8.5, totalValue: 3_570, asOf: "2026-01-10" },
  { id: "iv-2", sku: "SKU-MUG-014", name: "Ceramic mug — matte white", warehouse: "Main DC", qtyOnHand: 1_200, method: "FIFO", unitValue: 3.2, totalValue: 3_840, asOf: "2026-01-10" },
  { id: "iv-3", sku: "SKU-BOX-002", name: "Shipper box — medium", warehouse: "Main DC", qtyOnHand: 800, method: "WAC", unitValue: 0.95, totalValue: 760, asOf: "2026-01-10" },
  { id: "iv-4", sku: "SKU-TSH-001", name: "Organic tee — black / M", warehouse: "Retail pop-up", qtyOnHand: 45, method: "WAC", unitValue: 8.5, totalValue: 382.5, asOf: "2026-01-10" },
];

const methods = ["All", "FIFO", "WAC"] as const;

function methodBadge(m: Method) {
  return m === "FIFO"
    ? "bg-indigo-100 text-indigo-800 border-indigo-200"
    : "bg-slate-100 text-slate-800 border-slate-200";
}

export default function InventoryValuationPage() {
  const [search, setSearch] = useState("");
  const [methodFilter, setMethodFilter] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((row) => {
      const ok =
        !q ||
        row.sku.toLowerCase().includes(q) ||
        row.name.toLowerCase().includes(q) ||
        row.warehouse.toLowerCase().includes(q);
      const okM = methodFilter === "All" || row.method === methodFilter;
      return ok && okM;
    });
  }, [search, methodFilter]);

  const grandTotal = useMemo(() => filtered.reduce((s, r) => s + r.totalValue, 0), [filtered]);

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Inventory valuation</h1>
        <p className="text-gray-600 mt-2">
          Carrying value by SKU using FIFO or weighted-average cost (WAC)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-600">Valuation lines (filtered)</p>
              <p className="text-2xl font-bold text-gray-900">{filtered.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-violet-100">
              <CalculatorIcon className="w-6 h-6 text-violet-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-600">Total value (filtered)</p>
              <p className="text-2xl font-bold text-gray-900">${grandTotal.toLocaleString()}</p>
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
              placeholder="Search SKU, product, warehouse…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="lg:w-36">
            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {methods.map((m) => (
                <option key={m} value={m}>
                  {m === "All" ? "All methods" : m}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">As of</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warehouse</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Unit value</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(row.asOf).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium">{row.sku}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.warehouse}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">{row.qtyOnHand.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${methodBadge(row.method)}`}>
                      {row.method}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">${row.unitValue.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-right">
                    ${row.totalValue.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">No valuation lines match your filters.</div>
        )}
      </div>
    </div>
  );
}
