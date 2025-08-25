import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

interface PageHeaderProps {
  title: string;
  viewMode?: 'grid' | 'table';
  onViewModeChange?: (mode: 'grid' | 'table') => void;
  showViewToggle?: boolean;
  actionLabel?: string;
  onAction?: () => void;
  actions?: {
    name: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    onClick: () => void;
  }[];
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  viewMode = 'grid',
  onViewModeChange,
  showViewToggle = !!onViewModeChange,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <div className="flex items-center space-x-4">
        {showViewToggle && (
          <div className="flex bg-white rounded-lg border border-blue-100 overflow-hidden">
            <button
              className={`px-3 py-2 flex items-center focus:outline-none ${
                viewMode === 'grid'
                  ? 'text-blue-600 border-blue-600 border rounded-lg bg-blue-50'
                  : 'text-gray-400'
              }`}
              onClick={() => onViewModeChange && onViewModeChange('grid')}
              aria-label="Grid view"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3.75h4.5v4.5h-4.5v-4.5zm0 12h4.5v4.5h-4.5v-4.5zm12-12h4.5v4.5h-4.5v-4.5zm0 12h4.5v4.5h-4.5v-4.5z"
                />
              </svg>
            </button>
            <button
              className={`px-3 py-2 flex items-center focus:outline-none ${
                viewMode === 'table'
                  ? 'text-blue-600 border-blue-600 border rounded-lg bg-blue-50'
                  : 'text-gray-400'
              }`}
              onClick={() => onViewModeChange && onViewModeChange('table')}
              aria-label="Table view"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5m-16.5 5.5h16.5m-16.5 5.5h16.5"
                />
              </svg>
            </button>
          </div>
        )}
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;