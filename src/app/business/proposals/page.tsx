'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  PlusIcon,
  EyeIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
  UserIcon,
  BuildingOfficeIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  PencilIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';

// Sample proposals data - in a real app, this would come from an API or database
const sampleProposals = [
  {
    proposal_id: "PROP-20250115-001",
    lead_id: 1, // Reference to the originating lead
    client_id: "cli_001",
    client_name: "Asadullah Galib",
    project_title: "E-commerce Website Development",
    description: "Complete e-commerce solution with payment integration and modern UI/UX design",
    services: [
      { service_id: "ser_001", name: "UI/UX Design", quantity: 3, unit_price: 500 },
      { service_id: "ser_002", name: "Frontend Development", quantity: 1, unit_price: 1200 },
      { service_id: "ser_003", name: "Backend Development", quantity: 1, unit_price: 800 }
    ],
    total_cost: 2500,
    deposit_amount: 1250,
    timeline_days: 45,
    created_date: "2025-01-15",
    sent_date: "2025-01-16",
    status: "sent", // draft, sent, accepted, rejected
    valid_until: "2025-02-15",
    notes: "Client requested custom payment gateway integration"
  },
  {
    proposal_id: "PROP-20250114-002",
    client_id: "cli_002",
    client_name: "John Smith",
    project_title: "Mobile App Development",
    description: "Cross-platform mobile application for food delivery with real-time tracking",
    services: [
      { service_id: "ser_004", name: "Mobile App Design", quantity: 1, unit_price: 800 },
      { service_id: "ser_005", name: "React Native Development", quantity: 1, unit_price: 2000 },
      { service_id: "ser_006", name: "API Integration", quantity: 1, unit_price: 600 }
    ],
    total_cost: 3400,
    deposit_amount: 1700,
    timeline_days: 60,
    created_date: "2025-01-14",
    sent_date: "2025-01-15",
    status: "accepted",
    valid_until: "2025-02-14",
    notes: "Client accepted with minor timeline adjustments"
  },
  {
    proposal_id: "PROP-20250113-003",
    client_id: "cli_003",
    client_name: "Emily Watson",
    project_title: "Digital Marketing Campaign",
    description: "Comprehensive digital marketing strategy and execution for Q2 2025",
    services: [
      { service_id: "ser_007", name: "Social Media Management", quantity: 1, unit_price: 800 },
      { service_id: "ser_008", name: "Content Creation", quantity: 1, unit_price: 600 },
      { service_id: "ser_009", name: "SEO Optimization", quantity: 1, unit_price: 400 }
    ],
    total_cost: 1800,
    deposit_amount: 900,
    timeline_days: 30,
    created_date: "2025-01-13",
    sent_date: null,
    status: "draft",
    valid_until: "2025-02-13",
    notes: "Waiting for client requirements clarification"
  },
  {
    proposal_id: "PROP-20250112-004",
    client_id: "cli_004",
    client_name: "Non-Profit Organization",
    project_title: "Annual Report Design",
    description: "Design of a 20-page annual report with infographics and professional layout",
    services: [
      { service_id: "ser_010", name: "Graphic Design", quantity: 1, unit_price: 1200 },
      { service_id: "ser_011", name: "Layout Design", quantity: 1, unit_price: 600 }
    ],
    total_cost: 1800,
    deposit_amount: 900,
    timeline_days: 20,
    created_date: "2025-01-12",
    sent_date: "2025-01-13",
    status: "rejected",
    valid_until: "2025-02-12",
    notes: "Client decided to handle design internally"
  }
];

interface Proposal {
  proposal_id: string;
  client_id: string;
  client_name: string;
  project_title: string;
  description: string;
  services: Array<{
    service_id: string;
    name: string;
    quantity: number;
    unit_price: number;
  }>;
  total_cost: number;
  deposit_amount: number;
  timeline_days: number;
  created_date: string;
  sent_date: string | null;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  valid_until: string;
  notes: string;
}

const proposals: Proposal[] = sampleProposals;

export default function BusinessProposalsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedClient, setSelectedClient] = useState('all');
  const router = useRouter();

  // Get unique clients for filter
  const clients = useMemo(() => {
    const clientList = [...new Set(proposals.map(proposal => proposal.client_name))];
    return clientList.map(client => ({
      value: client,
      label: client
    }));
  }, []);

  // Filter proposals based on search and filters
  const filteredProposals = useMemo(() => {
    return proposals.filter(proposal => {
      const matchesSearch = 
        proposal.proposal_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proposal.project_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proposal.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proposal.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = selectedStatus === 'all' || proposal.status === selectedStatus;
      const matchesClient = selectedClient === 'all' || proposal.client_name === selectedClient;

      return matchesSearch && matchesStatus && matchesClient;
    });
  }, [searchTerm, selectedStatus, selectedClient]);

  const handleProposalClick = (proposalId: string) => {
    router.push(`/business/proposals/${proposalId}`);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { color: 'bg-gray-100 text-gray-800', icon: PencilIcon, label: 'Draft' },
      sent: { color: 'bg-blue-100 text-blue-800', icon: PaperAirplaneIcon, label: 'Sent' },
      accepted: { color: 'bg-green-100 text-green-800', icon: CheckCircleIcon, label: 'Accepted' },
      rejected: { color: 'bg-red-100 text-red-800', icon: XCircleIcon, label: 'Rejected' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntilExpiry = (validUntil: string) => {
    const now = new Date();
    const expiry = new Date(validUntil);
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusCounts = () => {
    return {
      draft: proposals.filter(p => p.status === 'draft').length,
      sent: proposals.filter(p => p.status === 'sent').length,
      accepted: proposals.filter(p => p.status === 'accepted').length,
      rejected: proposals.filter(p => p.status === 'rejected').length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Proposals</h1>
              <p className="mt-2 text-gray-600">
                Create and manage client proposals before converting to agreements
              </p>
            </div>
            <button
              onClick={() => router.push('/business/proposals/new')}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Create Proposal
            </button>
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <PencilIcon className="w-5 h-5 text-gray-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Draft</p>
                <p className="text-2xl font-semibold text-gray-900">{statusCounts.draft}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <PaperAirplaneIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Sent</p>
                <p className="text-2xl font-semibold text-gray-900">{statusCounts.sent}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Accepted</p>
                <p className="text-2xl font-semibold text-gray-900">{statusCounts.accepted}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircleIcon className="w-5 h-5 text-red-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Rejected</p>
                <p className="text-2xl font-semibold text-gray-900">{statusCounts.rejected}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search proposals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Client Filter */}
            <div>
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Clients</option>
                {clients.map(client => (
                  <option key={client.value} value={client.value}>
                    {client.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-end text-sm text-gray-600">
              {filteredProposals.length} proposal{filteredProposals.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>

        {/* Proposals Grid */}
        {filteredProposals.length === 0 ? (
          <div className="text-center py-12">
            <FunnelIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No proposals found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProposals.map((proposal) => {
              const daysUntilExpiry = getDaysUntilExpiry(proposal.valid_until);
              const isExpiringSoon = daysUntilExpiry <= 7 && daysUntilExpiry > 0;
              
              return (
                <div
                  key={proposal.proposal_id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group"
                  onClick={() => handleProposalClick(proposal.proposal_id)}
                >
                  {/* Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {proposal.project_title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {proposal.proposal_id}
                        </p>
                      </div>
                      {getStatusBadge(proposal.status)}
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {proposal.description}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    {/* Client & Timeline */}
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <BuildingOfficeIcon className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="font-medium">Client:</span>
                        <span className="ml-1">{proposal.client_name}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <ClockIcon className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="font-medium">Timeline:</span>
                        <span className="ml-1">{proposal.timeline_days} days</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CalendarDaysIcon className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="font-medium">Valid until:</span>
                        <span className="ml-1">{formatDate(proposal.valid_until)}</span>
                        {isExpiringSoon && (
                          <span className="ml-2 text-xs text-orange-600">
                            ({daysUntilExpiry} days left)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Services Summary */}
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-gray-700">Services:</div>
                      <div className="text-sm text-gray-600">
                        {proposal.services.length} service{proposal.services.length !== 1 ? 's' : ''} included
                      </div>
                    </div>

                    {/* Payment & Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div className="flex items-center text-sm text-gray-600">
                        <CurrencyDollarIcon className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="font-medium">Total:</span>
                        <span className="ml-1 font-semibold text-green-600">
                          ${proposal.total_cost.toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {proposal.status === 'accepted' && (
                          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                            <CheckCircleIcon className="w-3 h-3 mr-1" />
                            Ready for Agreement
                          </span>
                        )}
                        <button className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                          <EyeIcon className="w-4 h-4 mr-1" />
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
