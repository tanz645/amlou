'use client';

import React, { useState } from 'react';
import { PlusIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import TaskCard from './elements/TaskCard';
import TaskDetailsModal from './TaskDetailsModal';

type Task = {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'doing' | 'qc' | 'redo' | 'done' | 'delivered' | 'archived';
  assigned_to: string[];
  priority: 'low' | 'medium' | 'high';
  order: number;
  start_date: string;
  end_date: string;
  project_name: string;
  service_name: string;
  subtask_count?: number;
};

type TasksBoardViewProps = {
  tasks: Task[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onAddTask: () => void;
};

const columnOrder: Task['status'][] = ['planning', 'doing', 'qc', 'redo', 'done', 'delivered'];
const columnConfig: Record<Task['status'], { name: string, color: string }> = {
  planning: { name: 'Planning', color: 'bg-gray-400' },
  doing: { name: 'In Progress', color: 'bg-blue-500' },
  qc: { name: 'Quality Check', color: 'bg-purple-500' },
  redo: { name: 'Redo', color: 'bg-red-500' },
  done: { name: 'Done', color: 'bg-green-500' },
  delivered: { name: 'Delivered', color: 'bg-teal-500' },
  archived: { name: 'Archived', color: 'bg-gray-700' },
};

const TasksBoardView: React.FC<TasksBoardViewProps> = ({ tasks, onUpdateTask, onAddTask }) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [cardWithOpenPopup, setCardWithOpenPopup] = useState<string | null>(null);

  const handleSave = (taskId: string, updates: Partial<Task>) => {
    onUpdateTask(taskId, updates);
    setSelectedTask(null);
  };

  return (
    <>
      <TaskDetailsModal 
        isOpen={!!selectedTask} 
        task={selectedTask} 
        columnConfig={columnConfig}
        onClose={() => setSelectedTask(null)} 
        onSave={handleSave} 
      />
      <div className="flex-1 overflow-x-auto p-4 bg-white">
        <div className="flex h-full">
          {columnOrder.map((status, index) => {
            const column = columnConfig[status];
            const columnTasks = tasks.filter(t => t.status === status).sort((a,b) => a.order - b.order);
            const isLastColumn = index === columnOrder.length - 1;
            const isColumnActive = columnTasks.some(t => t.id === cardWithOpenPopup);
            return (
              <div
                key={status}
                className={`w-[320px] flex-shrink-0 flex flex-col ${!isLastColumn ? 'border-r border-gray-200' : ''}`}
              >
                <div className="p-2 sticky top-0 bg-white/80 backdrop-blur-sm z-10 px-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${column.color}`}></span>
                      <h3 className="font-semibold text-gray-700 text-base">{column.name}</h3>
                      <span className="text-sm font-medium text-gray-400">{columnTasks.length}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={onAddTask} className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                        <PlusIcon className="w-5 h-5" />
                      </button>
                       <button className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                        <EllipsisVerticalIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className={`flex-1 p-2 space-y-3 rounded-lg px-4 ${isColumnActive ? 'overflow-visible' : 'overflow-y-auto'}`}>
                  {columnTasks.map((task) => (
                    <div key={task.id} className="relative">
                      <TaskCard
                        task={task}
                        snapshot={{ isDragging: false }}
                        onCardClick={() => setSelectedTask(task)}
                        onUpdateTask={onUpdateTask}
                        onPopupToggle={(isOpen) => setCardWithOpenPopup(isOpen ? task.id : null)}
                      />
                    </div>
                  ))}
                  <button onClick={onAddTask} className="w-full text-left flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <PlusIcon className="w-4 h-4" />
                    Add Task
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TasksBoardView; 