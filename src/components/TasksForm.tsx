'use client';

import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import tasks from '@/data/tasks.json';
import users from '@/data/users.json';
import AssigneeSelector from './AssigneeSelector';
import { 
  CalendarIcon, 
  ClockIcon, 
  UserIcon, 
  PlusIcon,
  ArrowPathIcon,
  FlagIcon,
  PlayCircleIcon,
  XMarkIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ArrowPathRoundedSquareIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

interface Subtask {
  id: string; 
  title: string; 
  status: string; 
  assignee: string[];
  start_date: string;
  end_date: string;
  mother_task?: string;
  task_type: 'one_time' | 'repetitive';
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  files: Array<{ id: string; name: string; type: string; size: number; url: string }>;
}

interface TaskFormData {
  project_id: string;
  title: string;
  status: string;
  start_date: string;
  end_date: string;
  assignee: string[];
  tags: string[];
  priority: 'low' | 'medium' | 'high';
  description: string;
  estimated_time: string;
  task_type: 'one_time' | 'repetitive';
  checklist: Array<{ id: string; text: string; completed: boolean }>;
  departments: string[];
  mother_task?: string;
  subtasks: Subtask[];
  files: Array<{ id: string; name: string; type: string; size: number; url: string }>;
}

interface TasksFormProps {
  taskId?: string;
}

const STATUS_OPTIONS = [
  { value: 'planning', label: 'Planning', color: 'bg-gray-200 text-gray-800' },
  { value: 'doing', label: 'Doing', color: 'bg-blue-200 text-blue-800' },
  { value: 'qc', label: 'QC', color: 'bg-yellow-200 text-yellow-800' },
  { value: 'redo', label: 'Redo', color: 'bg-red-200 text-red-800' },
  { value: 'done', label: 'Done', color: 'bg-green-200 text-green-800' },
  { value: 'delivered', label: 'Delivered', color: 'bg-purple-100 text-purple-800' },
  { value: 'archived', label: 'Archived', color: 'bg-gray-100 text-gray-600' }
];

const ESTIMATED_TIME_OPTIONS = [
  { value: '1_hour', label: '1 Hour', days: 0.04 },
  { value: '2_hours', label: '2 Hours', days: 0.08 },
  { value: '4_hours', label: '4 Hours', days: 0.17 },
  { value: '1_day', label: '1 Day', days: 1 },
  { value: '2_days', label: '2 Days', days: 2 },
  { value: '3_days', label: '3 Days', days: 3 },
  { value: '1_week', label: '1 Week', days: 7 },
  { value: '2_weeks', label: '2 Weeks', days: 14 },
  { value: '1_month', label: '1 Month', days: 30 }
];

const PRIORITY_OPTIONS = [
    { value: 'low' as const, label: 'Low', icon: FlagIcon, color: 'text-gray-500'},
    { value: 'medium' as const, label: 'Medium', icon: FlagIcon, color: 'text-yellow-500'},
    { value: 'high' as const, label: 'High', icon: FlagIcon, color: 'text-red-500'},
];

const DEFAULT_SUBTASKS = [
  { title: 'Verification', status: 'planning' },
  { title: 'Design', status: 'planning' },
  { title: 'Content & Multimedia', status: 'planning' },
  { title: 'QC', status: 'planning' },
  { title: 'Client Check', status: 'planning' },
  { title: 'Deliver', status: 'planning' }
];

// Custom hook to detect click outside of a component
function useOnClickOutside(ref: React.RefObject<HTMLDivElement>, handler: (event: MouseEvent | TouchEvent) => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

const DueDateEditor = ({ startDate, endDate, onSave }: { startDate: string, endDate: string, onSave: (dates: { start: string, end: string }) => void }) => {
    const [start, setStart] = useState(startDate);
    const [end, setEnd] = useState(endDate);
    return (
        <div className="bg-white p-3 rounded-lg shadow-xl border w-72 space-y-3">
            <div>
                <label className="text-xs font-medium">Start</label>
                <input type="date" value={start} onChange={e => setStart(e.target.value)} className="w-full p-2 border rounded-md text-sm"/>
            </div>
            <div>
                <label className="text-xs font-medium">End</label>
                <input type="date" value={end} onChange={e => setEnd(e.target.value)} className="w-full p-2 border rounded-md text-sm"/>
            </div>
            <button onClick={() => onSave({ start, end })} className="w-full bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-blue-700">Set Dates</button>
        </div>
    );
};

const PriorityEditor = ({ onSave }: { onSave: (newPriority: 'low' | 'medium' | 'high') => void }) => (
    <div className="bg-white rounded-lg shadow-xl border w-40">
        {PRIORITY_OPTIONS.map(p => {
            const Icon = p.icon;
            return <button key={p.value} onClick={() => onSave(p.value)} className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-100">
                <Icon className={`w-4 h-4 ${p.color}`} />
                <span>{p.label}</span>
            </button>
        })}
    </div>
);

const ProgressBar = ({ progress }: { progress: number }) => (
    <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-600">Task Progress</span>
            <span className="text-sm font-bold text-gray-800">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
    </div>
);

const TasksForm: React.FC<TasksFormProps> = ({ taskId }) => {
  const [formData, setFormData] = useState<TaskFormData>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    
    return {
      project_id: '',
      title: '',
      status: 'planning',
      start_date: tomorrow.toISOString().split('T')[0],
      end_date: dayAfterTomorrow.toISOString().split('T')[0],
      assignee: [],
      tags: [],
      priority: 'medium',
      description: '',
      estimated_time: '',
      task_type: 'one_time',
      checklist: [],
      departments: [],
      subtasks: [],
      files: [],
      mother_task: undefined
    };
  });

  const [activeEditor, setActiveEditor] = useState<string | null>(null);
  const [viewingSubtask, setViewingSubtask] = useState<Subtask | null>(null);
  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [editingChecklistItem, setEditingChecklistItem] = useState<string | null>(null);
  const [editingChecklistText, setEditingChecklistText] = useState('');
  const editorRef = useRef<HTMLDivElement>(null!);

  useOnClickOutside(editorRef, () => {
    setActiveEditor(null);
  });

  // Load task data when editing
  useEffect(() => {
    if (taskId) {
      const task = tasks.tasks.find(t => t.id === taskId);
      if (task) {
        setFormData({
          project_id: task.project_id || '',
          title: task.title || '',
          status: task.status || 'planning',
          start_date: task.start_date || '',
          end_date: task.end_date || '',
          assignee: Array.isArray(task.assigned_to) ? task.assigned_to : [],
          tags: Array.isArray(task.tags) ? task.tags : [],
          priority: (task.priority as 'low' | 'medium' | 'high') || 'medium',
          description: task.description || '',
          estimated_time: '2_days',
          task_type: (task.type as 'one_time' | 'repetitive') || 'one_time',
          checklist: [],
          departments: [],
          subtasks: DEFAULT_SUBTASKS.map((subtask, index) => ({
            id: (index + 1).toString(),
            title: subtask.title,
            status: subtask.status,
            assignee: [],
            start_date: '',
            end_date: '',
            mother_task: task.id,
            task_type: (task.type as 'one_time' | 'repetitive') || 'one_time',
            priority: (task.priority as 'low' | 'medium' | 'high') || 'medium',
            tags: [],
            files: [],
          })),
          files: [],
          mother_task: task.id
        });
      }
    } else {
      // For new tasks, add default subtasks
      setFormData(prev => ({
        ...prev,
        subtasks: DEFAULT_SUBTASKS.map((subtask, index) => ({
          id: (index + 1).toString(),
          title: subtask.title,
          status: subtask.status,
          assignee: [],
          start_date: '',
          end_date: '',
          mother_task: undefined,
          task_type: 'one_time',
          priority: 'medium',
          tags: [],
          files: [],
        }))
      }));
    }
  }, [taskId]);

  const handleInputChange = (field: keyof TaskFormData, value: string | string[] | 'low' | 'medium' | 'high' | boolean | Array<{ id: string; text: string; completed: boolean }>) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addChecklistItem = () => {
    if (newChecklistItem.trim() === '') return;
    const newItem = { id: Date.now().toString(), text: newChecklistItem, completed: false };
    handleInputChange('checklist', [...formData.checklist, newItem]);
    setNewChecklistItem('');
  };

  const toggleChecklistItem = (id: string) => {
    const updatedChecklist = formData.checklist.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    handleInputChange('checklist', updatedChecklist);
  };

  const startEditingChecklistItem = (item: { id: string; text: string; completed: boolean }) => {
    setEditingChecklistItem(item.id);
    setEditingChecklistText(item.text);
  };

  const saveChecklistItemEdit = () => {
    if (editingChecklistText.trim() === '') return;
    const updatedChecklist = formData.checklist.map(item => 
      item.id === editingChecklistItem ? { ...item, text: editingChecklistText } : item
    );
    handleInputChange('checklist', updatedChecklist);
    setEditingChecklistItem(null);
    setEditingChecklistText('');
  };

  const deleteChecklistItem = (id: string) => {
    const updatedChecklist = formData.checklist.filter(item => item.id !== id);
    handleInputChange('checklist', updatedChecklist);
  };

  const removeSubtask = (id: string) => {
    setFormData(prev => ({
      ...prev,
      subtasks: prev.subtasks.filter(subtask => subtask.id !== id)
    }));
  };

  const updateSubtask = (id: string, field: Partial<Subtask>) => {
    setFormData(prev => ({
      ...prev,
      subtasks: prev.subtasks.map(subtask =>
        subtask.id === id ? { ...subtask, ...field } : subtask
      )
    }));
  };

  const addNewSubtask = () => {
    if (newSubtaskTitle.trim() === '') return;
    const newSubtask: Subtask = {
      id: Date.now().toString(),
      title: newSubtaskTitle,
      status: 'planning',
      assignee: [],
      start_date: '',
      end_date: '',
      mother_task: taskId,
      task_type: 'one_time',
      priority: 'medium',
      tags: [],
      files: [],
    };
    setFormData(prev => ({
      ...prev,
      subtasks: [...prev.subtasks, newSubtask]
    }));
    setNewSubtaskTitle('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    if (taskId) {
      console.log('Updating task:', taskId);
      // Add your update logic here
    } else {
      console.log('Creating new task');
      // Add your creation logic here
    }
  };

  const completedSubtasks = formData.subtasks.filter(t => t.status === 'done').length;
  const progress = formData.subtasks.length > 0 ? (completedSubtasks / formData.subtasks.length) * 100 : 0;

  return (
    <>
      {/* Subtask Detail Modal */}
      {viewingSubtask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center" onClick={() => setViewingSubtask(null)}>
          <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">{viewingSubtask.title}</h2>
            <p>Status: {viewingSubtask.status}</p>
            <p>Priority: {viewingSubtask.priority}</p>
            <p>Assignees: {viewingSubtask.assignee.map(id => users.users.find(u=>u.id===id)?.name).join(', ')}</p>
            <button onClick={() => setViewingSubtask(null)} className="mt-6 bg-gray-200 px-4 py-2 rounded-md">Close</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          {/* Task Title with Repetitive Toggle */}
          <div className="mb-4 flex items-center gap-3">
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="flex-1 text-2xl font-bold border-none focus:ring-0 p-0"
              placeholder="Task Title"
            />
            <button
              type="button"
              onClick={() => handleInputChange('task_type', formData.task_type === 'repetitive' ? 'one_time' : 'repetitive')}
              className={`p-2 rounded-lg transition-colors ${
                formData.task_type === 'repetitive' 
                  ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' 
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
              title={formData.task_type === 'repetitive' ? 'Repetitive Task' : 'One-time Task'}
            >
              <ArrowPathRoundedSquareIcon className="w-5 h-5" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <ProgressBar progress={progress} />

          {/* === Main form grid - REVERTED TO ORIGINAL === */}
          <div className="grid grid-cols-[max-content_1fr] items-center gap-x-8 gap-y-4 mb-8">
            {/* Status */}
            <div className="flex items-center text-sm font-medium text-gray-600">
              <ArrowPathIcon className="w-5 h-5 mr-3" />
              Status
            </div>
            <div>
              <select 
                value={formData.status} 
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="p-1 border border-gray-300 rounded-md text-sm"
              >
                {STATUS_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>

            {/* Assignees - Fixed */}
            <div className="flex items-center text-sm font-medium text-gray-600">
              <UserIcon className="w-5 h-5 mr-3" />
              Assignees
            </div>
            <div>
              <AssigneeSelector
                selectedAssignees={formData.assignee}
                onAssigneesChange={(assignees) => handleInputChange('assignee', assignees)}
              />
            </div>

            {/* Dates */}
            <div className="flex items-center text-sm font-medium text-gray-600">
              <CalendarIcon className="w-5 h-5 mr-3" />
              Dates
            </div>
            <div className="flex items-center gap-2">
              <input type="date" value={formData.start_date} onChange={e => handleInputChange('start_date', e.target.value)} className="p-1 border border-gray-300 rounded-md text-sm" />
              <span>→</span>
              <input type="date" value={formData.end_date} onChange={e => handleInputChange('end_date', e.target.value)} className="p-1 border border-gray-300 rounded-md text-sm" />
            </div>
            
            {/* Priority */}
            <div className="flex items-center text-sm font-medium text-gray-600">
              <FlagIcon className="w-5 h-5 mr-3" />
              Priority
            </div>
            <div>
               <select value={formData.priority} onChange={e => handleInputChange('priority', e.target.value as 'low' | 'medium' | 'high')} className="p-1 border border-gray-300 rounded-md text-sm">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
               </select>
            </div>
            
            {/* Time Estimate */}
            <div className="flex items-center text-sm font-medium text-gray-600">
              <ClockIcon className="w-5 h-5 mr-3" />
              Time Estimate
            </div>
            <div>
              <select value={formData.estimated_time} onChange={e => handleInputChange('estimated_time', e.target.value)} className="p-1 border border-gray-300 rounded-md text-sm">
                   <option value="">Select duration</option>
                {ESTIMATED_TIME_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Track Time */}
            <div className="flex items-center text-sm font-medium text-gray-600">
              <PlayCircleIcon className="w-5 h-5 mr-3" />
              Track Time
            </div>
            <button type="button" className="flex items-center gap-2 text-sm text-blue-600">
              <PlayCircleIcon className="w-5 h-5" />
              Add time
            </button>
          </div>
          {/* === End of reverted section === */}


          <hr className="my-6" />

          {/* Description */}
          <div>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a description..."
            />
          </div>

          {/* Checklist Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Checklist</h3>
            <div className="space-y-3">
                {formData.checklist.map(item => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <input 
                            type="checkbox" 
                            checked={item.completed} 
                            onChange={() => toggleChecklistItem(item.id)} 
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                        />
                        {editingChecklistItem === item.id ? (
                            <div className="flex-1 flex gap-2">
                                <input
                                    type="text"
                                    value={editingChecklistText}
                                    onChange={(e) => setEditingChecklistText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') saveChecklistItemEdit();
                                        if (e.key === 'Escape') setEditingChecklistItem(null);
                                    }}
                                    className="flex-1 p-1 border border-blue-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    autoFocus
                                />
                                <button onClick={saveChecklistItemEdit} className="text-green-600 hover:text-green-700">
                                    <CheckCircleIcon className="w-4 h-4" />
                                </button>
                                <button onClick={() => setEditingChecklistItem(null)} className="text-gray-400 hover:text-gray-600">
                                    <XMarkIcon className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <>
                                <span className={`flex-1 ${item.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                                    {item.text}
                                </span>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        type="button"
                                        onClick={() => startEditingChecklistItem(item)} 
                                        className="text-gray-400 hover:text-blue-600 p-1"
                                    >
                                        <PencilIcon className="w-4 h-4" />
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => deleteChecklistItem(item.id)} 
                                        className="text-gray-400 hover:text-red-600 p-1"
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-4 flex gap-2">
                <input
                    type="text"
                    value={newChecklistItem}
                    onChange={(e) => setNewChecklistItem(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addChecklistItem()}
                    placeholder="Add a checklist item"
                    className="flex-1 p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button type="button" onClick={addChecklistItem} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-semibold">Add</button>
            </div>
          </div>

          {/* Subtasks Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Subtasks</h3>
            <div className="space-y-2">
              {/* Header */}
              <div className="grid grid-cols-[auto_3fr_2fr_1fr_1.5fr_auto] items-center gap-4 px-4 py-2 text-xs font-semibold text-gray-500">
                <div />
                <span>NAME</span><span className="text-center">ASSIGNEE</span><span className="text-center">PRIORITY</span><span className="text-center">DATE</span><div />
              </div>
              {/* Subtask List */}
              <div className="space-y-1">
                {formData.subtasks.map(subtask => {
                  const subPriority = PRIORITY_OPTIONS.find(p => p.value === subtask.priority);
                  const SubPriorityIcon = subPriority?.icon || FlagIcon;
                  return (
                    <div key={subtask.id} className="grid grid-cols-[auto_3fr_2fr_1fr_1.5fr_auto] items-center gap-4 px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      {/* View Details */}
                      <button type="button" onClick={() => setViewingSubtask(subtask)} className="text-gray-400 hover:text-blue-600">
                        <EyeIcon className="w-5 h-5"/>
                      </button>

                      {/* Name */}
                      <input type="text" value={subtask.title} onChange={e => updateSubtask(subtask.id, { title: e.target.value })} className="w-full bg-transparent border-none p-1 focus:ring-1 focus:ring-blue-500 rounded text-sm"/>
                      
                      {/* Assignee */}
                      <div className="relative flex items-center justify-center">
                        <div className="flex -space-x-2">
                          {subtask.assignee.map(id => {
                            const user = users.users.find(u => u.id === id);
                            return user ? (
                              <div key={id} className="relative group/avatar">
                                <Image 
                                  src={user.avatar} 
                                  alt={user.name}
                                  title={user.name} 
                                  width={28}
                                  height={28}
                                  className="w-7 h-7 rounded-full ring-2 ring-white object-cover"
                                />
                                <button onClick={() => updateSubtask(subtask.id, { assignee: subtask.assignee.filter(a => a !== id) })} className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover/avatar:opacity-100"><XMarkIcon className="w-4 h-4 text-white"/></button>
                              </div>
                            ) : null;
                          })}
                        </div>
                        <AssigneeSelector isCompact trigger={<button className="ml-1 flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 border-2 border-dashed hover:bg-gray-200"><PlusIcon className="w-4 h-4"/></button>} selectedAssignees={subtask.assignee} onAssigneesChange={a => updateSubtask(subtask.id, { assignee: a })}/>
                      </div>
                      
                      {/* Priority */}
                      <div className="relative flex items-center justify-center">
                        <button onClick={() => setActiveEditor(`priority-${subtask.id}`)} className="p-1 rounded-full hover:bg-gray-200"><SubPriorityIcon className={`w-5 h-5 ${subPriority?.color || 'text-gray-400'}`} /></button>
                        {activeEditor === `priority-${subtask.id}` && <div ref={editorRef} className="absolute z-20 mt-2 -translate-x-1/2 left-1/2"><PriorityEditor onSave={p => {updateSubtask(subtask.id, { priority: p }); setActiveEditor(null);}} /></div>}
                      </div>

                      {/* Date */}
                      <div className="relative flex items-center justify-center">
                        <button onClick={() => setActiveEditor(`date-${subtask.id}`)} className="text-xs font-medium text-gray-600 hover:bg-gray-200 px-2 py-1 rounded-md">
                          {subtask.start_date || subtask.end_date ? `${subtask.start_date ? format(new Date(subtask.start_date), 'MMM d') : ''} - ${subtask.end_date ? format(new Date(subtask.end_date), 'MMM d') : ''}` : <span className="text-gray-400">Set date</span>}
                        </button>
                        {activeEditor === `date-${subtask.id}` && <div ref={editorRef} className="absolute z-20 mt-2 -translate-x-1/2 left-1/2"><DueDateEditor startDate={subtask.start_date} endDate={subtask.end_date} onSave={d => {updateSubtask(subtask.id, { start_date: d.start, end_date: d.end }); setActiveEditor(null);}}/></div>}
                      </div>
                      
                      <button onClick={() => removeSubtask(subtask.id)} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 p-1"><XMarkIcon className="w-4 h-4"/></button>
                    </div>
                  )
                })}
              </div>
              {/* Add New Subtask */}
              <div className="p-3 flex gap-2 bg-gray-50 rounded-lg">
                  <input
                      type="text"
                      value={newSubtaskTitle}
                      onChange={(e) => setNewSubtaskTitle(e.target.value)}
                      onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                              e.preventDefault();
                              addNewSubtask();
                          }
                      }}
                      placeholder="Add a new subtask..."
                      className="flex-1 p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <button type="button" onClick={addNewSubtask} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-semibold">Add</button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4 pt-6 mt-8 border-t">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {taskId ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TasksForm; 