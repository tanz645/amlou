/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { DocumentTextIcon, EyeIcon, PlusIcon, CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import invoices from '@/data/invoices.json';

interface Invoice {
  invoice_id: string;
  project_id: string;
  issue_date: string;
  due_date: string;
  status: string;
  total: number;
  subtotal: number;
  tax: number;
  discount: number;
  items: Array<{
    description: string;
    quantity: number;
    unit_price: number;
    total: number;
  }>;
  client_info: {
    name: string;
    email: string;
    address: string;
  };
}

interface Project {
  id: string;
  name: string;
  status: string;
}

interface ProjectInvoicesTabProps {
  project: Project;
}

const ProjectInvoicesTab: React.FC<ProjectInvoicesTabProps> = ({ project }) => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  
  const projectInvoices = invoices.filter((inv: any) => inv.project_id === project.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return '✓';
      case 'partial': return '○';
      case 'overdue': return '!';
      default: return '○';
    }
  };

  const openInvoiceDetails = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowInvoiceModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">{project.name} - Invoices</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            project.status === 'completed' ? 'bg-green-100 text-green-800' :
            project.status === 'active' ? 'bg-blue-100 text-blue-800' :
            project.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {project.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>
      </div>

      {/* Invoices List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Invoices</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">
              <PlusIcon className="w-4 h-4" />
              Create Invoice
            </button>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {projectInvoices.map((invoice: any) => (
            <div key={invoice.invoice_id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <DocumentTextIcon className="w-8 h-8 text-blue-500" />
                    <div>
                      <h4 className="font-medium text-gray-900">Invoice #{invoice.invoice_id}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          <span>Issued: {new Date(invoice.issue_date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CurrencyDollarIcon className="w-4 h-4" />
                          <span>${invoice.total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(invoice.status)}`}>
                    {getStatusIcon(invoice.status)} {invoice.status.toUpperCase()}
                  </span>
                  <button
                    onClick={() => openInvoiceDetails(invoice)}
                    className="flex items-center gap-2 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-md text-sm font-medium"
                  >
                    <EyeIcon className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invoice Summary */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-4">Invoice Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {projectInvoices.length}
            </div>
            <div className="text-sm text-blue-700">Total Invoices</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {projectInvoices.filter((inv: any) => inv.status === 'paid').length}
            </div>
            <div className="text-sm text-green-700">Paid</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {projectInvoices.filter((inv: any) => inv.status === 'partial').length}
            </div>
            <div className="text-sm text-yellow-700">Partial</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {projectInvoices.filter((inv: any) => inv.status === 'overdue').length}
            </div>
            <div className="text-sm text-red-700">Overdue</div>
          </div>
        </div>
      </div>

      {/* Invoice Details Modal */}
      {showInvoiceModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Invoice #{selectedInvoice.invoice_id}</h2>
                <button
                  onClick={() => setShowInvoiceModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Client Information</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>{selectedInvoice.client_info?.name || 'N/A'}</p>
                    <p>{selectedInvoice.client_info?.email || 'N/A'}</p>
                    <p>{selectedInvoice.client_info?.address || 'N/A'}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Invoice Details</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Issue Date: {new Date(selectedInvoice.issue_date).toLocaleDateString()}</p>
                    <p>Due Date: {new Date(selectedInvoice.due_date).toLocaleDateString()}</p>
                    <p>Status: <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedInvoice.status)}`}>
                      {selectedInvoice.status.toUpperCase()}
                    </span></p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Invoice Items</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Description</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">Quantity</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">Unit Price</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedInvoice.items?.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 text-sm text-gray-900">{item.description}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">{item.quantity}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">${item.unit_price.toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">${item.total.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-end">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>${selectedInvoice.subtotal?.toLocaleString() || '0'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax:</span>
                      <span>${selectedInvoice.tax?.toLocaleString() || '0'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Discount:</span>
                      <span>-${selectedInvoice.discount?.toLocaleString() || '0'}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Total:</span>
                      <span>${selectedInvoice.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectInvoicesTab; 