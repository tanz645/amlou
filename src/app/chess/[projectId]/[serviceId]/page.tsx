'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import servicesData from '@/data/services.json';
import projectsData from '@/data/projects.json';
import TasksBoardView from '@/components/TasksBoardView';
import { FolderIcon, ChevronLeftIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

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
  project_name: string;
  service_name: string;
  [key: string]: string | string[] | number | boolean | null | undefined;
};

type Project = {
  id: string;
  name: string;
  // Define other project properties as needed
};

type Service = {
    id: string;
    name: string;
    serviceShortName: string;
    serviceCategory: string;
    category_id: string;
    serviceTasks: string[];
    action_items: string[];
    shortDescription: string;
    serviceMaster: string;
    description: string;
    image: string;
    features: string[];
    pricing: {
        unit_price: number;
        max_discount: number;
    };
    minimum_time_required: number;
    minimum_order_unit: number;
    service_type: string;
}

const ServiceTasksPage = () => {
  const router = useRouter();
  const params = useParams() as { projectId: string; serviceId: string };
  const { projectId, serviceId } = params;

  const [project, setProject] = useState<Project | null>(null);
  const [service, setService] = useState<Service | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (projectId && serviceId) {
      const foundProject = projectsData.projects.find(p => p.id === projectId);
      const foundService = servicesData.services.find(s => s.id === serviceId);
      
      if (foundProject && foundService) {
        setProject(foundProject);
        setService(foundService);
        
        const serviceTasks = foundService.serviceTasks.map((taskTitle, index) => ({
          id: `${foundService.id}_task_${index}`,
          title: taskTitle,
          description: `Description for ${taskTitle}`,
          type: 'one_time' as const,
          category_id: foundService.category_id,
          categories: [foundService.serviceCategory],
          status: 'planning' as const,
          assigned_to: [],
          priority: 'medium' as const,
          order: index,
          created_at: new Date().toISOString(),
          start_date: new Date().toISOString(),
          end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          tags: [],
          content_type: foundService.id,
          project_id: foundProject.id,
          platforms: [],
          project_name: foundProject.name,
          service_name: foundService.name,
        }));
        setTasks(serviceTasks);
      }
    }
  }, [projectId, serviceId]);

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    );
  };

  const handleAddTask = () => {
    // For demonstration, you might open a modal form here
    console.log('Add new task for service:', service?.name);
  };

  if (!project || !service) {
    return <div className="p-8 text-center">Loading project and service details...</div>;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.back()}
            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <FolderIcon className="w-6 h-6 text-blue-600" />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">{project.name}</h1>
              <p className="text-sm text-gray-500">{service.name} - Task Board</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-2"
            title="Planning"
          >
            <CalendarDaysIcon className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Plannings</span>
          </button>
        </div>
      </header>
      
      {/* Task Board */}
      <main className="flex-1 overflow-hidden">
        <TasksBoardView 
          tasks={tasks} 
          onUpdateTask={handleUpdateTask} 
          onAddTask={handleAddTask} 
        />
      </main>
    </div>
  );
};

export default ServiceTasksPage; 