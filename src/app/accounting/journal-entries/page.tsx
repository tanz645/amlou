"use client";

import React, { useMemo, useState } from "react";
import {
  DocumentTextIcon,
  MagnifyingGlassIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";

type JEStatus = "Draft" | "Posted" | "Reversed";

type Row = {
  id: string;
  number: string;
  date: string;
  memo: string;
  reference: string;
  debitTotal: number;
  creditTotal: number;
  status: JEStatus;
};

const data: Row[] = [
  {
    id: "je-1",
    number: "JE-2025-1208",
    date: "2025-12-08",
    memo: "Period-end accruals",
    reference: "ACCR-DEC",
    debitTotal: 12_400,
    creditTotal: 12_400,
    status: "Posted",
  },
  {
    id: "je-2",
    number: "JE-2025-1215",
    date: "2025-12-15",
    memo: "Reclass hosting costs",
    reference: "RC-8821",
    debitTotal: 1_200,
    creditTotal: 1_200,
    status: "Posted",
  },
  {
    id: "je-3",
    number: "JE-2026-0004",
    date: "2026-01-04",
    memo: "Opening balance adjustment",
    reference: "OBA-Q1",
    debitTotal: 500,
    creditTotal: 500,
    status: "Draft",
  },
  {
    id: "je-4",
    number: "JE-2025-1102",
    date: "2025-11-02",
    memo: "Reverse duplicate expense",
    reference: "REV-991",
    debitTotal: 612,
    creditTotal: 612,
    status: "Reversed",
  },
];

function statusStyles(s: JEStatus) {
  switch (s) {
    case "Posted":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "Reversed":
      return "bg-gray-200 text-gray-700 border-gray-300";
    case "Draft":
    default:
      return "bg-amber-100 text-amber-800 border-amber-200";
  }
}

export default function JournalEntriesPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((row) => {
      const ok =
        !q ||
        row.number.toLowerCase().includes(q) ||
        row.memo.toLowerCase().includes(q) ||
        row.reference.toLowerCase().includes(q);
      const okS = status === "All" || row.status === status;
      return ok && okS;
    });
  }, [search, status]);

  return (
    <div className="min-h-screen">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Journal entries</h1>
          <p className="text-gray-600 mt-2">Manual and adjusting entries (debits must equal credits)</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <DocumentTextIcon className="w-5 h-5" />
          New journal entry
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-600">Entries (filtered)</p>
              <p className="text-2xl font-bold text-gray-900">{filtered.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-indigo-100">
              <ScaleIcon className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">All filtered entries balance</p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">Debits = Credits</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search JE #, memo, reference…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="lg:w-40">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All statuses</option>
              <option value="Draft">Draft</option>
              <option value="Posted">Posted</option>
              <option value="Reversed">Reversed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entry</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Memo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Debits</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{row.number}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(row.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{row.memo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">{row.reference}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                    ${row.debitTotal.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                    ${row.creditTotal.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${statusStyles(row.status)}`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">No journal entries match your filters.</div>
        )}
      </div>
    </div>
  );
}
