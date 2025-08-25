'use client';

import React from 'react';
import { XMarkIcon, CalendarIcon, FlagIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

type Project = {
    id: string;
    name: string;
    description: string;
    client_id: string;
    start_date: string;
    end_date: string;
    status: string;
    project_value?: number;
    key_deliverables?: string[];
};

type Client = {
    id: string;
    name: string;
    company: string;
};

interface ProjectDetailsModalProps {
  project: Project | null;
  client: Client | null;
  onClose: () => void;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ project, client, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">{project.name}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                
                <div className="md:col-span-2">
                    <p className="text-gray-600">{project.description}</p>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Client</h3>
                    <p className="text-gray-800 text-lg font-medium">{client?.name || 'N/A'}</p>
                    <p className="text-gray-500">{client?.company || ''}</p>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Project Value</h3>
                    <p className="text-gray-800 text-lg font-medium">
                        ${typeof project.project_value === 'number' ? project.project_value.toLocaleString() : '0'}
                    </p>
                </div>

                <div className="md:col-span-2 border-t border-gray-200 pt-6">
                    <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Details</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <div className="flex items-start gap-3">
                            <CalendarIcon className="w-6 h-6 text-gray-400 mt-0.5"/>
                            <div>
                                <p className="font-semibold text-gray-700">Timeline</p>
                                <p className="text-sm text-gray-500">
                                    {format(new Date(project.start_date), 'MMM d, yyyy')} - {format(new Date(project.end_date), 'MMM d, yyyy')}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <FlagIcon className="w-6 h-6 text-gray-400 mt-0.5"/>
                            <div>
                                <p className="font-semibold text-gray-700">Status</p>
                                <p className="text-sm text-gray-500 capitalize">{project.status.replace('_', ' ')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 border-t border-gray-200 pt-6">
                    <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Key Deliverables</h3>
                    <ul className="space-y-2">
                        {(project.key_deliverables || []).map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <CheckCircleIcon className="w-5 h-5 text-green-500" />
                            <span className="text-gray-600">{item}</span>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsModal; 