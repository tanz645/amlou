'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import agreementsData from '@/data/agreements.json';
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
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon
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
  intellectual_property: {
    ownership_upon_payment: boolean;
    freelancer_portfolio_rights: boolean;
    pre_existing_ip_details: string;
  };
  confidentiality: {
    is_confidential: boolean;
    confidential_information_definition: string | null;
    duration: string | null;
    nda_attached: boolean;
  };
  termination: {
    notice_period_days: number;
    conditions: string[];
    payment_upon_termination: string;
    kill_fee: number | null;
  };
  liability: {
    limitation_of_liability: string;
    indemnification: string;
  };
  dispute_resolution: {
    method: string;
    governing_law_state_province: string;
    governing_law_country: string;
  };
  additional_terms: string[];
  signatures_required: boolean;
  [key: string]: unknown;
}

export default function BusinessAgreementDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [id, setId] = useState<string>('');
  const [agreement, setAgreement] = useState<Agreement | undefined>(undefined);

  useEffect(() => {
    params.then(({ id: resolvedId }) => {
      setId(resolvedId);
      const foundAgreement = (agreementsData as Agreement[]).find((a) => a.agreement_id === resolvedId);
      setAgreement(foundAgreement);
    });
  }, [params]);

  if (!id || !agreement) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading agreement details...</p>
        </div>
      </div>
    );
  }

  const client = agreement.parties.find(p => p.type === 'client');
  const serviceProvider = agreement.parties.find(p => p.type === 'service_provider');

  const getAgreementStatus = () => {
    const now = new Date();
    const startDate = new Date(agreement.scope_of_work.start_date);
    const endDate = new Date(agreement.scope_of_work.end_date);
    
    if (now < startDate) return { status: 'upcoming', color: 'bg-blue-100 text-blue-800', label: 'Upcoming' };
    if (now >= startDate && now <= endDate) return { status: 'active', color: 'bg-green-100 text-green-800', label: 'Active' };
    return { status: 'completed', color: 'bg-gray-100 text-gray-800', label: 'Completed' };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysRemaining = () => {
    const now = new Date();
    const end = new Date(agreement.scope_of_work.end_date);
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleBack = () => {
    router.push('/business/agreements');
  };

  const handleEdit = () => {
    // TODO: Implement edit functionality
    alert('Edit agreement (not implemented)');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    alert('Share agreement (not implemented)');
  };

  const statusInfo = getAgreementStatus();
  const daysRemaining = getDaysRemaining();

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
            Back to Agreements
          </button>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{agreement.scope_of_work.project_title}</h1>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusInfo.color}`}>
                  {statusInfo.label}
                </span>
              </div>
              <p className="text-lg text-gray-600 mb-4">{agreement.agreement_id}</p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <CalendarDaysIcon className="w-4 h-4 mr-2" />
                  <span>Created: {formatDate(agreement.agreement_date)}</span>
                </div>
                <div className="flex items-center">
                  <BuildingOfficeIcon className="w-4 h-4 mr-2" />
                  <span>Project: {agreement.project_id}</span>
                </div>
                {statusInfo.status === 'active' && (
                  <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    <span>{daysRemaining} days remaining</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleEdit}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <PencilIcon className="w-4 h-4 mr-2" />
                Edit Agreement
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
              <p className="text-gray-700 leading-relaxed mb-4">{agreement.scope_of_work.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Start Date</div>
                  <div className="text-sm text-gray-900">{formatDate(agreement.scope_of_work.start_date)}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">End Date</div>
                  <div className="text-sm text-gray-900">{formatDate(agreement.scope_of_work.end_date)}</div>
                </div>
              </div>
            </div>

            {/* Deliverables */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircleIcon className="w-5 h-5 mr-2" />
                Deliverables
              </h2>
              <div className="space-y-4">
                {agreement.scope_of_work.deliverables.map((deliverable, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{deliverable.deliverable_id}</h3>
                        <p className="text-sm text-gray-600">Type: {deliverable.type}</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        Qty: {deliverable.quantity}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                      <div>Start: {formatDate(deliverable.timeline.start_date)}</div>
                      <div>End: {formatDate(deliverable.timeline.end_date)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Terms */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <CurrencyDollarIcon className="w-5 h-5 mr-2" />
                Payment Terms
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Pricing Structure</div>
                  <div className="text-sm text-gray-900 capitalize">{agreement.payment_terms.pricing_structure.replace('_', ' ')}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Total Cost</div>
                  <div className="text-lg font-semibold text-green-600">${agreement.payment_terms.total_cost.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Deposit Amount</div>
                  <div className="text-sm text-gray-900">${agreement.payment_terms.deposit_amount.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Payment Methods</div>
                  <div className="text-sm text-gray-900">{agreement.payment_terms.payment_methods.join(', ')}</div>
                </div>
              </div>
            </div>

            {/* Additional Terms */}
            {agreement.additional_terms && agreement.additional_terms.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Terms</h2>
                <ul className="space-y-2">
                  {agreement.additional_terms.map((term, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{term}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Parties Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Parties</h3>
              
              {/* Service Provider */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Service Provider</h4>
                <div className="space-y-2">
                  <div className="font-medium text-gray-900">{serviceProvider?.name}</div>
                  <div className="flex items-center text-sm text-gray-600">
                    <EnvelopeIcon className="w-4 h-4 mr-2" />
                    {serviceProvider?.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <PhoneIcon className="w-4 h-4 mr-2" />
                    {serviceProvider?.phone}
                  </div>
                  <div className="flex items-start text-sm text-gray-600">
                    <MapPinIcon className="w-4 h-4 mr-2 mt-0.5" />
                    <span>
                      {typeof serviceProvider?.address === 'object' 
                        ? `${(serviceProvider.address as any).street}, ${(serviceProvider.address as any).city}, ${(serviceProvider.address as any).country}`
                        : serviceProvider?.address
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* Client */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Client</h4>
                <div className="space-y-2">
                  <div className="font-medium text-gray-900">{client?.name}</div>
                  <div className="flex items-center text-sm text-gray-600">
                    <EnvelopeIcon className="w-4 h-4 mr-2" />
                    {client?.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <PhoneIcon className="w-4 h-4 mr-2" />
                    {client?.phone}
                  </div>
                  <div className="flex items-start text-sm text-gray-600">
                    <MapPinIcon className="w-4 h-4 mr-2 mt-0.5" />
                    <span>
                      {typeof client?.address === 'object' 
                        ? `${(client.address as any).street}, ${(client.address as any).city}, ${(client.address as any).country}`
                        : client?.address
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Agreement Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Agreement Details</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Agreement ID</div>
                  <div className="text-sm text-gray-900 font-mono">{agreement.agreement_id}</div>
                </div>
                
                {agreement.agreement_referance && (
                  <div>
                    <div className="text-sm font-medium text-gray-500">Reference</div>
                    <div className="text-sm text-gray-900">{agreement.agreement_referance}</div>
                  </div>
                )}
                
                <div>
                  <div className="text-sm font-medium text-gray-500">Project ID</div>
                  <div className="text-sm text-gray-900">{agreement.project_id}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500">Signatures Required</div>
                  <div className="text-sm text-gray-900">
                    {agreement.signatures_required ? (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                        <ExclamationTriangleIcon className="w-3 h-3 mr-1" />
                        Required
                      </span>
                    ) : (
                      <span className="text-gray-500">Not Required</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Legal Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal Information</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Confidentiality</div>
                  <div className="text-sm text-gray-900">
                    {agreement.confidentiality.is_confidential ? 'Yes' : 'No'}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500">Dispute Resolution</div>
                  <div className="text-sm text-gray-900 capitalize">{agreement.dispute_resolution.method}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500">Governing Law</div>
                  <div className="text-sm text-gray-900">
                    {agreement.dispute_resolution.governing_law_state_province}, {agreement.dispute_resolution.governing_law_country}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500">Notice Period</div>
                  <div className="text-sm text-gray-900">{agreement.termination.notice_period_days} days</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
