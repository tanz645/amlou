"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  UserIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// Progress Pie Chart Component
const ProgressPieChart = ({ progress }: { progress: number }) => {
  const data = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [progress, 100 - progress],
        backgroundColor: [
          progress >= 80 ? '#10B981' : progress >= 60 ? '#F59E0B' : '#EF4444',
          '#F3F4F6'
        ],
        borderColor: [
          progress >= 80 ? '#059669' : progress >= 60 ? '#D97706' : '#DC2626',
          '#E5E7EB'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    cutout: '70%',
  };

  return (
    <div className="relative w-16 h-16">
      <Pie data={data} options={options} />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-semibold text-gray-700">{progress}%</span>
      </div>
    </div>
  );
};

// Project interface
interface Project {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold' | 'cancelled';
  progress: number;
  startDate: string;
  endDate: string;
  monthlyRevenue: number;
  totalRevenue: number;
  paymentDue: number;
  nextPaymentDate: string | null;
  paymentStatus: 'paid' | 'overdue' | 'pending' | 'terminated';
  services: string[];
  assignedTo: string;
  notes: string;
}

interface Client {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: string;
  type: string;
  assignedTo: string;
  website: string;
  address: string;
  notes: string;
  projects: Project[];
}

interface ClientCardProps {
  client: Client;
  onClientClick: (client: Client) => void;
  onStatusChange: (clientId: number, newStatus: string) => void;
  clientStatuses: string[];
  getStatusColor: (status: string) => string;
  getTypeColor: (type: string) => string;
  getPaymentStatusColor: (status: string) => string;
  getProjectStatusColor: (status: string) => string;
  getDaysUntilDue: (nextPaymentDate: string | null) => number | null;
  getDaysUntilTermination: (endDate: string | null) => number | null;
}

export default function ClientCard({
  client,
  onClientClick,
  onStatusChange,
  clientStatuses,
  getStatusColor,
  getTypeColor,
  getPaymentStatusColor,
  getProjectStatusColor,
  getDaysUntilDue,
  getDaysUntilTermination,
}: ClientCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/business/clients/${client.id}`);
  };

  // Calculate client-level totals from projects
  const totalMonthlyRevenue = client.projects.reduce((sum, project) => sum + project.monthlyRevenue, 0);
  const totalRevenue = client.projects.reduce((sum, project) => sum + project.totalRevenue, 0);
  const totalPaymentDue = client.projects.reduce((sum, project) => sum + project.paymentDue, 0);
  const activeProjects = client.projects.filter(project => project.status === 'active');
  const completedProjects = client.projects.filter(project => project.status === 'completed');
  
  // Calculate overall progress (average of active projects)
  const overallProgress = activeProjects.length > 0 
    ? Math.round(activeProjects.reduce((sum, project) => sum + project.progress, 0) / activeProjects.length)
    : 0;

  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{client.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{client.company}</p>
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(client.status)}`}>
              {client.status}
            </span>
            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getTypeColor(client.type)}`}>
              {client.type}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/business/clients/${client.id}`);
            }}
            className="text-blue-600 hover:text-blue-900"
          >
            <EyeIcon className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Edit client:", client.id);
            }}
            className="text-gray-600 hover:text-gray-900"
          >
            <PencilIcon className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Delete client:", client.id);
            }}
            className="text-red-600 hover:text-red-900"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Projects Overview */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-gray-900 flex items-center gap-1">
            <FolderIcon className="w-4 h-4" />
            Projects ({client.projects.length})
          </h4>
          <div className="flex items-center gap-2">
            <span className="text-xs text-green-600 font-medium">{activeProjects.length} active</span>
            <span className="text-xs text-blue-600 font-medium">{completedProjects.length} completed</span>
          </div>
        </div>
        
        {/* Overall Progress */}
        <div className="flex items-center gap-3 mb-3">
          <ProgressPieChart progress={overallProgress} />
          <div>
            <p className="text-sm font-medium text-gray-900">Overall Progress</p>
            <p className="text-xs text-gray-500">{overallProgress}% completed</p>
          </div>
        </div>

        {/* Project List */}
        {client.projects.length > 0 && (
          <div className="space-y-2">
            {client.projects.slice(0, 3).map((project) => (
              <div key={project.id} className="flex items-center justify-between p-2 bg-white rounded border">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{project.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-flex px-1 py-0.5 text-xs font-medium rounded ${getProjectStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                    <span className="text-xs text-gray-500">{project.progress}%</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-gray-900">${project.monthlyRevenue.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">/month</p>
                </div>
              </div>
            ))}
            {client.projects.length > 3 && (
              <p className="text-xs text-gray-500 text-center">
                +{client.projects.length - 3} more projects
              </p>
            )}
          </div>
        )}
      </div>

      {/* Payment Information */}
      {totalPaymentDue > 0 && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-900">Payment Due</h4>
            <span className="text-sm font-bold text-gray-900">${totalPaymentDue.toLocaleString()}</span>
          </div>
          
          <div className="space-y-1">
            {client.projects
              .filter(project => project.paymentDue > 0)
              .slice(0, 2)
              .map((project) => (
                <div key={project.id} className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 truncate">{project.name}</span>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">${project.paymentDue.toLocaleString()}</span>
                    <span className={`px-1 py-0.5 rounded ${getPaymentStatusColor(project.paymentStatus)}`}>
                      {project.paymentStatus}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Contact Information */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <EnvelopeIcon className="w-4 h-4" />
          <a href={`mailto:${client.email}`} className="hover:text-blue-600" onClick={(e) => e.stopPropagation()}>
            {client.email}
          </a>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <PhoneIcon className="w-4 h-4" />
          <a href={`tel:${client.phone}`} className="hover:text-blue-600" onClick={(e) => e.stopPropagation()}>
            {client.phone}
          </a>
        </div>
        {client.website && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <GlobeAltIcon className="w-4 h-4" />
            <a href={client.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600" onClick={(e) => e.stopPropagation()}>
              {client.website.replace(/^https?:\/\//, '')}
            </a>
          </div>
        )}
      </div>

      {/* Revenue Information */}
      <div className="flex items-center justify-between text-sm">
        <div>
          <span className="text-gray-600">Monthly:</span>
          <span className="font-medium text-gray-900 ml-1">${totalMonthlyRevenue.toLocaleString()}</span>
        </div>
        <div>
          <span className="text-gray-600">Total:</span>
          <span className="font-medium text-gray-900 ml-1">${totalRevenue.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
