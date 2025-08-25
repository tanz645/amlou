"use client";

import React from "react";
import {
  UserGroupIcon,
  UserIcon,
  DocumentTextIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  PlusIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";

// Mock data for the business dashboard
const businessStats = {
  totalLeads: 156,
  activeClients: 23,
  totalRevenue: 125000,
  pendingAgreements: 8,
  monthlyGrowth: 12.5,
  conversionRate: 8.2,
};

const recentLeads = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "TechStart Inc",
    email: "sarah@techstart.com",
    phone: "+1 (555) 123-4567",
    status: "New",
    source: "Website",
    date: "2024-01-15",
  },
  {
    id: 2,
    name: "Mike Chen",
    company: "Digital Solutions",
    email: "mike@digitalsolutions.com",
    phone: "+1 (555) 987-6543",
    status: "Contacted",
    source: "LinkedIn",
    date: "2024-01-14",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    company: "Creative Agency",
    email: "emily@creativeagency.com",
    phone: "+1 (555) 456-7890",
    status: "Qualified",
    source: "Referral",
    date: "2024-01-13",
  },
];

const activeClients = [
  {
    id: 1,
    name: "Global Tech Corp",
    services: ["SEO", "PPC", "Social Media"],
    monthlyRevenue: 8500,
    status: "Active",
    nextMeeting: "2024-01-20",
  },
  {
    id: 2,
    name: "Local Restaurant Chain",
    services: ["Social Media", "Content Marketing"],
    monthlyRevenue: 3200,
    status: "Active",
    nextMeeting: "2024-01-22",
  },
  {
    id: 3,
    name: "E-commerce Startup",
    services: ["PPC", "Email Marketing"],
    monthlyRevenue: 5600,
    status: "Active",
    nextMeeting: "2024-01-25",
  },
];

const pendingAgreements = [
  {
    id: 1,
    clientName: "Innovation Labs",
    serviceType: "Full Digital Marketing Package",
    value: 15000,
    status: "Review",
    dueDate: "2024-01-18",
  },
  {
    id: 2,
    clientName: "Health & Wellness Co",
    serviceType: "SEO & Content Strategy",
    value: 8000,
    status: "Negotiation",
    dueDate: "2024-01-20",
  },
];

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ComponentType<{ className?: string }>;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, color = "blue" }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {change && (
          <div className={`flex items-center mt-2 text-sm ${
            change > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {change > 0 ? (
              <ArrowUpIcon className="w-4 h-4 mr-1" />
            ) : (
              <ArrowDownIcon className="w-4 h-4 mr-1" />
            )}
            {Math.abs(change)}% from last month
          </div>
        )}
      </div>
      <div className={`p-3 rounded-lg bg-${color}-100`}>
        <Icon className={`w-6 h-6 text-${color}-600`} />
      </div>
    </div>
  </div>
);

export default function BusinessPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Business Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your digital marketing business operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Leads"
          value={businessStats.totalLeads}
          change={businessStats.monthlyGrowth}
          icon={UserGroupIcon}
          color="blue"
        />
        <StatCard
          title="Active Clients"
          value={businessStats.activeClients}
          change={5.2}
          icon={UserIcon}
          color="green"
        />
        <StatCard
          title="Total Revenue"
          value={`$${businessStats.totalRevenue.toLocaleString()}`}
          change={businessStats.monthlyGrowth}
          icon={CurrencyDollarIcon}
          color="purple"
        />
        <StatCard
          title="Pending Agreements"
          value={businessStats.pendingAgreements}
          change={-2.1}
          icon={DocumentTextIcon}
          color="orange"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Leads */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Leads</h2>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                <PlusIcon className="w-4 h-4" />
                Add Lead
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{lead.name}</h3>
                      <p className="text-sm text-gray-600">{lead.company}</p>
                      <p className="text-xs text-gray-500">{lead.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      lead.status === 'New' ? 'bg-blue-100 text-blue-800' :
                      lead.status === 'Contacted' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {lead.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{lead.source}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Clients */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Active Clients</h2>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                <PlusIcon className="w-4 h-4" />
                Add Client
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {activeClients.map((client) => (
                <div key={client.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{client.name}</h3>
                    <span className="text-sm font-medium text-green-600">
                      ${client.monthlyRevenue.toLocaleString()}/mo
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    {client.services.map((service, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {service}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Next meeting: {client.nextMeeting}</span>
                    <span className="text-green-600">● Active</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Agreements */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Pending Agreements</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {pendingAgreements.map((agreement) => (
                <div key={agreement.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{agreement.clientName}</h3>
                    <span className="text-lg font-bold text-gray-900">
                      ${agreement.value.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{agreement.serviceType}</p>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      agreement.status === 'Review' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {agreement.status}
                    </span>
                    <span className="text-sm text-gray-500">Due: {agreement.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <UserGroupIcon className="w-8 h-8 text-blue-600 mb-2" />
                <span className="text-sm font-medium text-blue-900">New Lead</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <UserIcon className="w-8 h-8 text-green-600 mb-2" />
                <span className="text-sm font-medium text-green-900">New Client</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <DocumentTextIcon className="w-8 h-8 text-purple-600 mb-2" />
                <span className="text-sm font-medium text-purple-900">Create Agreement</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                <BriefcaseIcon className="w-8 h-8 text-orange-600 mb-2" />
                <span className="text-sm font-medium text-orange-900">Add Service</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 