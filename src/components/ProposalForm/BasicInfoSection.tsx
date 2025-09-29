'use client';

import { DocumentTextIcon } from '@heroicons/react/24/outline';

interface BasicInfoSectionProps {
  formData: {
    project_title: string;
    description: string;
    timeline_days: number;
    valid_until: string;
    selected_lead_id: string;
  };
  leads: Array<{
    id: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    logo: string;
  }>;
  onUpdate: (field: string, value: any) => void;
}

export default function BasicInfoSection({ formData, leads, onUpdate }: BasicInfoSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <DocumentTextIcon className="w-5 h-5 mr-2" />
          Basic Information
        </h2>
        
        {/* Selected Lead Display */}
        {formData.selected_lead_id && (
          <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
            {(() => {
              const selectedLead = leads.find(lead => lead.id === formData.selected_lead_id);
              return selectedLead ? (
                <>
                  <img 
                    src={selectedLead.logo} 
                    alt={`${selectedLead.company} logo`}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">{selectedLead.name}</div>
                    <div className="text-gray-600">{selectedLead.company}</div>
                    <div className="text-gray-500">{selectedLead.email}</div>
                    <div className="text-gray-500">{selectedLead.phone}</div>
                  </div>
                </>
              ) : null;
            })()}
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Client Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Project Title</label>
            <input
              type="text"
              value={formData.project_title}
              onChange={(e) => onUpdate('project_title', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter project title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Lead</label>
            <select
              value={formData.selected_lead_id}
              onChange={(e) => onUpdate('selected_lead_id', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Choose a lead...</option>
              {leads.map((lead) => (
                <option key={lead.id} value={lead.id}>
                  {lead.name} - {lead.company}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Project Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => onUpdate('description', e.target.value)}
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe the project in detail"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Timeline (days)</label>
            <input
              type="number"
              value={formData.timeline_days}
              onChange={(e) => onUpdate('timeline_days', parseInt(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Valid Until</label>
            <input
              type="date"
              value={formData.valid_until}
              onChange={(e) => onUpdate('valid_until', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
