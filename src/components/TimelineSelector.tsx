'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import AssigneeFilter from './AssigneeFilter';

export type TimelineView = 'monthly' | 'weekly';

export interface TimelineSelectorProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  taskCount: number;
  view: TimelineView;
  onViewChange: (view: TimelineView) => void;
  selectedAssignees: string[];
  onAssigneeChange: (selected: string[]) => void;
}

const TimelineSelector: React.FC<TimelineSelectorProps> = ({
  currentDate,
  onDateChange,
  taskCount,
  view,
  onViewChange,
  selectedAssignees,
  onAssigneeChange,
}) => {
  const [contextMonth, setContextMonth] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));
  const [selectedWeek, setSelectedWeek] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const getStartDateForView = (v: TimelineView, month: Date, week: number) => {
    if (v === 'weekly') {
      const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
      const firstDayWeekday = (firstDayOfMonth.getDay() + 6) % 7; // 0 for Monday
      const firstMondayDate = 1 - firstDayWeekday;
      return new Date(month.getFullYear(), month.getMonth(), firstMondayDate + (week - 1) * 7);
    }
    return month;
  };
  
  useEffect(() => {
    const today = new Date();
    const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    setContextMonth(currentMonth);
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const dayOfWeek = (firstDay.getDay() + 6) % 7;
    const weekNumber = Math.ceil((today.getDate() + dayOfWeek) / 7);
    setSelectedWeek(weekNumber);
    onDateChange(getStartDateForView(view, currentMonth, weekNumber));
    
    if (scrollContainerRef.current) {
        const currentMonthISO = currentMonth.toISOString();
        const button = scrollContainerRef.current.querySelector(`[data-month='${currentMonthISO}']`) as HTMLButtonElement;
        if (button) {
            scrollContainerRef.current.scrollLeft = button.offsetLeft;
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const handleMonthSelect = (date: Date) => {
    setContextMonth(date);
    const newWeek = 1;
    setSelectedWeek(newWeek);
    onDateChange(getStartDateForView(view, date, newWeek));
  };

  const handleWeekSelect = (week: number) => {
    setSelectedWeek(week);
    onDateChange(getStartDateForView(view, contextMonth, week));
  };
  
  const handleViewChange = (newView: TimelineView) => {
    onViewChange(newView);
    onDateChange(getStartDateForView(newView, contextMonth, selectedWeek));
  }
  
  const generateMonths = () => {
    const months = [];
    const today = new Date();
    for (let i = -6; i <= 6; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() + i, 1);
      months.push(date);
    }
    return months;
  };

  const getNumberOfWeeks = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const dayOfWeek = (firstDay.getDay() + 6) % 7;
    return Math.ceil((lastDay.getDate() + dayOfWeek) / 7);
  };
  
  const months = generateMonths();
  const weeksInMonth = getNumberOfWeeks(contextMonth);

  const goToToday = () => {
    const today = new Date();
    const newMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    setContextMonth(newMonth);
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const dayOfWeek = (firstDay.getDay() + 6) % 7;
    const weekNumber = Math.ceil((today.getDate() + dayOfWeek) / 7);
    setSelectedWeek(weekNumber);
    onDateChange(getStartDateForView(view, newMonth, weekNumber));
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 overflow-x-auto" ref={scrollContainerRef}>
          <div className="flex items-center gap-4 text-sm font-medium">
            {months.map((month) => {
              const isCurrent = contextMonth.getMonth() === month.getMonth() && 
                               contextMonth.getFullYear() === month.getFullYear();
              return (
                <button
                  key={month.toISOString()}
                  data-month={month.toISOString()}
                  onClick={() => handleMonthSelect(month)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap ${
                    isCurrent ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {formatMonth(month)}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-shrink-0 flex items-center gap-4">
          {view === 'weekly' && (
            <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-1">
              {Array.from({ length: weeksInMonth }, (_, i) => i + 1).map(week => (
                <button 
                  key={week} 
                  onClick={() => handleWeekSelect(week)} 
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    selectedWeek === week ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Week {week}
                </button>
              ))}
            </div>
          )}
          <button
            onClick={goToToday}
            className="px-3 py-1 text-gray-600 rounded-lg text-sm font-medium border bg-white hover:bg-gray-50 transition-colors"
          >
            Today
          </button>
          <div className="text-sm text-gray-500">
            <span className="font-bold text-gray-700">{taskCount}</span> tasks
          </div>
          <AssigneeFilter selectedAssignees={selectedAssignees} onChange={onAssigneeChange} />
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => handleViewChange('monthly')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                view === 'monthly' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              Monthly
            </button>
            <button
              onClick={() => handleViewChange('weekly')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                view === 'weekly' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <ClockIcon className="w-4 h-4" />
              Weekly
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSelector; 