'use client';

import React, { useState } from 'react';
import BusinessSidebar from '@/components/sidebars/BusinessSidebar';

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 64 : 256; // w-16 or w-64

  return (
    <div className="flex h-screen bg-gray-50">
      <BusinessSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      
      <main
        className="flex-1 overflow-y-auto transition-all duration-200"
        style={{ marginLeft: sidebarWidth }}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
} 