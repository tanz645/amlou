'use client';

import { XMarkIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import ProposalForm from './ProposalForm';
import { ProposalData, LeadData } from '../types/proposal';

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadData: LeadData;
  onSubmit: (proposalData: ProposalData) => void;
}

export default function ProposalModal({ isOpen, onClose, leadData, onSubmit }: ProposalModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (proposalData: ProposalData) => {
    onSubmit(proposalData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <DocumentTextIcon className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Create Proposal</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <ProposalForm
            leadData={leadData}
            onSubmit={handleSubmit}
            onCancel={onClose}
            submitButtonText="Save and send"
            showCancelButton={true}
          />
        </div>
      </div>
    </div>
  );
}