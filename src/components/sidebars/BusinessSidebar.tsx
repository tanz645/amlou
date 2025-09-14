'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  HomeIcon,
  UserGroupIcon,
  UserIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  ChatBubbleLeftRightIcon,
  BellIcon,
  PlusIcon,
  WrenchScrewdriverIcon,
  ClipboardDocumentListIcon,
  BuildingOfficeIcon,
  CreditCardIcon,
  DocumentDuplicateIcon,
  CheckBadgeIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const menuGroups = [
  {
    name: 'Main',
    icon: HomeIcon,
    items: [
      { name: 'Dashboard', href: '/business', icon: HomeIcon },
      { name: 'Overview', href: '/business/overview', icon: ChartBarIcon },
    ]
  },
  {
    name: 'Services & Packages',
    icon: BriefcaseIcon,
    items: [
      { name: 'All Services', href: '/business/services', icon: BriefcaseIcon },
      { name: 'Create Service', href: '/business/services/new', icon: PlusIcon, isAction: true },
      { name: 'Create Bundle', href: '/business/services/bundles/new', icon: ClipboardDocumentListIcon, isAction: true },
      { name: 'Pricing', href: '/business/pricing', icon: CurrencyDollarIcon },
    ]
  },
  {
    name: 'Lead Management',
    icon: UserGroupIcon,
    items: [
      { name: 'Leads', href: '/business/leads', icon: UserGroupIcon },
      { name: 'Lead Sources', href: '/business/lead-sources', icon: MagnifyingGlassIcon },
      { name: 'Lead Scoring', href: '/business/lead-scoring', icon: ChartBarIcon },
      { name: 'Add New Lead', href: '/business/leads/new', icon: PlusIcon, isAction: true },
    ]
  },
  {
    name: 'Proposals & Agreements',
    icon: DocumentTextIcon,
    items: [
      { name: 'Proposals', href: '/business/proposals', icon: DocumentTextIcon },
      { name: 'Agreements', href: '/business/agreements', icon: DocumentDuplicateIcon },
      { name: 'Create Proposal', href: '/business/proposals/new', icon: PlusIcon, isAction: true },
      { name: 'Create Agreement', href: '/business/agreements/new', icon: PlusIcon, isAction: true },
    ]
  },
  {
    name: 'Client Management',
    icon: UserIcon,
    items: [
      { name: 'Clients', href: '/business/clients', icon: UserIcon },
      { name: 'Client Communication', href: '/business/client-communication', icon: ChatBubbleLeftRightIcon },
      { name: 'Add New Client', href: '/business/clients/new', icon: PlusIcon, isAction: true },
    ]
  },
  {
    name: 'Financial Management',
    icon: CurrencyDollarIcon,
    items: [
      { name: 'Revenue Tracking', href: '/business/revenue', icon: CurrencyDollarIcon },
      { name: 'Invoices', href: '/business/invoices', icon: DocumentTextIcon },
      { name: 'Payments', href: '/business/payments', icon: CreditCardIcon },
      { name: 'Financial Reports', href: '/business/financial-reports', icon: ChartBarIcon },
    ]
  },
  {
    name: 'Project Management',
    icon: BriefcaseIcon,
    items: [
      { name: 'Projects', href: '/business/projects', icon: BriefcaseIcon },
      { name: 'Project Timeline', href: '/business/project-timeline', icon: CalendarDaysIcon },
      { name: 'Project Status', href: '/business/project-status', icon: CheckBadgeIcon },
      { name: 'Create Project', href: '/business/projects/new', icon: PlusIcon, isAction: true },
    ]
  },
  {
    name: 'Analytics & Reports',
    icon: ChartBarIcon,
    items: [
      { name: 'Business Analytics', href: '/business/analytics', icon: ChartBarIcon },
      { name: 'Performance Reports', href: '/business/performance-reports', icon: DocumentDuplicateIcon },
      { name: 'Client Reports', href: '/business/client-reports', icon: UserIcon },
      { name: 'Revenue Reports', href: '/business/revenue-reports', icon: CurrencyDollarIcon },
    ]
  },
  {
    name: 'System',
    icon: WrenchScrewdriverIcon,
    items: [
      { name: 'Notifications', href: '/business/notifications', icon: BellIcon },
      { name: 'Messages', href: '/business/messages', icon: ChatBubbleLeftRightIcon },
      { name: 'Calendar', href: '/business/calendar', icon: CalendarDaysIcon },
      { name: 'Settings', href: '/business/settings', icon: Cog6ToothIcon },
    ]
  }
];

interface BusinessSidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
}

export default function BusinessSidebar({ collapsed, setCollapsed }: BusinessSidebarProps) {
  const rawPathname = usePathname();
  const pathname = rawPathname || '';
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const [openSlidingMenu, setOpenSlidingMenu] = useState<string | null>(null);

  // Find the group with the longest matching child href
  function getActiveGroup(pathname: string) {
    let bestGroup: typeof menuGroups[0] | undefined = undefined;
    let bestLength = -1;
    for (const group of menuGroups) {
      for (const item of group.items) {
        if (pathname.startsWith(item.href) && item.href.length > bestLength) {
          bestGroup = group;
          bestLength = item.href.length;
        }
      }
    }
    return bestGroup;
  }

  const groupWithActive = getActiveGroup(pathname);

  // When the active group changes, expand it in the non-collapsed view
  useEffect(() => {
    if (groupWithActive && !collapsed) {
      setExpandedGroups([groupWithActive.name]);
    }
  }, [pathname, groupWithActive, collapsed]);

  const handleGroupClick = (groupName: string) => {
    if (collapsed) {
      setOpenSlidingMenu(current => (current === groupName ? null : groupName));
    } else {
      setExpandedGroups(prev =>
        prev.includes(groupName)
          ? prev.filter(name => name !== groupName)
          : [groupName]
      );
    }
  };

  const handleCollapse = () => {
    setCollapsed((prev: boolean) => !prev);
    setOpenSlidingMenu(null);
  };

  const closeSlidingMenu = () => {
    setOpenSlidingMenu(null);
  };

  return (
    <div
      className={`nt-component nt-sidebar fixed top-0 left-0 h-screen z-40 bg-white/95 backdrop-blur-sm border-r border-gray-200/50 flex flex-col transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}
    >
      <div className={`p-4 flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed && (
            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                    <BriefcaseIcon className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-800">Business</h1>
            </div>
        )}
        <button onClick={handleCollapse} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            {collapsed ? <ChevronRightIcon className="w-4 h-4 text-gray-600" /> : <ChevronDownIcon className="w-4 h-4 text-gray-600" />}
        </button>
      </div>

      <nav className={`flex-1 px-2 space-y-2 ${!collapsed && 'overflow-y-auto'}`}>
        {menuGroups.map((group) => {
          const GroupIcon = group.icon;
          const isGroupActive = groupWithActive?.name === group.name;
          const isSlidingMenuOpen = openSlidingMenu === group.name;

          return (
            <div key={group.name} className="relative">
              <button
                onClick={() => handleGroupClick(group.name)}
                className={`w-full flex items-center text-left p-2 text-sm font-medium rounded-lg transition-all duration-200 group
                  ${isGroupActive && !isSlidingMenuOpen ? 'text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}
                  ${collapsed ? 'justify-center' : 'justify-between'}
                  ${isSlidingMenuOpen ? 'bg-blue-600 text-white' : ''}
                `}
              >
                <div className="flex items-center">
                  <GroupIcon className={`h-5 w-5 ${collapsed ? '' : 'mr-3'}`} />
                  {!collapsed && <span>{group.name}</span>}
                </div>
                {!collapsed && (
                  <ChevronDownIcon 
                    className={`w-4 h-4 transition-transform ${expandedGroups.includes(group.name) ? 'rotate-180' : ''}`} 
                  />
                )}
              </button>

              {collapsed && isSlidingMenuOpen && (
                <div className="absolute left-full top-0 ml-2 w-56 bg-white/95 backdrop-blur-sm shadow-xl rounded-xl border border-gray-200/50 py-2 z-50 animate-slide-in">
                  <div className="px-3 py-2 border-b border-gray-100 mb-1">
                    <div className="text-sm font-semibold text-gray-800">
                      {group.name}
                    </div>
                  </div>
                  <div className="space-y-1">
                    {group.items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={closeSlidingMenu}
                        className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors mx-1
                          ${pathname.startsWith(item.href) ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                          ${item.isAction ? 'text-green-600 hover:text-green-700' : ''}
                        `}
                      >
                        <item.icon className="h-4 w-4 mr-3" />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {!collapsed && expandedGroups.includes(group.name) && (
                <div className="space-y-1 mt-1 ml-4 pl-2 border-l border-gray-200/80">
                  {group.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-colors w-full
                        ${pathname.startsWith(item.href) ? 'text-blue-600 font-semibold' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}
                        ${item.isAction ? 'text-green-600 hover:text-green-700' : ''}
                      `}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full mr-3 ${pathname.startsWith(item.href) ? 'bg-blue-500' : item.isAction ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-gray-200/50">
          <div className="flex items-center justify-between">
              {!collapsed && (
                  <div className="text-xs text-gray-500">
                      v2.1.0
                  </div>
              )}
              <button
                  onClick={handleCollapse}
                  className="p-1 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
                  title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                  {collapsed ? <ArrowRightOnRectangleIcon className="h-5 w-5" /> : <ArrowLeftOnRectangleIcon className="h-5 w-5" />}
              </button>
          </div>
      </div>
    </div>
  );
} 