"use client";

import React, { useMemo, useState } from "react";
import {
  MagnifyingGlassIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";

type TxKind = "Income" | "Expense" | "Transfer";

type Row = {
  id: string;
  date: string;
  kind: TxKind;
  description: string;
  account: string;
  counterparty: string;
  amount: number;
};

const data: Row[] = [
  { id: "t1", date: "2026-01-10", kind: "Income", description: "Client payment — INV-600214", account: "1010 · Operating", counterparty: "TechStart Inc", amount: 2_500 },
  { id: "t2", date: "2026-01-09", kind: "Expense", description: "Bill payment — BILL-V-10404", account: "1010 · Operating", counterparty: "Office Supplies Plus", amount: -612 },
  { id: "t3", date: "2026-01-08", kind: "Transfer", description: "Sweep to payroll account", account: "1010 · Operating → 1020 · Payroll", counterparty: "Internal", amount: -25_000 },
  { id: "t4", date: "2026-01-07", kind: "Income", description: "Stripe payout", account: "1010 · Operating", counterparty: "Stripe", amount: 14_200 },
  { id: "t5", date: "2026-01-05", kind: "Expense", description: "Rent debit", account: "1010 · Operating", counterparty: "City Properties LLC", amount: -8_500 },
];

function kindIcon(kind: TxKind) {
  switch (kind) {
    case "Income":
      return <ArrowTrendingUpIcon className="w-4 h-4 text-emerald-600" />;
    case "Expense":
      return <ArrowTrendingDownIcon className="w-4 h-4 text-red-600" />;
    case "Transfer":
    default:
      return <ArrowsRightLeftIcon className="w-4 h-4 text-violet-600" />;
  }
}

function kindBadge(kind: TxKind) {
  switch (kind) {
    case "Income":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "Expense":
      return "bg-red-100 text-red-800 border-red-200";
    case "Transfer":
    default:
      return "bg-violet-100 text-violet-800 border-violet-200";
  }
}

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [kind, setKind] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((row) => {
      const ok =
        !q ||
        row.description.toLowerCase().includes(q) ||
        row.account.toLowerCase().includes(q) ||
        row.counterparty.toLowerCase().includes(q);
      const okK = kind === "All" || row.kind === kind;
      return ok && okK;
    });
  }, [search, kind]);

  const net = useMemo(() => filtered.reduce((s, r) => s + r.amount, 0), [filtered]);

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
        <p className="text-gray-600 mt-2">Cash and bank activity across accounts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Lines (filtered)</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{filtered.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Net movement (filtered)</p>
          <p className={`text-2xl font-bold mt-1 ${net >= 0 ? "text-emerald-700" : "text-red-700"}`}>
            {net >= 0 ? "+" : ""}${net.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search description, account, counterparty…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="lg:w-44">
            <select
              value={kind}
              onChange={(e) => setKind(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All types</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
              <option value="Transfer">Transfer</option>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Counterparty</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(row.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-full border ${kindBadge(row.kind)}`}>
                      {kindIcon(row.kind)}
                      {row.kind}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.account}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.counterparty}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold text-right ${row.amount >= 0 ? "text-emerald-700" : "text-red-700"}`}>
                    {row.amount >= 0 ? "+" : ""}${Math.abs(row.amount).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">No transactions match your filters.</div>
        )}
      </div>
    </div>
  );
}
