'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  HomeIcon,
  RocketLaunchIcon,
  MagnifyingGlassCircleIcon,
  LightBulbIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  ChartBarIcon,
  PresentationChartLineIcon,
  TagIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  PlusIcon,
  WrenchScrewdriverIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';

const menuGroups = [
  {
    name: 'Main',
    icon: HomeIcon,
    items: [
      { name: 'Dashboard', href: '/strategic-planning', icon: PresentationChartLineIcon },
      { name: 'Overview', href: '/strategic-planning/overview', icon: ChartBarIcon },
    ]
  },
  {
    name: 'Performance & Audit',
    icon: MagnifyingGlassCircleIcon,
    items: [
      { name: 'Performance Audits', href: '/strategic-planning/performance-audits', icon: MagnifyingGlassCircleIcon },
      { name: 'New Audit', href: '/strategic-planning/new-audit', icon: PlusIcon, isAction: true },
      { name: 'Competitor Analysis', href: '/strategic-planning/competitor-analysis', icon: EyeIcon },
      { name: 'Analytics Reports', href: '/strategic-planning/analytics', icon: ChartBarIcon },
      { name: 'KPI Tracking', href: '/strategic-planning/kpis', icon: TagIcon },
    ]
  },
  {
    name: 'Strategic Planning',
    icon: LightBulbIcon,
    items: [
      { name: 'Strategic Goals', href: '/strategic-planning/goals', icon: LightBulbIcon },
      { name: 'Content Strategy', href: '/strategic-planning/content-strategy', icon: DocumentTextIcon },
      { name: 'Brand Strategy', href: '/strategic-planning/brand-strategy', icon: TagIcon },
      { name: 'Market Research', href: '/strategic-planning/market-research', icon: MagnifyingGlassCircleIcon },
    ]
  },
  {
    name: 'Campaign Management',
    icon: RocketLaunchIcon,
    items: [
      { name: 'Campaigns', href: '/strategic-planning/campaigns', icon: RocketLaunchIcon },
      { name: 'Social Media', href: '/strategic-planning/social-media', icon: ChatBubbleLeftRightIcon },
      { name: 'Email Marketing', href: '/strategic-planning/email-marketing', icon: DocumentTextIcon },
      { name: 'SEO & PPC', href: '/strategic-planning/seo-ppc', icon: TagIcon },
      { name: 'New Campaign', href: '/strategic-planning/campaigns/new', icon: PlusIcon, isAction: true },
    ]
  },
  {
    name: 'Team & Budget',
    icon: UserGroupIcon,
    items: [
      { name: 'Team Management', href: '/strategic-planning/team', icon: UserGroupIcon },
      { name: 'Budget Management', href: '/strategic-planning/budget', icon: CurrencyDollarIcon },
      { name: 'Resource Allocation', href: '/strategic-planning/resources', icon: WrenchScrewdriverIcon },
      { name: 'Timeline Planning', href: '/strategic-planning/timeline', icon: CalendarDaysIcon },
    ]
  },
  {
    name: 'System',
    icon: Cog6ToothIcon,
    items: [
      { name: 'Notifications', href: '/strategic-planning/notifications', icon: BellIcon },
      { name: 'Messages', href: '/strategic-planning/messages', icon: ChatBubbleLeftRightIcon },
      { name: 'Calendar', href: '/strategic-planning/calendar', icon: CalendarDaysIcon },
      { name: 'Settings', href: '/strategic-planning/settings', icon: Cog6ToothIcon },
    ]
  }
];

interface StrategicPlanningSidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
}

export default function StrategicPlanningSidebar({ collapsed, setCollapsed }: StrategicPlanningSidebarProps) {
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
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                    <LightBulbIcon className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-800">Strategic</h1>
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
                  ${isGroupActive && !isSlidingMenuOpen ? 'text-purple-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}
                  ${collapsed ? 'justify-center' : 'justify-between'}
                  ${isSlidingMenuOpen ? 'bg-purple-600 text-white' : ''}
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
                          ${pathname.startsWith(item.href) ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
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
                        ${pathname.startsWith(item.href) ? 'text-purple-600 font-semibold' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}
                        ${item.isAction ? 'text-green-600 hover:text-green-700' : ''}
                      `}
                    >
                      {item.isAction ? (
                        <PlusIcon className="h-3 w-3 mr-3 text-green-500" />
                      ) : (
                        <span className={`w-1.5 h-1.5 rounded-full mr-3 ${pathname.startsWith(item.href) ? 'bg-purple-500' : 'bg-gray-300'}`}></span>
                      )}
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