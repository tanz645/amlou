"use client";

import React, { useMemo, useState } from "react";
import {
  BriefcaseIcon,
  MagnifyingGlassIcon,
  TagIcon,
  CurrencyDollarIcon,
  FolderIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

type ClientRow = {
  id: string;
  name: string;
  company: string;
  email: string;
  totalProjects: number;
  totalRevenue: number;
  totalDues: number;
  tags: string[];
};

const clientsData: ClientRow[] = [
  {
    id: "c1",
    name: "Sarah Johnson",
    company: "TechStart Inc",
    email: "sarah@techstart.com",
    totalProjects: 4,
    totalRevenue: 128_500,
    totalDues: 12_400,
    tags: ["Retainer", "Enterprise", "SaaS"],
  },
  {
    id: "c2",
    name: "Mike Chen",
    company: "Digital Solutions",
    email: "mike@digitalsolutions.com",
    totalProjects: 2,
    totalRevenue: 67_200,
    totalDues: 0,
    tags: ["PPC", "SEO"],
  },
  {
    id: "c3",
    name: "Emily Rodriguez",
    company: "Creative Agency Co.",
    email: "emily@creativeagency.com",
    totalProjects: 6,
    totalRevenue: 201_000,
    totalDues: 24_750,
    tags: ["Creative", "Social", "Priority"],
  },
  {
    id: "c4",
    name: "David Wilson",
    company: "E-commerce Store",
    email: "david@ecommercestore.com",
    totalProjects: 3,
    totalRevenue: 94_300,
    totalDues: 3_200,
    tags: ["E-commerce", "Performance"],
  },
  {
    id: "c5",
    name: "Lisa Thompson",
    company: "Local Restaurant Group",
    email: "lisa@localrestaurant.com",
    totalProjects: 1,
    totalRevenue: 18_900,
    totalDues: 5_600,
    tags: ["Local", "SMB"],
  },
];

const allTags = Array.from(
  new Set(clientsData.flatMap((c) => c.tags))
).sort((a, b) => a.localeCompare(b));

export default function AccountingClientsPage() {
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return clientsData.filter((c) => {
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q);
      const matchesTag =
        tagFilter === "All" || c.tags.includes(tagFilter);
      return matchesSearch && matchesTag;
    });
  }, [search, tagFilter]);

  const totals = useMemo(() => {
    const revenue = filtered.reduce((s, c) => s + c.totalRevenue, 0);
    const dues = filtered.reduce((s, c) => s + c.totalDues, 0);
    return { revenue, dues };
  }, [filtered]);

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
            <p className="text-gray-600 mt-2">
              Revenue, outstanding balances, and project counts by client
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Clients (filtered)</p>
              <p className="text-2xl font-bold text-gray-900">{filtered.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <BriefcaseIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ${totals.revenue.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total dues</p>
              <p className="text-2xl font-bold text-gray-900">
                ${totals.dues.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-amber-100">
              <ExclamationTriangleIcon className="w-6 h-6 text-amber-600" />
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
              placeholder="Search name, company, or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="lg:w-56">
            <select
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All tags</option>
              {allTags.map((t) => (
                <option key={t} value={t}>
                  {t}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Projects
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dues
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tags
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <BriefcaseIcon className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{c.name}</div>
                        <div className="text-sm text-gray-500">{c.company}</div>
                        <div className="text-sm text-gray-500">{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-gray-900">
                      <FolderIcon className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{c.totalProjects}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ${c.totalRevenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={
                        c.totalDues > 0
                          ? "text-sm font-semibold text-amber-800"
                          : "text-sm font-medium text-green-700"
                      }
                    >
                      {c.totalDues > 0
                        ? `$${c.totalDues.toLocaleString()}`
                        : "Paid up"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5 max-w-md">
                      {c.tags.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200"
                        >
                          <TagIcon className="w-3 h-3" />
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">
            No clients match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
