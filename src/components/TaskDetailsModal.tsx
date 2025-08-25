'use client';

import React, { useState } from 'react';
import { XMarkIcon, CalendarIcon, FlagIcon, CheckCircleIcon, PencilIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import AssigneeSelector from './AssigneeSelector';

type Task = {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'doing' | 'qc' | 'redo' | 'done' | 'delivered' | 'archived';
  assigned_to: string[];
  priority: 'low' | 'medium' | 'high';
  order?: number;
  start_date: string;
  end_date: string;
  project_name?: string;
  service_name?: string;
  subtask_count?: number;
};

type ColumnConfig = Record<Task['status'], { name: string, color: string }>;

interface TaskDetailsModalProps {
  isOpen?: boolean;
  task: Task | null;
  project?: { id: string; name: string } | null;
  motherTask?: { id: string; title: string } | null;
  assignees?: { id: string; name: string }[];
  columnConfig?: ColumnConfig;
  onClose: () => void;
  onSave?: (taskId: string, updates: Partial<Task>) => void;
}

const statusOptions = [
  { value: 'planning', label: 'Planning' },
  { value: 'doing', label: 'In Progress' },
  { value: 'qc', label: 'Quality Check' },
  { value: 'redo', label: 'Redo' },
  { value: 'done', label: 'Done' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'archived', label: 'Archived' },
];

const priorityOptions = [
  { value: 'low', label: 'Low', color: 'text-yellow-500' },
  { value: 'medium', label: 'Medium', color: 'text-orange-500' },
  { value: 'high', label: 'High', color: 'text-red-600' },
];

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({ isOpen, task, columnConfig, onClose, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Task | null>(null);

  React.useEffect(() => {
    if (task) {
      setEditedTask(task);
      setIsEditing(false);
    }
  }, [task]);

  if (!isOpen || !task || !editedTask) return null;

  const handleSave = () => {
    if (editedTask && onSave) {
      onSave(editedTask.id, editedTask);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  const updateField = (field: keyof Task, value: string | string[]) => {
    if (editedTask) {
      setEditedTask({ ...editedTask, [field]: value });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-800">
              {isEditing ? (
                <input
                  type="text"
                  value={editedTask.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-2xl font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              ) : (
                task.title
              )}
            </h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
            >
              <PencilIcon className="w-5 h-5" />
            </button>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
            
            <div className="md:col-span-3">
              {isEditing ? (
                <textarea
                  value={editedTask.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows={3}
                  placeholder="Task description..."
                />
              ) : (
                <p className="text-gray-600">{task.description || 'No description provided.'}</p>
              )}
            </div>

            <div className="md:col-span-3 border-t border-gray-200 pt-6">
              <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Details</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-gray-400 mt-0.5"/>
                  <div>
                    <p className="font-semibold text-gray-700">Project</p>
                    <p className="text-sm text-gray-500">{task.project_name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FlagIcon className="w-6 h-6 text-gray-400 mt-0.5"/>
                  <div>
                    <p className="font-semibold text-gray-700">Status</p>
                    {isEditing ? (
                      <select
                        className="text-sm text-gray-700 border border-gray-200 rounded-md px-2 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={editedTask.status}
                        onChange={e => updateField('status', e.target.value as Task['status'])}
                      >
                        {statusOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-sm text-gray-500">{columnConfig ? columnConfig[task.status].name : task.status}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-gray-400 mt-0.5"/>
                  <div>
                    <p className="font-semibold text-gray-700">Priority</p>
                    {isEditing ? (
                      <select
                        className="text-sm text-gray-700 border border-gray-200 rounded-md px-2 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={editedTask.priority}
                        onChange={e => updateField('priority', e.target.value as Task['priority'])}
                      >
                        {priorityOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-sm text-gray-500 capitalize">{task.priority}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-3 col-span-2 sm:col-span-3">
                  <CalendarIcon className="w-6 h-6 text-gray-400 mt-0.5"/>
                  <div>
                    <p className="font-semibold text-gray-700">Timeline</p>
                    {isEditing ? (
                      <div className="flex gap-2 mt-1">
                        <input
                          type="date"
                          value={editedTask.start_date.split('T')[0]}
                          onChange={(e) => updateField('start_date', e.target.value)}
                          className="text-sm border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <span className="text-gray-400">to</span>
                        <input
                          type="date"
                          value={editedTask.end_date.split('T')[0]}
                          onChange={(e) => updateField('end_date', e.target.value)}
                          className="text-sm border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">
                        {format(new Date(task.start_date), 'MMM d, yyyy')} - {format(new Date(task.end_date), 'MMM d, yyyy')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-3 border-t border-gray-200 pt-6">
              <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Assignees</h3>
              {isEditing ? (
                <AssigneeSelector
                  isOpen={false}
                  onToggle={() => {}}
                  selectedAssignees={editedTask.assigned_to}
                  onAssigneesChange={(assignees: string[]) => updateField('assigned_to', assignees)}
                  trigger={
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                      Manage Assignees
                    </button>
                  }
                />
              ) : (
                <div className="flex flex-wrap gap-3">
                  {task.assigned_to.length > 0 ? (
                    task.assigned_to.map((assigneeId) => (
                      <div key={assigneeId} className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white">
                          {assigneeId.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{assigneeId}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No assignees</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetailsModal; 