'use client';
import React, { useState } from 'react';
import Sidebar, { SidebarMenuGroup } from '../../components/sidebars/Sidebar';
import { 
  CalendarDaysIcon, 
  ClockIcon, 
  BellIcon, 
  HomeIcon, 
  DocumentTextIcon, 
  ChartBarIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  UserGroupIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import PageHeader from '../../components/elements/PageHeader';
import StatsGrid from '../../components/StatsGrid';
import RecentActivities from '../../components/RecentActivities';
import ReactCalendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './calendar.module.css';

interface Event {
  id: number;
  title: string;
  description?: string;
  date: string;
  time?: string;
  type: 'meeting' | 'content' | 'ad' | 'email' | 'reminder' | 'other';
  location?: string;
  attendees?: string[];
  priority: 'low' | 'medium' | 'high';
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
}

const calendarMenuGroups: SidebarMenuGroup[] = [
  {
    name: 'Main',
    icon: HomeIcon,
    items: [
      { name: 'Calendar Home', href: '/calendar', icon: HomeIcon },
    ],
  },
  {
    name: 'Events',
    icon: CalendarDaysIcon,
    items: [
      { name: 'All Events', href: '/calendar/events', icon: CalendarDaysIcon },
      { name: 'Add Event', href: '/calendar/events/new', icon: CalendarDaysIcon },
    ],
  },
  {
    name: 'Meetings',
    icon: ClockIcon,
    items: [
      { name: 'All Meetings', href: '/calendar/meetings', icon: ClockIcon },
      { name: 'Add Meeting', href: '/calendar/meetings/new', icon: ClockIcon },
    ],
  },
  {
    name: 'Reminders',
    icon: BellIcon,
    items: [
      { name: 'All Reminders', href: '/calendar/reminders', icon: BellIcon },
      { name: 'Add Reminder', href: '/calendar/reminders/new', icon: BellIcon },
    ],
  },
  {
    name: 'Content Calendar',
    icon: CalendarDaysIcon,
    items: [
      { name: 'Blog Posts', href: '/calendar/content/blog-posts', icon: DocumentTextIcon },
      { name: 'Social Posts', href: '/calendar/content/social-posts', icon: ChartBarIcon },
      { name: 'Email Campaigns', href: '/calendar/content/email-campaigns', icon: BellIcon },
      { name: 'Ad Campaigns', href: '/calendar/content/ad-campaigns', icon: CalendarDaysIcon },
    ],
  },
];

const stats = [
  {
    name: 'Upcoming Events',
    value: '5',
    change: '+2 this week',
    icon: CalendarDaysIcon,
  },
  {
    name: 'Scheduled Posts',
    value: '8',
    change: '+3 this week',
    icon: ChartBarIcon,
  },
  {
    name: 'Pending Approvals',
    value: '3',
    change: '-1 this week',
    icon: DocumentTextIcon,
  },
  {
    name: 'Meetings',
    value: '4',
    change: '+1 this week',
    icon: ClockIcon,
  },
];

const recentActivity = [
  {
    id: 1,
    type: 'Content',
    description: 'Scheduled blog post "SEO Trends 2024"',
    time: '1 hour ago',
  },
  {
    id: 2,
    type: 'Meeting',
    description: 'Client meeting with Acme Corp confirmed',
    time: '3 hours ago',
  },
  {
    id: 3,
    type: 'Approval',
    description: 'Social post for Product Launch approved',
    time: 'Today',
  },
  {
    id: 4,
    type: 'Reminder',
    description: 'Reminder set for Email Campaign review',
    time: 'Yesterday',
  },
];

const viewModes = [
  { label: 'Month', value: 'month' },
  { label: 'Week', value: 'week' },
  { label: 'Day', value: 'day' },
  { label: 'Year', value: 'year' },
];

const eventTypes = [
  { value: 'meeting', label: 'Meeting', color: 'bg-blue-500' },
  { value: 'content', label: 'Content', color: 'bg-green-500' },
  { value: 'ad', label: 'Ad Campaign', color: 'bg-yellow-500' },
  { value: 'email', label: 'Email', color: 'bg-pink-500' },
  { value: 'reminder', label: 'Reminder', color: 'bg-purple-500' },
  { value: 'other', label: 'Other', color: 'bg-gray-500' },
];

const priorityOptions = [
  { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' },
];

// Sample event data
const initialEvents: Event[] = [
  { 
    id: 1, 
    title: 'Client Meeting - Acme Corp', 
    description: 'Quarterly review meeting with Acme Corp team',
    date: '2024-07-01', 
    time: '10:00 AM',
    type: 'meeting',
    location: 'Conference Room A',
    attendees: ['John Smith', 'Sarah Johnson', 'Mike Chen'],
    priority: 'high',
    status: 'scheduled',
    createdAt: '2024-06-25T10:00:00Z'
  },
  { 
    id: 2, 
    title: 'Blog Post: Summer Marketing Trends', 
    description: 'Write and publish blog post about summer marketing strategies',
    date: '2024-07-01', 
    time: '2:00 PM',
    type: 'content',
    priority: 'medium',
    status: 'scheduled',
    createdAt: '2024-06-26T14:30:00Z'
  },
  { 
    id: 3, 
    title: 'Social Post: Product Launch', 
    description: 'Schedule social media posts for new product launch',
    date: '2024-07-03', 
    time: '9:00 AM',
    type: 'content',
    priority: 'high',
    status: 'scheduled',
    createdAt: '2024-06-27T09:15:00Z'
  },
  { 
    id: 4, 
    title: 'Google Ads Campaign Launch', 
    description: 'Launch new Google Ads campaign for Q3',
    date: '2024-07-05', 
    time: '11:00 AM',
    type: 'ad',
    priority: 'high',
    status: 'scheduled',
    createdAt: '2024-06-28T16:45:00Z'
  },
  { 
    id: 5, 
    title: 'Email Campaign Review', 
    description: 'Review and approve email campaign content',
    date: '2024-07-05', 
    time: '3:00 PM',
    type: 'email',
    priority: 'medium',
    status: 'scheduled',
    createdAt: '2024-06-29T11:20:00Z'
  },
  { 
    id: 6, 
    title: 'Team Weekly Meeting', 
    description: 'Weekly team sync and project updates',
    date: '2024-07-10', 
    time: '10:00 AM',
    type: 'meeting',
    location: 'Main Office',
    attendees: ['All Team Members'],
    priority: 'medium',
    status: 'scheduled',
    createdAt: '2024-06-30T08:00:00Z'
  },
];

function getEventsForDate(date: Date, events: Event[]) {
  const d = date.toISOString().slice(0, 10);
  return events.filter(e => e.date === d);
}

function getEventTypeColor(type: string) {
  const eventType = eventTypes.find(t => t.value === type);
  return eventType ? eventType.color : 'bg-gray-500';
}

function getPriorityColor(priority: string) {
  const priorityOption = priorityOptions.find(p => p.value === priority);
  return priorityOption ? priorityOption.color : 'bg-gray-100 text-gray-800';
}

const CalendarPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day' | 'year'>('month');
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showEventList, setShowEventList] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  // Form state for new/edit event
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    type: 'meeting' as Event['type'],
    location: '',
    attendees: '',
    priority: 'medium' as Event['priority'],
  });

  const handleDateChange: CalendarProps['onChange'] = (value) => {
    if (value && value instanceof Date) {
      setDate(value);
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      setDate(value[0]);
    }
  };

  const handleAddEvent = () => {
    const newEvent: Event = {
      id: Date.now(),
      title: eventForm.title,
      description: eventForm.description,
      date: eventForm.date,
      time: eventForm.time,
      type: eventForm.type,
      location: eventForm.location,
      attendees: eventForm.attendees ? eventForm.attendees.split(',').map(a => a.trim()) : [],
      priority: eventForm.priority,
      status: 'scheduled',
      createdAt: new Date().toISOString(),
    };

    setEvents([...events, newEvent]);
    setShowAddEventModal(false);
    resetEventForm();
  };

  const handleEditEvent = () => {
    if (!editingEvent) return;

    const updatedEvents = events.map(event => 
      event.id === editingEvent.id 
        ? {
            ...event,
            title: eventForm.title,
            description: eventForm.description,
            date: eventForm.date,
            time: eventForm.time,
            type: eventForm.type,
            location: eventForm.location,
            attendees: eventForm.attendees ? eventForm.attendees.split(',').map(a => a.trim()) : [],
            priority: eventForm.priority,
          }
        : event
    );

    setEvents(updatedEvents);
    setEditingEvent(null);
    setShowAddEventModal(false);
    resetEventForm();
  };

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter(event => event.id !== eventId));
    setSelectedEvent(null);
  };

  const resetEventForm = () => {
    setEventForm({
      title: '',
      description: '',
      date: '',
      time: '',
      type: 'meeting',
      location: '',
      attendees: '',
      priority: 'medium',
    });
  };

  const openEditModal = (event: Event) => {
    setEditingEvent(event);
    setEventForm({
      title: event.title,
      description: event.description || '',
      date: event.date,
      time: event.time || '',
      type: event.type,
      location: event.location || '',
      attendees: event.attendees?.join(', ') || '',
      priority: event.priority,
    });
    setShowAddEventModal(true);
  };

  // Helper for week view: get start of week (Sunday)
  function getStartOfWeek(date: Date) {
    const d = new Date(date);
    d.setDate(d.getDate() - d.getDay());
    return d;
  }

  // Helper for week view: get all days in week
  function getWeekDays(date: Date) {
    const start = getStartOfWeek(date);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        menuGroups={calendarMenuGroups}
        title="Calendar"
        version="v1.0.0"
      />
      <main className={`flex-1 bg-gray-50 transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="nt-page nt-calendar max-w-6xl mx-auto py-8 px-4">
          <PageHeader title="Calendar" />
          <StatsGrid stats={stats} />
          
          {/* Action Buttons */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-2">
              {viewModes.map((mode) => (
                <button
                  key={mode.value}
                  onClick={() => setViewMode(mode.value as 'month' | 'week' | 'day' | 'year')}
                  className={`px-4 py-2 rounded-md font-medium transition-colors border border-blue-100 shadow-sm
                    ${viewMode === mode.value ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowEventList(!showEventList)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                {showEventList ? 'Hide Events' : 'Show Events'}
              </button>
              <button
                onClick={() => {
                  setEditingEvent(null);
                  resetEventForm();
                  setShowAddEventModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <PlusIcon className="w-4 h-4" />
                Add Event
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center justify-center">
                {viewMode === 'month' && (
                  <>
                    <div className="w-full">
                      <ReactCalendar
                        onChange={handleDateChange}
                        value={date}
                        className={`w-full ${styles.reactCalendar}`}
                        view="month"
                        tileContent={({ date: tileDate }) => {
                          const dayEvents = getEventsForDate(tileDate, events);
                          return dayEvents.length > 0 ? (
                            <div className="flex justify-center mt-1">
                              {dayEvents.slice(0, 3).map(ev => (
                                <span key={ev.id} className={`inline-block w-2 h-2 rounded-full mx-0.5 ${getEventTypeColor(ev.type)}`}></span>
                              ))}
                              {dayEvents.length > 3 && <span className="text-xs text-gray-400 ml-1">+{dayEvents.length - 3}</span>}
                            </div>
                          ) : null;
                        }}
                      />
                    </div>
                    <div className="mt-4 text-blue-700 font-medium">
                      Selected date: {date.toLocaleDateString()}
                    </div>
                    {/* Event list for selected day */}
                    <div className="mt-4 w-full">
                      <h3 className="text-lg font-semibold text-blue-900 mb-2">Events for {date.toLocaleDateString()}:</h3>
                      {getEventsForDate(date, events).length === 0 ? (
                        <div className="text-gray-400">No events for this day.</div>
                      ) : (
                        <ul className="space-y-2">
                          {getEventsForDate(date, events).map(ev => (
                            <li 
                              key={ev.id} 
                              className="bg-blue-50 border-l-4 border-blue-400 rounded p-3 flex items-center justify-between cursor-pointer hover:bg-blue-100 transition-colors"
                              onClick={() => setSelectedEvent(ev)}
                            >
                              <div className="flex items-center">
                                <span className={`inline-block w-3 h-3 rounded-full mr-3 ${getEventTypeColor(ev.type)}`}></span>
                                <div>
                                  <span className="text-blue-900 font-medium">{ev.title}</span>
                                  {ev.time && <span className="text-sm text-blue-600 ml-2">{ev.time}</span>}
                                </div>
                              </div>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(ev.priority)}`}>
                                {ev.priority}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </>
                )}
                {viewMode === 'year' && (
                  <div className="w-full">
                    <ReactCalendar
                      onChange={handleDateChange}
                      value={date}
                      className={`w-full ${styles.reactCalendar}`}
                      view="year"
                    />
                    <div className="mt-4 text-blue-700 font-medium">
                      Selected year: {date.getFullYear()}
                    </div>
                  </div>
                )}
                {viewMode === 'week' && (
                  <div className="w-full">
                    <div className="flex justify-between mb-2 text-blue-900 font-semibold">
                      {getWeekDays(date).map((d) => (
                        <div key={d.toDateString()} className="flex-1 text-center">
                          {d.toLocaleDateString(undefined, { weekday: 'short' })}<br />
                          <span className={`inline-block mt-1 px-2 py-1 rounded-full ${d.toDateString() === date.toDateString() ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-900'}`}>{d.getDate()}</span>
                        </div>
                      ))}
                    </div>
                    <div className="h-48 flex items-center justify-center text-blue-700 font-semibold bg-blue-50 rounded-lg">
                      Weekly view for week of {getWeekDays(date)[0].toLocaleDateString()}
                    </div>
                  </div>
                )}
                {viewMode === 'day' && (
                  <div className="w-full">
                    <div className="flex justify-center mb-2">
                      <span className="text-blue-900 font-semibold text-lg bg-blue-100 px-4 py-2 rounded-full">
                        {date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                    <div className="h-48 flex items-center justify-center text-blue-700 font-semibold bg-blue-50 rounded-lg">
                      Daily view for {date.toLocaleDateString()}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Events List Sidebar */}
            {showEventList && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">All Events</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {events
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .map(event => (
                      <div 
                        key={event.id} 
                        className="border border-gray-200 rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => setSelectedEvent(event)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`inline-block w-2 h-2 rounded-full ${getEventTypeColor(event.type)}`}></span>
                              <span className="font-medium text-gray-900">{event.title}</span>
                            </div>
                            <div className="text-sm text-gray-600">
                              {new Date(event.date).toLocaleDateString()}
                              {event.time && ` • ${event.time}`}
                            </div>
                            {event.location && (
                              <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                <MapPinIcon className="w-3 h-3" />
                                {event.location}
                              </div>
                            )}
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(event.priority)}`}>
                            {event.priority}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
            
            <RecentActivities activities={recentActivity} />
          </div>
        </div>
      </main>

      {/* Add/Edit Event Modal */}
      {showAddEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingEvent ? 'Edit Event' : 'Add New Event'}
              </h2>
              <button
                onClick={() => {
                  setShowAddEventModal(false);
                  setEditingEvent(null);
                  resetEventForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
                         <form onSubmit={(e) => {
               e.preventDefault();
               if (editingEvent) {
                 handleEditEvent();
               } else {
                 handleAddEvent();
               }
             }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={eventForm.title}
                    onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={eventForm.description}
                    onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={eventForm.date}
                      onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input
                      type="time"
                      value={eventForm.time}
                      onChange={(e) => setEventForm({...eventForm, time: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={eventForm.type}
                    onChange={(e) => setEventForm({...eventForm, type: e.target.value as Event['type']})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {eventTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={eventForm.location}
                    onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Attendees (comma-separated)</label>
                  <input
                    type="text"
                    value={eventForm.attendees}
                    onChange={(e) => setEventForm({...eventForm, attendees: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe, Jane Smith"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={eventForm.priority}
                    onChange={(e) => setEventForm({...eventForm, priority: e.target.value as Event['priority']})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {priorityOptions.map(priority => (
                      <option key={priority.value} value={priority.value}>{priority.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddEventModal(false);
                    setEditingEvent(null);
                    resetEventForm();
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingEvent ? 'Update Event' : 'Add Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Event Details</h2>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className={`inline-block w-3 h-3 rounded-full ${getEventTypeColor(selectedEvent.type)}`}></span>
                <span className="font-medium text-gray-900">{selectedEvent.title}</span>
              </div>
              
              {selectedEvent.description && (
                <p className="text-gray-600">{selectedEvent.description}</p>
              )}
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Date:</span>
                  <p className="text-gray-600">{new Date(selectedEvent.date).toLocaleDateString()}</p>
                </div>
                {selectedEvent.time && (
                  <div>
                    <span className="font-medium text-gray-700">Time:</span>
                    <p className="text-gray-600">{selectedEvent.time}</p>
                  </div>
                )}
              </div>
              
              {selectedEvent.location && (
                <div className="text-sm">
                  <span className="font-medium text-gray-700">Location:</span>
                  <p className="text-gray-600 flex items-center gap-1">
                    <MapPinIcon className="w-3 h-3" />
                    {selectedEvent.location}
                  </p>
                </div>
              )}
              
              {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
                <div className="text-sm">
                  <span className="font-medium text-gray-700">Attendees:</span>
                  <p className="text-gray-600 flex items-center gap-1">
                    <UserGroupIcon className="w-3 h-3" />
                    {selectedEvent.attendees.join(', ')}
                  </p>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Priority:</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(selectedEvent.priority)}`}>
                  {selectedEvent.priority}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Status:</span>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  {selectedEvent.status}
                </span>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setSelectedEvent(null);
                  openEditModal(selectedEvent);
                }}
                className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:text-blue-700"
              >
                <PencilIcon className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDeleteEvent(selectedEvent.id)}
                className="flex items-center gap-1 px-3 py-1 text-red-600 hover:text-red-700"
              >
                <TrashIcon className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage; 