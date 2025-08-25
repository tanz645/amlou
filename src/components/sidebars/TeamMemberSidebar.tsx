'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MagnifyingGlassIcon, ChevronDoubleLeftIcon } from '@heroicons/react/24/outline';

type User = {
  id: string;
  name: string;
  avatar: string;
  designation: string;
};

interface TeamMemberSidebarProps {
  users: User[];
  selectedUserId: string | null;
  onSelectUser: (userId: string) => void;
}

const TeamMemberSidebar: React.FC<TeamMemberSidebarProps> = ({ users, selectedUserId, onSelectUser }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className={`bg-white border-r border-gray-200 flex flex-col shrink-0 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-72'}`}>
      <div className={`p-4 border-b border-gray-200 sticky top-0 bg-white z-10 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        {!isCollapsed && (
          <div>
            <h2 className="text-lg font-bold text-gray-800">Team</h2>
            <p className="text-xs text-gray-500">{users.length} members</p>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 text-gray-500 rounded-md hover:bg-gray-100"
        >
          <ChevronDoubleLeftIcon className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {!isCollapsed && (
        <div className="p-4">
          <div className="relative">
            <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {filteredUsers.map(user => (
          <button
            key={user.id}
            onClick={() => onSelectUser(user.id)}
            title={user.name}
            className={`w-full text-left flex items-center gap-3 p-3 transition-all duration-200 border-r-4 ${selectedUserId === user.id ? 'bg-blue-50 border-blue-500' : 'border-transparent hover:bg-gray-100'}`}
          >
            <Image 
              src={user.avatar} 
              alt={user.name} 
              width={36}
              height={36}
              className="w-9 h-9 rounded-full object-cover" 
            />
            {!isCollapsed && (
              <div>
                <p className={`font-semibold text-sm ${selectedUserId === user.id ? 'text-blue-700' : 'text-gray-800'}`}>{user.name}</p>
                <p className="text-xs text-gray-500">{user.designation}</p>
              </div>
            )}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default TeamMemberSidebar; 