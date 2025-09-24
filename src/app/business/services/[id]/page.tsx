'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeftIcon,
  DocumentTextIcon,
  Squares2X2Icon,
  ClockIcon,
  CurrencyDollarIcon,
  TagIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { Service, SingleService, BundleService } from '../../../../types/services';

// Mock data - in a real app, this would come from an API
const mockServices: Service[] = [
  // Single Services
  {
    id: 'ser_001',
    name: 'Social Media Copy Writing',
    description: 'Professional copywriting for social media posts with engaging content that drives engagement and conversions. Our expert copywriters create compelling content tailored to your brand voice and target audience.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop&crop=center',
    price: 50,
    deliverables: [
      {
        id: 'deliverable_001',
        name: 'Content Research Report',
        estimated_time: 2,
        price: 20,
        quantity: 1,
        subtotal: 20
      },
      {
        id: 'deliverable_002',
        name: 'Social Media Copy',
        estimated_time: 3,
        price: 10,
        quantity: 1,
        subtotal: 10
      }
    ],
    delivery_type: 'single',
    category: 'content',
    tags: ['copywriting', 'social media', 'content marketing'],
    is_active: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: 'ser_002',
    name: 'Static Post Design',
    description: 'Custom static post designs for social media platforms including Instagram, Facebook, Twitter, and LinkedIn. Professional designs that align with your brand identity.',
    price: 75,
    delivery_type: 'single',
    category: 'design',
    tags: ['design', 'social media', 'graphics'],
    is_active: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: 'ser_003',
    name: '10 Second Animation',
    description: 'Short animated videos for social media marketing that capture attention and convey your message effectively. Perfect for Instagram Stories, TikTok, and other short-form content platforms.',
    price: 200,
    delivery_type: 'single',
    category: 'design',
    tags: ['animation', 'video', 'motion graphics'],
    is_active: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: 'ser_004',
    name: 'Website Maintenance',
    description: 'Comprehensive website maintenance and updates including security patches, content updates, performance optimization, and technical support.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop&crop=center',
    price: 500,
    deliverables: [
      {
        id: 'deliverable_007',
        name: 'Monthly Security Updates',
        estimated_time: 4,
        price: 100,
        quantity: 1,
        subtotal: 100
      },
      {
        id: 'deliverable_008',
        name: 'Performance Optimization Report',
        estimated_time: 6,
        price: 150,
        quantity: 1,
        subtotal: 150
      },
      {
        id: 'deliverable_009',
        name: 'Content Updates',
        estimated_time: 8,
        price: 75,
        quantity: 1,
        subtotal: 75
      }
    ],
    delivery_type: 'timebound',
    delivery_duration: 4,
    delivery_unit: 'weeks',
    minimum_duration: 3,
    minimum_unit: 'weeks',
    category: 'maintenance',
    tags: ['maintenance', 'website', 'technical support'],
    is_active: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  // Bundle Services
  {
    id: 'bundle_001',
    name: 'Complete Social Media Package',
    description: 'Everything you need for comprehensive social media marketing including content creation, design, and management. Perfect for businesses looking to establish a strong social media presence.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop&crop=center',
    services: [
      {
        service_id: 'ser_001',
        service_name: 'Social Media Copy Writing',
        service_price: 50,
        quantity: 10,
        subtotal: 500
      },
      {
        service_id: 'ser_002',
        service_name: 'Static Post Design',
        service_price: 75,
        quantity: 8,
        subtotal: 600
      },
      {
        service_id: 'ser_003',
        service_name: '10 Second Animation',
        service_price: 200,
        quantity: 2,
        subtotal: 400
      }
    ],
    base_price: 1500,
    discount_percentage: 20,
    final_price: 1200,
    delivery_type: 'timebound',
    delivery_duration: 30,
    delivery_unit: 'days',
    category: 'marketing',
    tags: ['social media', 'package', 'marketing', 'complete solution'],
    is_active: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: 'bundle_002',
    name: 'Website Design & Development',
    description: 'Complete website design and development package including branding and launch support.',
    image: 'https://images.unsplash.com/photo-1527430253228-e93688616381?w=400&h=400&fit=crop&crop=center',
    services: [
      {
        service_id: 'ser_005',
        service_name: 'Logo Design',
        service_price: 300,
        quantity: 1,
        subtotal: 300
      },
      {
        service_id: 'ser_002',
        service_name: 'Static Post Design',
        service_price: 75,
        quantity: 6,
        subtotal: 450
      },
      {
        service_id: 'ser_003',
        service_name: '10 Second Animation',
        service_price: 200,
        quantity: 1,
        subtotal: 200
      }
    ],
    base_price: 1200,
    discount_percentage: 10,
    final_price: 1080,
    delivery_type: 'single',
    category: 'development',
    tags: ['website', 'design', 'development'],
    is_active: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  }
];

export default function ServiceDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const foundService = mockServices.find(s => s.id === params.id);
    setService(foundService || null);
    setLoading(false);
  }, [params.id]);

  const isSingleService = (service: Service): service is SingleService => {
    return 'price' in service;
  };

  const isBundleService = (service: Service): service is BundleService => {
    return 'services' in service;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <DocumentTextIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Service Not Found</h2>
          <p className="text-gray-600 mb-4">The service you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/business/services')}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back
          </button>
          
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              {isBundleService(service) ? (
                <Squares2X2Icon className="w-8 h-8 text-purple-600" />
              ) : (
                <DocumentTextIcon className="w-8 h-8 text-blue-600" />
              )}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{service.name}</h1>
                  <span className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full ${
                    isBundleService(service) ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {isBundleService(service) ? 'Bundle' : 'Service'}
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full ${
                    service.delivery_type === 'single' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                  }`}>
                    {service.delivery_type === 'single' ? 'Single Delivery' : 'Timebound'}
                </span>
                  {service.is_active ? (
                    <CheckCircleIcon className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircleIcon className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <p className="text-gray-600 text-lg">{service.description}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <PencilIcon className="w-4 h-4 mr-2" />
                Edit
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                <TrashIcon className="w-4 h-4 mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service/Bundle Image */}
            {service.image && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {isBundleService(service) ? 'Bundle Image' : 'Service Image'}
                </h2>
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}
            {/* Pricing Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Pricing Information</h2>
              
              {isSingleService(service) ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-gray-700">Price:</span>
                    <span className="text-2xl font-bold text-gray-900">${service.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-gray-700">Delivery Type:</span>
                    <span className="text-lg text-gray-900">
                      {service.delivery_type === 'single' ? 'One-time delivery' :
                       service.delivery_type === 'timebound' ? 
                         (service.minimum_duration ? `${service.minimum_duration} ${service.minimum_unit} minimum` : 
                          service.delivery_duration ? `${service.delivery_duration} ${service.delivery_unit}` : 'Ongoing service') :
                       'Ongoing service'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-gray-700">Base Price:</span>
                    <span className="text-xl font-semibold text-gray-900">${service.base_price.toLocaleString()}</span>
                  </div>
                  {service.discount_percentage > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium text-gray-700">Discount ({service.discount_percentage}%):</span>
                      <span className="text-xl font-semibold text-red-600">
                        -${((service.base_price * service.discount_percentage) / 100).toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <span className="text-xl font-bold text-gray-900">Final Price:</span>
                    <span className="text-3xl font-bold text-green-600">${service.final_price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-gray-700">Delivery Type:</span>
                    <span className="text-lg text-gray-900">
                      {service.delivery_type === 'single' ? 'One-time delivery' :
                       service.delivery_type === 'timebound' ? 
                         (service.minimum_duration ? `${service.minimum_duration} ${service.minimum_unit} minimum` : 
                          service.delivery_duration ? `${service.delivery_duration} ${service.delivery_unit}` : 'Ongoing service') :
                       'Ongoing service'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Service Deliverables Breakdown */}
            {isSingleService(service) && service.deliverables.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Service Deliverables</h2>
                <div className="space-y-4">
                  {service.deliverables.map((deliverable) => (
                    <div key={deliverable.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{deliverable.name}</h3>
                        <span className="text-sm text-gray-500">{deliverable.estimated_time} hour{deliverable.estimated_time !== 1 ? 's' : ''}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Unit Price:</span>
                          <span className="ml-2 font-medium">${deliverable.price.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Quantity:</span>
                          <span className="ml-2 font-medium">{deliverable.quantity}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Subtotal:</span>
                          <span className="ml-2 font-semibold">${deliverable.subtotal.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-700">Total from Deliverables:</span>
                    <span className="text-lg font-semibold text-gray-900">
                      ${service.deliverables.reduce((total, deliverable) => total + deliverable.subtotal, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-lg font-medium text-gray-700">Total Time:</span>
                    <span className="text-lg font-semibold text-gray-900">
                      {service.deliverables.reduce((total, deliverable) => total + (deliverable.estimated_time * deliverable.quantity), 0)} hours
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Bundle Services Breakdown */}
            {isBundleService(service) && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Services in Bundle</h2>
                <div className="space-y-4">
                  {service.services.map((bundleService, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{bundleService.service_name}</h3>
                        <span className="text-sm text-gray-500">Qty: {bundleService.quantity}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Unit Price:</span>
                          <span className="ml-2 font-medium">${bundleService.service_price.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Quantity:</span>
                          <span className="ml-2 font-medium">{bundleService.quantity}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Subtotal:</span>
                          <span className="ml-2 font-semibold">${bundleService.subtotal.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    <TagIcon className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                  ))}
                </div>
              </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Service Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Information</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">Category:</span>
                  <span className="ml-2 text-sm text-gray-900 capitalize">{service.category}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Status:</span>
                  <span className={`ml-2 inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                    service.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {service.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Created:</span>
                  <span className="ml-2 text-sm text-gray-900">
                    {new Date(service.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Last Updated:</span>
                  <span className="ml-2 text-sm text-gray-900">
                    {new Date(service.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  <PencilIcon className="w-4 h-4 mr-2" />
                  Edit Service
                </button>
                <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
                  <DocumentTextIcon className="w-4 h-4 mr-2" />
                  Create Proposal
                </button>
                <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors">
                  <Squares2X2Icon className="w-4 h-4 mr-2" />
                  Add to Bundle
                </button>
                <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  View History
                </button>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Times Used:</span>
                  <span className="text-sm font-medium text-gray-900">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Revenue:</span>
                  <span className="text-sm font-medium text-gray-900">
                    ${isSingleService(service) ? (service.price * 12).toLocaleString() : (service.final_price * 5).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Last Used:</span>
                  <span className="text-sm font-medium text-gray-900">2 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}