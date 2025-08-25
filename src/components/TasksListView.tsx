'use client';

import React from 'react';
import Image from 'next/image';
import users from '@/data/users.json';
import { CalendarIcon, UserCircleIcon } from '@heroicons/react/24/outline';

type Task = {
  id: string;
  title: string;
  description: string;
  type: 'repetitive' | 'one_time';
  category_id: string;
  categories: string[];
  frequency?: 'daily' | 'weekly' | 'monthly';
  status: 'planning' | 'doing' | 'qc' | 'redo' | 'done' | 'delivered' | 'archived';
  assigned_to: string[];
  priority: 'low' | 'medium' | 'high';
  order: number;
  created_at: string;
  start_date: string;
  end_date: string;
  last_completed?: string;
  next_due?: string;
  progress?: number;
  tags: string[];
  content_type: string;
  mother_task?: string | null;
  project_id: string;
  platforms: string[];
  [key: string]: string | string[] | number | boolean | null | undefined;
};

interface TasksListViewProps {
  tasks: Task[];
}

const STATUS_STYLES: { [key in Task['status']]: string } = {
  planning: 'bg-blue-100 text-blue-800',
  doing: 'bg-yellow-100 text-yellow-800',
  qc: 'bg-purple-100 text-purple-800',
  redo: 'bg-red-100 text-red-800',
  done: 'bg-green-100 text-green-800',
  delivered: 'bg-indigo-100 text-indigo-800',
  archived: 'bg-gray-100 text-gray-800',
};

const PRIORITY_STYLES: { [key in Task['priority']]: string } = {
  high: 'text-red-600',
  medium: 'text-yellow-600',
  low: 'text-green-600',
};

const TaskListItem = ({ task }: { task: Task }) => {
  const getAssignedUsers = () => {
    return task.assigned_to.map(userId => users.users.find(u => u.id === userId)).filter(Boolean);
  };
  const assignedUsers = getAssignedUsers();
  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <tr className="bg-white hover:bg-gray-50 border-b">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.title}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex -space-x-2 overflow-hidden">
          {assignedUsers.map(user => (
            user && <Image 
              key={user.id} 
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" 
              src={user.avatar} 
              alt={user.name} 
              title={user.name}
              width={32}
              height={32}
            />
          ))}
          {assignedUsers.length === 0 && <UserCircleIcon className="h-8 w-8 text-gray-300" />}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <span className={`capitalize px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${STATUS_STYLES[task.status]}`}>
          {task.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <span className={`capitalize ${PRIORITY_STYLES[task.priority]}`}>
          {task.priority}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <CalendarIcon className="w-4 h-4" />
          <span>{formatDate(task.end_date)}</span>
        </div>
      </td>
    </tr>
  );
};

const TasksListView: React.FC<TasksListViewProps> = ({ tasks }) => {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="p-4">
        <div className="align-middle inline-block min-w-full">
          <div className="shadow border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Task</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Assignees</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Priority</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Due Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tasks.map(task => (
                  <TaskListItem key={task.id} task={task} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksListView; 