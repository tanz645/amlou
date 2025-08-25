'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  CalendarIcon,
  UserGroupIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  PlusIcon,
  FolderIcon,
} from '@heroicons/react/24/outline';
import projectsData from '@/data/projects.json';
import servicesData from '@/data/services.json';

interface ChessSidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'in_progress':
      return 'bg-yellow-100 text-yellow-800';
    case 'active':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getServiceFromId = (serviceId: string) => {
  return servicesData.services.find(s => s.id === serviceId);
};

const ChessSidebar: React.FC<ChessSidebarProps> = ({ collapsed, setCollapsed }) => {
  const pathname = usePathname() || '';
  const [expandedProjects, setExpandedProjects] = useState<string[]>(['proj_001']);

  const toggleProject = (projectId: string) => {
    setExpandedProjects(prev =>
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  return (
    <div className={`fixed top-0 left-0 h-screen z-30 bg-white border-r border-gray-200 flex flex-col transition-all duration-200 ${collapsed ? 'w-16' : 'w-64'}`}>
      {/* Header */}
      <div className={`p-4 flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed && <h1 className="text-xl font-bold text-gray-800">Chess</h1>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-gray-100"
        >
          {collapsed ? (
            <ChevronRightIcon className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2">
        {/* Main Navigation */}
        <div className="mb-6">
          <div className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ${collapsed ? 'hidden' : 'block'}`}>
            Navigation
          </div>
          <div className="space-y-1">
            <Link
              href="/chess"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === '/chess'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <DocumentTextIcon className="w-5 h-5 mr-3" />
              {!collapsed && <span>Dashboard</span>}
            </Link>
            <Link
              href="/chess/calendar"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === '/chess/calendar'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <CalendarIcon className="w-5 h-5 mr-3" />
              {!collapsed && <span>Calendar</span>}
            </Link>
            <Link
              href="/chess/team"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === '/chess/team'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <UserGroupIcon className="w-5 h-5 mr-3" />
              {!collapsed && <span>Team</span>}
            </Link>
            <Link
              href="/chess/analytics"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === '/chess/analytics'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ChartBarIcon className="w-5 h-5 mr-3" />
              {!collapsed && <span>Analytics</span>}
            </Link>
            <Link
              href="/chess/settings"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === '/chess/settings'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Cog6ToothIcon className="w-5 h-5 mr-3" />
              {!collapsed && <span>Settings</span>}
            </Link>
          </div>
        </div>

        {/* Projects */}
        <div>
          <div className={`flex items-center justify-between mb-2 ${collapsed ? 'hidden' : 'block'}`}>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Projects
            </div>
            <button className="p-1 rounded hover:bg-gray-100">
              <PlusIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          <div className="space-y-1">
            {projectsData.projects.map((project) => (
              <div key={project.id}>
                <button
                  onClick={() => toggleProject(project.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    pathname.includes(`/chess/${project.id}`)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <FolderIcon className="w-5 h-5 mr-3" />
                    {!collapsed && (
                      <div className="text-left">
                        <div className="font-medium">{project.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(project.status)}`}>
                            {project.status.replace('_', ' ')}
                          </span>
                          <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full transition-all duration-300"
                              style={{ width: `50%` }} // Placeholder progress
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {!collapsed && (
                    expandedProjects.includes(project.id) ? (
                      <ChevronDownIcon className="w-5 h-5" />
                    ) : (
                      <ChevronRightIcon className="w-5 h-5" />
                    )
                  )}
                </button>
                
                {/* Project Services */}
                {expandedProjects.includes(project.id) && !collapsed && (
                  <div className="ml-6 mt-1 space-y-1">
                    {project.services.map((service) => {
                      const serviceInfo = getServiceFromId(service.id);
                      if (!serviceInfo) return null;

                      return (
                        <Link
                          key={service.id}
                          href={`/chess/${project.id}/${service.id}`}
                          className={`block px-3 py-1.5 text-xs rounded transition-colors ${
                            pathname.includes(`/chess/${project.id}/${service.id}`)
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {serviceInfo.name}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default ChessSidebar; 