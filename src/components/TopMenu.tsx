'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CalculatorIcon,
  CalendarIcon,
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  BellIcon,
  Bars3Icon,
  MagnifyingGlassCircleIcon,
  LightBulbIcon,
  Squares2X2Icon,
  HomeIcon,
  UserGroupIcon,
  ChevronDownIcon,
  UserIcon,
  CircleStackIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import OffCanvasMenu from './OffCanvasMenu';
import { ElementType } from 'react';

const tools = [
  { name: 'Accounting', href: '/accounting', icon: CalculatorIcon },
  { name: 'Chess', href: '/chess', icon: Squares2X2Icon },
  { name: 'Calendar', href: '/calendar', icon: CalendarIcon },
  { name: 'Planner', href: '/planner', icon: ClipboardDocumentCheckIcon },
  { name: 'Reports', href: '/reports', icon: ChartBarIcon },
  { name: 'Documents', href: '/documents', icon: DocumentTextIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

const navigation = {
  main: [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Al-Hisab', href: '/al-hisab', icon: CircleStackIcon },
    { name: 'Chess', href: '/chess', icon: BeakerIcon },
  ],
};

const subNavigation = {
    main: [
      { name: 'Dashboard', href: '/business', icon: HomeIcon },
    ],
    services: [
      { name: 'Services', href: '/business/services', icon: DocumentTextIcon },
      { name: 'Packages', href: '/business/packages', icon: DocumentTextIcon },
    ],
    clients: [
      { name: 'Clients', href: '/business/clients', icon: UserIcon },
      { name: 'Leads', href: '/business/leads', icon: UserGroupIcon },
      { name: 'Agreements', href: '/business/agreements', icon: DocumentTextIcon },
    ],
    projects: [
      { name: 'Projects', href: '/business/projects', icon: DocumentTextIcon },
      { name: 'Tasks', href: '/business/tasks', icon: ClipboardDocumentCheckIcon },
      { name: 'Planning', href: '/business/planning', icon: ClipboardDocumentCheckIcon },
    ],
    financial: [
      { name: 'Invoices', href: '/business/invoices', icon: CalculatorIcon },
      { name: 'Accounting', href: '/business/accounting', icon: Cog6ToothIcon },
      { name: 'Meetings', href: '/business/meetings', icon: CalendarIcon },
    ],
    others: [
      { name: 'Audit', href: '/business/audit', icon: DocumentTextIcon },
      { name: 'Strategy', href: '/business/strategy', icon: DocumentTextIcon },
      { name: 'Users', href: '/business/users', icon: UserIcon },
      { name: 'Messages', href: '/business/messages', icon: UserGroupIcon },
      { name: 'Settings', href: '/business/settings', icon: Cog6ToothIcon },
    ],
  };

type SubNavItem = { name: string; href: string; icon: ElementType };

export default function TopMenu() {
  const pathname = usePathname() || '';
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const [isAlhisabMenuOpen, setIsAlhisabMenuOpen] = useState(false);

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
  };

  return (
    <>
      <div className="nt-component nt-top-menu bg-white/95 backdrop-blur-sm border-b border-gray-200/50 fixed top-0 left-0 right-0 z-50 shadow-sm">
        <div className="flex justify-between items-center h-12 px-4">
          {/* Left: Logo and Alhisab Menu */}
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-lg font-bold text-gray-900 hidden sm:block">Alhisab</span>
            </Link>

            {/* Alhisab Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsAlhisabMenuOpen(!isAlhisabMenuOpen)}
                className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <span>Menu</span>
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${isAlhisabMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isAlhisabMenuOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {navigation['Business Desk'].map((group) => {
                    const GroupIcon = group.icon;
                    return (
                      <div key={group.name} className="px-3 py-2">
                        <div className="flex items-center space-x-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                          <GroupIcon className="w-3 h-3" />
                          <span>{group.name}</span>
                        </div>
                        <div className="space-y-1">
                          {subNavigation.others.map((item: SubNavItem) => {
                            const ItemIcon = item.icon;
                            const isActive = pathname.startsWith(item.href);
                            return (
                              <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center space-x-2 px-2 py-1.5 text-sm rounded-md transition-colors ${
                                  isActive
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                                onClick={() => setIsAlhisabMenuOpen(false)}
                              >
                                <ItemIcon className="w-4 h-4" />
                                <span>{item.name}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Center: Tools */}
          <div className="flex-1 flex justify-center">
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              {tools.map((tool) => {
                const isActive = pathname.startsWith(tool.href);
                return (
                  <Link
                    key={tool.name}
                    href={tool.href}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                      isActive
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                    }`}
                  >
                    <tool.icon className="h-4 w-4" />
                    <span className="hidden sm:block">{tool.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <button className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors relative">
              <BellIcon className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Off Canvas Menu */}
            <button 
              onClick={() => setIsOffCanvasOpen(true)}
              className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Bars3Icon className="h-4 w-4" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-1.5 hover:bg-gray-100 rounded-md transition-colors focus:outline-none"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                  <span className="text-white font-medium text-xs">SW</span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-medium text-gray-900">Shane Wazal</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
                <ChevronDownIcon className="w-3 h-3 text-gray-500" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">Shane Wazal</p>
                    <p className="text-xs text-gray-500">shane@alhisab.com</p>
                  </div>
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Your Profile
                  </a>
                  <a
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Settings
                  </a>
                  <div className="border-t border-gray-100 mt-1">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(isUserMenuOpen || isAlhisabMenuOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setIsUserMenuOpen(false);
            setIsAlhisabMenuOpen(false);
          }}
        />
      )}

      <OffCanvasMenu isOpen={isOffCanvasOpen} onClose={() => setIsOffCanvasOpen(false)} />
    </>
  );
} 