'use client';

import { ChartBarIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Phase } from '../../types/proposal';

interface PhasesSectionProps {
  phases: Phase[];
  onAddPhase: () => void;
  onUpdatePhase: (index: number, field: string, value: string) => void;
  onUpdatePhaseGoal: (phaseIndex: number, goalIndex: number, value: string) => void;
  onAddPhaseGoal: (phaseIndex: number) => void;
  onRemovePhaseGoal: (phaseIndex: number, goalIndex: number) => void;
  onUpdatePhaseAction: (phaseIndex: number, actionIndex: number, value: string) => void;
  onAddPhaseAction: (phaseIndex: number) => void;
  onRemovePhaseAction: (phaseIndex: number, actionIndex: number) => void;
  onRemovePhase: (index: number) => void;
}

export default function PhasesSection({
  phases,
  onAddPhase,
  onUpdatePhase,
  onUpdatePhaseGoal,
  onAddPhaseGoal,
  onRemovePhaseGoal,
  onUpdatePhaseAction,
  onAddPhaseAction,
  onRemovePhaseAction,
  onRemovePhase
}: PhasesSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <ChartBarIcon className="w-5 h-5 mr-2" />
        Phases Distribution
      </h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Project Phases</h3>
          <button
            type="button"
            onClick={onAddPhase}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Phase
          </button>
        </div>

        {phases.map((phase, index) => (
          <div key={phase.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-medium text-gray-900">Phase {index + 1}</h4>
              <button
                type="button"
                onClick={() => onRemovePhase(index)}
                className="text-red-600 hover:text-red-800"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={phase.title}
                    onChange={(e) => onUpdatePhase(index, 'title', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Phase title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Duration (weeks)</label>
                  <input
                    type="number"
                    value={phase.duration.replace(' weeks', '').replace(' week', '')}
                    onChange={(e) => {
                      const weeks = parseInt(e.target.value) || 1;
                      onUpdatePhase(index, 'duration', `${weeks} week${weeks > 1 ? 's' : ''}`);
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="4"
                    min="1"
                    max="24"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Goals</label>
                    <button
                      type="button"
                      onClick={() => onAddPhaseGoal(index)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      + Add Goal
                    </button>
                  </div>
                  {phase.goals.map((goal, goalIndex) => (
                    <div key={goalIndex} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={goal}
                        onChange={(e) => onUpdatePhaseGoal(index, goalIndex, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter goal"
                      />
                      <button
                        type="button"
                        onClick={() => onRemovePhaseGoal(index, goalIndex)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Actions</label>
                    <button
                      type="button"
                      onClick={() => onAddPhaseAction(index)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      + Add Action
                    </button>
                  </div>
                  {phase.actions.map((action, actionIndex) => (
                    <div key={actionIndex} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={action}
                        onChange={(e) => onUpdatePhaseAction(index, actionIndex, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter action"
                      />
                      <button
                        type="button"
                        onClick={() => onRemovePhaseAction(index, actionIndex)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
