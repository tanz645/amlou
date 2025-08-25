'use client';

import React, { useState } from 'react';
import { CalendarIcon, PlusIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

interface ActionItem {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
  assignee: string;
}

interface Project {
  id: string;
  name: string;
  status: string;
}

interface ActionPlanProps {
  project: Project;
}

const ActionPlan: React.FC<ActionPlanProps> = ({ project }) => {
  const [viewMode, setViewMode] = useState<'weekly' | 'monthly'>('weekly');
  const [newAction, setNewAction] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    assignee: ''
  });

  // Mock data - in real app this would come from API
  const weeklyActions: ActionItem[] = [
    {
      id: '1',
      title: 'Client Requirements Review',
      description: 'Review and finalize client requirements document',
      dueDate: '2024-01-15',
      priority: 'high',
      status: 'completed',
      assignee: 'John Doe'
    },
    {
      id: '2',
      title: 'Design Mockups Creation',
      description: 'Create initial design mockups for approval',
      dueDate: '2024-01-18',
      priority: 'high',
      status: 'in_progress',
      assignee: 'Jane Smith'
    },
    {
      id: '3',
      title: 'Database Schema Design',
      description: 'Design and document database schema',
      dueDate: '2024-01-20',
      priority: 'medium',
      status: 'pending',
      assignee: 'Mike Johnson'
    }
  ];

  const monthlyActions: ActionItem[] = [
    {
      id: '4',
      title: 'Project Phase 1 Completion',
      description: 'Complete all Phase 1 deliverables',
      dueDate: '2024-01-31',
      priority: 'high',
      status: 'pending',
      assignee: 'Team Lead'
    },
    {
      id: '5',
      title: 'Client Presentation',
      description: 'Prepare and deliver progress presentation',
      dueDate: '2024-02-05',
      priority: 'medium',
      status: 'pending',
      assignee: 'Project Manager'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'in_progress':
        return <ClockIcon className="w-5 h-5 text-blue-500" />;
      default:
        return <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>;
    }
  };

  const actions = viewMode === 'weekly' ? weeklyActions : monthlyActions;

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">{project.name}</h2>
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

      {/* Header with View Toggle */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Action Plan</h2>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('weekly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'weekly' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setViewMode('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'monthly' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Add New Action */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">Add New Action Item</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <input
              type="text"
              placeholder="Action title"
              value={newAction.title}
              onChange={(e) => setNewAction({...newAction, title: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={newAction.dueDate}
              onChange={(e) => setNewAction({...newAction, dueDate: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={newAction.priority}
              onChange={(e) => setNewAction({...newAction, priority: e.target.value as 'low' | 'medium' | 'high'})}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">
              <PlusIcon className="w-4 h-4" />
              Add Action
            </button>
          </div>
        </div>
      </div>

      {/* Action Items List */}
      <div className="space-y-4">
        {actions.map((action) => (
          <div key={action.id} className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-500">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {getStatusIcon(action.status)}
                  <h3 className="font-medium text-gray-900">{action.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(action.priority)}`}>
                    {action.priority.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{action.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4" />
                    <span>Due: {new Date(action.dueDate).toLocaleDateString()}</span>
                  </div>
                  <span>Assigned to: {action.assignee}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Summary */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-4">Progress Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {actions.filter(a => a.status === 'completed').length}
            </div>
            <div className="text-sm text-green-700">Completed</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {actions.filter(a => a.status === 'in_progress').length}
            </div>
            <div className="text-sm text-blue-700">In Progress</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-600">
              {actions.filter(a => a.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-700">Pending</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionPlan; 