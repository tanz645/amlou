'use client';

import React from 'react';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

interface Invoice {
  invoice_id: string;
  issue_date: string;
  status: string;
  total: number;
}

interface ProjectInvoicesProps {
  invoices: Invoice[];
}

const ProjectInvoices: React.FC<ProjectInvoicesProps> = ({ invoices }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <DocumentTextIcon className="w-6 h-6 text-purple-600" />
        <h3 className="text-lg font-semibold">Invoices</h3>
      </div>
      
      <div className="space-y-4">
        {invoices.map(invoice => (
          <div key={invoice.invoice_id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium">Invoice #{invoice.invoice_id}</p>
                <p className="text-sm text-gray-600">
                  {new Date(invoice.issue_date).toLocaleDateString()}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(invoice.status)}`}>
                {invoice.status.toUpperCase()}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              <p>Amount: ${invoice.total.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectInvoices; 