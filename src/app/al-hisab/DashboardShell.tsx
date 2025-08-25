'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/sidebars/Sidebar';

const SIDEBAR_WIDTH = 256; // w-64
const SIDEBAR_COLLAPSED_WIDTH = 64; // w-16

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="nt-dashboard min-h-screen bg-gray-50">
      <div className="flex pt-12">
        hello I am test
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <div
          className="nt-main-body grow transition-all duration-300"
          style={{ marginLeft: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH }}
        >
          <main className="nt-contents p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
} 