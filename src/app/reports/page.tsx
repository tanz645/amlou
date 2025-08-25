'use client';
import React, { useState } from 'react';
import Sidebar, { SidebarMenuGroup } from '../../components/sidebars/Sidebar';
import { ChartBarIcon, DocumentTextIcon, UserGroupIcon, UsersIcon, ArrowDownTrayIcon, HomeIcon } from '@heroicons/react/24/outline';
import PageHeader from '@/components/elements/PageHeader';
import StatsGrid from '@/components/StatsGrid';

const reportsMenuGroups: SidebarMenuGroup[] = [
  {
    name: 'Overview',
    icon: HomeIcon,
    items: [
      { name: 'Reports Home', href: '/reports', icon: HomeIcon },
    ],
  },
  {
    name: 'Campaign Reports',
    icon: ChartBarIcon,
    items: [
      { name: 'All Campaigns', href: '/reports/campaigns', icon: ChartBarIcon },
      { name: 'By Channel', href: '/reports/campaigns/channel', icon: ChartBarIcon },
    ],
  },
  {
    name: 'Content Performance',
    icon: DocumentTextIcon,
    items: [
      { name: 'Blog Posts', href: '/reports/content/blog', icon: DocumentTextIcon },
      { name: 'Social Posts', href: '/reports/content/social', icon: DocumentTextIcon },
      { name: 'Email Campaigns', href: '/reports/content/email', icon: DocumentTextIcon },
    ],
  },
  {
    name: 'Client Reports',
    icon: UserGroupIcon,
    items: [
      { name: 'By Client', href: '/reports/clients', icon: UserGroupIcon },
      { name: 'Client Overview', href: '/reports/clients/overview', icon: UserGroupIcon },
    ],
  },
  {
    name: 'Team Reports',
    icon: UsersIcon,
    items: [
      { name: 'By Team Member', href: '/reports/team', icon: UsersIcon },
      { name: 'Team Overview', href: '/reports/team/overview', icon: UsersIcon },
    ],
  },
  {
    name: 'Export Data',
    icon: ArrowDownTrayIcon,
    items: [
      { name: 'Export CSV', href: '/reports/export/csv', icon: ArrowDownTrayIcon },
      { name: 'Export PDF', href: '/reports/export/pdf', icon: ArrowDownTrayIcon },
    ],
  },
];

const stats = [
  {
    name: 'Total Campaigns',
    value: '24',
    change: '+3 this month',
    icon: ChartBarIcon,
  },
  {
    name: 'Blog Posts',
    value: '56',
    change: '+8 this month',
    icon: DocumentTextIcon,
  },
  {
    name: 'Clients',
    value: '12',
    change: '+1 this month',
    icon: UserGroupIcon,
  },
  {
    name: 'Team Members',
    value: '7',
    change: '0',
    icon: UsersIcon,
  },
];

const ReportsPage = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        menuGroups={reportsMenuGroups}
        title="Reports"
        version="v1.0.0"
      />
      <main className={`flex-1 bg-gray-50 transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="nt-page nt-reports max-w-6xl mx-auto py-8 px-4">
          <PageHeader title="Reports" />
          <StatsGrid stats={stats} />
          <div className="bg-white rounded-lg shadow p-8 flex items-center justify-center h-80 text-gray-400 mt-6">
            Report charts and tables coming soon
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportsPage; 