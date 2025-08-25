'use client';
import React, { useState } from 'react';
import Sidebar, { SidebarMenuGroup } from '../../components/sidebars/Sidebar';
import { DocumentTextIcon, ArrowUpTrayIcon, UsersIcon, FolderIcon, TrashIcon, HomeIcon } from '@heroicons/react/24/outline';
import PageHeader from '@/components/elements/PageHeader';
import StatsGrid from '@/components/StatsGrid';

const documentsMenuGroups: SidebarMenuGroup[] = [
  {
    name: 'Overview',
    icon: HomeIcon,
    items: [
      { name: 'Documents Home', href: '/documents', icon: HomeIcon },
    ],
  },
  {
    name: 'All Documents',
    icon: DocumentTextIcon,
    items: [
      { name: 'View All', href: '/documents/all', icon: DocumentTextIcon },
    ],
  },
  {
    name: 'Upload',
    icon: ArrowUpTrayIcon,
    items: [
      { name: 'Upload Document', href: '/documents/upload', icon: ArrowUpTrayIcon },
    ],
  },
  {
    name: 'Shared With Me',
    icon: UsersIcon,
    items: [
      { name: 'Shared Documents', href: '/documents/shared', icon: UsersIcon },
    ],
  },
  {
    name: 'Templates',
    icon: FolderIcon,
    items: [
      { name: 'Document Templates', href: '/documents/templates', icon: FolderIcon },
    ],
  },
  {
    name: 'Trash',
    icon: TrashIcon,
    items: [
      { name: 'Deleted Documents', href: '/documents/trash', icon: TrashIcon },
    ],
  },
];

const stats = [
  {
    name: 'Total Documents',
    value: '132',
    change: '+12 this month',
    icon: DocumentTextIcon,
  },
  {
    name: 'Shared With Me',
    value: '24',
    change: '+3 this month',
    icon: UsersIcon,
  },
  {
    name: 'Templates',
    value: '8',
    change: '+1 this month',
    icon: FolderIcon,
  },
  {
    name: 'Deleted',
    value: '5',
    change: '+2 this month',
    icon: TrashIcon,
  },
];

const DocumentsPage = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        menuGroups={documentsMenuGroups}
        title="Documents"
        version="v1.0.0"
      />
      <main className={`flex-1 bg-gray-50 transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="nt-page nt-documents max-w-6xl mx-auto py-8 px-4">
          <PageHeader title="Documents" />
          <StatsGrid stats={stats} />
          <div className="bg-white rounded-lg shadow p-8 flex items-center justify-center h-80 text-gray-400 mt-6">
            Document list and management coming soon
          </div>
        </div>
      </main>
    </div>
  );
};

export default DocumentsPage; 