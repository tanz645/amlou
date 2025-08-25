'use client';

import React from 'react';
import { FlagIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface Milestone {
  name: string;
  release_amount: number;
}

interface ProjectMilestonesProps {
  milestones: Milestone[];
}

const ProjectMilestones: React.FC<ProjectMilestonesProps> = ({ milestones }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <FlagIcon className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold">Milestones</h3>
      </div>
      
      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{milestone.name}</p>
                <p className="text-sm text-gray-600">${milestone.release_amount.toLocaleString()}</p>
              </div>
              <CheckCircleIcon className="w-5 h-5 text-green-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectMilestones; 