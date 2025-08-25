'use client';

import React from 'react';
import { CurrencyDollarIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';

interface Project {
  id: string;
  project_value: number;
}

interface FinancialSummaryProps {
  project: Project;
  servicesTotal: number;
  packagesTotal: number;
  finalValue: number;
  totalSaved: number;
}

const FinancialSummary: React.FC<FinancialSummaryProps> = ({ 
  project, 
  servicesTotal, 
  packagesTotal, 
  finalValue, 
  totalSaved 
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
        <h3 className="text-lg font-semibold">Financial Summary</h3>
      </div>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Original Value</span>
            <ArrowTrendingUpIcon className="w-4 h-4 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">${project.project_value.toLocaleString()}</p>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-green-600">Final Value</span>
            <ArrowTrendingDownIcon className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-600">${finalValue.toLocaleString()}</p>
        </div>
        
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-blue-600">Total Saved</span>
            <ArrowTrendingUpIcon className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-xl font-bold text-blue-600">${totalSaved.toLocaleString()}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <p className="text-sm text-gray-600">Services</p>
            <p className="font-medium">${servicesTotal.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Packages</p>
            <p className="font-medium">${packagesTotal.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary; 