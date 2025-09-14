'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import ServiceForm from '@/components/ServiceForm';
import { ServiceFormData } from '../../../../types/services';

export default function NewServicePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (serviceData: ServiceFormData) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would save the service to the database
      console.log('Creating service:', serviceData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      alert('Service created successfully!');
      
      // Redirect to services list
      router.push('/business/services');
    } catch (error) {
      console.error('Error creating service:', error);
      alert('Error creating service. Please try again.');
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
              <h1 className="text-3xl font-bold text-gray-900">Create New Service</h1>
              <p className="text-gray-600 mt-1">
                Create a new single service for your clients
              </p>
            </div>
          </div>
        </div>

        {/* Service Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <form onSubmit={(e) => { e.preventDefault(); }}>
            <ServiceForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              submitButtonText={isSubmitting ? "Creating Service..." : "Create Service"}
              title="Create New Service"
            />
          </form>
        </div>
      </div>
    </div>
  );
}