'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  ChatBubbleLeftRightIcon, 
  ClockIcon, 
  PaperAirplaneIcon,
  DocumentArrowUpIcon,
  CheckCircleIcon,
  UserIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import users from '@/data/users.json';

interface Comment {
  id: string;
  user: string;
  text: string;
  timestamp: string;
}

interface TaskHistory {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details?: string;
  type: 'creation' | 'edit' | 'file_upload' | 'subtask_complete' | 'checklist_complete' | 'status_change' | 'assignee_change';
}

interface TaskDiscussionProps {
  taskId: string;
  comments: Comment[];
  onAddComment: (comment: string) => void;
}

const TaskDiscussion: React.FC<TaskDiscussionProps> = ({ taskId, comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');
  const [activeTab, setActiveTab] = useState<'comments' | 'history'>('comments');

  // Mock task history data - in real app this would come from API
  const taskHistory: TaskHistory[] = [
    {
      id: '1',
      action: 'Task created',
      user: 'John Smith',
      timestamp: '2024-06-01T10:00:00Z',
      type: 'creation'
    },
    {
      id: '2',
      action: 'Assigned to Sarah Johnson',
      user: 'John Smith',
      timestamp: '2024-06-01T11:30:00Z',
      details: 'Added Sarah Johnson as assignee',
      type: 'assignee_change'
    },
    {
      id: '3',
      action: 'Status changed',
      user: 'Sarah Johnson',
      timestamp: '2024-06-02T09:15:00Z',
      details: 'Changed status from "Planning" to "In Progress"',
      type: 'status_change'
    },
    {
      id: '4',
      action: 'Priority updated',
      user: 'John Smith',
      timestamp: '2024-06-03T14:20:00Z',
      details: 'Changed priority from "Medium" to "High"',
      type: 'edit'
    },
    {
      id: '5',
      action: 'File uploaded',
      user: 'Sarah Johnson',
      timestamp: '2024-06-04T16:45:00Z',
      details: 'Uploaded "design-mockups.pdf"',
      type: 'file_upload'
    },
    {
      id: '6',
      action: 'Subtask completed',
      user: 'Sarah Johnson',
      timestamp: '2024-06-05T11:20:00Z',
      details: 'Completed subtask "Create wireframes"',
      type: 'subtask_complete'
    },
    {
      id: '7',
      action: 'Checklist item completed',
      user: 'Sarah Johnson',
      timestamp: '2024-06-06T14:30:00Z',
      details: 'Completed "Review requirements"',
      type: 'checklist_complete'
    },
    {
      id: '8',
      action: 'Task edited',
      user: 'John Smith',
      timestamp: '2024-06-07T09:00:00Z',
      details: 'Updated task description and timeline',
      type: 'edit'
    }
  ];

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getUserAvatar = (userId: string) => {
    const user = users.users.find(u => u.id === userId);
    return user?.avatar || '/default-avatar.png';
  };

  const getUserName = (userId: string) => {
    const user = users.users.find(u => u.id === userId);
    return user?.name || 'Unknown User';
  };

  const getHistoryIcon = (type: TaskHistory['type']) => {
    switch (type) {
      case 'creation':
        return <CheckCircleIcon className="w-4 h-4 text-green-600" />;
      case 'edit':
        return <PencilIcon className="w-4 h-4 text-blue-600" />;
      case 'file_upload':
        return <DocumentArrowUpIcon className="w-4 h-4 text-purple-600" />;
      case 'subtask_complete':
        return <CheckCircleIcon className="w-4 h-4 text-green-600" />;
      case 'checklist_complete':
        return <CheckCircleIcon className="w-4 h-4 text-green-600" />;
      case 'status_change':
        return <ClockIcon className="w-4 h-4 text-orange-600" />;
      case 'assignee_change':
        return <UserIcon className="w-4 h-4 text-indigo-600" />;
      default:
        return <ClockIcon className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
          Discussion & History
        </h3>
        <p className="text-sm text-gray-500 mt-1">Task ID: {taskId}</p>
      </div>

      <div className="flex flex-col h-96">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('comments')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'comments'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Comments ({comments.length})
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'history'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            History ({taskHistory.length})
          </button>
        </div>

        {/* Comments Section */}
        {activeTab === 'comments' && (
          <>
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-4">
                {comments.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <ChatBubbleLeftRightIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>No comments yet</p>
                    <p className="text-sm">Start the conversation!</p>
                  </div>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-3">
                      <div className="flex-shrink-0">
                        <Image
                          className="h-8 w-8 rounded-full object-cover"
                          src={getUserAvatar(comment.user)}
                          alt={getUserName(comment.user)}
                          width={32}
                          height={32}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-lg px-4 py-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900">
                              {getUserName(comment.user)}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatTimestamp(comment.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{comment.text}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Add Comment Form */}
            <div className="border-t border-gray-200 p-4">
              <form onSubmit={handleSubmitComment} className="flex space-x-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PaperAirplaneIcon className="w-4 h-4" />
                </button>
              </form>
            </div>
          </>
        )}

        {/* History Section */}
        {activeTab === 'history' && (
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-3">
              {taskHistory.map((history) => (
                <div key={history.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getHistoryIcon(history.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">
                        {history.action}
                      </span>
                      <span className="text-xs text-gray-500">
                        by {history.user}
                      </span>
                    </div>
                    {history.details && (
                      <p className="text-sm text-gray-600 mt-1">{history.details}</p>
                    )}
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <ClockIcon className="w-3 h-3 mr-1" />
                      {formatTimestamp(history.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDiscussion; 