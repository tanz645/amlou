'use client';

import { useState } from 'react';
import { 
  DocumentTextIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
  ClockIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { Service, ProposalData, LeadData } from '../types/proposal';

interface ProposalFormProps {
  leadData?: LeadData;
  onSubmit: (proposalData: ProposalData) => void;
  onCancel?: () => void;
  submitButtonText?: string;
  showCancelButton?: boolean;
}

// Sample services data
const availableServices = [
  { service_id: "ser_001", name: "UI/UX Design", unit_price: 500, description: "Custom UI/UX design for all pages" },
  { service_id: "ser_002", name: "Frontend Development", unit_price: 1200, description: "React.js frontend development" },
  { service_id: "ser_003", name: "Backend Development", unit_price: 800, description: "Node.js backend with API development" },
  { service_id: "ser_004", name: "Mobile App Design", unit_price: 800, description: "Complete mobile app UI/UX design" },
  { service_id: "ser_005", name: "React Native Development", unit_price: 2000, description: "Cross-platform mobile app development" },
  { service_id: "ser_006", name: "API Integration", unit_price: 600, description: "Backend API development and integrations" },
  { service_id: "ser_007", name: "Social Media Management", unit_price: 800, description: "Social media strategy and management" },
  { service_id: "ser_008", name: "Content Creation", unit_price: 600, description: "Content strategy and creation" },
  { service_id: "ser_009", name: "SEO Optimization", unit_price: 400, description: "Search engine optimization services" },
  { service_id: "ser_010", name: "Graphic Design", unit_price: 1200, description: "Professional graphic design services" }
];

export default function ProposalForm({ 
  leadData, 
  onSubmit, 
  onCancel, 
  submitButtonText = "Create Proposal",
  showCancelButton = true 
}: ProposalFormProps) {
  const [formData, setFormData] = useState({
    project_title: '',
    description: '',
    timeline_days: 30,
    valid_until: '',
    notes: '',
    terms_and_conditions: [
      'Payment terms: 50% deposit upon agreement, 50% upon completion',
      'Project timeline: As specified in the proposal',
      'Revisions: Up to 3 rounds of revisions included',
      'Support: 30 days of post-launch support included',
      'Ownership: Full ownership transfers upon final payment'
    ]
  });

  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [showServiceSelector, setShowServiceSelector] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddService = (service: any) => {
    const newService: Service = {
      service_id: service.service_id,
      name: service.name,
      quantity: 1,
      unit_price: service.unit_price,
      description: service.description
    };
    setSelectedServices(prev => [...prev, newService]);
    setShowServiceSelector(false);
  };

  const handleRemoveService = (index: number) => {
    setSelectedServices(prev => prev.filter((_, i) => i !== index));
  };

  const handleServiceChange = (index: number, field: string, value: any) => {
    setSelectedServices(prev => prev.map((service, i) => 
      i === index ? { ...service, [field]: value } : service
    ));
  };

  const calculateTotal = () => {
    return selectedServices.reduce((total, service) => 
      total + (service.quantity * service.unit_price), 0
    );
  };

  const calculateDeposit = () => {
    return Math.round(calculateTotal() * 0.5);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const proposalData = {
      proposal_id: `PROP-${Date.now()}`,
      lead_id: leadData?.id || null,
      client_id: leadData ? `cli_${leadData.id}` : '',
      client_name: leadData?.name || '',
      client_email: leadData?.email || '',
      client_phone: leadData?.phone || '',
      project_title: formData.project_title,
      description: formData.description,
      services: selectedServices,
      total_cost: calculateTotal(),
      deposit_amount: calculateDeposit(),
      timeline_days: formData.timeline_days,
      created_date: new Date().toISOString().split('T')[0],
      sent_date: null,
      status: 'draft',
      valid_until: formData.valid_until,
      notes: formData.notes,
      terms_and_conditions: formData.terms_and_conditions
    };

    onSubmit(proposalData);
  };

  return (
    <div className="space-y-6">
      {/* Client Information */}
      {leadData && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Client Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={leadData.name}
                disabled
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <input
                type="text"
                value={leadData.company}
                disabled
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={leadData.email}
                disabled
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                value={leadData.phone}
                disabled
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Project Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Project Information</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Project Title</label>
          <input
            type="text"
            value={formData.project_title}
            onChange={(e) => handleInputChange('project_title', e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Project Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Timeline (Days)</label>
            <input
              type="number"
              value={formData.timeline_days}
              onChange={(e) => handleInputChange('timeline_days', parseInt(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Valid Until</label>
            <input
              type="date"
              value={formData.valid_until}
              onChange={(e) => handleInputChange('valid_until', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Services</h3>
          <button
            type="button"
            onClick={() => setShowServiceSelector(true)}
            className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Service
          </button>
        </div>

        {selectedServices.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <DocumentTextIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>No services added yet. Click "Add Service" to get started.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {selectedServices.map((service, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{service.name}</h4>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveService(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                      type="number"
                      value={service.quantity}
                      onChange={(e) => handleServiceChange(index, 'quantity', parseInt(e.target.value))}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Unit Price</label>
                    <input
                      type="number"
                      value={service.unit_price}
                      onChange={(e) => handleServiceChange(index, 'unit_price', parseFloat(e.target.value))}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Subtotal</label>
                    <div className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 font-medium">
                      ${(service.quantity * service.unit_price).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pricing Summary */}
      {selectedServices.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Pricing Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">${calculateTotal().toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Deposit (50%):</span>
              <span className="font-medium">${calculateDeposit().toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-2">
              <span className="font-semibold text-gray-900">Total Cost:</span>
              <span className="font-semibold text-green-600 text-lg">${calculateTotal().toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
        <textarea
          value={formData.notes}
          onChange={(e) => handleInputChange('notes', e.target.value)}
          rows={3}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Any additional notes or special requirements..."
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
        {showCancelButton && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={selectedServices.length === 0}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitButtonText}
        </button>
      </div>

      {/* Service Selector Modal */}
      {showServiceSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Select Service</h3>
              <button
                onClick={() => setShowServiceSelector(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-3">
                {availableServices.map((service) => (
                  <div
                    key={service.service_id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleAddService(service)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{service.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">${service.unit_price.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">per unit</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
