'use client';

import { useState } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import servicesData from '@/data/services.json';

interface PackageService {
  service_id: string;
  name: string;
  price: number;
}

interface PackageFormValues {
  id?: string;
  name: string;
  description: string;
  services: PackageService[];
  features: string[];
  total_price: number;
  created_at?: string;
}

interface FormPackagesProps {
  initialValues?: PackageFormValues;
  onSubmit: (values: PackageFormValues) => void;
  submitLabel?: string;
}

export default function FormPackages({ initialValues, onSubmit, submitLabel = 'Save Package' }: FormPackagesProps) {
  const [form, setForm] = useState<PackageFormValues>({
    name: '',
    description: '',
    services: [],
    features: [''],
    total_price: 0,
    ...initialValues,
  });

  const [newFeature, setNewFeature] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceAdd = (serviceId: string) => {
    const service = servicesData.services.find((s) => s.id === serviceId);
    if (service) {
      setForm((prev) => ({
        ...prev,
        services: [
          ...prev.services,
          {
            service_id: service.id,
            name: service.name,
            price: service.pricing?.unit_price || 0,
          },
        ],
        total_price: prev.total_price + (service.pricing?.unit_price || 0),
      }));
    }
  };

  const handleServiceRemove = (index: number) => {
    setForm((prev) => ({
      ...prev,
      total_price: prev.total_price - prev.services[index].price,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  const handleFeatureAdd = () => {
    if (newFeature.trim()) {
      setForm((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature('');
    }
  };

  const handleFeatureRemove = (index: number) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8 max-w-2xl mx-auto space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Package Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Services</label>
        <div className="space-y-4">
          {form.services.map((service, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
              <div>
                <span className="font-medium">{service.name}</span>
                <span className="text-gray-600 ml-2">${service.price}</span>
              </div>
              <button
                type="button"
                onClick={() => handleServiceRemove(index)}
                className="text-red-500 hover:text-red-700"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          ))}
          <div className="flex gap-2">
            <select
              onChange={(e) => handleServiceAdd(e.target.value)}
              className="flex-1 border border-gray-300 rounded px-3 py-2"
              value=""
            >
              <option value="">Select a service</option>
              {servicesData.services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} - ${service.pricing?.unit_price || 0}
                </option>
              ))}
            </select>
            <button
              type="button"
                              onClick={() => window.location.href = '/business/services/new'}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add New Service
            </button>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
        <div className="space-y-2">
          {form.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => {
                  const newFeatures = [...form.features];
                  newFeatures[index] = e.target.value;
                  setForm((prev) => ({ ...prev, features: newFeatures }));
                }}
                className="flex-1 border border-gray-300 rounded px-3 py-2"
              />
              <button
                type="button"
                onClick={() => handleFeatureRemove(index)}
                className="text-red-500 hover:text-red-700"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          ))}
          <div className="flex gap-2">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="Add new feature"
              className="flex-1 border border-gray-300 rounded px-3 py-2"
            />
            <button
              type="button"
              onClick={handleFeatureAdd}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Total Price</label>
        <input
          type="number"
          name="total_price"
          value={form.total_price}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
          min={0}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition"
      >
        {submitLabel}
      </button>
    </form>
  );
} 