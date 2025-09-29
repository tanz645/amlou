'use client';

import { LightBulbIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { StrategicPillar, Challenge } from '../../types/proposal';

interface StrategicPillarsSectionProps {
  strategicPillars: StrategicPillar[];
  challenges: Challenge[];
  onAddStrategicPillar: () => void;
  onUpdateStrategicPillar: (index: number, field: string, value: string) => void;
  onUpdatePillarActivity: (pillarIndex: number, activityIndex: number, value: string) => void;
  onAddPillarActivity: (pillarIndex: number) => void;
  onRemovePillarActivity: (pillarIndex: number, activityIndex: number) => void;
  onUpdatePillarChallenges: (pillarIndex: number, challengeIds: string[]) => void;
  onRemoveStrategicPillar: (index: number) => void;
}

export default function StrategicPillarsSection({
  strategicPillars,
  challenges,
  onAddStrategicPillar,
  onUpdateStrategicPillar,
  onUpdatePillarActivity,
  onAddPillarActivity,
  onRemovePillarActivity,
  onUpdatePillarChallenges,
  onRemoveStrategicPillar
}: StrategicPillarsSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <LightBulbIcon className="w-5 h-5 mr-2" />
        Strategic Pillars
      </h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Strategic Pillars</h3>
          <button
            type="button"
            onClick={onAddStrategicPillar}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Pillar
          </button>
        </div>

        {strategicPillars.map((pillar, index) => (
          <div key={pillar.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-medium text-gray-900">Pillar {index + 1}</h4>
              <button
                type="button"
                onClick={() => onRemoveStrategicPillar(index)}
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
                    value={pillar.title}
                    onChange={(e) => onUpdateStrategicPillar(index, 'title', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Pillar title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                  <input
                    type="text"
                    value={pillar.subtitle}
                    onChange={(e) => onUpdateStrategicPillar(index, 'subtitle', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Pillar subtitle"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={pillar.description}
                  onChange={(e) => onUpdateStrategicPillar(index, 'description', e.target.value)}
                  rows={2}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe the strategic pillar"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Related Challenges</label>
                <div className="mt-2 space-y-2">
                  {challenges.map((challenge) => (
                    <label key={challenge.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={pillar.relatedChallenges?.includes(challenge.id) || false}
                        onChange={(e) => {
                          const currentChallenges = pillar.relatedChallenges || [];
                          const newChallenges = e.target.checked
                            ? [...currentChallenges, challenge.id]
                            : currentChallenges.filter(id => id !== challenge.id);
                          onUpdatePillarChallenges(index, newChallenges);
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{challenge.title}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Activities</label>
                  <button
                    type="button"
                    onClick={() => onAddPillarActivity(index)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    + Add Activity
                  </button>
                </div>
                {pillar.activities.map((activity, activityIndex) => (
                  <div key={activityIndex} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={activity}
                      onChange={(e) => onUpdatePillarActivity(index, activityIndex, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter activity"
                    />
                    <button
                      type="button"
                      onClick={() => onRemovePillarActivity(index, activityIndex)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
