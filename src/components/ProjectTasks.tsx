'use client';

import React from 'react';
import { CheckCircleIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';
import tasks from '@/data/tasks.json';

interface Project {
  id: string;
  name: string;
  status: string;
}

interface ProjectTasksProps {
  project: Project;
}

const ProjectTasks: React.FC<ProjectTasksProps> = ({ project }) => {
  const projectTasks = tasks.tasks.filter(task => task.project_id === project.id);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'done':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'doing':
        return <ClockIcon className="w-5 h-5 text-blue-500" />;
      default:
        return <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">{project.name} - Tasks</h2>
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

      {/* Tasks List */}
      <div className="space-y-4">
        {projectTasks.map((task) => (
          <div key={task.id} className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-500">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {getStatusIcon(task.status)}
                  <h3 className="font-medium text-gray-900">{task.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <UserIcon className="w-4 h-4" />
                    <span>Assigned to: {task.assigned_to?.join(', ') || 'Unassigned'}</span>
                  </div>
                  {task.start_date && (
                    <span>Start: {new Date(task.start_date).toLocaleDateString()}</span>
                  )}
                  {task.end_date && (
                    <span>Due: {new Date(task.end_date).toLocaleDateString()}</span>
                  )}
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

      {/* Task Summary */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-4">Task Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {projectTasks.filter(t => t.status === 'done').length}
            </div>
            <div className="text-sm text-green-700">Completed</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {projectTasks.filter(t => t.status === 'doing').length}
            </div>
            <div className="text-sm text-blue-700">In Progress</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {projectTasks.filter(t => t.status === 'planning').length}
            </div>
            <div className="text-sm text-yellow-700">Planning</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-600">
              {projectTasks.filter(t => t.priority === 'high').length}
            </div>
            <div className="text-sm text-gray-700">High Priority</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTasks; 