"use client";

import React, { useState } from "react";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ChartBarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

// Mock data for lead sources
const leadSourcesData = [
  {
    id: 1,
    name: "Website",
    type: "Digital",
    description: "Leads from company website contact forms and landing pages",
    status: "Active",
    leadsCount: 45,
    conversionRate: 12.5,
    totalValue: 125000,
    cost: 2500,
    roi: 4900,
    lastLead: "2024-01-19",
    icon: "🌐",
    color: "blue",
  },
  {
    id: 2,
    name: "LinkedIn",
    type: "Social Media",
    description: "Leads generated through LinkedIn networking and outreach",
    status: "Active",
    leadsCount: 32,
    conversionRate: 18.7,
    totalValue: 89000,
    cost: 1200,
    roi: 741.7,
    lastLead: "2024-01-18",
    icon: "💼",
    color: "indigo",
  },
  {
    id: 3,
    name: "Google Ads",
    type: "Paid Advertising",
    description: "Leads from Google Ads campaigns and search advertising",
    status: "Active",
    leadsCount: 28,
    conversionRate: 8.9,
    totalValue: 67000,
    cost: 4500,
    roi: 148.9,
    lastLead: "2024-01-17",
    icon: "🔍",
    color: "green",
  },
  {
    id: 4,
    name: "Referrals",
    type: "Word of Mouth",
    description: "Leads from client referrals and word of mouth",
    status: "Active",
    leadsCount: 15,
    conversionRate: 33.3,
    totalValue: 95000,
    cost: 0,
    roi: 0,
    lastLead: "2024-01-16",
    icon: "🤝",
    color: "purple",
  },
  {
    id: 5,
    name: "Facebook",
    type: "Social Media",
    description: "Leads from Facebook ads and organic social media",
    status: "Active",
    leadsCount: 22,
    conversionRate: 9.1,
    totalValue: 42000,
    cost: 1800,
    roi: 233.3,
    lastLead: "2024-01-15",
    icon: "📘",
    color: "blue",
  },
  {
    id: 6,
    name: "Instagram",
    type: "Social Media",
    description: "Leads from Instagram marketing and influencer partnerships",
    status: "Inactive",
    leadsCount: 8,
    conversionRate: 12.5,
    totalValue: 18000,
    cost: 800,
    roi: 225,
    lastLead: "2024-01-10",
    icon: "📷",
    color: "pink",
  },
  {
    id: 7,
    name: "Cold Calling",
    type: "Outbound",
    description: "Leads from cold calling campaigns and prospecting",
    status: "Active",
    leadsCount: 12,
    conversionRate: 16.7,
    totalValue: 35000,
    cost: 500,
    roi: 700,
    lastLead: "2024-01-14",
    icon: "📞",
    color: "orange",
  },
  {
    id: 8,
    name: "Email Marketing",
    type: "Digital",
    description: "Leads from email campaigns and newsletter subscriptions",
    status: "Active",
    leadsCount: 18,
    conversionRate: 11.1,
    totalValue: 28000,
    cost: 300,
    roi: 933.3,
    lastLead: "2024-01-13",
    icon: "📧",
    color: "gray",
  },
];

const sourceTypes = ["All", "Digital", "Social Media", "Paid Advertising", "Word of Mouth", "Outbound"];
const statusOptions = ["All", "Active", "Inactive"];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800 border-green-200";
    case "Inactive":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getColorClasses = (color: string) => {
  switch (color) {
    case "blue":
      return "bg-blue-100 text-blue-600";
    case "indigo":
      return "bg-indigo-100 text-indigo-600";
    case "green":
      return "bg-green-100 text-green-600";
    case "purple":
      return "bg-purple-100 text-purple-600";
    case "pink":
      return "bg-pink-100 text-pink-600";
    case "orange":
      return "bg-orange-100 text-orange-600";
    case "gray":
      return "bg-gray-100 text-gray-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default function LeadSourcesPage() {
  const [leadSources, setLeadSources] = useState(leadSourcesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedSource, setSelectedSource] = useState<typeof leadSourcesData[0] | null>(null);
  const [showSourceModal, setShowSourceModal] = useState(false);

  // Filter lead sources based on search and filters
  const filteredSources = leadSources.filter((source) => {
    const matchesSearch = 
      source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      source.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === "All" || source.type === typeFilter;
    const matchesStatus = statusFilter === "All" || source.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  // Calculate totals
  const totalLeads = filteredSources.reduce((sum, source) => sum + source.leadsCount, 0);
  const totalValue = filteredSources.reduce((sum, source) => sum + source.totalValue, 0);
  const totalCost = filteredSources.reduce((sum, source) => sum + source.cost, 0);
  const averageConversionRate = filteredSources.length > 0 
    ? filteredSources.reduce((sum, source) => sum + source.conversionRate, 0) / filteredSources.length 
    : 0;

  const handleSourceClick = (source: typeof leadSourcesData[0]) => {
    setSelectedSource(source);
    setShowSourceModal(true);
  };

  const handleStatusChange = (sourceId: number, newStatus: string) => {
    setLeadSources(leadSources.map(source => 
      source.id === sourceId ? { ...source, status: newStatus } : source
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Lead Sources</h1>
            <p className="text-gray-600 mt-2">Manage and track your lead generation sources</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <PlusIcon className="h-5 w-5" />
            Add New Source
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900">{totalLeads}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <UserGroupIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">${totalValue.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Conversion</p>
              <p className="text-2xl font-bold text-gray-900">{averageConversionRate.toFixed(1)}%</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100">
              <ArrowTrendingUpIcon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Cost</p>
              <p className="text-2xl font-bold text-gray-900">${totalCost.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-100">
              <ChartBarIcon className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search lead sources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Type Filter */}
          <div className="lg:w-48">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sourceTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="lg:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Lead Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSources.map((source) => (
          <div 
            key={source.id} 
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleSourceClick(source)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${getColorClasses(source.color)}`}>
                  {source.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{source.name}</h3>
                  <p className="text-sm text-gray-500">{source.type}</p>
                </div>
              </div>
              <select
                value={source.status}
                onChange={(e) => handleStatusChange(source.id, e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(source.status)}`}
              >
                {statusOptions.slice(1).map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{source.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs font-medium text-gray-500">Leads</p>
                <p className="text-lg font-semibold text-gray-900">{source.leadsCount}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Conversion</p>
                <p className="text-lg font-semibold text-gray-900">{source.conversionRate}%</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Value</p>
                <p className="text-lg font-semibold text-gray-900">${source.totalValue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">ROI</p>
                <p className="text-lg font-semibold text-gray-900">{source.cost > 0 ? `${source.roi.toFixed(1)}%` : 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Last lead: {new Date(source.lastLead).toLocaleDateString()}</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSourceClick(source);
                  }}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <EyeIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle edit
                  }}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle delete
                  }}
                  className="text-red-600 hover:text-red-900"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lead Source Detail Modal */}
      {showSourceModal && selectedSource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Lead Source Details</h2>
              <button
                onClick={() => setShowSourceModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl ${getColorClasses(selectedSource.color)}`}>
                  {selectedSource.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedSource.name}</h3>
                  <p className="text-gray-500">{selectedSource.type}</p>
                  <select
                    value={selectedSource.status}
                    onChange={(e) => handleStatusChange(selectedSource.id, e.target.value)}
                    className={`mt-2 inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(selectedSource.status)}`}
                  >
                    {statusOptions.slice(1).map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Description</label>
                <p className="text-sm text-gray-900 mt-1">{selectedSource.description}</p>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs font-medium text-gray-500">Total Leads</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedSource.leadsCount}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs font-medium text-gray-500">Conversion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedSource.conversionRate}%</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs font-medium text-gray-500">Total Value</p>
                  <p className="text-2xl font-bold text-gray-900">${selectedSource.totalValue.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs font-medium text-gray-500">ROI</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedSource.cost > 0 ? `${selectedSource.roi.toFixed(1)}%` : 'N/A'}
                  </p>
                </div>
              </div>

              {/* Cost Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Total Cost</label>
                  <p className="text-lg font-semibold text-gray-900">${selectedSource.cost.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Last Lead Date</label>
                  <p className="text-lg font-semibold text-gray-900">{new Date(selectedSource.lastLead).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowSourceModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 