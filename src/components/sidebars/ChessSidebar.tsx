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
  FolderIcon,
  FolderOpenIcon,
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
  // Independent open state for each section
  const [isNavigationOpen, setIsNavigationOpen] = useState(true);
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);

  const toggleProject = (projectId: string) => {
    setExpandedProjects(prev =>
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const toggleNavigation = () => setIsNavigationOpen((prev) => !prev);
  const toggleProjects = () => setIsProjectsOpen((prev) => !prev);

  return (
    <div className={`fixed top-0 left-0 h-screen z-30 bg-white border-r border-gray-200 flex flex-col transition-all duration-200 ${collapsed ? 'w-16' : 'w-64'}`}>
      {/* Collapse/Expand Button Only */}
      <div className={`p-4 flex items-end justify-end`}>
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

      {/* Navigation and Projects Accordion (independent) */}
      <nav className="flex-1 overflow-y-auto px-2">
        {/* Navigation Section */}
        <div className="mb-2">
          <button
            className={`w-full flex items-center justify-between px-2 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider rounded ${collapsed ? 'hidden' : ''}`}
            onClick={toggleNavigation}
          >
            <span>Navigation</span>
            {isNavigationOpen ? (
              <ChevronDownIcon className="w-4 h-4" />
            ) : (
              <ChevronRightIcon className="w-4 h-4" />
            )}
          </button>
          {isNavigationOpen && !collapsed && (
            <div className="space-y-1 mt-1">
              <Link
                href="/chess"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  pathname === '/chess'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <DocumentTextIcon className="w-5 h-5 mr-3" />
                <span>Dashboard</span>
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
                <span>Calendar</span>
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
                <span>Team</span>
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
                <span>Analytics</span>
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
                <span>Settings</span>
              </Link>
            </div>
          )}
        </div>

        {/* Projects Accordion */}
        <div className="mb-2">
          <button
            className={`w-full flex items-center justify-between px-2 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider rounded ${collapsed ? 'hidden' : ''}`}
            onClick={toggleProjects}
          >
            <span>Projects</span>
            {isProjectsOpen ? (
              <ChevronDownIcon className="w-4 h-4" />
            ) : (
              <ChevronRightIcon className="w-4 h-4" />
            )}
          </button>
          {isProjectsOpen && !collapsed && (
            <div className="space-y-1">
              {projectsData.projects.map((project) => (
                <div key={project.id} className="relative">
                  <div
                    onClick={() => toggleProject(project.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                      pathname.includes(`/chess/projects/${project.id}`)
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center">
                      {expandedProjects.includes(project.id) ? (
                        <FolderOpenIcon className="w-5 h-5 mr-3" />
                      ) : (
                        <FolderIcon className="w-5 h-5 mr-3" />
                      )}
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
                    </div>
                  </div>
                  {/* Project Overview, Deliverables, Add New Deliverable */}
                  {expandedProjects.includes(project.id) && (
                    <div className="ml-6 mt-1 space-y-1">
                      <Link
                        href={`/business/projects/${project.id}`}
                        className={`block px-3 py-1.5 text-xs rounded transition-colors ${
                                                      pathname === `/business/projects/${project.id}`
                            ? 'bg-blue-50 text-blue-600 font-semibold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Project Overview
                      </Link>
                      {project.services.map((service) => {
                        const serviceInfo = getServiceFromId(service.id);
                        if (!serviceInfo) return null;
                        return (
                          <Link
                            key={service.id}
                            href={`/chess/projects/${project.id}/${service.id}`}
                            className={`block px-3 py-1.5 text-xs rounded transition-colors ${
                              pathname.includes(`/chess/projects/${project.id}/${service.id}`)
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {serviceInfo.name}
                          </Link>
                        );
                      })}
                      <Link
                        href={`/chess/projects/${project.id}/new`}
                        className="block px-3 py-1.5 text-xs rounded transition-colors text-gray-500 hover:bg-gray-50"
                      >
                        Add New Deliverable
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default ChessSidebar; 