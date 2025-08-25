"use client";

import React, { useState } from "react";
import {
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon,
  XMarkIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

interface StatusNote {
  id: string;
  status: string;
  content: string;
  timestamp: string;
  author: string;
}

interface StatusNotesProps {
  currentStatus: string;
  notes: StatusNote[];
  onStatusChange: (newStatus: string, note: string) => void;
  onNoteUpdate: (status: string, note: string) => void;
}

const leadStatuses = [
  { value: "New", label: "New", color: "bg-gray-100 text-gray-800", icon: ClockIcon },
  { value: "Contacted", label: "Contacted", color: "bg-blue-100 text-blue-800", icon: UserGroupIcon },
  { value: "Qualified", label: "Qualified", color: "bg-green-100 text-green-800", icon: CheckCircleIcon },
  { value: "Proposal", label: "Proposal", color: "bg-purple-100 text-purple-800", icon: DocumentTextIcon },
  { value: "Negotiation", label: "Negotiation", color: "bg-orange-100 text-orange-800", icon: CurrencyDollarIcon },
  { value: "Won", label: "Won", color: "bg-emerald-100 text-emerald-800", icon: CheckCircleIcon },
  { value: "Lost", label: "Lost", color: "bg-red-100 text-red-800", icon: XMarkIcon },
];

const getStatusColor = (status: string) => {
  const statusConfig = leadStatuses.find(s => s.value === status);
  return statusConfig ? statusConfig.color : "bg-gray-100 text-gray-800";
};

export default function StatusNotes({ currentStatus, notes, onStatusChange, onNoteUpdate }: StatusNotesProps) {
  const [editingStatus, setEditingStatus] = useState<string | null>(null);
  const [noteContent, setNoteContent] = useState<{ [key: string]: string }>({});

  const handleNoteChange = (status: string, content: string) => {
    setNoteContent(prev => ({ ...prev, [status]: content }));
  };

  const handleSaveNote = (status: string) => {
    const content = noteContent[status] || "";
    if (content.trim()) {
      if (status === currentStatus) {
        onNoteUpdate(status, content);
      } else {
        onStatusChange(status, content);
      }
      setNoteContent(prev => ({ ...prev, [status]: "" }));
    }
    setEditingStatus(null);
  };

  const getStatusNotes = (status: string) => {
    return notes.filter(note => note.status === status);
  };

  const getStatusDescription = (status: string) => {
    switch (status) {
      case "New":
        return "Initial lead information and first impressions";
      case "Contacted":
        return "Communication established, initial response received";
      case "Qualified":
        return "Lead meets criteria, budget and authority confirmed";
      case "Proposal":
        return "Proposal sent, waiting for client response";
      case "Negotiation":
        return "Discussing terms, pricing, and contract details";
      case "Won":
        return "Deal closed successfully";
      case "Lost":
        return "Deal lost, reasons and learnings";
      default:
        return "";
    }
  };

  const getCurrentStatusIndex = () => {
    return leadStatuses.findIndex(status => status.value === currentStatus);
  };

  const isStatusCompleted = (status: string) => {
    return getStatusNotes(status).length > 0;
  };

  const getVisibleStatuses = () => {
    const currentIndex = getCurrentStatusIndex();
    const visibleStatuses: Array<typeof leadStatuses[0] & { type: 'completed' | 'current' | 'next' }> = [];
    
    // Add all completed statuses up to current
    for (let i = 0; i <= currentIndex; i++) {
      const status = leadStatuses[i];
      if (isStatusCompleted(status.value)) {
        visibleStatuses.push({ ...status, type: 'completed' });
      }
    }
    
    // Add current status if not completed
    if (!isStatusCompleted(currentStatus)) {
      visibleStatuses.push({ ...leadStatuses[currentIndex], type: 'current' });
    }
    
    // Add next status if current is completed
    if (isStatusCompleted(currentStatus) && currentIndex + 1 < leadStatuses.length) {
      const nextStatus = leadStatuses[currentIndex + 1];
      
      // Special handling for Won/Lost - only show the appropriate one
      if (nextStatus.value === "Won" || nextStatus.value === "Lost") {
        // If current status is Won, don't show Lost and vice versa
        if (currentStatus === "Won") {
          // Don't add Lost if Won is current
          return visibleStatuses;
        } else if (currentStatus === "Lost") {
          // Don't add Won if Lost is current
          return visibleStatuses;
        } else {
          // For Negotiation, show both Won and Lost as options
          visibleStatuses.push({ ...leadStatuses[5], type: 'next' }); // Won
          visibleStatuses.push({ ...leadStatuses[6], type: 'next' }); // Lost
          return visibleStatuses;
        }
      } else {
        visibleStatuses.push({ ...nextStatus, type: 'next' });
      }
    }
    
    return visibleStatuses;
  };

  const visibleStatuses = getVisibleStatuses();

  return (
    <div className="space-y-6">
      {visibleStatuses.map((status, index) => {
        const statusNotes = getStatusNotes(status.value);
        const isEditing = editingStatus === status.value;
        const currentNote = noteContent[status.value] || "";
        const isCompleted = status.type === 'completed';
        const isCurrent = status.type === 'current';
        const isNext = status.type === 'next';

        return (
          <div key={status.value}>
            {/* Status Box */}
            <div
              className={`bg-white rounded-xl shadow-sm border-2 p-6 transition-all ${
                isCompleted 
                  ? "border-green-500 bg-green-50" 
                  : isCurrent
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getStatusColor(status.value)}`}>
                    <status.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{status.label}</h3>
                    <p className="text-sm text-gray-500">{getStatusDescription(status.value)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isCompleted && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Completed
                    </span>
                  )}
                  {isCurrent && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      Current
                    </span>
                  )}
                  {isNext && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                      Next
                    </span>
                  )}
                </div>
              </div>

              {/* Existing Notes */}
              {statusNotes.length > 0 && (
                <div className="mb-4 space-y-3">
                  {statusNotes.map((note) => (
                    <div key={note.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{note.author}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(note.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{note.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Note Section - Always visible for all steps */}
              {isEditing ? (
                <div className="space-y-3">
                  <textarea
                    value={currentNote}
                    onChange={(e) => handleNoteChange(status.value, e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Add notes for ${status.label.toLowerCase()} status...`}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSaveNote(status.value)}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add Note
                    </button>
                    <button
                      onClick={() => {
                        setEditingStatus(null);
                        setNoteContent(prev => ({ ...prev, [status.value]: "" }));
                      }}
                      className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setEditingStatus(status.value)}
                  className={`w-full py-2 px-3 border-2 border-dashed rounded-lg text-sm transition-colors ${
                    isCurrent
                      ? "border-blue-300 text-blue-600 hover:border-blue-400 hover:bg-blue-50"
                      : "border-gray-300 text-gray-500 hover:border-gray-400 hover:bg-gray-50"
                  }`}
                >
                  Add Note
                </button>
              )}
            </div>

            {/* Progress Indicator - Show between steps */}
            {index < visibleStatuses.length - 1 && (
              <div className="mt-4 flex items-center justify-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
