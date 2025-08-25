'use client';

import React from 'react';
import { Squares2X2Icon, Bars3Icon } from '@heroicons/react/24/outline';

export type ViewMode = 'board' | 'list';

interface ViewTogglerProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const ViewToggler: React.FC<ViewTogglerProps> = ({ viewMode, onViewModeChange }) => {
  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => onViewModeChange('board')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
          viewMode === 'board'
            ? 'bg-white text-blue-700 shadow-sm'
            : 'text-gray-500 hover:text-gray-900'
        }`}
      >
        <Squares2X2Icon className="w-5 h-5" />
        Board
      </button>
      <button
        onClick={() => onViewModeChange('list')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
          viewMode === 'list'
            ? 'bg-white text-blue-700 shadow-sm'
            : 'text-gray-500 hover:text-gray-900'
        }`}
      >
        <Bars3Icon className="w-5 h-5" />
        List
      </button>
    </div>
  );
};

export default ViewToggler;
