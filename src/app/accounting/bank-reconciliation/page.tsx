"use client";

import React, { useMemo, useState } from "react";
import {
  DocumentMagnifyingGlassIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

type StmtRow = {
  id: string;
  stmtDate: string;
  description: string;
  amount: number;
  matched: boolean;
};

const accounts = [
  { id: "ba-1", label: "Operating — checking · ···4402" },
  { id: "ba-2", label: "Payroll · ···8811" },
];

const stmtLines: StmtRow[] = [
  { id: "s1", stmtDate: "2026-01-08", description: "Deposit — Stripe", amount: 14_200, matched: true },
  { id: "s2", stmtDate: "2026-01-07", description: "ACH debit — rent", amount: -8_500, matched: true },
  { id: "s3", stmtDate: "2026-01-06", description: "Wire fee", amount: -25, matched: false },
  { id: "s4", stmtDate: "2026-01-05", description: "Check 4402", amount: -2_100, matched: false },
];

export default function BankReconciliationPage() {
  const [accountId, setAccountId] = useState(accounts[0].id);
  const statementBalance = 135_975;
  const bookBalance = 135_900;
  const difference = statementBalance - bookBalance;

  const unmatched = useMemo(() => stmtLines.filter((l) => !l.matched), []);

  return (
    <div className="min-h-screen">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bank reconciliation</h1>
          <p className="text-gray-600 mt-2">Match statement lines to the general ledger</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <DocumentMagnifyingGlassIcon className="w-5 h-5" />
          Finish reconciliation
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Account</label>
        <select
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          className="max-w-md w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {accounts.map((a) => (
            <option key={a.id} value={a.id}>
              {a.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Statement ending balance</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">${statementBalance.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Book balance</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">${bookBalance.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Difference</p>
          <div className="flex items-center gap-2 mt-1">
            <p className={`text-2xl font-bold ${difference === 0 ? "text-emerald-700" : "text-amber-700"}`}>
              {difference >= 0 ? "+" : ""}${difference.toLocaleString()}
            </p>
            {difference === 0 ? (
              <CheckCircleIcon className="w-7 h-7 text-emerald-600" />
            ) : (
              <ExclamationTriangleIcon className="w-7 h-7 text-amber-600" />
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Statement lines</h2>
          <span className="text-sm text-gray-500">{unmatched.length} unmatched</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {stmtLines.map((row) => (
                <tr key={row.id} className={row.matched ? "bg-white" : "bg-amber-50/50"}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(row.stmtDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.description}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold text-right ${row.amount >= 0 ? "text-emerald-700" : "text-red-700"}`}>
                    {row.amount >= 0 ? "+" : ""}${Math.abs(row.amount).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {row.matched ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-800">
                        <CheckCircleIcon className="w-4 h-4" /> Matched
                      </span>
                    ) : (
                      <button type="button" className="text-xs font-medium text-blue-600 hover:text-blue-800">
                        Find & match
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
