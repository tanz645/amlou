'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import BundleForm from '@/components/BundleForm';
import { BundleFormData, SingleService } from '../../../../../types/services';

// Mock data for available services
const mockServices: SingleService[] = [
  {
    id: 'ser_001',
    name: 'Social Media Copy Writing',
    description: 'Professional copywriting for social media posts',
    price: 50,
    delivery_type: 'single',
    category: 'content',
    tags: ['copywriting', 'social media'],
    is_active: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: 'ser_002',
    name: 'Static Post Design',
    description: 'Custom static post designs for social media',
    price: 75,
    delivery_type: 'single',
    category: 'design',
    tags: ['design', 'social media'],
    is_active: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: 'ser_003',
    name: '10 Second Animation',
    description: 'Short animated videos for social media',
    price: 200,
    delivery_type: 'single',
    category: 'design',
    tags: ['animation', 'video'],
    is_active: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: 'ser_004',
    name: 'Website Maintenance',
    description: 'Ongoing website maintenance and updates',
    price: 500,
    delivery_type: 'timebound',
    delivery_duration: 14,
    delivery_unit: 'days',
    category: 'maintenance',
    tags: ['maintenance', 'website'],
    is_active: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: 'ser_005',
    name: 'Logo Design',
    description: 'Custom logo design with multiple concepts',
    price: 300,
    delivery_type: 'single',
    category: 'design',
    tags: ['logo', 'branding'],
    is_active: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: 'ser_006',
    name: 'Social Media Management',
    description: 'Complete social media management service',
    price: 800,
    delivery_type: 'timebound',
    delivery_duration: 30,
    delivery_unit: 'days',
    category: 'marketing',
    tags: ['social media', 'management'],
    is_active: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  }
];

export default function NewBundlePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableServices, setAvailableServices] = useState<SingleService[]>([]);

  useEffect(() => {
    // In a real app, this would fetch services from the API
    setAvailableServices(mockServices);
  }, []);

  const handleSubmit = async (bundleData: BundleFormData) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would save the bundle to the database
      console.log('Creating bundle:', bundleData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      alert('Service bundle created successfully!');
      
      // Redirect to services list
      router.push('/business/services');
    } catch (error) {
      console.error('Error creating bundle:', error);
      alert('Error creating bundle. Please try again.');
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
            <DocumentTextIcon className="w-8 h-8 text-purple-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Service Bundle</h1>
              <p className="text-gray-600 mt-1">
                Create a bundle of services with optional discount
              </p>
            </div>
          </div>
        </div>

        {/* Bundle Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <form onSubmit={(e) => { e.preventDefault(); }}>
            <BundleForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              submitButtonText={isSubmitting ? "Creating Bundle..." : "Create Bundle"}
              title="Create New Service Bundle"
              availableServices={availableServices}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
