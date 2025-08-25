'use client';

import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export interface BreadcrumbItem {
  name: string;
  href: string;
  isCurrent: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-1.5">
        {items.map((item, index) => (
          <li key={item.name}>
            <div className="flex items-center">
              {index > 0 && (
                <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              )}
              <Link
                href={item.href}
                className={`ml-1.5 text-sm font-medium flex items-center gap-1.5 ${
                  item.isCurrent
                    ? 'text-gray-500 pointer-events-none'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                aria-current={item.isCurrent ? 'page' : undefined}
              >
                {item.icon && <item.icon className="h-4 w-4 flex-shrink-0" />}
                {item.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb; 