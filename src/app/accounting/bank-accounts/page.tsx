"use client";

import React, { useMemo, useState } from "react";
import {
  CreditCardIcon,
  MagnifyingGlassIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

type Row = {
  id: string;
  name: string;
  institution: string;
  type: string;
  currency: string;
  lastFour: string;
  balance: number;
  lastReconciled: string;
};

const data: Row[] = [
  { id: "ba-1", name: "Operating — checking", institution: "First National Bank", type: "Checking", currency: "USD", lastFour: "4402", balance: 128_400, lastReconciled: "2025-12-31" },
  { id: "ba-2", name: "Payroll", institution: "First National Bank", type: "Checking", currency: "USD", lastFour: "8811", balance: 42_100, lastReconciled: "2025-12-31" },
  { id: "ba-3", name: "Savings — reserve", institution: "First National Bank", type: "Savings", currency: "USD", lastFour: "2209", balance: 250_000, lastReconciled: "2025-11-30" },
  { id: "ba-4", name: "Corporate card", institution: "Summit Card Services", type: "Credit card", currency: "USD", lastFour: "9917", balance: -3_240, lastReconciled: "2026-01-05" },
];

export default function BankAccountsPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.institution.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q)
    );
  }, [search]);

  const totalAssets = useMemo(
    () => filtered.filter((r) => r.balance > 0).reduce((s, r) => s + r.balance, 0),
    [filtered]
  );
  const totalLiabilities = useMemo(
    () => filtered.filter((r) => r.balance < 0).reduce((s, r) => s + Math.abs(r.balance), 0),
    [filtered]
  );

  return (
    <div className="min-h-screen">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bank accounts</h1>
          <p className="text-gray-600 mt-2">Balances and last reconciliation by account</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <CreditCardIcon className="w-5 h-5" />
          Add account
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Accounts (filtered)</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{filtered.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Positive balances</p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">${totalAssets.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Card / credit balances</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">${totalLiabilities.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="relative max-w-md">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="search"
            placeholder="Search account or institution…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institution</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last reconciled</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-blue-50">
                        <BuildingLibraryIcon className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{row.institution}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">···{row.lastFour}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold text-right ${row.balance < 0 ? "text-red-700" : "text-gray-900"}`}>
                    {row.currency} {row.balance < 0 ? "-" : ""}${Math.abs(row.balance).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(row.lastReconciled).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">No accounts match your search.</div>
        )}
      </div>
    </div>
  );
}
