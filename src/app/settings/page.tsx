'use client';
import React, { useState } from 'react';
import Sidebar, { SidebarMenuGroup } from '../../components/sidebars/Sidebar';
import { UserIcon, Cog6ToothIcon, BellIcon, LinkIcon, UsersIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import PageHeader from '@/components/elements/PageHeader';

const settingsMenuGroups: SidebarMenuGroup[] = [
  {
    name: 'Profile',
    icon: UserIcon,
    items: [
      { name: 'My Profile', href: '/settings/profile', icon: UserIcon },
    ],
  },
  {
    name: 'Account',
    icon: Cog6ToothIcon,
    items: [
      { name: 'Account Settings', href: '/settings/account', icon: Cog6ToothIcon },
    ],
  },
  {
    name: 'Notifications',
    icon: BellIcon,
    items: [
      { name: 'Notification Settings', href: '/settings/notifications', icon: BellIcon },
    ],
  },
  {
    name: 'Integrations',
    icon: LinkIcon,
    items: [
      { name: 'Connected Apps', href: '/settings/integrations', icon: LinkIcon },
    ],
  },
  {
    name: 'Team',
    icon: UsersIcon,
    items: [
      { name: 'Team Management', href: '/settings/team', icon: UsersIcon },
    ],
  },
  {
    name: 'Security',
    icon: ShieldCheckIcon,
    items: [
      { name: 'Security Settings', href: '/settings/security', icon: ShieldCheckIcon },
    ],
  },
];

const SettingsPage = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        menuGroups={settingsMenuGroups}
        title="Settings"
        version="v1.0.0"
      />
      <main className={`flex-1 bg-gray-50 transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="nt-page nt-settings max-w-4xl mx-auto py-8 px-4">
          <PageHeader title="Settings" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <UserIcon className="w-8 h-8 text-blue-600 mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-1">Profile</h3>
                <p className="text-gray-600">Manage your personal information and profile photo.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <Cog6ToothIcon className="w-8 h-8 text-blue-600 mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-1">Account</h3>
                <p className="text-gray-600">Update your account settings and preferences.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <BellIcon className="w-8 h-8 text-blue-600 mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-1">Notifications</h3>
                <p className="text-gray-600">Control your notification preferences.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <LinkIcon className="w-8 h-8 text-blue-600 mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-1">Integrations</h3>
                <p className="text-gray-600">Manage connected apps and integrations.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <UsersIcon className="w-8 h-8 text-blue-600 mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-1">Team</h3>
                <p className="text-gray-600">Manage your team and permissions.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <ShieldCheckIcon className="w-8 h-8 text-blue-600 mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-1">Security</h3>
                <p className="text-gray-600">Update your password and security settings.</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-8 flex items-center justify-center h-40 text-gray-400 mt-8">
            Settings forms and options coming soon
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage; 