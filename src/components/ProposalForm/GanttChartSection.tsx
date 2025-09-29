'use client';

import { ChartBarIcon } from '@heroicons/react/24/outline';
import { Phase } from '../../types/proposal';

interface GanttChartSectionProps {
  phases: Phase[];
}

export default function GanttChartSection({ phases }: GanttChartSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <ChartBarIcon className="w-5 h-5 mr-2" />
        Gantt Chart - Project Timeline
      </h2>
      <p className="text-gray-700 mb-4">
        Visual timeline showing project phases across 24 weeks. Changes in phases will automatically update this chart.
      </p>
      
      <div className="overflow-x-auto">
        <div className="min-w-[1200px]" key={phases.map(p => `${p.title}-${p.duration}`).join('-')}>
          {/* Timeline Header - 24 weeks */}
          <div className="flex border-b border-gray-200 mb-4">
            <div className="w-48 flex-shrink-0 p-2 font-medium text-gray-700">Activity</div>
            <div className="flex-1 grid grid-cols-24 gap-1">
              {Array.from({length: 24}, (_, i) => `W${i+1}`).map((week) => (
                <div key={week} className="text-xs text-center text-gray-600 p-1">{week}</div>
              ))}
            </div>
          </div>
          
          {/* Dynamic Gantt Chart Rows based on phases */}
          <div className="space-y-2">
            {phases.map((phase, phaseIndex) => {
              // Calculate start week based on previous phases
              let startWeek = 1;
              for (let i = 0; i < phaseIndex; i++) {
                const prevDuration = Math.max(1, Math.ceil(parseInt(phases[i].duration.split(' ')[0]) || 1));
                startWeek += prevDuration;
              }
              
              // Extract duration from phase.duration (e.g., "4 weeks" -> 4)
              const duration = Math.max(1, Math.ceil(parseInt(phase.duration.split(' ')[0]) || 1));
              const endWeek = Math.min(24, startWeek + duration - 1);
              
              return (
                <div key={phase.id} className="flex items-center">
                  <div className="w-48 flex-shrink-0 p-2 text-sm text-gray-700">{phase.title}</div>
                  <div className="flex-1 grid grid-cols-24 gap-1">
                    {Array.from({length: 24}, (_, weekIndex) => {
                      const weekNum = weekIndex + 1;
                      const isActive = weekNum >= startWeek && weekNum <= endWeek;
                      const colorClass = isActive ? 
                        (phaseIndex % 4 === 0 ? 'bg-blue-500' : 
                         phaseIndex % 4 === 1 ? 'bg-green-500' : 
                         phaseIndex % 4 === 2 ? 'bg-purple-500' : 'bg-orange-500') : 
                        'bg-gray-200';
                      
                      return (
                        <div 
                          key={weekIndex} 
                          className={`${colorClass} rounded h-6 flex items-center justify-center text-white text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity relative group`}
                          title={isActive ? `${phase.title} - Week ${weekNum}` : ''}
                        >
                          {isActive ? '●' : ''}
                          
                          {/* Tooltip on hover */}
                          {isActive && (
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                              <div className="font-semibold">{phase.title}</div>
                              <div className="text-gray-300">Week {weekNum} of {duration}</div>
                              {phase.goals.length > 0 && (
                                <div className="mt-1">
                                  <div className="text-gray-300">Goals:</div>
                                  {phase.goals.slice(0, 2).map((goal, goalIndex) => (
                                    <div key={goalIndex} className="text-gray-300 text-xs">• {goal}</div>
                                  ))}
                                  {phase.goals.length > 2 && (
                                    <div className="text-gray-300 text-xs">• +{phase.goals.length - 2} more...</div>
                                  )}
                                </div>
                              )}
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-4 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>Phase 1</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Phase 2</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span>Phase 3</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span>Phase 4+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
