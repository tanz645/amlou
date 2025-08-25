"use client";

import React, { useState } from "react";
import {
  TagIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
import ImageUploader from "./elements/ImageUploader";

interface ServiceFormData {
  name: string;
  serviceShortName: string;
  serviceCategory: string;
  shortDescription: string;
  description: string;
  serviceMaster: string;
  image: File | string | undefined;
  features: string[];
  serviceTasks: string[];
  pricing: {
    unit_price: number;
    max_discount: number;
  };
  minimum_time_required: number;
  minimum_order_unit: number;
  service_type: 'repeatable' | 'one-time';
  status: 'active' | 'inactive' | 'draft';
}

interface ServiceFormProps {
  initialData?: Partial<ServiceFormData>;
  onSubmit: (data: ServiceFormData) => void;
  onCancel: () => void;
  submitButtonText?: string;
  title?: string;
}

const categories = [
  "Development",
  "Marketing", 
  "Design",
  "Consulting",
  "Support",
  "Training",
  "Analytics",
  "Other"
];

const serviceTypes = [
  { value: 'repeatable', label: 'Repeatable' },
  { value: 'one-time', label: 'One-time' }
];

export default function ServiceForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  submitButtonText = "Create Service"
}: ServiceFormProps) {
  const [form, setForm] = useState<ServiceFormData>({
    name: initialData?.name || '',
    serviceShortName: initialData?.serviceShortName || '',
    serviceCategory: initialData?.serviceCategory || '',
    shortDescription: initialData?.shortDescription || '',
    description: initialData?.description || '',
    serviceMaster: initialData?.serviceMaster || '',
    image: initialData?.image || undefined,
    features: initialData?.features?.length ? [...initialData.features] : [''],
    serviceTasks: initialData?.serviceTasks?.length ? [...initialData.serviceTasks] : [''],
    pricing: {
      unit_price: initialData?.pricing?.unit_price || 0,
      max_discount: initialData?.pricing?.max_discount || 0
    },
    minimum_time_required: initialData?.minimum_time_required || 1,
    minimum_order_unit: initialData?.minimum_order_unit || 1,
    service_type: initialData?.service_type || 'repeatable',
    status: initialData?.status || 'draft'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      newErrors.name = 'Service name is required';
    }

    if (!form.serviceShortName.trim()) {
      newErrors.serviceShortName = 'Service short name is required';
    }

    if (!form.shortDescription.trim()) {
      newErrors.shortDescription = 'Short description is required';
    }

    if (!form.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!form.serviceCategory) {
      newErrors.serviceCategory = 'Category is required';
    }

    if (!form.serviceMaster.trim()) {
      newErrors.serviceMaster = 'Service master is required';
    }

    if (form.pricing.unit_price <= 0) {
      newErrors.unit_price = 'Price must be greater than 0';
    }

    if (form.minimum_time_required <= 0) {
      newErrors.minimum_time_required = 'Minimum time must be greater than 0';
    }

    if (form.minimum_order_unit <= 0) {
      newErrors.minimum_order_unit = 'Minimum order unit must be greater than 0';
    }

    if (form.features.length === 0 || (form.features.length === 1 && !form.features[0].trim())) {
      newErrors.features = 'At least one feature is required';
    }

    if (form.serviceTasks.length === 0 || (form.serviceTasks.length === 1 && !form.serviceTasks[0].trim())) {
      newErrors.serviceTasks = 'At least one service task is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(form);
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...form.features];
    newFeatures[index] = value;
    setForm({ ...form, features: newFeatures });
  };

  const addFeature = () => {
    setForm({ ...form, features: [...form.features, ''] });
  };

  const removeFeature = (index: number) => {
    if (form.features.length > 1) {
      const newFeatures = form.features.filter((_, i) => i !== index);
      setForm({ ...form, features: newFeatures });
    }
  };

  const handleServiceTaskChange = (index: number, value: string) => {
    const newServiceTasks = [...form.serviceTasks];
    newServiceTasks[index] = value;
    setForm({ ...form, serviceTasks: newServiceTasks });
  };

  const addServiceTask = () => {
    setForm({ ...form, serviceTasks: [...form.serviceTasks, ''] });
  };

  const removeServiceTask = (index: number) => {
    if (form.serviceTasks.length > 1) {
      const newServiceTasks = form.serviceTasks.filter((_, i) => i !== index);
      setForm({ ...form, serviceTasks: newServiceTasks });
    }
  };

  const handleInputChange = (field: string, value: string | number | File | undefined) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setForm({
        ...form,
        [parent]: {
          ...(form[parent as keyof ServiceFormData] as Record<string, unknown>),
          [child]: value
        }
      } as ServiceFormData);
    } else {
      setForm({ ...form, [field]: value });
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <form onSubmit={handleSubmit} className="p-8">
        <div className="space-y-8">
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <TagIcon className="w-5 h-5" />
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Website Development"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Short Name *
                </label>
                <input
                  type="text"
                  value={form.serviceShortName}
                  onChange={(e) => handleInputChange('serviceShortName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.serviceShortName ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g., WebDev"
                />
                {errors.serviceShortName && (
                  <p className="text-red-500 text-sm mt-1">{errors.serviceShortName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={form.serviceCategory}
                  onChange={(e) => handleInputChange('serviceCategory', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.serviceCategory ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.serviceCategory && (
                  <p className="text-red-500 text-sm mt-1">{errors.serviceCategory}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Type *
                </label>
                <select
                  value={form.service_type}
                  onChange={(e) => handleInputChange('service_type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {serviceTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Master *
                </label>
                <input
                  type="text"
                  value={form.serviceMaster}
                  onChange={(e) => handleInputChange('serviceMaster', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.serviceMaster ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g., John Doe"
                />
                {errors.serviceMaster && (
                  <p className="text-red-500 text-sm mt-1">{errors.serviceMaster}</p>
                )}
              </div>

              <div>
                <ImageUploader
                  name="serviceImage"
                  value={form.image}
                  onChange={(file) => handleInputChange('image', file || undefined)}
                  label="Service Image"
                  className="w-full"
                  previewClassName="w-32 h-32"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description *
              </label>
              <input
                type="text"
                value={form.shortDescription}
                onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.shortDescription ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Brief description of the service..."
              />
              {errors.shortDescription && (
                <p className="text-red-500 text-sm mt-1">{errors.shortDescription}</p>
              )}
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Description *
              </label>
              <textarea
                value={form.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Detailed description of the service..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>
          </div>

          {/* Pricing Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <CurrencyDollarIcon className="w-5 h-5" />
              Pricing Information (USD)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit Price (USD) *
                </label>
                <input
                  type="number"
                  value={form.pricing.unit_price}
                  onChange={(e) => handleInputChange('pricing.unit_price', parseFloat(e.target.value) || 0)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.unit_price ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
                {errors.unit_price && (
                  <p className="text-red-500 text-sm mt-1">{errors.unit_price}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Discount (USD)
                </label>
                <input
                  type="number"
                  value={form.pricing.max_discount}
                  onChange={(e) => handleInputChange('pricing.max_discount', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Order Unit *
                </label>
                <input
                  type="number"
                  value={form.minimum_order_unit}
                  onChange={(e) => handleInputChange('minimum_order_unit', parseInt(e.target.value) || 1)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.minimum_order_unit ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="1"
                  min="1"
                />
                {errors.minimum_order_unit && (
                  <p className="text-red-500 text-sm mt-1">{errors.minimum_order_unit}</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Time Required (Days) *
              </label>
              <input
                type="number"
                value={form.minimum_time_required}
                onChange={(e) => handleInputChange('minimum_time_required', parseInt(e.target.value) || 1)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.minimum_time_required ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="1"
                min="1"
              />
              {errors.minimum_time_required && (
                <p className="text-red-500 text-sm mt-1">{errors.minimum_time_required}</p>
              )}
            </div>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5" />
              Features & Benefits
            </h2>
            
            <div className="space-y-4">
              {form.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Feature ${index + 1}`}
                  />
                  {form.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              
              <button
                type="button"
                onClick={addFeature}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <CheckCircleIcon className="w-4 h-4" />
                Add Feature
              </button>
              
              {errors.features && (
                <p className="text-red-500 text-sm">{errors.features}</p>
              )}
            </div>
          </div>

          {/* Service Tasks */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <BriefcaseIcon className="w-5 h-5" />
              Service Tasks
            </h2>
            
            <div className="space-y-4">
              {form.serviceTasks.map((task, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={task}
                    onChange={(e) => handleServiceTaskChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Task ${index + 1}`}
                  />
                  {form.serviceTasks.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeServiceTask(index)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              
              <button
                type="button"
                onClick={addServiceTask}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <BriefcaseIcon className="w-4 h-4" />
                Add Service Task
              </button>
              
              {errors.serviceTasks && (
                <p className="text-red-500 text-sm">{errors.serviceTasks}</p>
              )}
            </div>
          </div>

          {/* Status */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Status</h2>
            
            <div className="flex items-center gap-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="draft"
                  checked={form.status === 'draft'}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Draft</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  value="active"
                  checked={form.status === 'active'}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Active</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  value="inactive"
                  checked={form.status === 'inactive'}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Inactive</span>
              </label>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-4 pt-8 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {submitButtonText}
          </button>
        </div>
      </form>
    </div>
  );
}
