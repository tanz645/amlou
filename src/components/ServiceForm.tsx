'use client';

import { useState } from 'react';
import {
  PlusIcon, 
  XMarkIcon,
  TagIcon,
  ClockIcon,
  CurrencyDollarIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { ServiceFormData, DeliveryType, ServiceDeliverable } from '../types/services';
import ImageUploader from './elements/ImageUploader';

interface ServiceFormProps {
  onSubmit: (serviceData: ServiceFormData) => void;
  onCancel: () => void;
  initialData?: Partial<ServiceFormData>;
  submitButtonText?: string;
  title?: string;
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

export default function ServiceForm({ 
  onSubmit, 
  onCancel, 
  initialData,
  submitButtonText = "Create Service",
  title = "Create New Service"
}: ServiceFormProps) {
  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    description: '',
    image: undefined,
    price: 0,
    deliverables: [],
    delivery_type: 'single',
    delivery_duration: undefined,
    delivery_unit: 'days',
    category: 'design',
    tags: [],
    is_active: true,
    ...initialData
  });

  const [newTag, setNewTag] = useState('');
  const [newDeliverable, setNewDeliverable] = useState({
    name: '',
    estimated_time: 1,
    price: 0,
    quantity: 1
  });

  const handleInputChange = (field: keyof ServiceFormData, value: any) => {
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

  const handleAddDeliverable = () => {
    if (newDeliverable.name.trim() && newDeliverable.price > 0) {
      const deliverable: ServiceDeliverable = {
        id: `deliverable_${Date.now()}`,
        name: newDeliverable.name.trim(),
        estimated_time: newDeliverable.estimated_time,
        price: newDeliverable.price,
        quantity: newDeliverable.quantity,
        subtotal: newDeliverable.price * newDeliverable.quantity
      };
      
      setFormData(prev => ({
        ...prev,
        deliverables: [...prev.deliverables, deliverable]
      }));
      
      setNewDeliverable({
        name: '',
        estimated_time: 1,
        price: 0,
        quantity: 1
      });
    }
  };

  const handleRemoveDeliverable = (deliverableId: string) => {
    setFormData(prev => ({
      ...prev,
      deliverables: prev.deliverables.filter(deliverable => deliverable.id !== deliverableId)
    }));
  };

  const calculateTotalPrice = () => {
    return formData.deliverables.reduce((total, deliverable) => total + deliverable.subtotal, 0);
  };

  const calculateTotalTime = () => {
    return formData.deliverables.reduce((total, deliverable) => total + (deliverable.estimated_time * deliverable.quantity), 0);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isFormValid = formData.name.trim() && 
                     formData.description.trim() && 
                     (formData.price > 0 || formData.deliverables.length > 0);

  return (
    <div className="space-y-6">
          {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
        
              <div>
          <label className="block text-sm font-medium text-gray-700">Service Name</label>
                <input
                  type="text"
            value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Social Media Copy Writing"
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
            placeholder="Describe what this service includes..."
            required
          />
              </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Service Image (Optional)</label>
          <ImageUploader
            name="service-image"
            value={formData.image}
            onChange={handleImageChange}
            label=""
            className="flex justify-start"
            previewClassName="w-32 h-32"
          />
          <p className="text-sm text-gray-500 mt-2">Upload an image to represent this service</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
            <label className="block text-sm font-medium text-gray-700">Base Price ($)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="0"
              step="0.01"
              placeholder="Base service price (optional if using deliverables)"
            />
            <p className="text-sm text-gray-500 mt-1">Leave empty if pricing is based on deliverables below</p>
              </div>

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
              </div>
            </div>

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
              <span className="text-gray-500 text-xs block">One-time service delivery (e.g., logo design, website development)</span>
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
              <span className="text-gray-500 text-xs block">Ongoing service for a specific duration (e.g., website maintenance, social media management)</span>
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

      {/* Deliverables */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Service Deliverables</h3>
        <p className="text-sm text-gray-600">Break down your service into specific deliverables with individual pricing</p>
        
        {/* Add New Deliverable */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-md font-medium text-gray-900 mb-3">Add New Deliverable</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Deliverable Name</label>
              <input
                type="text"
                value={newDeliverable.name}
                onChange={(e) => setNewDeliverable(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Logo Design, Website Mockup"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Estimated Time (hours)</label>
              <input
                type="number"
                value={newDeliverable.estimated_time}
                onChange={(e) => setNewDeliverable(prev => ({ ...prev, estimated_time: parseInt(e.target.value) || 1 }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price ($)</label>
              <input
                type="number"
                value={newDeliverable.price}
                onChange={(e) => setNewDeliverable(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                value={newDeliverable.quantity}
                onChange={(e) => setNewDeliverable(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="1"
              />
            </div>
          </div>
          <div className="mt-3">
            <button
              type="button"
              onClick={handleAddDeliverable}
              disabled={!newDeliverable.name.trim() || newDeliverable.price <= 0}
              className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Deliverable
            </button>
          </div>
        </div>

        {/* Deliverables List */}
        {formData.deliverables.length === 0 ? (
          <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
            <ClockIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>No deliverables added yet. Add deliverables to break down your service.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {formData.deliverables.map((deliverable) => (
              <div key={deliverable.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{deliverable.name}</h4>
                    <p className="text-sm text-gray-600">
                      {deliverable.estimated_time} hour{deliverable.estimated_time !== 1 ? 's' : ''} × {deliverable.quantity} = {deliverable.estimated_time * deliverable.quantity} total hours
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveDeliverable(deliverable.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Unit Price</label>
                    <div className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 font-medium">
                      ${deliverable.price.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <div className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 font-medium">
                      {deliverable.quantity}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Subtotal</label>
                    <div className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 font-medium">
                      ${deliverable.subtotal.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Deliverables Summary */}
        {formData.deliverables.length > 0 && (
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-md font-medium text-gray-900 mb-3">Deliverables Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-700">Total Deliverables:</span>
                <span className="ml-2 text-sm text-gray-900">{formData.deliverables.length}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Total Time:</span>
                <span className="ml-2 text-sm text-gray-900">{calculateTotalTime()} hours</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Total Price from Deliverables:</span>
                <span className="ml-2 text-sm text-gray-900">${calculateTotalPrice().toLocaleString()}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Base Price:</span>
                <span className="ml-2 text-sm text-gray-900">${formData.price.toLocaleString()}</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-blue-200">
              <div className="flex justify-between">
                <span className="text-lg font-semibold text-gray-900">Total Service Price:</span>
                <span className="text-lg font-semibold text-blue-600">
                  ${(formData.price + calculateTotalPrice()).toLocaleString()}
                </span>
              </div>
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
            Active Service
            <span className="text-gray-500 text-xs block">This service will be available for selection</span>
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
    </div>
  );
}