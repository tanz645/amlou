"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  UserGroupIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

// Mock data for leads
const leadsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "TechStart Inc",
    email: "sarah@techstart.com",
    phone: "+1 (555) 123-4567",
    status: "New",
    source: "Website",
    assignedTo: "John Smith",
    value: 15000,
    date: "2024-01-15",
    lastContact: "2024-01-15",
    notes: "Interested in SEO and PPC services for their new SaaS platform.",
  },
  {
    id: 2,
    name: "Mike Chen",
    company: "Digital Solutions",
    email: "mike@digitalsolutions.com",
    phone: "+1 (555) 987-6543",
    status: "Contacted",
    source: "LinkedIn",
    assignedTo: "Jane Doe",
    value: 25000,
    date: "2024-01-14",
    lastContact: "2024-01-16",
    notes: "Looking for comprehensive digital marketing strategy.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    company: "Creative Agency",
    email: "emily@creativeagency.com",
    phone: "+1 (555) 456-7890",
    status: "Qualified",
    source: "Referral",
    assignedTo: "John Smith",
    value: 35000,
    date: "2024-01-13",
    lastContact: "2024-01-17",
    notes: "Ready to move forward with social media marketing campaign.",
  },
  {
    id: 4,
    name: "David Wilson",
    company: "E-commerce Store",
    email: "david@ecommercestore.com",
    phone: "+1 (555) 321-6540",
    status: "Proposal",
    source: "Google Ads",
    assignedTo: "Jane Doe",
    value: 20000,
    date: "2024-01-12",
    lastContact: "2024-01-18",
    notes: "Interested in PPC and conversion optimization.",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    company: "Local Restaurant",
    email: "lisa@localrestaurant.com",
    phone: "+1 (555) 789-0123",
    status: "Negotiation",
    source: "Facebook",
    assignedTo: "John Smith",
    value: 12000,
    date: "2024-01-11",
    lastContact: "2024-01-19",
    notes: "Looking for local SEO and social media management.",
  },
];

const statusOptions = ["All", "New", "Contacted", "Qualified", "Proposal", "Negotiation", "Won", "Lost"];
const sourceOptions = ["All", "Website", "LinkedIn", "Referral", "Google Ads", "Facebook", "Instagram", "Other"];
const assignedOptions = ["All", "John Smith", "Jane Doe", "Unassigned"];

const getStatusColor = (status: string) => {
  switch (status) {
    case "New":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Contacted":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Qualified":
      return "bg-green-100 text-green-800 border-green-200";
    case "Proposal":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "Negotiation":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "Won":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "Lost":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function LeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState(leadsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [assignedFilter, setAssignedFilter] = useState("All");


  // Filter leads based on search and filters
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || lead.status === statusFilter;
    const matchesSource = sourceFilter === "All" || lead.source === sourceFilter;
    const matchesAssigned = assignedFilter === "All" || lead.assignedTo === assignedFilter;

    return matchesSearch && matchesStatus && matchesSource && matchesAssigned;
  });

  const totalValue = filteredLeads.reduce((sum, lead) => sum + lead.value, 0);
  const averageValue = filteredLeads.length > 0 ? totalValue / filteredLeads.length : 0;

  const handleLeadClick = (lead: typeof leadsData[0]) => {
    router.push(`/business/leads/${lead.id}`);
  };



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
            <p className="text-gray-600 mt-2">Manage and track your business leads</p>
          </div>
          <button 
            onClick={() => router.push('/business/leads/new')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            Add New Lead
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900">{filteredLeads.length}</p>
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
              <ChartBarIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Value</p>
              <p className="text-2xl font-bold text-gray-900">${averageValue.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100">
              <ChartBarIcon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">8.2%</p>
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
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
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

          {/* Source Filter */}
          <div className="lg:w-48">
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sourceOptions.map((source) => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
          </div>

          {/* Assigned Filter */}
          <div className="lg:w-48">
            <select
              value={assignedFilter}
              onChange={(e) => setAssignedFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {assignedOptions.map((assigned) => (
                <option key={assigned} value={assigned}>{assigned}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lead
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleLeadClick(lead)}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <UserGroupIcon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                        <div className="text-sm text-gray-500">{lead.company}</div>
                        <div className="text-sm text-gray-500">{lead.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {lead.source}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {lead.assignedTo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${lead.value.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(lead.lastContact).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLeadClick(lead);
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