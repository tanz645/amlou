"use client";

import React, { useState } from "react";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  UserIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import ClientCard from "../../../components/ClientCard";
import Link from "next/link";

// Project interface
interface Project {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold' | 'cancelled';
  progress: number;
  startDate: string;
  endDate: string;
  monthlyRevenue: number;
  totalRevenue: number;
  paymentDue: number;
  nextPaymentDate: string | null;
  paymentStatus: 'paid' | 'overdue' | 'pending' | 'terminated';
  services: string[];
  assignedTo: string;
  notes: string;
}

// Mock data for clients with multiple projects
const clientsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "TechStart Inc",
    email: "sarah@techstart.com",
    phone: "+1 (555) 123-4567",
    status: "Active",
    type: "Enterprise",
    assignedTo: "John Smith",
    website: "https://techstart.com",
    address: "123 Tech Street, San Francisco, CA 94105",
    notes: "High-value client interested in expanding services. Very responsive to communication.",
    // Projects array
    projects: [
      {
        id: 1,
        name: "Website Redesign & SEO",
        description: "Complete website redesign with SEO optimization",
        status: 'active',
        progress: 85,
        startDate: "2024-01-01",
        endDate: "2024-06-30",
        monthlyRevenue: 5000,
        totalRevenue: 25000,
        paymentDue: 5000,
        nextPaymentDate: "2024-02-01",
        paymentStatus: 'paid',
        services: ["Web Design", "SEO"],
        assignedTo: "John Smith",
        notes: "Phase 1 completed, moving to SEO optimization"
      },
      {
        id: 2,
        name: "PPC Campaign Management",
        description: "Google Ads and Facebook Ads campaign management",
        status: 'active',
        progress: 60,
        startDate: "2024-02-01",
        endDate: "2024-12-31",
        monthlyRevenue: 3500,
        totalRevenue: 35000,
        paymentDue: 3500,
        nextPaymentDate: "2024-02-01",
        paymentStatus: 'pending',
        services: ["PPC", "Social Media Ads"],
        assignedTo: "Jane Doe",
        notes: "Campaigns performing well, scaling up budget"
      }
    ]
  },
  {
    id: 2,
    name: "Mike Chen",
    company: "Digital Solutions",
    email: "mike@digitalsolutions.com",
    phone: "+1 (555) 987-6543",
    status: "Active",
    type: "Mid-Market",
    assignedTo: "Jane Doe",
    website: "https://digitalsolutions.com",
    address: "456 Digital Ave, New York, NY 10001",
    notes: "Growing company with potential for additional services. Good relationship.",
    projects: [
      {
        id: 3,
        name: "Email Marketing Automation",
        description: "Set up email marketing automation and campaigns",
        status: 'active',
        progress: 90,
        startDate: "2024-01-01",
        endDate: "2024-03-31",
        monthlyRevenue: 3200,
        totalRevenue: 9600,
        paymentDue: 3200,
        nextPaymentDate: "2024-02-01",
        paymentStatus: 'paid',
        services: ["Email Marketing", "Automation"],
        assignedTo: "Jane Doe",
        notes: "Automation flows set up, monitoring performance"
      },
      {
        id: 4,
        name: "PPC Optimization",
        description: "Optimize existing PPC campaigns for better ROI",
        status: 'completed',
        progress: 100,
        startDate: "2023-10-01",
        endDate: "2024-01-31",
        monthlyRevenue: 2000,
        totalRevenue: 8000,
        paymentDue: 0,
        nextPaymentDate: null,
        paymentStatus: 'paid',
        services: ["PPC", "Conversion Optimization"],
        assignedTo: "Mike Johnson",
        notes: "Project completed successfully, client satisfied"
      }
    ]
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    company: "Creative Agency",
    email: "emily@creativeagency.com",
    phone: "+1 (555) 456-7890",
    status: "Active",
    type: "Small Business",
    assignedTo: "John Smith",
    website: "https://creativeagency.com",
    address: "789 Creative Blvd, Los Angeles, CA 90210",
    notes: "Creative agency with unique needs. Requires personalized approach.",
    projects: [
      {
        id: 5,
        name: "Social Media Management",
        description: "Complete social media management and content creation",
        status: 'active',
        progress: 45,
        startDate: "2024-01-01",
        endDate: "2024-03-31",
        monthlyRevenue: 3200,
        totalRevenue: 9600,
        paymentDue: 3200,
        nextPaymentDate: "2024-02-01",
        paymentStatus: 'overdue',
        services: ["Social Media", "Content Creation"],
        assignedTo: "John Smith",
        notes: "Content calendar created, posting regularly"
      }
    ]
  },
  {
    id: 4,
    name: "David Wilson",
    company: "E-commerce Store",
    email: "david@ecommercestore.com",
    phone: "+1 (555) 321-6540",
    status: "Inactive",
    type: "Small Business",
    assignedTo: "Jane Doe",
    website: "https://ecommercestore.com",
    address: "321 Commerce St, Chicago, IL 60601",
    notes: "Contract ended. Follow up needed for renewal discussions.",
    projects: [
      {
        id: 6,
        name: "E-commerce Optimization",
        description: "Optimize e-commerce store for better conversions",
        status: 'completed',
        progress: 100,
        startDate: "2023-01-15",
        endDate: "2024-01-15",
        monthlyRevenue: 0,
        totalRevenue: 28000,
        paymentDue: 0,
        nextPaymentDate: null,
        paymentStatus: 'terminated',
        services: ["E-commerce", "Conversion Optimization"],
        assignedTo: "Jane Doe",
        notes: "Project completed, contract expired"
      }
    ]
  },
  {
    id: 5,
    name: "Lisa Thompson",
    company: "Local Restaurant",
    email: "lisa@localrestaurant.com",
    phone: "+1 (555) 789-0123",
    status: "Active",
    type: "Small Business",
    assignedTo: "Mike Johnson",
    website: "https://localrestaurant.com",
    address: "654 Local Rd, Miami, FL 33101",
    notes: "Local business with seasonal fluctuations. Good for referrals.",
    projects: [
      {
        id: 7,
        name: "Local SEO & Social Media",
        description: "Local SEO optimization and social media management",
        status: 'active',
        progress: 60,
        startDate: "2023-09-01",
        endDate: "2024-08-31",
        monthlyRevenue: 1800,
        totalRevenue: 19800,
        paymentDue: 1800,
        nextPaymentDate: "2024-02-01",
        paymentStatus: 'pending',
        services: ["Local SEO", "Social Media"],
        assignedTo: "Mike Johnson",
        notes: "Local rankings improving, social engagement growing"
      }
    ]
  },
  {
    id: 6,
    name: "Robert Kim",
    company: "Healthcare Solutions",
    email: "robert@healthcaresolutions.com",
    phone: "+1 (555) 147-2580",
    status: "Prospect",
    type: "Enterprise",
    assignedTo: "Sarah Wilson",
    website: "https://healthcaresolutions.com",
    address: "987 Health Way, Boston, MA 02101",
    notes: "Prospective client in final negotiation phase. High potential value.",
    projects: []
  },
];

const clientTypes = ["All", "Small Business", "Mid-Market", "Enterprise"];
const clientStatuses = ["All", "Active", "Inactive", "Prospect"];
const assignedOptions = ["All", "John Smith", "Jane Doe", "Mike Johnson", "Sarah Wilson", "Unassigned"];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800 border-green-200";
    case "Inactive":
      return "bg-red-100 text-red-800 border-red-200";
    case "Prospect":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "Enterprise":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "Mid-Market":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Small Business":
      return "bg-orange-100 text-orange-800 border-orange-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-800";
    case "overdue":
      return "bg-red-100 text-red-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "terminated":
      return "bg-gray-100 text-gray-800";
    case "prospect":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getProjectStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "completed":
      return "bg-blue-100 text-blue-800";
    case "on-hold":
      return "bg-yellow-100 text-yellow-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getDaysUntilDue = (nextPaymentDate: string | null) => {
  if (!nextPaymentDate) return null;
  const today = new Date();
  const dueDate = new Date(nextPaymentDate);
  const diffTime = dueDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const getDaysUntilTermination = (endDate: string | null) => {
  if (!endDate) return null;
  const today = new Date();
  const end = new Date(endDate);
  const diffTime = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export default function ClientsPage() {
  const [clients, setClients] = useState(clientsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [assignedFilter, setAssignedFilter] = useState("All");

  // Filter clients based on search and filters
  const filteredClients = clients.filter((client) => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === "All" || client.type === typeFilter;
    const matchesStatus = statusFilter === "All" || client.status === statusFilter;
    const matchesAssigned = assignedFilter === "All" || client.assignedTo === assignedFilter;

    return matchesSearch && matchesType && matchesStatus && matchesAssigned;
  });

  // Calculate totals across all projects
  const totalClients = filteredClients.length;
  const activeClients = filteredClients.filter(client => client.status === "Active").length;
  
  // Calculate totals from all projects
  const allProjects = filteredClients.flatMap(client => client.projects);
  const totalMonthlyRevenue = allProjects.reduce((sum, project) => sum + project.monthlyRevenue, 0);
  const totalRevenue = allProjects.reduce((sum, project) => sum + project.totalRevenue, 0);
  const totalPaymentDue = allProjects.reduce((sum, project) => sum + project.paymentDue, 0);
  
  const overduePayments = allProjects.filter(project => project.paymentStatus === "overdue").length;
  const pendingPayments = allProjects.filter(project => project.paymentStatus === "pending").length;
  const activeProjects = allProjects.filter(project => project.status === "active").length;

  const handleStatusChange = (clientId: number, newStatus: string) => {
    setClients(clients.map(client => 
      client.id === clientId ? { ...client, status: newStatus } : client
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
            <p className="text-gray-600 mt-2">Manage and track your business clients and their projects</p>
          </div>
          <Link
            href="/business/clients/new"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            Add New Client
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Clients</p>
              <p className="text-2xl font-bold text-gray-900">{totalClients}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <UserIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Projects</p>
              <p className="text-2xl font-bold text-gray-900">{activeProjects}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Payment Due</p>
              <p className="text-2xl font-bold text-gray-900">${totalPaymentDue.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">
                {overduePayments} overdue, {pendingPayments} pending
              </p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-100">
              <CurrencyDollarIcon className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalMonthlyRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100">
              <CurrencyDollarIcon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-indigo-100">
              <CurrencyDollarIcon className="w-6 h-6 text-indigo-600" />
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
                placeholder="Search clients or projects..."
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
              {clientTypes.map((type) => (
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
              {clientStatuses.map((status) => (
                <option key={status} value={status}>{status}</option>
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

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <ClientCard
            key={client.id}
            client={client}
            onClientClick={() => {}}
            onStatusChange={handleStatusChange}
            clientStatuses={clientStatuses}
            getStatusColor={getStatusColor}
            getTypeColor={getTypeColor}
            getPaymentStatusColor={getPaymentStatusColor}
            getProjectStatusColor={getProjectStatusColor}
            getDaysUntilDue={getDaysUntilDue}
            getDaysUntilTermination={getDaysUntilTermination}
          />
        ))}
      </div>
    </div>
  );
} 