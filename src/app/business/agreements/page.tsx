'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import agreementsData from '@/data/agreements.json';
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
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface Agreement {
  agreement_id: string;
  agreement_referance: string | null;
  agreement_date: string;
  project_id: string;
  parties: Array<{
    type: string;
    user_id?: string;
    client_id?: string;
    name: string;
    address: string | object;
    phone: string;
    email: string;
    project_id?: string;
  }>;
  scope_of_work: {
    project_title: string;
    description: string;
    deliverables: Array<{
      deliverable_id: string;
      type: string;
      service_id?: string;
      package_id?: string;
      quantity: number;
      timeline: {
        start_date: string;
        end_date: string;
      };
    }>;
    start_date: string;
    end_date: string;
  };
  payment_terms: {
    pricing_structure: string;
    total_cost: number;
    deposit_amount: number;
    payment_methods: string[];
  };
  signatures_required: boolean;
  [key: string]: unknown;
}

const agreements: Agreement[] = agreementsData as Agreement[];

export default function BusinessAgreementsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedProject, setSelectedProject] = useState('all');
  const router = useRouter();

  // Get unique projects for filter
  const projects = useMemo(() => {
    const projs = [...new Set(agreements.map(agreement => agreement.project_id))];
    return projs.map(proj => ({
      value: proj,
      label: proj.replace('_', ' ').toUpperCase()
    }));
  }, []);

  // Calculate agreement status based on dates
  const getAgreementStatus = (agreement: Agreement) => {
    const now = new Date();
    const startDate = new Date(agreement.scope_of_work.start_date);
    const endDate = new Date(agreement.scope_of_work.end_date);
    
    if (now < startDate) return 'upcoming';
    if (now >= startDate && now <= endDate) return 'active';
    return 'completed';
  };

  // Filter agreements based on search and filters
  const filteredAgreements = useMemo(() => {
    return agreements.filter(agreement => {
      const client = agreement.parties.find(p => p.type === 'client');
      const serviceProvider = agreement.parties.find(p => p.type === 'service_provider');
      
      const matchesSearch = 
        agreement.agreement_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agreement.scope_of_work.project_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        serviceProvider?.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesProject = selectedProject === 'all' || agreement.project_id === selectedProject;
      
      let matchesStatus = true;
      if (selectedStatus !== 'all') {
        const status = getAgreementStatus(agreement);
        matchesStatus = status === selectedStatus;
      }

      return matchesSearch && matchesProject && matchesStatus;
    });
  }, [searchTerm, selectedProject, selectedStatus]);

  const handleAgreementClick = (agreementId: string) => {
    router.push(`/business/agreements/${agreementId}`);
  };

  const getStatusBadge = (agreement: Agreement) => {
    const status = getAgreementStatus(agreement);
    const statusConfig = {
      upcoming: { color: 'bg-blue-100 text-blue-800', icon: ClockIcon, label: 'Upcoming' },
      active: { color: 'bg-green-100 text-green-800', icon: CheckCircleIcon, label: 'Active' },
      completed: { color: 'bg-gray-100 text-gray-800', icon: CheckCircleIcon, label: 'Completed' }
    };
    
    const config = statusConfig[status];
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

  const getDaysRemaining = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Agreements</h1>
              <p className="mt-2 text-gray-600">
                Manage and track all client agreements and contracts
              </p>
            </div>
            <button
              onClick={() => router.push('/business/agreements/new')}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Create Agreement
            </button>
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
                placeholder="Search agreements..."
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
                <option value="upcoming">Upcoming</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Project Filter */}
            <div>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Projects</option>
                {projects.map(project => (
                  <option key={project.value} value={project.value}>
                    {project.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-end text-sm text-gray-600">
              {filteredAgreements.length} agreement{filteredAgreements.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>

        {/* Agreements Grid */}
        {filteredAgreements.length === 0 ? (
          <div className="text-center py-12">
            <FunnelIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No agreements found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAgreements.map((agreement) => {
              const client = agreement.parties.find(p => p.type === 'client');
              const serviceProvider = agreement.parties.find(p => p.type === 'service_provider');
              const daysRemaining = getDaysRemaining(agreement.scope_of_work.end_date);
              const status = getAgreementStatus(agreement);
              
              return (
                <div
                  key={agreement.agreement_id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group"
                  onClick={() => handleAgreementClick(agreement.agreement_id)}
                >
                  {/* Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {agreement.scope_of_work.project_title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {agreement.agreement_id}
                        </p>
                      </div>
                      {getStatusBadge(agreement)}
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {agreement.scope_of_work.description}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    {/* Client & Service Provider */}
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <BuildingOfficeIcon className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="font-medium">Client:</span>
                        <span className="ml-1">{client?.name}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <UserIcon className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="font-medium">Provider:</span>
                        <span className="ml-1">{serviceProvider?.name}</span>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <CalendarDaysIcon className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="font-medium">Start:</span>
                        <span className="ml-1">{formatDate(agreement.scope_of_work.start_date)}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CalendarDaysIcon className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="font-medium">End:</span>
                        <span className="ml-1">{formatDate(agreement.scope_of_work.end_date)}</span>
                        {status === 'active' && (
                          <span className="ml-2 text-xs text-orange-600">
                            ({daysRemaining} days left)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Payment */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div className="flex items-center text-sm text-gray-600">
                        <CurrencyDollarIcon className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="font-medium">Total:</span>
                        <span className="ml-1 font-semibold text-green-600">
                          ${agreement.payment_terms.total_cost.toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {agreement.signatures_required && (
                          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                            <DocumentTextIcon className="w-3 h-3 mr-1" />
                            Signature Required
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
