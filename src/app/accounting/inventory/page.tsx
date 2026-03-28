"use client";

import React, { useMemo, useState } from "react";
import {
  ArchiveBoxIcon,
  MagnifyingGlassIcon,
  CurrencyDollarIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";

type Row = {
  id: string;
  sku: string;
  name: string;
  warehouse: string;
  uom: string;
  qtyOnHand: number;
  unitCost: number;
  value: number;
  reorderPoint: number;
};

const data: Row[] = [
  { id: "inv-1", sku: "SKU-TSH-001", name: "Organic tee — black / M", warehouse: "Main DC", uom: "ea", qtyOnHand: 420, unitCost: 8.5, value: 3_570, reorderPoint: 200 },
  { id: "inv-2", sku: "SKU-MUG-014", name: "Ceramic mug — matte white", warehouse: "Main DC", uom: "ea", qtyOnHand: 1_200, unitCost: 3.2, value: 3_840, reorderPoint: 500 },
  { id: "inv-3", sku: "SKU-BOX-002", name: "Shipper box — medium", warehouse: "Main DC", uom: "ea", qtyOnHand: 800, unitCost: 0.95, value: 760, reorderPoint: 400 },
  { id: "inv-4", sku: "SKU-TSH-001", name: "Organic tee — black / M", warehouse: "Retail pop-up", uom: "ea", qtyOnHand: 45, unitCost: 8.5, value: 382.5, reorderPoint: 30 },
];

const warehouses = ["All", "Main DC", "Retail pop-up"];

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [warehouse, setWarehouse] = useState("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((row) => {
      const ok =
        !q ||
        row.sku.toLowerCase().includes(q) ||
        row.name.toLowerCase().includes(q);
      const okW = warehouse === "All" || row.warehouse === warehouse;
      return ok && okW;
    });
  }, [search, warehouse]);

  const totalValue = useMemo(() => filtered.reduce((s, r) => s + r.value, 0), [filtered]);
  const totalUnits = useMemo(() => filtered.reduce((s, r) => s + r.qtyOnHand, 0), [filtered]);

  return (
    <div className="min-h-screen">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory</h1>
          <p className="text-gray-600 mt-2">On-hand quantities and carrying value by SKU</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArchiveBoxIcon className="w-5 h-5" />
          Adjust stock
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-600">SKUs (filtered)</p>
              <p className="text-2xl font-bold text-gray-900">{filtered.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-indigo-100">
              <CubeIcon className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Units on hand</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totalUnits.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-600">Inventory value</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">${totalValue.toLocaleString()}</p>
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
              placeholder="Search SKU or product…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="lg:w-44">
            <select
              value={warehouse}
              onChange={(e) => setWarehouse(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {warehouses.map((w) => (
                <option key={w} value={w}>
                  {w === "All" ? "All warehouses" : w}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warehouse</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UoM</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Unit cost</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Reorder</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-gray-900">{row.sku}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.warehouse}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                    {row.qtyOnHand.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.uom}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">${row.unitCost.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-right">${row.value.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">{row.reorderPoint}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">No inventory rows match your filters.</div>
        )}
      </div>
    </div>
  );
}
