'use client';

import { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  XMarkIcon,
  TagIcon,
  ClockIcon,
  CurrencyDollarIcon,
  TrashIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import ImageUploader from './elements/ImageUploader';
import { BundleFormData, BundleServiceItem, SingleService, DeliveryType } from '../types/services';

interface BundleFormProps {
  onSubmit: (bundleData: BundleFormData) => void;
  onCancel: () => void;
  initialData?: Partial<BundleFormData>;
  submitButtonText?: string;
  title?: string;
  availableServices: SingleService[];
}

const serviceCategories = [
  { id: 'design', name: 'Design', color: 'bg-purple-100 text-purple-800' },
  { id: 'development', name: 'Development', color: 'bg-blue-100 text-blue-800' },
  { id: 'marketing', name: 'Marketing', color: 'bg-green-100 text-green-800' },
  { id: 'content', name: 'Content', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'maintenance', name: 'Maintenance', color: 'bg-gray-100 text-gray-800' },
  { id: 'consulting', name: 'Consulting', color: 'bg-indigo-100 text-indigo-800' }
];

const deliveryUnits = [
  { value: 'days', label: 'Days' },
  { value: 'weeks', label: 'Weeks' },
  { value: 'months', label: 'Months' }
];

export default function BundleForm({ 
  onSubmit, 
  onCancel, 
  initialData,
  submitButtonText = "Create Bundle",
  title = "Create New Service Bundle",
  availableServices
}: BundleFormProps) {
  const [formData, setFormData] = useState<BundleFormData>({
    name: '',
    description: '',
    image: undefined,
    services: [],
    discount_percentage: 0,
    delivery_type: 'single',
    delivery_duration: undefined,
    delivery_unit: 'days',
    category: 'design',
    tags: [],
    is_active: true,
    ...initialData
  });

  const [newTag, setNewTag] = useState('');
  const [showServiceSelector, setShowServiceSelector] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (field: keyof BundleFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({
        ...prev,
        image: undefined
      }));
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleAddService = (service: SingleService) => {
    const existingServiceIndex = formData.services.findIndex(s => s.service_id === service.id);
    
    if (existingServiceIndex >= 0) {
      // Update quantity if service already exists
      const updatedServices = [...formData.services];
      updatedServices[existingServiceIndex].quantity += 1;
      updatedServices[existingServiceIndex].subtotal = updatedServices[existingServiceIndex].quantity * updatedServices[existingServiceIndex].service_price;
      setFormData(prev => ({ ...prev, services: updatedServices }));
    } else {
      // Add new service
      const newService: BundleServiceItem = {
        service_id: service.id,
        service_name: service.name,
        service_price: service.price,
        quantity: 1,
        subtotal: service.price
      };
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, newService]
      }));
    }
    setShowServiceSelector(false);
    setSearchTerm('');
  };

  const handleRemoveService = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter(s => s.service_id !== serviceId)
    }));
  };

  const handleServiceQuantityChange = (serviceId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setFormData(prev => ({
      ...prev,
      services: prev.services.map(s => 
        s.service_id === serviceId 
          ? { ...s, quantity, subtotal: quantity * s.service_price }
          : s
      )
    }));
  };

  const calculateBasePrice = () => {
    return formData.services.reduce((total, service) => total + service.subtotal, 0);
  };

  const calculateFinalPrice = () => {
    const basePrice = calculateBasePrice();
    const discount = (basePrice * formData.discount_percentage) / 100;
    return basePrice - discount;
  };

  const filteredServices = availableServices.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isFormValid = formData.name.trim() && 
                     formData.description.trim() && 
                     formData.services.length > 0;

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Bundle Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Complete Social Media Package"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe what this bundle includes..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bundle Image (Optional)</label>
          <ImageUploader
            name="bundle-image"
            value={formData.image}
            onChange={handleImageChange}
            label=""
            className="flex justify-start"
            previewClassName="w-32 h-32"
          />
          <p className="text-sm text-gray-500 mt-2">Upload an image to represent this bundle</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {serviceCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
            <input
              type="number"
              value={formData.discount_percentage}
              onChange={(e) => handleInputChange('discount_percentage', parseFloat(e.target.value) || 0)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="0"
              max="100"
              step="0.1"
            />
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Services in Bundle</h3>
          <button
            type="button"
            onClick={() => setShowServiceSelector(true)}
            className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Service
          </button>
        </div>

        {formData.services.length === 0 ? (
          <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
            <PlusIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>No services added yet. Click "Add Service" to get started.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {formData.services.map((service) => (
              <div key={service.service_id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{service.service_name}</h4>
                    <p className="text-sm text-gray-600">${service.service_price.toLocaleString()} per unit</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveService(service.service_id)}
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
                      onChange={(e) => handleServiceQuantityChange(service.service_id, parseInt(e.target.value) || 1)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Unit Price</label>
                    <div className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 font-medium">
                      ${service.service_price.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Subtotal</label>
                    <div className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 font-medium">
                      ${service.subtotal.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pricing Summary */}
      {formData.services.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Pricing Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Base Price:</span>
              <span className="font-medium">${calculateBasePrice().toLocaleString()}</span>
            </div>
            {formData.discount_percentage > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Discount ({formData.discount_percentage}%):</span>
                <span className="font-medium text-red-600">-${((calculateBasePrice() * formData.discount_percentage) / 100).toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-gray-200 pt-2">
              <span className="font-semibold text-gray-900">Final Price:</span>
              <span className="font-semibold text-green-600 text-lg">${calculateFinalPrice().toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Delivery Type */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Delivery Type</h3>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <input
              id="single-delivery"
              type="radio"
              value="single"
              checked={formData.delivery_type === 'single'}
              onChange={(e) => handleInputChange('delivery_type', e.target.value as DeliveryType)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="single-delivery" className="ml-3 block text-sm font-medium text-gray-700">
              Single Time Delivery
              <span className="text-gray-500 text-xs block">One-time bundle delivery</span>
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="timebound-delivery"
              type="radio"
              value="timebound"
              checked={formData.delivery_type === 'timebound'}
              onChange={(e) => handleInputChange('delivery_type', e.target.value as DeliveryType)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="timebound-delivery" className="ml-3 block text-sm font-medium text-gray-700">
              Time Bound Delivery
              <span className="text-gray-500 text-xs block">Ongoing bundle service for a specific duration</span>
            </label>
          </div>
        </div>

        {formData.delivery_type === 'timebound' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Duration (Optional)</label>
              <input
                type="number"
                value={formData.delivery_duration || ''}
                onChange={(e) => handleInputChange('delivery_duration', parseInt(e.target.value) || undefined)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="1"
                placeholder="e.g., 2 (optional)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Unit (Optional)</label>
              <select
                value={formData.delivery_unit || 'days'}
                onChange={(e) => handleInputChange('delivery_unit', e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {deliveryUnits.map(unit => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Tags</h3>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Add a tag..."
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>

        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  <XMarkIcon className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Status */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Status</h3>
        
        <div className="flex items-center">
          <input
            id="active"
            type="checkbox"
            checked={formData.is_active}
            onChange={(e) => handleInputChange('is_active', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="active" className="ml-3 block text-sm font-medium text-gray-700">
            Active Bundle
            <span className="text-gray-500 text-xs block">This bundle will be available for selection</span>
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!isFormValid}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitButtonText}
        </button>
      </div>

      {/* Service Selector Modal */}
      {showServiceSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Select Service</h3>
              <button
                onClick={() => setShowServiceSelector(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search services..."
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleAddService(service)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{service.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                            service.delivery_type === 'single' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {service.delivery_type === 'single' ? 'Single' : 'Timebound'}
                          </span>
                          {service.delivery_type === 'timebound' && service.delivery_duration && (
                            <span className="text-xs text-gray-500">
                              {service.delivery_duration} {service.delivery_unit}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">${service.price.toLocaleString()}</div>
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
