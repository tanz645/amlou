"use client";

import React, { useMemo, useState } from "react";
import {
  MinusIcon,
  MagnifyingGlassIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

type Row = {
  id: string;
  date: string;
  description: string;
  payee: string;
  category: string;
  account: string;
  amount: number;
};

const data: Row[] = [
  {
    id: "exp-1",
    date: "2025-12-03",
    description: "Cloud hosting — November",
    payee: "CloudHost LLC",
    category: "Technology",
    account: "6100 · IT & hosting",
    amount: 4_200,
  },
  {
    id: "exp-2",
    date: "2025-12-10",
    description: "Office rent",
    payee: "City Properties LLC",
    category: "Facilities",
    account: "6200 · Rent",
    amount: 8_500,
  },
  {
    id: "exp-3",
    date: "2025-11-25",
    description: "Team offsite catering",
    payee: "Metro Catering",
    category: "Travel & events",
    account: "6400 · Travel & entertainment",
    amount: 1_240,
  },
  {
    id: "exp-4",
    date: "2026-01-06",
    description: "Design software renewal",
    payee: "Design Tools AB",
    category: "Technology",
    account: "6100 · IT & hosting",
    amount: 1_890,
  },
];

const categories = ["All", "Technology", "Facilities", "Travel & events"];

export default function ExpensesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((row) => {
      const ok =
        !q ||
        row.description.toLowerCase().includes(q) ||
        row.payee.toLowerCase().includes(q) ||
        row.account.toLowerCase().includes(q);
      const okC = category === "All" || row.category === category;
      return ok && okC;
    });
  }, [search, category]);

  const total = useMemo(() => filtered.reduce((s, r) => s + r.amount, 0), [filtered]);

  return (
    <div className="min-h-screen">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Expenses</h1>
          <p className="text-gray-600 mt-2">Operating costs and categorized spend</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <MinusIcon className="w-5 h-5" />
          Record expense
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-600">Entries (filtered)</p>
              <p className="text-2xl font-bold text-gray-900">{filtered.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-100">
              <ChartBarIcon className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-600">Total (filtered)</p>
              <p className="text-2xl font-bold text-gray-900">${total.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-red-100">
              <CurrencyDollarIcon className="w-6 h-6 text-red-600" />
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
              placeholder="Search description, payee, account…"
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(row.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{row.payee}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.account}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-700">
                    ${row.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">No expenses match your filters.</div>
        )}
      </div>
    </div>
  );
}
