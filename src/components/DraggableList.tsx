'use client';

import React from 'react';

type ListItem = {
  id: string;
  [key: string]: unknown;
};

interface SimpleListProps {
  items: ListItem[];
  onReorder?: (items: ListItem[]) => void;
  renderItem: (item: ListItem) => React.ReactNode;
  className?: string;
}

const SimpleList: React.FC<SimpleListProps> = ({ items, renderItem, className = '' }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item) => (
        <div
          key={item.id}
          className="p-4 bg-white rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
        >
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
};

export default SimpleList; 