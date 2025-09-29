'use client';

import { ExclamationTriangleIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Challenge } from '../../types/proposal';

interface ChallengesSectionProps {
  challenges: Challenge[];
  onAddChallenge: () => void;
  onUpdateChallenge: (index: number, field: string, value: string) => void;
  onUpdateChallengePoint: (challengeIndex: number, pointIndex: number, value: string) => void;
  onAddChallengePoint: (challengeIndex: number) => void;
  onRemoveChallengePoint: (challengeIndex: number, pointIndex: number) => void;
  onRemoveChallenge: (index: number) => void;
}

export default function ChallengesSection({
  challenges,
  onAddChallenge,
  onUpdateChallenge,
  onUpdateChallengePoint,
  onAddChallengePoint,
  onRemoveChallengePoint,
  onRemoveChallenge
}: ChallengesSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
        Challenges (Problems that need to be dealt with)
      </h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Challenges</h3>
          <button
            type="button"
            onClick={onAddChallenge}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Challenge
          </button>
        </div>

        {challenges.map((challenge, index) => (
          <div key={challenge.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-medium text-gray-900">Challenge {index + 1}</h4>
              <button
                type="button"
                onClick={() => onRemoveChallenge(index)}
                className="text-red-600 hover:text-red-800"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={challenge.title}
                  onChange={(e) => onUpdateChallenge(index, 'title', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Challenge title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={challenge.description}
                  onChange={(e) => onUpdateChallenge(index, 'description', e.target.value)}
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe the challenge"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Key Points</label>
                  <button
                    type="button"
                    onClick={() => onAddChallengePoint(index)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    + Add Point
                  </button>
                </div>
                {challenge.points.map((point, pointIndex) => (
                  <div key={pointIndex} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => onUpdateChallengePoint(index, pointIndex, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter key point"
                    />
                    <button
                      type="button"
                      onClick={() => onRemoveChallengePoint(index, pointIndex)}
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
