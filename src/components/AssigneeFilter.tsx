'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { UserCircleIcon, CheckIcon } from '@heroicons/react/24/outline';
import usersData from '@/data/users.json';

type AssigneeFilterProps = {
  selectedAssignees: string[];
  onChange: (selected: string[]) => void;
};

const AssigneeFilter: React.FC<AssigneeFilterProps> = ({ selectedAssignees, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const users = usersData.users;

  const handleSelect = (userId: string) => {
    const newSelection = selectedAssignees.includes(userId)
      ? selectedAssignees.filter((id) => id !== userId)
      : [...selectedAssignees, userId];
    onChange(newSelection);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-1.5 rounded-full hover:bg-gray-100 transition-colors"
        title="Filter by Assignees"
      >
        <UserCircleIcon className="w-6 h-6 text-gray-500" />
        {selectedAssignees.length > 0 && (
          <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-blue-500 border-2 border-white" />
        )}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="p-2 border-b">
            <input
              type="text"
              placeholder="Filter users"
              className="w-full px-2 py-1 border rounded-md"
            />
          </div>
          <ul className="py-1 max-h-60 overflow-y-auto">
            {users.map((user) => (
              <li
                key={user.id}
                onClick={() => handleSelect(user.id)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                    <Image 
                      src={user.avatar} 
                      alt={user.name} 
                      width={24}
                      height={24}
                      className="w-6 h-6 rounded-full object-cover" 
                    />
                    <span>{user.name}</span>
                </div>
                {selectedAssignees.includes(user.id) && (
                  <CheckIcon className="w-5 h-5 text-blue-600" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AssigneeFilter; 