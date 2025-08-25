'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import servicesData from '@/data/services.json';
import { 
  ArrowLeftIcon,
  PencilIcon, 
  TrashIcon,
  CurrencyDollarIcon,
  ClockIcon,
  TagIcon,
  UserIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';

interface Service {
  id: string;
  name: string;
  serviceShortName: string;
  serviceCategory: string;
  serviceTasks: string[];
  shortDescription: string;
  serviceMaster: string;
  description: string;
  image: string;
  features: string[];
  pricing: {
    unit_price: number;
    max_discount: number;
  };
  minimum_time_required: number;
  minimum_order_unit: number;
  service_type: string;
  [key: string]: unknown;
}

export default function BusinessServiceDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [id, setId] = useState<string>('');
  const [service, setService] = useState<Service | undefined>(undefined);

  useEffect(() => {
    params.then(({ id: resolvedId }) => {
      setId(resolvedId);
      const foundService = (servicesData.services as Service[]).find((s) => s.id === resolvedId);
      setService(foundService);
    });
  }, [params]);

  if (!id || !service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading service details...</p>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    router.push(`/business/services/${service.id}/edit`);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
      // TODO: Implement delete logic
      alert('Delete service (not implemented)');
    }
  };

  const handleBack = () => {
    router.push('/business/services');
  };

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
            Back to Services
          </button>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{service.name}</h1>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  service.service_type === 'repeatable' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {service.service_type}
                </span>
              </div>
              <p className="text-lg text-gray-600 mb-4">{service.shortDescription}</p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <TagIcon className="w-4 h-4 mr-2" />
                  <span className="capitalize">{service.serviceCategory.replace('_', ' ')}</span>
                </div>
                <div className="flex items-center">
                  <UserIcon className="w-4 h-4 mr-2" />
                  <span>Master: {service.serviceMaster}</span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  <span>{service.minimum_time_required} days minimum</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleEdit}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <PencilIcon className="w-4 h-4 mr-2" />
                Edit Service
              </button>
              <button
                onClick={handleDelete}
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                <TrashIcon className="w-4 h-4 mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Service Image */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="relative h-64">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <DocumentTextIcon className="w-5 h-5 mr-2" />
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">{service.description}</p>
            </div>

            {/* Features */}
            {service.features && service.features.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircleIcon className="w-5 h-5 mr-2" />
                  Features & Benefits
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Service Tasks */}
            {service.serviceTasks && service.serviceTasks.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <BriefcaseIcon className="w-5 h-5 mr-2" />
                  Service Tasks
                </h2>
                <div className="space-y-2">
                  {service.serviceTasks.map((task, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <CurrencyDollarIcon className="w-5 h-5 mr-2" />
                Pricing
              </h3>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    ${service.pricing.unit_price.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">per unit</div>
                </div>
                
                {service.pricing.max_discount > 0 && (
                  <div className="text-center pt-3 border-t border-gray-200">
                    <div className="text-sm text-gray-600">Maximum Discount</div>
                    <div className="text-lg font-semibold text-blue-600">
                      ${service.pricing.max_discount.toLocaleString()}
                    </div>
                  </div>
                )}
                
                <div className="text-center pt-3 border-t border-gray-200">
                  <div className="text-sm text-gray-600">Minimum Order</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {service.minimum_order_unit} unit{service.minimum_order_unit !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </div>

            {/* Service Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Information</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Service ID</div>
                  <div className="text-sm text-gray-900 font-mono">{service.id}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500">Short Name</div>
                  <div className="text-sm text-gray-900">{service.serviceShortName}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500">Category</div>
                  <div className="text-sm text-gray-900 capitalize">{service.serviceCategory.replace('_', ' ')}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500">Service Type</div>
                  <div className="text-sm text-gray-900 capitalize">{service.service_type}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500">Production Time</div>
                  <div className="text-sm text-gray-900">{service.minimum_time_required} days minimum</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500">Service Master</div>
                  <div className="text-sm text-gray-900">{service.serviceMaster}</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => router.push(`/business/services/${service.id}/edit`)}
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <PencilIcon className="w-4 h-4 mr-2" />
                  Edit Service
                </button>
                
                <button
                  onClick={() => router.push('/business/services/new')}
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  <BriefcaseIcon className="w-4 h-4 mr-2" />
                  Create Similar Service
                </button>
                
                <button
                  onClick={handleBack}
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Back to Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
