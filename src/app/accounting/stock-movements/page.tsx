"use client";

import React, { useMemo, useState } from "react";
import {
  TruckIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

type MoveType = "Receipt" | "Issue" | "Transfer" | "Adjustment";

type Row = {
  id: string;
  date: string;
  type: MoveType;
  sku: string;
  productName: string;
  qty: number;
  warehouse: string;
  reference: string;
};

const data: Row[] = [
  { id: "sm-1", date: "2026-01-10", type: "Receipt", sku: "SKU-MUG-014", productName: "Ceramic mug — matte white", qty: 500, warehouse: "Main DC", reference: "PO-88302" },
  { id: "sm-2", date: "2026-01-09", type: "Issue", sku: "SKU-TSH-001", productName: "Organic tee — black / M", qty: -120, warehouse: "Main DC", reference: "SO-240891" },
  { id: "sm-3", date: "2026-01-08", type: "Transfer", sku: "SKU-TSH-001", productName: "Organic tee — black / M", qty: -30, warehouse: "Main DC → Retail pop-up", reference: "TRF-1022" },
  { id: "sm-4", date: "2026-01-07", type: "Adjustment", sku: "SKU-BOX-002", productName: "Shipper box — medium", qty: -12, warehouse: "Main DC", reference: "ADJ-CYCLE-COUNT" },
  { id: "sm-5", date: "2026-01-05", type: "Receipt", sku: "SKU-BOX-002", productName: "Shipper box — medium", qty: 2_000, warehouse: "Main DC", reference: "PO-88303" },
];

function typeStyles(t: MoveType) {
  switch (t) {
    case "Receipt":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "Issue":
      return "bg-red-100 text-red-800 border-red-200";
    case "Transfer":
      return "bg-violet-100 text-violet-800 border-violet-200";
    case "Adjustment":
    default:
      return "bg-amber-100 text-amber-800 border-amber-200";
  }
}

export default function StockMovementsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((row) => {
      const ok =
        !q ||
        row.sku.toLowerCase().includes(q) ||
        row.productName.toLowerCase().includes(q) ||
        row.reference.toLowerCase().includes(q) ||
        row.warehouse.toLowerCase().includes(q);
      const okT = typeFilter === "All" || row.type === typeFilter;
      return ok && okT;
    });
  }, [search, typeFilter]);

  const netQty = useMemo(() => filtered.reduce((s, r) => s + r.qty, 0), [filtered]);

  return (
    <div className="min-h-screen">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Stock movements</h1>
          <p className="text-gray-600 mt-2">Receipts, issues, transfers, and adjustments</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <TruckIcon className="w-5 h-5" />
          Record movement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Movements (filtered)</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{filtered.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Net quantity change</p>
          <p className={`text-2xl font-bold mt-1 ${netQty >= 0 ? "text-emerald-700" : "text-red-700"}`}>
            {netQty >= 0 ? "+" : ""}{netQty.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search SKU, product, reference, warehouse…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="lg:w-44">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All types</option>
              <option value="Receipt">Receipt</option>
              <option value="Issue">Issue</option>
              <option value="Transfer">Transfer</option>
              <option value="Adjustment">Adjustment</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warehouse</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(row.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${typeStyles(row.type)}`}>
                      {row.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-800">{row.sku}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.productName}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold text-right ${row.qty >= 0 ? "text-emerald-700" : "text-red-700"}`}>
                    {row.qty >= 0 ? "+" : ""}{row.qty.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-[200px] truncate">{row.warehouse}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">{row.reference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">No stock movements match your filters.</div>
        )}
      </div>
    </div>
  );
}
