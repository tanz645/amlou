'use client';

import React, { useState } from 'react';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';

// This should be in a types file
type UserWithStats = {
    id: string;
    name: string;
    email: string;
    avatar: string;
    designation: string;
    working_days: number;
    leave_taken: number;
    overtime_hours: number;
    salary: number;
    bonus: number;
    stats: {
      assigned: number;
      done: number;
      qc: number;
      redo: number;
    };
};

interface UserInfoPanelProps {
  user: UserWithStats | null;
}

const StatListItem = ({ label, value }: { label: string, value: string | number }) => (
    <div className="flex justify-between items-center py-2.5">
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-sm font-semibold text-gray-900">{value}</p>
    </div>
);

const UserInfoPanel: React.FC<UserInfoPanelProps> = ({ user }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (isCollapsed) {
    return (
        <aside className="w-16 bg-white border-l border-gray-200 flex flex-col items-center py-4">
             <button
                onClick={() => setIsCollapsed(false)}
                className="p-2 text-gray-500 rounded-md hover:bg-gray-100"
                title="Expand Panel"
            >
                <ChevronDoubleRightIcon className="w-6 h-6 transform rotate-180" />
            </button>
        </aside>
    )
  }

  if (!user) {
    return <aside className="w-80 bg-white border-l border-gray-200 p-8 flex items-center justify-center"><p>Select a user to see details.</p></aside>;
  }

  return (
    <aside className="w-80 bg-white border-l border-gray-200 flex flex-col shrink-0 transition-all duration-300">
        <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">User Details</h2>
            <button
            onClick={() => setIsCollapsed(true)}
            className="p-2 text-gray-500 rounded-md hover:bg-gray-100"
            title="Collapse Panel"
            >
                <ChevronDoubleRightIcon className="w-5 h-5" />
            </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Work Overview</h3>
                <div className="divide-y divide-gray-200/70">
                    <StatListItem label="Assigned" value={user.stats.assigned} />
                    <StatListItem label="Done" value={user.stats.done} />
                    <StatListItem label="In QC" value={user.stats.qc} />
                    <StatListItem label="Redo" value={user.stats.redo} />
                    <StatListItem label="Bonus" value={`$${user.bonus.toLocaleString()}`} />
                </div>
              </div>
              
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Attendance & Payroll</h3>
                <div className="divide-y divide-gray-200/70">
                    <StatListItem label="Working Days" value={user.working_days} />
                    <StatListItem label="Leave" value={`${user.leave_taken} days`} />
                    <StatListItem label="Overtime" value={`${user.overtime_hours} hours`} />
                    <StatListItem label="Salary" value={`$${(user.salary / 1000).toFixed(1)}k`} />
                </div>
              </div>
            </div>
        </div>
    </aside>
  );
};

export default UserInfoPanel; 