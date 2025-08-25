"use client";

import React from "react";

// --- Mock Data ---
const salesOverview = {
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  salesOrders: [7000, 6500, 7200, 8000, 8500, 9000],
  invoices: [6800, 6400, 7000, 7900, 8300, 8800],
  payments: [6000, 5900, 6500, 7000, 7500, 8000],
  creditNotes: [200, 150, 180, 220, 210, 190],
  salesReturns: [300, 250, 320, 280, 350, 300],
  revenue: [6300, 6100, 6700, 7500, 7900, 8500],
  kpis: [
    { label: "Sales Orders", value: 9000, change: 6.2, positive: true },
    { label: "Invoices", value: 8800, change: 5.8, positive: true },
    { label: "Payments", value: 8000, change: 7.1, positive: true },
    { label: "Credit Notes", value: 190, change: -2.1, positive: false },
    { label: "Sales Returns", value: 300, change: 3.5, positive: false },
    { label: "Revenue", value: 8500, change: 8.4, positive: true },
  ],
};

// --- Chart Components ---
const MultiLineSalesGraph = ({ data }: { data: typeof salesOverview }) => {
  const width = 520, height = 180, pad = 32;
  const max = Math.max(
    ...data.salesOrders,
    ...data.invoices,
    ...data.payments,
    ...data.creditNotes,
    ...data.salesReturns,
    ...data.revenue,
    10000
  );
  const min = 0;
  const getPoints = (arr: number[]) =>
    arr.map((v, i) => `${pad + (i / (arr.length - 1)) * (width - 2 * pad)},${height - pad - ((v - min) / (max - min)) * (height - 2 * pad)}`).join(" ");
  const series = [
    { key: "salesOrders", label: "Sales Orders", color: "#0ea5e9" },
    { key: "invoices", label: "Invoices", color: "#6366f1" },
    { key: "payments", label: "Payments", color: "#22c55e" },
    { key: "creditNotes", label: "Credit Notes", color: "#f59e42" },
    { key: "salesReturns", label: "Sales Returns", color: "#f43f5e" },
    { key: "revenue", label: "Revenue", color: "#0e7490" },
  ];
  return (
    <div>
      <svg width={width} height={height} className="w-full h-44">
        {/* Grid */}
        {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
          <line key={i} x1={pad} x2={width - pad} y1={pad + p * (height - 2 * pad)} y2={pad + p * (height - 2 * pad)} stroke="#e5e7eb" strokeWidth={1} />
        ))}
        {/* Lines */}
        {series.map((s) => (
          <polyline
            key={s.key}
            points={getPoints(data[s.key as keyof typeof data] as number[])}
            fill="none"
            stroke={s.color}
            strokeWidth={2.5}
            opacity={s.key === "revenue" ? 1 : 0.85}
          />
        ))}
        {/* Dots */}
        {series.map((s) =>
          (data[s.key as keyof typeof data] as number[]).map((v, i) => (
            <circle
              key={s.key + i}
              cx={pad + (i / (data.months.length - 1)) * (width - 2 * pad)}
              cy={height - pad - ((v - min) / (max - min)) * (height - 2 * pad)}
              r={4}
              fill={s.color}
              stroke="#fff"
              strokeWidth={2}
              opacity={s.key === "revenue" ? 1 : 0.85}
            />
          ))
        )}
      </svg>
      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 text-xs justify-center">
        {series.map((s) => (
          <span key={s.key} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ background: s.color }}></span>
            <span className="text-gray-700 font-medium">{s.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

// --- Main Page ---
export default function AccountingPage() {
  return (
    <div className="min-h-screen bg-[#f6fafe] p-4 md:p-8">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between mb-8 shadow-sm">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="bg-white rounded-xl px-4 py-2 flex flex-col items-center shadow">
            <span className="text-xs text-gray-400">Apple</span>
            <span className="font-bold text-blue-700">$180.50</span>
            <span className="text-xs text-green-500">+2.30 (1.3%)</span>
          </div>
          <div>
            <div className="text-lg font-semibold text-blue-900 mb-1">Now your account isn&apos;t just for saving</div>
            <div className="text-gray-500 text-sm">Start growing your wealth by investing directly from your balance. <a href="#" className="text-blue-600 font-medium hover:underline">Start Investing →</a></div>
          </div>
        </div>
      </div>

      {/* Sales & Revenue Overview Card */}
      <div className="bg-white rounded-2xl p-8 shadow-sm flex flex-col gap-4 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-4">
          <span className="font-semibold text-gray-800 text-lg">Sales & Revenue Overview</span>
          <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-500">
            <option>Last 6 months</option>
          </select>
        </div>
        <div className="flex gap-8 mb-2 flex-wrap">
          {salesOverview.kpis.map((kpi, i) => (
            <div key={i} className="min-w-[120px]">
              <div className="text-gray-400 text-base font-medium">{kpi.label}</div>
              <div className="text-2xl font-extrabold text-gray-900">{kpi.label === "Credit Notes" || kpi.label === "Sales Returns" ? kpi.value : `$${kpi.value.toLocaleString()}`}</div>
              <div className={`text-sm font-semibold flex items-center gap-1 ${kpi.positive ? "text-green-500" : "text-red-500"}`}>{kpi.positive ? "▲" : "▼"} {Math.abs(kpi.change)}%</div>
            </div>
          ))}
        </div>
        <MultiLineSalesGraph data={salesOverview} />
      </div>

      {/* Additional Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Stats Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Quick Stats</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Revenue</span>
              <span className="font-semibold text-gray-900">$45,200</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Expenses</span>
              <span className="font-semibold text-gray-900">$23,800</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Net Profit</span>
              <span className="font-semibold text-green-600">$21,400</span>
            </div>
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Payment received</p>
                <p className="text-xs text-gray-500">$2,500 from Client A</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Invoice sent</p>
                <p className="text-xs text-gray-500">Invoice #INV-2024-001</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Credit note issued</p>
                <p className="text-xs text-gray-500">$150 for return</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Quick Actions</h3>
          </div>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
              <div className="font-medium text-blue-900">Create Invoice</div>
              <div className="text-sm text-blue-700">Generate new invoice</div>
            </button>
            <button className="w-full text-left p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
              <div className="font-medium text-green-900">Record Payment</div>
              <div className="text-sm text-green-700">Add payment received</div>
            </button>
            <button className="w-full text-left p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
              <div className="font-medium text-purple-900">Generate Report</div>
              <div className="text-sm text-purple-700">View financial reports</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 