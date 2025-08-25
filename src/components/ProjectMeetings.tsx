/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { CalendarIcon, UserIcon, VideoCameraIcon, ClockIcon, PlusIcon, EyeIcon, PencilIcon } from '@heroicons/react/24/outline';
import meetings from '@/data/meetings.json';

interface Meeting {
  id: string;
  project_id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  status: string;
  participants: string[];
  agenda: string[];
  notes: string;
  meeting_link?: string;
}

interface Project {
  id: string;
  name: string;
  status: string;
}

interface ProjectMeetingsProps {
  project: Project;
}

const ProjectMeetings: React.FC<ProjectMeetingsProps> = ({ project }) => {
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const projectMeetings = meetings.meetings.filter((meeting: any) => meeting.project_id === project.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const openMeetingDetails = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setShowMeetingModal(true);
  };

  const createNewMeeting = () => {
    // In a real app, this would open a form modal
    console.log('Create new meeting');
  };

  const getMeetingsForDate = (date: Date) => {
    return projectMeetings.filter((meeting: any) => {
      const meetingDate = new Date(meeting.date);
      return meetingDate.toDateString() === date.toDateString();
    });
  };

  const renderCalendar = () => {
    const currentMonth = selectedDate.getMonth();
    const currentYear = selectedDate.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const calendarDays = [];
    for (let i = 0; i < startingDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dayMeetings = getMeetingsForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();
      
      calendarDays.push(
        <div 
          key={day} 
          className={`p-2 border border-gray-200 min-h-[80px] ${
            isToday ? 'bg-blue-50' : 'bg-white'
          }`}
        >
          <div className="text-sm font-medium mb-1">{day}</div>
          {dayMeetings.map((meeting: any, index: number) => (
            <div 
              key={index}
              className="text-xs bg-blue-100 text-blue-800 p-1 rounded mb-1 cursor-pointer hover:bg-blue-200"
              onClick={() => openMeetingDetails(meeting)}
            >
              {meeting.title.substring(0, 15)}...
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Calendar View</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}
              className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
            >
              ←
            </button>
            <span className="px-3 py-1 text-sm font-medium">
              {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <button
              onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}
              className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
            >
              →
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
          {calendarDays}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">{project.name} - Meetings</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            project.status === 'completed' ? 'bg-green-100 text-green-800' :
            project.status === 'active' ? 'bg-blue-100 text-blue-800' :
            project.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {project.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>
      </div>

      {/* View Toggle */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'list' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'calendar' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Calendar View
            </button>
          </div>
          <button
            onClick={createNewMeeting}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
          >
            <PlusIcon className="w-4 h-4" />
            New Meeting
          </button>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'calendar' ? (
        renderCalendar()
      ) : (
        <>
          {/* Meetings List */}
          <div className="space-y-4">
            {projectMeetings.map((meeting: any) => (
              <div key={meeting.id} className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-purple-500">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <VideoCameraIcon className="w-5 h-5 text-purple-500" />
                      <h3 className="font-medium text-gray-900">{meeting.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(meeting.status)}`}>
                        {meeting.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{meeting.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{new Date(meeting.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>{meeting.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <UserIcon className="w-4 h-4" />
                        <span>Participants: {meeting.participants?.join(', ') || 'TBD'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openMeetingDetails(meeting)}
                      className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
                    >
                      <EyeIcon className="w-4 h-4" />
                    </button>
                    <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
                      <PencilIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Meeting Summary */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-medium text-gray-900 mb-4">Meeting Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {projectMeetings.length}
                </div>
                <div className="text-sm text-purple-700">Total Meetings</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {projectMeetings.filter((m: any) => m.status === 'completed').length}
                </div>
                <div className="text-sm text-green-700">Completed</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {projectMeetings.filter((m: any) => m.status === 'scheduled').length}
                </div>
                <div className="text-sm text-blue-700">Scheduled</div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Meeting Details Modal */}
      {showMeetingModal && selectedMeeting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">{selectedMeeting.title}</h2>
                <button
                  onClick={() => setShowMeetingModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Meeting Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <p><strong>Date:</strong> {new Date(selectedMeeting.date).toLocaleDateString()}</p>
                      <p><strong>Time:</strong> {selectedMeeting.time}</p>
                      <p><strong>Duration:</strong> {selectedMeeting.duration} minutes</p>
                    </div>
                    <div>
                      <p><strong>Type:</strong> {selectedMeeting.type}</p>
                      <p><strong>Status:</strong> <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedMeeting.status)}`}>
                        {selectedMeeting.status.toUpperCase()}
                      </span></p>
                      {selectedMeeting.meeting_link && (
                        <p><strong>Link:</strong> <a href={selectedMeeting.meeting_link} className="text-blue-600 hover:underline">{selectedMeeting.meeting_link}</a></p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600">{selectedMeeting.description}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Participants</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMeeting.participants?.map((participant, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                        {participant}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedMeeting.agenda && selectedMeeting.agenda.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Agenda</h3>
                    <ul className="space-y-1">
                      {selectedMeeting.agenda.map((item, index) => (
                        <li key={index} className="text-gray-600 text-sm">• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedMeeting.notes && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Notes</h3>
                    <p className="text-gray-600">{selectedMeeting.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectMeetings; 