'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeftIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import ProposalForm from '@/components/ProposalForm';
import { ProposalData, LeadData } from '../../../../types/proposal';

export default function NewProposalPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get lead data from URL parameters if available
  const leadId = searchParams.get('leadId');
  const leadName = searchParams.get('leadName');
  const leadCompany = searchParams.get('leadCompany');
  const leadEmail = searchParams.get('leadEmail');

  const leadData: LeadData | undefined = leadId ? {
    id: parseInt(leadId),
    name: leadName || '',
    company: leadCompany || '',
    email: leadEmail || '',
    phone: '' // Phone not passed in URL params
  } : undefined;

  const handleSubmit = async (proposalData: ProposalData) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would save the proposal to the database
      console.log('Creating proposal:', proposalData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      alert('Proposal created successfully!');
      
      // Redirect to proposals list
      router.push('/business/proposals');
    } catch (error) {
      console.error('Error creating proposal:', error);
      alert('Error creating proposal. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleCancel}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back
          </button>
          
          <div className="flex items-center space-x-3">
            <DocumentTextIcon className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Proposal</h1>
              <p className="text-gray-600 mt-1">
                {leadData 
                  ? `Create a comprehensive proposal for ${leadData.name} from ${leadData.company}`
                  : 'Create a comprehensive proposal for a client'
                }
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Complete all sections: Basic Info, Challenges, Strategy, Execution, Phases, Gantt Chart, Deliverables, Services, and Terms
              </p>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Proposal Completion Progress</h3>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2 text-xs">
            {[
              'Basic Info', 'Challenges', 'Strategy', 'Execution', 'Phases',
              'Gantt Chart', 'Deliverables', 'Services', 'Terms'
            ].map((section, index) => (
              <div key={section} className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <span className="text-gray-600">{section}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Proposal Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <ProposalForm
            leadData={leadData}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitButtonText={isSubmitting ? "Sending proposal..." : "Save and send"}
            showCancelButton={true}
          />
        </div>
      </div>
    </div>
  );
}
