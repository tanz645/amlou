import React from 'react';
import { Squares2X2Icon, TableCellsIcon, ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

interface PageHeaderProps {
  title: string;
  viewMode?: 'grid' | 'table';
  setViewMode?: (mode: 'grid' | 'table') => void;
  actions?: Array<{
    name: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    onClick: () => void;
  }>;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, viewMode, setViewMode, actions = [] }) => {
  const pathname = usePathname();
  const breadcrumb = (pathname || '')
    .split('/')
    .filter((segment) => segment)
    .map((segment, index, array) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      href: `/${array.slice(0, index + 1).join('/')}`,
      icon: index === 0 ? HomeIcon : undefined, // Add HomeIcon only for the first segment
    }));

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
          {breadcrumb.map((crumb, index) => (
            <div key={crumb.name} className="flex items-center">
              {index < breadcrumb.length - 1 ? (
                <a href={crumb.href} className="flex items-center hover:text-gray-700">
                  {crumb.icon && <crumb.icon className="h-4 w-4" />}
                  {crumb.name}
                </a>
              ) : (
                <span className="flex items-center text-blue-600">
                  {crumb.icon && <crumb.icon className="h-4 w-4 mr-1" />}
                  {crumb.name}
                </span>
              )}
              {index < breadcrumb.length - 1 && (
                <ChevronRightIcon className="h-4 w-4 mx-1" />
              )}
            </div>
          ))}
        </nav>
      </div>
      <div className="flex items-center space-x-2 bg-white rounded-lg p-1">
        {setViewMode && viewMode && (
          <>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${
                viewMode === 'grid'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Squares2X2Icon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-md ${
                viewMode === 'table'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <TableCellsIcon className="h-5 w-5" />
            </button>
          </>
        )}
        {actions.map((action) => (
          <button
            key={action.name}
            onClick={action.onClick}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700"
          >
            <action.icon className="h-5 w-5" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PageHeader;
