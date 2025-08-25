"use client";

import React, { useState } from "react";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  VideoCameraIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  TagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

interface CommunicationEntry {
  id: number;
  clientId: number;
  clientName: string;
  date: string;
  time: string;
  type: 'email' | 'call' | 'meeting' | 'note' | 'task';
  subject: string;
  content: string;
  outcome: string;
  followUpRequired: boolean;
  followUpDate?: string;
  assignedTo: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  tags: string[];
  attachments: string[];
  relatedTasks: number[];
  status: 'completed' | 'pending' | 'in-progress';
}

interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed';
  communicationId?: number;
}

// Mock data
const clientsData = [
  { id: 1, name: "Sarah Johnson", company: "TechStart Inc" },
  { id: 2, name: "Mike Chen", company: "Digital Solutions" },
  { id: 3, name: "Emily Rodriguez", company: "Creative Agency" },
  { id: 4, name: "David Wilson", company: "E-commerce Store" },
  { id: 5, name: "Lisa Thompson", company: "Local Restaurant" },
  { id: 6, name: "Robert Kim", company: "Healthcare Solutions" },
];

const initialCommunications: CommunicationEntry[] = [
  {
    id: 1,
    clientId: 1,
    clientName: "Sarah Johnson",
    date: "2024-01-20",
    time: "10:30",
    type: "meeting",
    subject: "Monthly Review Meeting",
    content: "Discussed Q1 performance results. Client is very satisfied with the 25% increase in organic traffic. They want to expand PPC budget by 20% for Q2. Need to prepare proposal for additional services.",
    outcome: "Positive feedback. Client wants to expand services.",
    followUpRequired: true,
    followUpDate: "2024-01-25",
    assignedTo: "John Smith",
    priority: "high",
    tags: ["review", "expansion", "proposal"],
    attachments: ["Q1_Report.pdf"],
    relatedTasks: [1, 2],
    status: "completed"
  },
  {
    id: 2,
    clientId: 1,
    clientName: "Sarah Johnson",
    date: "2024-01-18",
    time: "14:15",
    type: "call",
    subject: "Website Performance Issues",
    content: "Client reported slow loading times on mobile devices. Investigated and found image optimization issues. Provided immediate fixes and scheduled follow-up.",
    outcome: "Issues resolved. Client satisfied with quick response.",
    followUpRequired: false,
    assignedTo: "Jane Doe",
    priority: "urgent",
    tags: ["technical", "performance", "mobile"],
    attachments: ["Performance_Report.pdf"],
    relatedTasks: [3],
    status: "completed"
  },
  {
    id: 3,
    clientId: 2,
    clientName: "Mike Chen",
    date: "2024-01-17",
    time: "09:00",
    type: "email",
    subject: "PPC Campaign Optimization",
    content: "Sent detailed PPC performance report. Campaigns are performing well but there's room for optimization. Suggested budget reallocation and new keyword strategies.",
    outcome: "Client approved optimization plan.",
    followUpRequired: true,
    followUpDate: "2024-01-24",
    assignedTo: "Mike Johnson",
    priority: "medium",
    tags: ["ppc", "optimization", "report"],
    attachments: ["PPC_Report.pdf", "Optimization_Plan.pdf"],
    relatedTasks: [4],
    status: "in-progress"
  }
];

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Prepare Q2 Expansion Proposal",
    description: "Create detailed proposal for additional PPC and content marketing services",
    assignedTo: "John Smith",
    dueDate: "2024-01-25",
    priority: "high",
    status: "pending",
    communicationId: 1
  },
  {
    id: 2,
    title: "Schedule Q2 Strategy Meeting",
    description: "Arrange meeting to discuss expanded service implementation",
    assignedTo: "John Smith",
    dueDate: "2024-01-30",
    priority: "medium",
    status: "pending",
    communicationId: 1
  },
  {
    id: 3,
    title: "Mobile Performance Optimization",
    description: "Implement image optimization and mobile-specific improvements",
    assignedTo: "Jane Doe",
    dueDate: "2024-01-22",
    priority: "high",
    status: "completed",
    communicationId: 2
  },
  {
    id: 4,
    title: "PPC Budget Reallocation",
    description: "Implement approved PPC optimization plan",
    assignedTo: "Mike Johnson",
    dueDate: "2024-01-24",
    priority: "medium",
    status: "in-progress",
    communicationId: 3
  }
];

const communicationTypes = [
  { value: 'email', label: 'Email', icon: EnvelopeIcon, color: 'bg-blue-100 text-blue-800' },
  { value: 'call', label: 'Call', icon: PhoneIcon, color: 'bg-green-100 text-green-800' },
  { value: 'meeting', label: 'Meeting', icon: VideoCameraIcon, color: 'bg-purple-100 text-purple-800' },
  { value: 'note', label: 'Note', icon: ChatBubbleLeftRightIcon, color: 'bg-gray-100 text-gray-800' },
  { value: 'task', label: 'Task', icon: CheckCircleIcon, color: 'bg-orange-100 text-orange-800' },
];

const priorityOptions = [
  { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-800' },
  { value: 'medium', label: 'Medium', color: 'bg-blue-100 text-blue-800' },
  { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
  { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800' },
];

const statusOptions = [
  { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'in-progress', label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
  { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
];

export default function ClientCommunicationPage() {
  const [communications, setCommunications] = useState<CommunicationEntry[]>(initialCommunications);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'timeline' | 'list'>('timeline');

  // Form states
  const [communicationForm, setCommunicationForm] = useState({
    clientId: '',
    date: '',
    time: '',
    type: 'note',
    subject: '',
    content: '',
    outcome: '',
    followUpRequired: false,
    followUpDate: '',
    assignedTo: '',
    priority: 'medium',
    tags: '',
    attachments: '',
    status: 'completed'
  });

  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    assignedTo: '',
    dueDate: '',
    priority: 'medium',
    communicationId: ''
  });

  const handleAddCommunication = () => {
    const newCommunication: CommunicationEntry = {
      id: Date.now(),
      clientId: parseInt(communicationForm.clientId),
      clientName: clientsData.find(c => c.id === parseInt(communicationForm.clientId))?.name || '',
      date: communicationForm.date,
      time: communicationForm.time,
      type: communicationForm.type as any,
      subject: communicationForm.subject,
      content: communicationForm.content,
      outcome: communicationForm.outcome,
      followUpRequired: communicationForm.followUpRequired,
      followUpDate: communicationForm.followUpDate || undefined,
      assignedTo: communicationForm.assignedTo,
      priority: communicationForm.priority as any,
      tags: communicationForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      attachments: communicationForm.attachments.split(',').map(att => att.trim()).filter(att => att),
      relatedTasks: [],
      status: communicationForm.status as any
    };

    setCommunications([newCommunication, ...communications]);
    setShowAddModal(false);
    setCommunicationForm({
      clientId: '', date: '', time: '', type: 'note', subject: '', content: '', outcome: '',
      followUpRequired: false, followUpDate: '', assignedTo: '', priority: 'medium', tags: '', attachments: '', status: 'completed'
    });
  };

  const handleAddTask = () => {
    const newTask: Task = {
      id: Date.now(),
      title: taskForm.title,
      description: taskForm.description,
      assignedTo: taskForm.assignedTo,
      dueDate: taskForm.dueDate,
      priority: taskForm.priority as any,
      status: 'pending',
      communicationId: taskForm.communicationId ? parseInt(taskForm.communicationId) : undefined
    };

    setTasks([newTask, ...tasks]);
    setShowTaskModal(false);
    setTaskForm({
      title: '', description: '', assignedTo: '', dueDate: '', priority: 'medium', communicationId: ''
    });
  };

  const getCommunicationIcon = (type: string) => {
    const commType = communicationTypes.find(t => t.value === type);
    return commType ? commType.icon : ChatBubbleLeftRightIcon;
  };

  const getCommunicationColor = (type: string) => {
    const commType = communicationTypes.find(t => t.value === type);
    return commType ? commType.color : 'bg-gray-100 text-gray-800';
  };

  const filteredCommunications = communications.filter(comm => {
    const matchesClient = selectedClient === 'all' || comm.clientId === parseInt(selectedClient);
    const matchesType = selectedType === 'all' || comm.type === selectedType;
    const matchesSearch = comm.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comm.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comm.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesClient && matchesType && matchesSearch;
  });

  const groupedCommunications = filteredCommunications.reduce((groups, comm) => {
    const date = comm.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(comm);
    return groups;
  }, {} as Record<string, CommunicationEntry[]>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Client Communication</h1>
              <p className="text-gray-600 mt-1">Track and manage all client communications with timeline</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowTaskModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <CheckCircleIcon className="w-4 h-4" />
                Add Task
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <PlusIcon className="w-4 h-4" />
                Add Communication
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search communications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="lg:w-48">
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Clients</option>
                {clientsData.map((client) => (
                  <option key={client.id} value={client.id}>{client.name}</option>
                ))}
              </select>
            </div>
            <div className="lg:w-48">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                {communicationTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            <div className="lg:w-48">
              <select
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value as 'timeline' | 'list')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="timeline">Timeline View</option>
                <option value="list">List View</option>
              </select>
            </div>
          </div>
        </div>

        {/* Communications Timeline */}
        <div className="space-y-8">
          {Object.entries(groupedCommunications)
            .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
            .map(([date, comms]) => (
              <div key={date} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <CalendarIcon className="w-5 h-5 text-gray-400" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    {new Date(date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h2>
                  <span className="text-sm text-gray-500">({comms.length} communications)</span>
                </div>

                <div className="space-y-6">
                  {comms.map((comm) => {
                    const IconComponent = getCommunicationIcon(comm.type);
                    const relatedTask = comm.relatedTasks.length > 0 ? tasks.find(t => t.id === comm.relatedTasks[0]) : null;
                    
                    return (
                      <div key={comm.id} className="relative pl-8 border-l-2 border-gray-200">
                        <div className="absolute left-[-9px] top-0 w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></div>
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${getCommunicationColor(comm.type)}`}>
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <div>
                                <h3 className="text-sm font-semibold text-gray-900">{comm.subject}</h3>
                                <p className="text-xs text-gray-500">
                                  {comm.clientName} • {comm.time} • {comm.assignedTo}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                comm.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                                comm.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                comm.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {comm.priority}
                              </span>
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                comm.status === 'completed' ? 'bg-green-100 text-green-800' :
                                comm.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {comm.status}
                              </span>
                            </div>
                          </div>

                          <div className="mb-3">
                            <p className="text-sm text-gray-700 mb-2">{comm.content}</p>
                            {comm.outcome && (
                              <div className="bg-blue-50 border border-blue-200 rounded p-2">
                                <p className="text-xs font-medium text-blue-800 mb-1">Outcome:</p>
                                <p className="text-xs text-blue-700">{comm.outcome}</p>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                            <div className="flex items-center gap-4">
                              {comm.followUpRequired && (
                                <span className="flex items-center gap-1 text-orange-600">
                                  <ExclamationTriangleIcon className="w-3 h-3" />
                                  Follow-up required
                                  {comm.followUpDate && ` (${new Date(comm.followUpDate).toLocaleDateString()})`}
                                </span>
                              )}
                              {comm.tags.length > 0 && (
                                <div className="flex items-center gap-1">
                                  <TagIcon className="w-3 h-3" />
                                  {comm.tags.join(', ')}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="text-gray-400 hover:text-gray-600">
                                <PencilIcon className="w-3 h-3" />
                              </button>
                              <button className="text-red-400 hover:text-red-600">
                                <TrashIcon className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          {/* Related Tasks */}
                          {relatedTask && (
                            <div className="bg-orange-50 border border-orange-200 rounded p-3">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-xs font-medium text-orange-800">Related Task:</p>
                                <span className={`inline-flex px-1 py-0.5 text-xs font-medium rounded ${
                                  relatedTask.status === 'completed' ? 'bg-green-100 text-green-800' :
                                  relatedTask.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {relatedTask.status}
                                </span>
                              </div>
                              <p className="text-xs font-medium text-gray-900">{relatedTask.title}</p>
                              <p className="text-xs text-gray-600">{relatedTask.description}</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-500">Assigned to: {relatedTask.assignedTo}</span>
                                <span className="text-xs text-gray-500">Due: {new Date(relatedTask.dueDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex gap-2 mt-3">
                            <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                              Create Task
                            </button>
                            <button className="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors">
                              Schedule Follow-up
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Add Communication Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Add Communication</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                  <select
                    value={communicationForm.clientId}
                    onChange={(e) => setCommunicationForm({ ...communicationForm, clientId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Client</option>
                    {clientsData.map((client) => (
                      <option key={client.id} value={client.id}>{client.name} - {client.company}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={communicationForm.type}
                    onChange={(e) => setCommunicationForm({ ...communicationForm, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {communicationTypes.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={communicationForm.date}
                    onChange={(e) => setCommunicationForm({ ...communicationForm, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={communicationForm.time}
                    onChange={(e) => setCommunicationForm({ ...communicationForm, time: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={communicationForm.subject}
                  onChange={(e) => setCommunicationForm({ ...communicationForm, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Communication subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  value={communicationForm.content}
                  onChange={(e) => setCommunicationForm({ ...communicationForm, content: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Communication details"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Outcome</label>
                <textarea
                  value={communicationForm.outcome}
                  onChange={(e) => setCommunicationForm({ ...communicationForm, outcome: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="What was the result?"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                  <input
                    type="text"
                    value={communicationForm.assignedTo}
                    onChange={(e) => setCommunicationForm({ ...communicationForm, assignedTo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Team member name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={communicationForm.priority}
                    onChange={(e) => setCommunicationForm({ ...communicationForm, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {priorityOptions.map((priority) => (
                      <option key={priority.value} value={priority.value}>{priority.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                  <input
                    type="text"
                    value={communicationForm.tags}
                    onChange={(e) => setCommunicationForm({ ...communicationForm, tags: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="comma-separated tags"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={communicationForm.status}
                    onChange={(e) => setCommunicationForm({ ...communicationForm, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {statusOptions.map((status) => (
                      <option key={status.value} value={status.value}>{status.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="followUpRequired"
                  checked={communicationForm.followUpRequired}
                  onChange={(e) => setCommunicationForm({ ...communicationForm, followUpRequired: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="followUpRequired" className="text-sm font-medium text-gray-700">
                  Follow-up required
                </label>
              </div>
              {communicationForm.followUpRequired && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Date</label>
                  <input
                    type="date"
                    value={communicationForm.followUpDate}
                    onChange={(e) => setCommunicationForm({ ...communicationForm, followUpDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCommunication}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Communication
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Add Task</h2>
              <button
                onClick={() => setShowTaskModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={taskForm.title}
                  onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Task title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={taskForm.description}
                  onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Task description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                  <input
                    type="text"
                    value={taskForm.assignedTo}
                    onChange={(e) => setTaskForm({ ...taskForm, assignedTo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Team member name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={taskForm.dueDate}
                    onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={taskForm.priority}
                  onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {priorityOptions.map((priority) => (
                    <option key={priority.value} value={priority.value}>{priority.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Related Communication (Optional)</label>
                <select
                  value={taskForm.communicationId}
                  onChange={(e) => setTaskForm({ ...taskForm, communicationId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">No related communication</option>
                  {communications.map((comm) => (
                    <option key={comm.id} value={comm.id}>
                      {comm.date} - {comm.subject} ({comm.clientName})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowTaskModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
