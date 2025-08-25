'use client';

import React, { useState } from 'react';
import { CalendarIcon, UserIcon, BuildingOfficeIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import servicesData from '../data/services.json';
import categoriesData from '../data/services_categories.json';

interface Project {
  id: string;
  name: string;
  description: string;
  client_id: string;
  project_master: string;
  project_type: string;
  start_date: string;
  end_date: string;
  status: string;
  key_deliverables: string[];
  services: Array<{
    id: string;
    discount: number;
  }>;
  project_value: number;
  agreement_number: string;
}

interface Client {
  id: string;
  client_name: string;
  company_names: string[];
  email: string;
}

interface ProjectOverviewProps {
  project: Project;
  client: Client | null;
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ project, client }) => {
  const [expandedServices, setExpandedServices] = useState<Set<string>>(new Set());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200',
      red: 'bg-red-100 text-red-800 border-red-200',
      pink: 'bg-pink-100 text-pink-800 border-pink-200',
      indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      teal: 'bg-teal-100 text-teal-800 border-teal-200'
    };
    return colorMap[color] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getSubscribedServices = () => {
    return project.services.map(projectService => {
      const service = servicesData.services.find(s => s.id === projectService.id);
      if (!service) return null;
      
      const category = categoriesData.categories.find(c => c.id === service.serviceCategory);
      return {
        ...service,
        category,
        discount: projectService.discount
      };
    }).filter(Boolean) as Array<{
      id: string;
      name: string;
      serviceShortName: string;
      serviceCategory: string;
      serviceTasks: string[];
      serviceMaster: string;
      pricing: { unit_price: number; max_discount: number };
      category: { id: string; name: string; icon: string; color: string } | undefined;
      discount: number;
    }>;
  };

  const subscribedServices = getSubscribedServices();

  const toggleServiceExpansion = (serviceId: string) => {
    const newExpanded = new Set(expandedServices);
    if (newExpanded.has(serviceId)) {
      newExpanded.delete(serviceId);
    } else {
      newExpanded.add(serviceId);
    }
    setExpandedServices(newExpanded);
  };

  const calculateProgress = () => {
    const startDate = new Date(project.start_date);
    const endDate = new Date(project.end_date);
    const today = new Date();
    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsed = today.getTime() - startDate.getTime();
    return Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);
  };

  const progress = calculateProgress();

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{project.name}</h2>
            <p className="text-gray-600 mt-1">{project.description}</p>
          </div>
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
            {project.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>
        
        {/* Project Progress */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Project Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
            <span>Start: {new Date(project.start_date).toLocaleDateString()}</span>
            <span>End: {new Date(project.end_date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Project Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Client Information */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <BuildingOfficeIcon className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Client</h3>
          </div>
          <div className="space-y-2">
            <p className="font-medium text-gray-900">{client?.client_name}</p>
            <p className="text-sm text-gray-600">{client?.company_names?.[0]}</p>
            <p className="text-sm text-gray-500">{client?.email}</p>
          </div>
        </div>

        {/* Project Master */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <UserIcon className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold">Project Master</h3>
          </div>
          <p className="font-medium text-gray-900">{project.project_master}</p>
        </div>

        {/* Project Type */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-sm font-bold">P</span>
            </div>
            <h3 className="text-lg font-semibold">Project Type</h3>
          </div>
          <p className="font-medium text-gray-900 capitalize">{project.project_type.replace('_', ' ')}</p>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <CalendarIcon className="w-6 h-6 text-orange-600" />
            <h3 className="text-lg font-semibold">Timeline</h3>
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-600">Start Date</p>
              <p className="font-medium">{new Date(project.start_date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">End Date</p>
              <p className="font-medium">{new Date(project.end_date).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Project Value */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold">Project Value</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">${project.project_value.toLocaleString()}</p>
        </div>

        {/* Agreement */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-sm font-bold">A</span>
            </div>
            <h3 className="text-lg font-semibold">Agreement</h3>
          </div>
          <p className="font-medium text-gray-900">{project.agreement_number}</p>
        </div>
      </div>

      {/* Subscribed Services */}
      {subscribedServices.length > 0 && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Subscribed Services</h3>
            <span className="text-sm text-gray-500">{subscribedServices.length} services</span>
          </div>
          <div className="space-y-4">
            {subscribedServices.map((service) => (
              <div key={service.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div 
                  className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleServiceExpansion(service.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{service.category?.icon}</span>
                        <div>
                          <h4 className="font-semibold text-gray-900">{service.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-medium text-gray-600">{service.serviceShortName}</span>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(service.category?.color || 'gray')}`}>
                              {service.category?.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Discount</p>
                        <p className="font-semibold text-green-600">{service.discount}%</p>
                      </div>
                      {expandedServices.has(service.id) ? (
                        <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
                
                {expandedServices.has(service.id) && (
                  <div className="border-t border-gray-200 bg-gray-50 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-3">Service Details</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Service Master:</span>
                            <span className="font-medium">{service.serviceMaster}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Base Price:</span>
                            <span className="font-medium">${service.pricing.unit_price.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Discounted Price:</span>
                            <span className="font-medium text-green-600">
                              ${(service.pricing.unit_price * (1 - service.discount / 100)).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-900 mb-3">Service Tasks</h5>
                        <div className="space-y-2">
                          {service.serviceTasks.map((task: string, index: number) => (
                            <div key={index} className="flex items-center gap-2">
                              <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm text-gray-600">{task}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Deliverables */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Key Deliverables</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.key_deliverables.map((deliverable: string, index: number) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">{deliverable}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview; 