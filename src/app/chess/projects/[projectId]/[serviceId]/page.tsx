'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import servicesData from '@/data/services.json';
import projectsData from '@/data/projects.json';
import TasksBoardView from '@/components/TasksBoardView';
import TasksListView from '@/components/TasksListView';
import TimelineSelector, { TimelineView } from '@/components/TimelineSelector';
import Breadcrumb from '@/components/Breadcrumb';
import ViewToggler, { ViewMode } from '@/components/elements/ViewToggler';
import { CalendarDaysIcon, HomeIcon, BriefcaseIcon, CubeIcon } from '@heroicons/react/24/outline';
import usersData from '@/data/users.json';

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
  subtask_count?: number;
  [key: string]: string | string[] | number | boolean | null | undefined;
};

type Project = {
  id: string;
  name: string;
  subtask_count?: number;
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
  const params = useParams() as { projectId: string; serviceId: string };
  const { projectId, serviceId } = params;

  const [project, setProject] = useState<Project | null>(null);
  const [service, setService] = useState<Service | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('board');
  const [timelineView, setTimelineView] = useState<TimelineView>('monthly');
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);

  useEffect(() => {
    if (projectId && serviceId) {
      const foundProject = projectsData.projects.find(p => p.id === projectId);
      const foundService = servicesData.services.find(s => s.id === serviceId);
      
      if (foundProject && foundService) {
        setProject(foundProject);
        setService(foundService);
        
        const serviceTasks = foundService.serviceTasks.map((taskTitle, index) => {
          const baseDate = new Date();
          const monthOffset = Math.floor(index / 3);
          const weekOffset = index % 3;
          const startDate = new Date(baseDate);
          startDate.setMonth(baseDate.getMonth() + monthOffset);
          startDate.setDate(baseDate.getDate() + (weekOffset * 7));
          const endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + 14);
          const statuses: Task['status'][] = ['planning', 'doing', 'qc', 'done', 'delivered'];
          const statusIndex = index % statuses.length;
          const status = statuses[statusIndex];
          const priorities: Task['priority'][] = ['low', 'medium', 'high'];
          const priorityIndex = (index + 1) % priorities.length;
          const priority = priorities[priorityIndex];
          
          const userCount = (index % 3) + 1;
          const assignedUsers = usersData.users
            .slice(0, userCount)
            .map(u => u.id);

          return {
            id: `${foundService.id}_task_${index}`,
            title: taskTitle,
            description: `This is a detailed description for the task: "${taskTitle}". It can include notes, requirements, and other relevant information.`,
            type: 'one_time' as const,
            category_id: foundService.category_id,
            categories: [foundService.serviceCategory],
            status: status,
            assigned_to: assignedUsers,
            priority: priority,
            order: index,
            created_at: new Date().toISOString(),
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
            tags: [],
            content_type: foundService.id,
            project_id: foundProject.id,
            platforms: [],
            project_name: foundProject.name,
            service_name: foundService.name,
            subtask_count: Math.floor(Math.random() * 5),
          };
        });
        setTasks(serviceTasks);
      }
    }
  }, [projectId, serviceId]);

  const filteredTasks = useMemo(() => {
    let tasksToFilter = tasks;

    if (selectedAssignees.length > 0) {
      tasksToFilter = tasksToFilter.filter(task =>
        task.assigned_to.some(assigneeId => selectedAssignees.includes(assigneeId))
      );
    }

    if (timelineView === 'monthly') {
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      return tasksToFilter.filter(task => {
        const taskStartDate = new Date(task.start_date);
        const taskEndDate = new Date(task.end_date);
        return (taskStartDate <= endOfMonth && taskEndDate >= startOfMonth);
      });
    } else {
      // Weekly view
      const startOfWeek = new Date(currentDate);
      const dayOfWeek = startOfWeek.getDay(); // 0=Sun, 1=Mon
      const offset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      startOfWeek.setDate(startOfWeek.getDate() - offset);
      startOfWeek.setHours(0, 0, 0, 0);
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
      
      return tasksToFilter.filter(task => {
        const taskStartDate = new Date(task.start_date);
        const taskEndDate = new Date(task.end_date);
        return (taskStartDate <= endOfWeek && taskEndDate >= startOfWeek);
      });
    }
  }, [tasks, currentDate, timelineView, selectedAssignees]);

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    );
  };

  const handleAddTask = () => {
    console.log('Add new task for service:', service?.name);
  };

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
  };

  const handleViewChange = (view: TimelineView) => {
    setTimelineView(view);
  };

  const handleAssigneeChange = (assignees: string[]) => {
    setSelectedAssignees(assignees);
  };

  if (!project || !service) {
    return <div className="p-8 text-center">Loading project and service details...</div>;
  }

  const breadcrumbItems = [
            { name: 'Dashboard', href: '/business', isCurrent: false, icon: HomeIcon },
        { name: 'Projects', href: '/business/projects', isCurrent: false, icon: BriefcaseIcon },
        { name: project.name, href: `/business/projects/${project.id}`, isCurrent: false, icon: CubeIcon },
    { name: service.name, href: '#', isCurrent: true },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex items-center gap-4">
          <ViewToggler viewMode={viewMode} onViewModeChange={setViewMode} />
          <button
            className="px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-2 border text-sm font-medium text-gray-700"
            title="Planning"
          >
            <CalendarDaysIcon className="w-5 h-5 text-gray-500" />
            <span>Plannings</span>
          </button>
        </div>
      </header>
      
      <TimelineSelector
        currentDate={currentDate}
        onDateChange={handleDateChange}
        taskCount={filteredTasks.length}
        view={timelineView}
        onViewChange={handleViewChange}
        selectedAssignees={selectedAssignees}
        onAssigneeChange={handleAssigneeChange}
      />
      
      <main className="flex-1 overflow-hidden">
        {viewMode === 'board' ? (
          <TasksBoardView 
            tasks={filteredTasks} 
            onUpdateTask={handleUpdateTask} 
            onAddTask={handleAddTask} 
          />
        ) : (
          <TasksListView tasks={filteredTasks} />
        )}
      </main>
    </div>
  );
};

export default ServiceTasksPage; 