'use client';

import React from 'react';
import { DocumentIcon } from '@heroicons/react/24/outline';

interface Project {
  agreement_number: string;
  payment_methods: string[];
  payment_security: string;
}

interface ProjectAgreementsProps {
  project: Project;
}

const ProjectAgreements: React.FC<ProjectAgreementsProps> = ({ project }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <DocumentIcon className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold">Agreement</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">Agreement Number</p>
          <p className="font-medium text-gray-900">{project.agreement_number}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600 mb-2">Payment Methods</p>
          <div className="flex flex-wrap gap-2">
            {project.payment_methods.map(method => (
              <span key={method} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                {method.replace('_', ' ').toUpperCase()}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <p className="text-sm text-gray-600 mb-1">Payment Security</p>
          <p className="font-medium capitalize">{project.payment_security}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectAgreements; 