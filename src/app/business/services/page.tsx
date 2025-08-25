'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import servicesData from '@/data/services.json';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  PlusIcon,
  EyeIcon,
  CurrencyDollarIcon,
  ClockIcon,
  TagIcon
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

const services: Service[] = servicesData.services as Service[];

export default function BusinessServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [itemsToShow, setItemsToShow] = useState(6); // Show 6 items initially
  const router = useRouter();

  // Get unique categories and types for filters
  const categories = useMemo(() => {
    const cats = [...new Set(services.map(service => service.serviceCategory))];
    return cats.map(cat => ({
      value: cat,
      label: cat.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
    }));
  }, []);

  const serviceTypes = useMemo(() => {
    const types = [...new Set(services.map(service => service.service_type))];
    return types.map(type => ({
      value: type,
      label: type.charAt(0).toUpperCase() + type.slice(1)
    }));
  }, []);

  // Filter services based on search and filters
  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.serviceCategory.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || service.serviceCategory === selectedCategory;
      const matchesType = selectedType === 'all' || service.service_type === selectedType;

      return matchesSearch && matchesCategory && matchesType;
    });
  }, [searchTerm, selectedCategory, selectedType]);

  const handleServiceClick = (serviceId: string) => {
    router.push(`/business/services/${serviceId}`);
  };

  const handleLoadMore = () => {
    setItemsToShow(prev => prev + 6); // Load 6 more items
  };

  const visibleServices = filteredServices.slice(0, itemsToShow);
  const hasMoreServices = visibleServices.length < filteredServices.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Services</h1>
              <p className="mt-2 text-gray-600">
                Manage and view all the services you provide to your clients
              </p>
            </div>
            <button
              onClick={() => router.push('/business/services/new')}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Add New Service
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Service Type Filter */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                {serviceTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-end text-sm text-gray-600">
              {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-12">
            <FunnelIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No services found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => handleServiceClick(service.id)}
              >
                {/* Service Image */}
                <div className="relative h-48 bg-gray-100 rounded-t-lg overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      service.service_type === 'repeatable' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {service.service_type}
                    </span>
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {service.name}
                    </h3>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {service.shortDescription}
                  </p>

                  {/* Service Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <TagIcon className="w-4 h-4 mr-2" />
                      <span className="capitalize">{service.serviceCategory.replace('_', ' ')}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <CurrencyDollarIcon className="w-4 h-4 mr-2" />
                      <span className="font-medium text-green-600">${service.pricing.unit_price.toLocaleString()}</span>
                      <span className="ml-1">per unit</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <ClockIcon className="w-4 h-4 mr-2" />
                      <span>{service.minimum_time_required} days minimum</span>
                    </div>
                  </div>

                  {/* Service Master */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Master:</span> {service.serviceMaster}
                    </div>
                    <button className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                      <EyeIcon className="w-4 h-4 mr-1" />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
            </div>
            
            {/* Load More Button */}
            {hasMoreServices && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleLoadMore}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Load More Services
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
