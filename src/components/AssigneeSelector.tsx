'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import users from '@/data/users.json';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface AssigneeSelectorProps {
  selectedAssignees: string[];
  onAssigneesChange: (assignees: string[]) => void;
  trigger?: React.ReactNode;
  showSearch?: boolean;
  isCompact?: boolean; // New prop for subtask style
  isOpen?: boolean;
  onToggle?: () => void;
}

const AssigneeSelector: React.FC<AssigneeSelectorProps> = ({
  selectedAssignees,
  onAssigneesChange,
  trigger,
  showSearch = false,
  isCompact = false, // Default to the full version
  isOpen: controlledIsOpen,
  onToggle,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(showSearch);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalIsOpen(prev => !prev);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setInternalIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleAssigneeToggle = (userId: string) => {
    const newAssignees = selectedAssignees.includes(userId)
      ? selectedAssignees.filter(id => id !== userId)
      : [...selectedAssignees, userId];
    onAssigneesChange(newAssignees);
  };

  const removeAssignee = (e: React.MouseEvent, userId: string) => {
    e.stopPropagation(); // Prevent dropdown from opening
    onAssigneesChange(selectedAssignees.filter(id => id !== userId));
  };
  
  const filteredUsers = users.users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSelectedUsers = () => users.users.filter(user => selectedAssignees.includes(user.id));

  // Full version for main task form
  if (!isCompact) {
    return (
      <div className="relative" ref={dropdownRef}>
        <div onClick={() => setInternalIsOpen(true)} className="min-h-[40px] p-2 border border-gray-300 rounded-md bg-white flex flex-wrap gap-2 items-center cursor-pointer">
          {getSelectedUsers().map(user => (
            <div key={user.id} className="flex items-center gap-1 bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">
              <Image 
                src={user.avatar || ''} 
                alt={user.name} 
                width={20}
                height={20}
                className="w-5 h-5 rounded-full object-cover" 
              />
              <span>{user.name}</span>
              <button type="button" onClick={(e) => removeAssignee(e, user.id)} className="text-gray-500 hover:text-red-600">
                <XMarkIcon className="w-3 h-3" />
              </button>
            </div>
          ))}
          {selectedAssignees.length === 0 && <span className="text-gray-500">Select assignees...</span>}
        </div>
        {/* Dropdown for full version */}
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            <div className="p-2 border-b border-gray-200">
              <input 
                type="text" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                placeholder="Search..." 
                className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" 
                autoFocus 
              />
            </div>
            <div className="p-1 max-h-60 overflow-y-auto">
              {filteredUsers.map((user) => (
                <div 
                  key={user.id} 
                  className={`flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer ${selectedAssignees.includes(user.id) ? 'bg-blue-50' : ''}`} 
                  onClick={() => handleAssigneeToggle(user.id)}
                >
                  <Image 
                    src={user.avatar || ''} 
                    alt={user.name} 
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium flex-1">{user.name}</span>
                  {selectedAssignees.includes(user.id) && <CheckCircleIcon className="w-5 h-5 text-blue-600" />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // Compact version for subtasks
  return (
    <div className={`relative`} ref={dropdownRef}>
        {trigger && <div onClick={handleToggle}>{trigger}</div>}
        {isOpen && (
        <div className="absolute z-10 w-72 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl -translate-x-1/2 left-1/2">
          <div className="p-2 border-b border-gray-200">
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" autoFocus />
          </div>
          <div className="p-1 max-h-60 overflow-y-auto">
            {filteredUsers.map((user) => (
                <div key={user.id} className={`flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer ${selectedAssignees.includes(user.id) ? 'bg-blue-50' : ''}`} onClick={() => handleAssigneeToggle(user.id)}>
                  <Image 
                    src={user.avatar || ''} 
                    alt={user.name} 
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium flex-1">{user.name}</span>
                  {selectedAssignees.includes(user.id) && <CheckCircleIcon className="w-5 h-5 text-blue-600" />}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssigneeSelector; 