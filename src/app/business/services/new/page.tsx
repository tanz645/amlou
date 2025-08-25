"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import ServiceForm from "../../../../components/ServiceForm";

export default function NewServicePage() {
  const router = useRouter();

  const handleSubmit = (formData: {
    name: string;
    description: string;
    category: string;
    pricing: {
      unit_price: number;
      currency: string;
      billing_cycle: 'one-time' | 'monthly' | 'quarterly' | 'yearly';
    };
    features: string[];
    status: 'active' | 'inactive' | 'draft';
  }) => {
    // Here you would typically save to your API
    console.log('Creating new service:', formData);
    
    // For now, just redirect back to services page
    alert('Service created successfully!');
    router.push('/business/services');
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => router.back()}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Service</h1>
              <p className="text-gray-600 mt-2">Create a new service offering for your business</p>
            </div>
          </div>
        </div>

        {/* Service Form Component */}
        <ServiceForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitButtonText="Create Service"
          title="Add New Service"
        />
      </div>
    </div>
  );
}
