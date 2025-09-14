'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  PlusIcon,
  EyeIcon,
  CurrencyDollarIcon,
  ClockIcon,
  TagIcon,
  DocumentTextIcon,
  Squares2X2Icon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { Service, SingleService, BundleService, ServiceType, DeliveryType } from '../../../types/services';

// Mock data for services
const mockSingleServices: SingleService[] = [
  {
    id: 'ser_001',
    name: 'Social Media Copy Writing',
    description: 'Professional copywriting for social media posts with engaging content',
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
    tags: ['copywriting', 'social media'],
    is_active: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: 'ser_002',
    name: 'Static Post Design',
    description: 'Custom static post designs for social media platforms',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=400&fit=crop&crop=center',
    price: 75,
    deliverables: [
      {
        id: 'deliverable_003',
        name: 'Design Concept Mockup',
        estimated_time: 2,
        price: 25,
        quantity: 1,
        subtotal: 25
      },
      {
        id: 'deliverable_004',
        name: 'Final Post Design',
        estimated_time: 3,
        price: 16.67,
        quantity: 1,
        subtotal: 16.67
      }
    ],
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
    description: 'Short animated videos for social media marketing',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=400&fit=crop&crop=center',
    price: 200,
    deliverables: [
      {
        id: 'deliverable_005',
        name: 'Animation Storyboard',
        estimated_time: 4,
        price: 50,
        quantity: 1,
        subtotal: 50
      },
      {
        id: 'deliverable_006',
        name: 'Final Animation Video',
        estimated_time: 8,
        price: 18.75,
        quantity: 1,
        subtotal: 18.75
      }
    ],
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
    description: 'Custom logo design with multiple concepts and revisions',
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

const mockBundleServices: BundleService[] = [
  {
    id: 'bundle_001',
    name: 'Complete Social Media Package',
    description: 'Everything you need for social media marketing',
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
    tags: ['social media', 'package', 'marketing'],
    is_active: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: 'bundle_002',
    name: 'Website Design & Development',
    description: 'Complete website design and development package',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop&crop=center',
    services: [
      {
        service_id: 'ser_005',
        service_name: 'Logo Design',
        service_price: 300,
        quantity: 1,
        subtotal: 300
      },
      {
        service_id: 'ser_004',
        service_name: 'Website Maintenance',
        service_price: 500,
        quantity: 3,
        subtotal: 1500
      }
    ],
    base_price: 1800,
    discount_percentage: 15,
    final_price: 1530,
    delivery_type: 'single',
    category: 'development',
    tags: ['website', 'design', 'development'],
    is_active: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  }
];

const allServices: Service[] = [...mockSingleServices, ...mockBundleServices];

const serviceCategories = [
  { id: 'all', name: 'All Categories', color: 'bg-gray-100 text-gray-800' },
  { id: 'design', name: 'Design', color: 'bg-purple-100 text-purple-800' },
  { id: 'development', name: 'Development', color: 'bg-blue-100 text-blue-800' },
  { id: 'marketing', name: 'Marketing', color: 'bg-green-100 text-green-800' },
  { id: 'content', name: 'Content', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'maintenance', name: 'Maintenance', color: 'bg-gray-100 text-gray-800' },
  { id: 'consulting', name: 'Consulting', color: 'bg-indigo-100 text-indigo-800' }
];

export default function BusinessServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState<ServiceType | 'all'>('all');
  const [selectedDeliveryType, setSelectedDeliveryType] = useState<DeliveryType | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const router = useRouter();

  // Filter services based on search and filters
  const filteredServices = useMemo(() => {
    return allServices.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      
      const matchesType = selectedType === 'all' || 
                         (selectedType === 'single' && 'price' in service) ||
                         (selectedType === 'bundle' && 'services' in service);
      
      const matchesDeliveryType = selectedDeliveryType === 'all' || service.delivery_type === selectedDeliveryType;
      
      return matchesSearch && matchesCategory && matchesType && matchesDeliveryType;
    });
  }, [searchTerm, selectedCategory, selectedType, selectedDeliveryType]);

  const handleServiceClick = (service: Service) => {
    router.push(`/business/services/${service.id}`);
  };

  const isSingleService = (service: Service): service is SingleService => {
    return 'price' in service;
  };

  const isBundleService = (service: Service): service is BundleService => {
    return 'services' in service;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Services</h1>
              <p className="text-gray-600 mt-1">Manage your services and service bundles</p>
            </div>
            <div className="flex items-center space-x-3">
            <button
              onClick={() => router.push('/business/services/new')}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
                New Service
              </button>
              <button
                onClick={() => router.push('/business/services/bundles/new')}
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Squares2X2Icon className="w-4 h-4 mr-2" />
                New Bundle
            </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search services..."
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4">
            {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {serviceCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as ServiceType | 'all')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="single">Single Services</option>
                <option value="bundle">Bundles</option>
              </select>

              {/* Delivery Type Filter */}
              <select
                value={selectedDeliveryType}
                onChange={(e) => setSelectedDeliveryType(e.target.value as DeliveryType | 'all')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Delivery Types</option>
                <option value="single">Single Time</option>
                <option value="timebound">Time Bound</option>
              </select>

              {/* View Mode */}
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <Squares2X2Icon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <DocumentTextIcon className="w-4 h-4" />
                </button>
            </div>
            </div>
          </div>
        </div>

        {/* Services Grid/List */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-12">
            <DocumentTextIcon className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredServices.map((service) => (
              <div
                key={service.id}
                onClick={() => handleServiceClick(service)}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
              >
                {viewMode === 'grid' ? (
                  // Grid View
                  <div className="p-6">
                    {/* Service/Bundle Image */}
                    {service.image && (
                      <div className="mb-4">
                        <img
                    src={service.image}
                    alt={service.name}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        {isBundleService(service) ? (
                          <Squares2X2Icon className="w-5 h-5 text-purple-600" />
                        ) : (
                          <DocumentTextIcon className="w-5 h-5 text-blue-600" />
                        )}
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                          isBundleService(service) ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {isBundleService(service) ? 'Bundle' : 'Service'}
                    </span>
                  </div>
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                        service.delivery_type === 'single' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                      }`}>
                        {service.delivery_type === 'single' ? 'Single' : 'Timebound'}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>

                    <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        {service.delivery_type === 'single' ? 'One-time' : 
                         service.delivery_duration ? `${service.delivery_duration} ${service.delivery_unit}` : 'Ongoing'}
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">
                          ${isSingleService(service) ? service.price.toLocaleString() : service.final_price.toLocaleString()}
                        </div>
                        {isBundleService(service) && service.discount_percentage > 0 && (
                          <div className="text-xs text-green-600">
                            {service.discount_percentage}% off
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {service.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                          {tag}
                        </span>
                      ))}
                      {service.tags.length > 3 && (
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                          +{service.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  // List View
                  <div className="p-6">
                  <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {isBundleService(service) ? (
                          <Squares2X2Icon className="w-6 h-6 text-purple-600" />
                        ) : (
                          <DocumentTextIcon className="w-6 h-6 text-blue-600" />
                        )}
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                            <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                              isBundleService(service) ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {isBundleService(service) ? 'Bundle' : 'Service'}
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                              service.delivery_type === 'single' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                            }`}>
                              {service.delivery_type === 'single' ? 'Single' : 'Timebound'}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm">{service.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-semibold text-gray-900">
                          ${isSingleService(service) ? service.price.toLocaleString() : service.final_price.toLocaleString()}
                        </div>
                        {isBundleService(service) && service.discount_percentage > 0 && (
                          <div className="text-sm text-green-600">
                            {service.discount_percentage}% off (${service.base_price.toLocaleString()})
                          </div>
                        )}
                    <div className="text-sm text-gray-500">
                          {service.delivery_type === 'single' ? 'One-time delivery' : 
                           service.delivery_duration ? `${service.delivery_duration} ${service.delivery_unit} delivery` : 'Ongoing service'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            </div>
        )}

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <DocumentTextIcon className="w-8 h-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Single Services</p>
                <p className="text-2xl font-semibold text-gray-900">{mockSingleServices.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <Squares2X2Icon className="w-8 h-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Service Bundles</p>
                <p className="text-2xl font-semibold text-gray-900">{mockBundleServices.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <ClockIcon className="w-8 h-8 text-orange-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Timebound Services</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {allServices.filter(s => s.delivery_type === 'timebound').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <CurrencyDollarIcon className="w-8 h-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total Services</p>
                <p className="text-2xl font-semibold text-gray-900">{allServices.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}