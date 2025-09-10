'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeftIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
  UserIcon,
  BuildingOfficeIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PencilIcon,
  PrinterIcon,
  ShareIcon,
  PaperAirplaneIcon,
  XCircleIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

// Sample proposals data - same as in the listing page
const sampleProposals = [
  {
    proposal_id: "PROP-20250115-001",
    client_id: "cli_001",
    client_name: "Asadullah Galib",
    client_email: "contact@ultimawater.com",
    client_phone: "+8801712345678",
    project_title: "E-commerce Website Development",
    description: "Complete e-commerce solution with payment integration and modern UI/UX design. The project will include a responsive website with shopping cart functionality, payment gateway integration, inventory management, and admin dashboard.",
    services: [
      { service_id: "ser_001", name: "UI/UX Design", quantity: 3, unit_price: 500, description: "Custom UI/UX design for all pages including homepage, product pages, and checkout flow" },
      { service_id: "ser_002", name: "Frontend Development", quantity: 1, unit_price: 1200, description: "React.js frontend development with responsive design and modern UI components" },
      { service_id: "ser_003", name: "Backend Development", quantity: 1, unit_price: 800, description: "Node.js backend with API development and database integration" }
    ],
    total_cost: 2500,
    deposit_amount: 1250,
    timeline_days: 45,
    created_date: "2025-01-15",
    sent_date: "2025-01-16",
    status: "sent",
    valid_until: "2025-02-15",
    notes: "Client requested custom payment gateway integration and mobile responsiveness",
    terms_and_conditions: [
      "Payment terms: 50% deposit upon agreement, 50% upon completion",
      "Project timeline: 45 days from start date",
      "Revisions: Up to 3 rounds of revisions included",
      "Support: 30 days of post-launch support included",
      "Ownership: Full ownership transfers upon final payment"
    ]
  },
  {
    proposal_id: "PROP-20250114-002",
    client_id: "cli_002",
    client_name: "John Smith",
    client_email: "info@aquatech.com",
    client_phone: "+1 5551234567",
    project_title: "Mobile App Development",
    description: "Cross-platform mobile application for food delivery with real-time tracking, user authentication, and payment integration.",
    services: [
      { service_id: "ser_004", name: "Mobile App Design", quantity: 1, unit_price: 800, description: "Complete mobile app UI/UX design with user flow and wireframes" },
      { service_id: "ser_005", name: "React Native Development", quantity: 1, unit_price: 2000, description: "Cross-platform mobile app development using React Native" },
      { service_id: "ser_006", name: "API Integration", quantity: 1, unit_price: 600, description: "Backend API development and third-party service integrations" }
    ],
    total_cost: 3400,
    deposit_amount: 1700,
    timeline_days: 60,
    created_date: "2025-01-14",
    sent_date: "2025-01-15",
    status: "accepted",
    valid_until: "2025-02-14",
    notes: "Client accepted with minor timeline adjustments - extended by 5 days for additional features",
    terms_and_conditions: [
      "Payment terms: 50% deposit upon agreement, 50% upon completion",
      "Project timeline: 60 days from start date",
      "Platforms: iOS and Android",
      "Testing: Comprehensive testing on both platforms included",
      "App Store: Assistance with app store submission included"
    ]
  }
];

interface Proposal {
  proposal_id: string;
  client_id: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  project_title: string;
  description: string;
  services: Array<{
    service_id: string;
    name: string;
    quantity: number;
    unit_price: number;
    description: string;
  }>;
  total_cost: number;
  deposit_amount: number;
  timeline_days: number;
  created_date: string;
  sent_date: string | null;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  valid_until: string;
  notes: string;
  terms_and_conditions: string[];
}

export default function BusinessProposalDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [id, setId] = useState<string>('');
  const [proposal, setProposal] = useState<Proposal | undefined>(undefined);

  useEffect(() => {
    params.then(({ id: resolvedId }) => {
      setId(resolvedId);
      const foundProposal = sampleProposals.find((p) => p.proposal_id === resolvedId);
      setProposal(foundProposal);
    });
  }, [params]);

  if (!id || !proposal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading proposal details...</p>
        </div>
      </div>
    );
  }

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
      <span className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full ${config.color}`}>
        <Icon className="w-4 h-4 mr-2" />
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntilExpiry = () => {
    const now = new Date();
    const expiry = new Date(proposal.valid_until);
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleBack = () => {
    router.push('/business/proposals');
  };

  const handleEdit = () => {
    // TODO: Implement edit functionality
    alert('Edit proposal (not implemented)');
  };

  const handleSend = () => {
    // TODO: Implement send functionality
    alert('Send proposal (not implemented)');
  };

  const handleCreateAgreement = () => {
    // TODO: Implement create agreement functionality
    alert('Create agreement from proposal (not implemented)');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    alert('Share proposal (not implemented)');
  };

  const daysUntilExpiry = getDaysUntilExpiry();
  const isExpiringSoon = daysUntilExpiry <= 7 && daysUntilExpiry > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Proposals
          </button>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{proposal.project_title}</h1>
                {getStatusBadge(proposal.status)}
              </div>
              <p className="text-lg text-gray-600 mb-4">{proposal.proposal_id}</p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <CalendarDaysIcon className="w-4 h-4 mr-2" />
                  <span>Created: {formatDate(proposal.created_date)}</span>
                </div>
                {proposal.sent_date && (
                  <div className="flex items-center">
                    <PaperAirplaneIcon className="w-4 h-4 mr-2" />
                    <span>Sent: {formatDate(proposal.sent_date)}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  <span>Valid until: {formatDate(proposal.valid_until)}</span>
                  {isExpiringSoon && (
                    <span className="ml-2 text-orange-600 font-medium">
                      ({daysUntilExpiry} days left)
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              {proposal.status === 'draft' && (
                <button
                  onClick={handleSend}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                  <PaperAirplaneIcon className="w-4 h-4 mr-2" />
                  Send Proposal
                </button>
              )}
              {proposal.status === 'accepted' && (
                <button
                  onClick={handleCreateAgreement}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Create Agreement
                </button>
              )}
              <button
                onClick={handleEdit}
                className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                <PencilIcon className="w-4 h-4 mr-2" />
                Edit
              </button>
              <button
                onClick={handlePrint}
                className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                <PrinterIcon className="w-4 h-4 mr-2" />
                Print
              </button>
              <button
                onClick={handleShare}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                <ShareIcon className="w-4 h-4 mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Overview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <DocumentTextIcon className="w-5 h-5 mr-2" />
                Project Overview
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">{proposal.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Timeline</div>
                  <div className="text-sm text-gray-900">{proposal.timeline_days} days</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Valid Until</div>
                  <div className="text-sm text-gray-900">{formatDate(proposal.valid_until)}</div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircleIcon className="w-5 h-5 mr-2" />
                Services & Pricing
              </h2>
              <div className="space-y-4">
                {proposal.services.map((service, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{service.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Qty: {service.quantity}</div>
                        <div className="font-semibold text-gray-900">${service.unit_price.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                      <span className="text-sm text-gray-600">Subtotal:</span>
                      <span className="font-semibold text-gray-900">
                        ${(service.quantity * service.unit_price).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms and Conditions */}
            {proposal.terms_and_conditions && proposal.terms_and_conditions.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Terms and Conditions</h2>
                <ul className="space-y-2">
                  {proposal.terms_and_conditions.map((term, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{term}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Notes */}
            {proposal.notes && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Notes</h2>
                <p className="text-gray-700">{proposal.notes}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Client Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Information</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-500">Name</div>
                  <div className="text-sm text-gray-900">{proposal.client_name}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Email</div>
                  <div className="text-sm text-gray-900">{proposal.client_email}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Phone</div>
                  <div className="text-sm text-gray-900">{proposal.client_phone}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Client ID</div>
                  <div className="text-sm text-gray-900 font-mono">{proposal.client_id}</div>
                </div>
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <CurrencyDollarIcon className="w-5 h-5 mr-2" />
                Pricing Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Subtotal:</span>
                  <span className="text-sm text-gray-900">${proposal.total_cost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Deposit (50%):</span>
                  <span className="text-sm text-gray-900">${proposal.deposit_amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Final Payment:</span>
                  <span className="text-sm text-gray-900">${(proposal.total_cost - proposal.deposit_amount).toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total Cost:</span>
                    <span className="font-semibold text-green-600 text-lg">${proposal.total_cost.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Proposal Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Proposal Details</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Proposal ID</div>
                  <div className="text-sm text-gray-900 font-mono">{proposal.proposal_id}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500">Status</div>
                  <div className="mt-1">{getStatusBadge(proposal.status)}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500">Created Date</div>
                  <div className="text-sm text-gray-900">{formatDate(proposal.created_date)}</div>
                </div>
                
                {proposal.sent_date && (
                  <div>
                    <div className="text-sm font-medium text-gray-500">Sent Date</div>
                    <div className="text-sm text-gray-900">{formatDate(proposal.sent_date)}</div>
                  </div>
                )}
                
                <div>
                  <div className="text-sm font-medium text-gray-500">Valid Until</div>
                  <div className="text-sm text-gray-900">{formatDate(proposal.valid_until)}</div>
                  {isExpiringSoon && (
                    <div className="text-xs text-orange-600 mt-1">
                      Expires in {daysUntilExpiry} days
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {proposal.status === 'draft' && (
                  <button
                    onClick={handleSend}
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <PaperAirplaneIcon className="w-4 h-4 mr-2" />
                    Send Proposal
                  </button>
                )}
                
                {proposal.status === 'accepted' && (
                  <button
                    onClick={handleCreateAgreement}
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Create Agreement
                  </button>
                )}
                
                <button
                  onClick={handleEdit}
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <PencilIcon className="w-4 h-4 mr-2" />
                  Edit Proposal
                </button>
                
                <button
                  onClick={handleBack}
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Back to Proposals
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
