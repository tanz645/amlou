'use client';

import React, { useState, useRef, useEffect } from 'react';
import { EllipsisVerticalIcon, CalendarIcon, FlagIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import usersData from '@/data/users.json';
import AssigneeSelector from '@/components/AssigneeSelector';

type Task = {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'doing' | 'qc' | 'redo' | 'done' | 'delivered' | 'archived';
  assigned_to: string[];
  priority: 'low' | 'medium' | 'high';
  order: number;
  start_date: string;
  end_date: string;
  project_name: string;
  service_name: string;
  subtask_count?: number;
};

const priorityConfig: Record<string, { icon: React.ElementType, color: string, name: string }> = {
  low: { icon: FlagIcon, color: 'text-yellow-500', name: 'Low' },
  medium: { icon: FlagIcon, color: 'text-orange-500', name: 'Medium' },
  high: { icon: FlagIcon, color: 'text-red-600', name: 'High' },
};

const columnConfig: Record<Task['status'], { name: string, color: string }> = {
  planning: { name: 'Planning', color: 'bg-gray-400' },
  doing: { name: 'In Progress', color: 'bg-blue-500' },
  qc: { name: 'Quality Check', color: 'bg-purple-500' },
  redo: { name: 'Redo', color: 'bg-red-500' },
  done: { name: 'Done', color: 'bg-green-500' },
  delivered: { name: 'Delivered', color: 'bg-teal-500' },
  archived: { name: 'Archived', color: 'bg-gray-700' },
};

type TaskCardProps = {
    task: Task;
    snapshot?: { isDragging?: boolean };
    onCardClick: (task: Task) => void;
    onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
    onPopupToggle: (isOpen: boolean) => void;
};

const TaskCard: React.FC<TaskCardProps> = ({ task, snapshot, onCardClick, onUpdateTask, onPopupToggle }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [assigneePopupOpen, setAssigneePopupOpen] = useState(false);
    const [datePopupOpen, setDatePopupOpen] = useState(false);
    const [priorityPopupOpen, setPriorityPopupOpen] = useState(false);
    
    const [tempStartDate, setTempStartDate] = useState(task.start_date);
    const [tempEndDate, setTempEndDate] = useState(task.end_date);

    const menuRef = useRef<HTMLDivElement>(null);
    const assigneeRef = useRef<HTMLDivElement>(null);
    const dateRef = useRef<HTMLDivElement>(null);
    const priorityRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const isAnyPopupOpen = menuOpen || assigneePopupOpen || datePopupOpen || priorityPopupOpen;
        onPopupToggle(isAnyPopupOpen);
    }, [menuOpen, assigneePopupOpen, datePopupOpen, priorityPopupOpen, onPopupToggle]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) setMenuOpen(false);
            if (assigneeRef.current && !assigneeRef.current.contains(event.target as Node)) setAssigneePopupOpen(false);
            if (dateRef.current && !dateRef.current.contains(event.target as Node)) setDatePopupOpen(false);
            if (priorityRef.current && !priorityRef.current.contains(event.target as Node)) setPriorityPopupOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleStatusChange = (newStatus: Task['status']) => {
        onUpdateTask(task.id, { status: newStatus });
        setMenuOpen(false);
    };

    const handlePriorityChange = (newPriority: Task['priority']) => {
        onUpdateTask(task.id, { priority: newPriority });
        setPriorityPopupOpen(false);
    };

    const handleDateChange = () => {
        onUpdateTask(task.id, { start_date: tempStartDate, end_date: tempEndDate });
        setDatePopupOpen(false);
    }
    
    const PriorityIcon = priorityConfig[task.priority].icon;
    const priorityColor = priorityConfig[task.priority].color;
    
    return (
        <div
            className={`bg-white p-3 rounded-lg shadow-sm border transition-shadow relative ${snapshot?.isDragging ? 'shadow-md border-blue-500' : 'border-gray-200/80 hover:bg-gray-50 hover:border-gray-300'}`}
        >
            <div
              onClick={() => onCardClick(task)}
              className="absolute inset-0 cursor-pointer"
            ></div>
            <div className="absolute top-2 right-2 z-10">
                <div ref={menuRef} className="relative">
                    <button
                        onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
                        className="p-1 text-gray-400 hover:text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                    >
                        <EllipsisVerticalIcon className="w-4 h-4" />
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-20 border border-gray-100">
                            <div className="py-1">
                                <span className="block px-4 py-2 text-xs text-gray-400">Change Status</span>
                                {Object.entries(columnConfig).filter(([statusKey]) => statusKey !== 'archived' && statusKey !== task.status).map(([statusKey, { name }]) => (
                                    <button
                                        key={statusKey}
                                        onClick={(e) => { e.stopPropagation(); handleStatusChange(statusKey as Task['status']); }}
                                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        {name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <h4 onClick={() => onCardClick(task)} className="font-semibold text-gray-800 mb-4 pr-6 text-base cursor-pointer">{task.title}</h4>
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                    <div ref={priorityRef} className="relative z-10">
                        <button onClick={(e) => { e.stopPropagation(); setPriorityPopupOpen(p => !p); }} title={`Priority: ${priorityConfig[task.priority].name}`}>
                            <PriorityIcon className={`w-5 h-5 ${priorityColor}`} />
                        </button>
                        {priorityPopupOpen && (
                             <div className="absolute top-full mt-2 w-40 bg-white rounded-md shadow-lg z-20 border border-gray-100 p-2">
                                {Object.entries(priorityConfig).map(([pKey, pValue]) => (
                                    <button
                                        key={pKey}
                                        onClick={(e) => { e.stopPropagation(); handlePriorityChange(pKey as Task['priority']); }}
                                        className="w-full text-left flex items-center gap-2 px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                                    >
                                        <pValue.icon className={`w-5 h-5 ${pValue.color}`} />
                                        <span>{pValue.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <div ref={assigneeRef} className="relative z-10" onClick={(e) => e.stopPropagation()}>
                        <AssigneeSelector
                            isOpen={assigneePopupOpen}
                            onToggle={() => setAssigneePopupOpen(p => !p)}
                            isCompact={true}
                            selectedAssignees={task.assigned_to}
                            onAssigneesChange={(assignees: string[]) => onUpdateTask(task.id, { assigned_to: assignees })}
                            trigger={
                                <div className="cursor-pointer">
                                {task.assigned_to.length > 0 ? (() => {
                                    const user = usersData.users.find(u => u.id === task.assigned_to[0]);
                                    const initials = user ? user.name.split(' ').map(n => n[0]).join('').substring(0,2) : '';
                                    return user ? (
                                        <div key={user.id} title={user.name} className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white">
                                            {initials}
                                        </div>
                                    ) : null;
                                })() : <div className="w-6 h-6 rounded-full bg-gray-200" title="Add assignee"></div>}
                                </div>
                            }
                        />
                    </div>
                </div>
                <div ref={dateRef} className="relative z-10">
                    <button onClick={(e) => { e.stopPropagation(); setDatePopupOpen(p => !p)}} className="flex items-center gap-1.5" title={`Due ${format(new Date(task.end_date), 'MMM d, yyyy')}`}>
                        <CalendarIcon className="w-4 h-4 text-gray-500" />
                        <span className={`font-semibold text-sm text-gray-700`}>{format(new Date(task.end_date), 'MMM d')}</span>
                    </button>
                    {datePopupOpen && (
                        <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-20 border border-gray-100 p-4 space-y-4">
                           <div>
                             <label className="text-xs font-medium text-gray-500 block mb-1">Start Date</label>
                             <input 
                                type="date"
                                value={tempStartDate.split('T')[0]}
                                onChange={(e) => setTempStartDate(e.target.value)}
                                className="w-full border-gray-300 rounded-md shadow-sm text-sm p-2"
                             />
                           </div>
                           <div>
                             <label className="text-xs font-medium text-gray-500 block mb-1">End Date</label>
                             <input 
                                type="date"
                                value={tempEndDate.split('T')[0]}
                                onChange={(e) => setTempEndDate(e.target.value)}
                                className="w-full border-gray-300 rounded-md shadow-sm text-sm p-2"
                             />
                           </div>
                           <button onClick={(e) => { e.stopPropagation(); handleDateChange(); }} className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 text-sm">Set Dates</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskCard; 