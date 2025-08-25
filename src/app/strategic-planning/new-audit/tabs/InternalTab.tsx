import React from 'react';
import { UserGroupIcon, AcademicCapIcon, Cog6ToothIcon, SparklesIcon, HandRaisedIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface InternalTabProps {
  data: Record<string, string>;
  onDataUpdate: (data: Record<string, string>) => void;
}

export default function InternalTab({ data, onDataUpdate }: InternalTabProps) {
  const handleInputChange = (field: string, value: string) => {
    onDataUpdate({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      {/* Team Structure Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <UserGroupIcon className="w-5 h-5 mr-2 text-blue-600" />
          Team Structure & Leadership
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Team Size</label>
            <input type="number" value={data.teamSize || ''} onChange={e => handleInputChange('teamSize', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="0" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Roles Covered</label>
            <input type="text" value={data.rolesCovered || ''} onChange={e => handleInputChange('rolesCovered', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Content, Design, SEO, Social, PR" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Leadership Structure</label>
            <input type="text" value={data.leadership || ''} onChange={e => handleInputChange('leadership', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., CMO, Team Leads, Flat, Matrix" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Team Diversity</label>
            <select value={data.teamDiversity || ''} onChange={e => handleInputChange('teamDiversity', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select diversity</option>
              <option value="excellent">Excellent (Highly diverse)</option>
              <option value="good">Good (Some diversity)</option>
              <option value="average">Average (Limited diversity)</option>
              <option value="poor">Poor (No diversity)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Skills & Training Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <AcademicCapIcon className="w-5 h-5 mr-2 text-green-600" />
          Skills & Training
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Skill Gaps</label>
            <textarea rows={2} value={data.skillGaps || ''} onChange={e => handleInputChange('skillGaps', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Describe any skill gaps in the team..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Training Completion (%)</label>
            <input type="number" step="0.01" value={data.trainingCompletion || ''} onChange={e => handleInputChange('trainingCompletion', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="0.00" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
            <input type="text" value={data.certifications || ''} onChange={e => handleInputChange('certifications', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="e.g., Google Ads, HubSpot, Meta Blueprint" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upskilling Plan</label>
            <textarea rows={2} value={data.upskillingPlan || ''} onChange={e => handleInputChange('upskillingPlan', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Describe ongoing or planned upskilling..." />
          </div>
        </div>
      </div>

      {/* Marketing Process Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Cog6ToothIcon className="w-5 h-5 mr-2 text-purple-600" />
          Marketing Process & Technology
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Documented Processes</label>
            <select value={data.documentedProcesses || ''} onChange={e => handleInputChange('documentedProcesses', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
              <option value="">Select status</option>
              <option value="excellent">Excellent (All processes documented)</option>
              <option value="good">Good (Most documented)</option>
              <option value="average">Average (Some documented)</option>
              <option value="poor">Poor (No documentation)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Process Efficiency</label>
            <select value={data.processEfficiency || ''} onChange={e => handleInputChange('processEfficiency', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
              <option value="">Select efficiency</option>
              <option value="excellent">Excellent (Highly efficient)</option>
              <option value="good">Good (Mostly efficient)</option>
              <option value="average">Average (Some inefficiencies)</option>
              <option value="poor">Poor (Inefficient)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cross-functional Collaboration</label>
            <select value={data.crossFunctionalCollab || ''} onChange={e => handleInputChange('crossFunctionalCollab', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
              <option value="">Select collaboration</option>
              <option value="excellent">Excellent (Highly collaborative)</option>
              <option value="good">Good (Mostly collaborative)</option>
              <option value="average">Average (Some collaboration)</option>
              <option value="poor">Poor (Siloed)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tech Stack</label>
            <input type="text" value={data.techStack || ''} onChange={e => handleInputChange('techStack', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="e.g., HubSpot, Asana, Slack, Canva" />
          </div>
        </div>
      </div>

      {/* Branding Alignment Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <SparklesIcon className="w-5 h-5 mr-2 text-pink-600" />
          Branding Alignment & Advocacy
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand Guidelines Availability</label>
            <select value={data.brandGuidelines || ''} onChange={e => handleInputChange('brandGuidelines', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
              <option value="">Select status</option>
              <option value="excellent">Excellent (Comprehensive guidelines)</option>
              <option value="good">Good (Basic guidelines)</option>
              <option value="average">Average (Some guidelines)</option>
              <option value="poor">Poor (No guidelines)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand Consistency</label>
            <select value={data.brandConsistency || ''} onChange={e => handleInputChange('brandConsistency', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
              <option value="">Select consistency</option>
              <option value="excellent">Excellent (Highly consistent)</option>
              <option value="good">Good (Mostly consistent)</option>
              <option value="average">Average (Some inconsistencies)</option>
              <option value="poor">Poor (Inconsistent)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Internal Brand Advocacy</label>
            <select value={data.internalBrandAdvocacy || ''} onChange={e => handleInputChange('internalBrandAdvocacy', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
              <option value="">Select advocacy</option>
              <option value="excellent">Excellent (Strong advocacy)</option>
              <option value="good">Good (Some advocacy)</option>
              <option value="average">Average (Limited advocacy)</option>
              <option value="poor">Poor (No advocacy)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand Values Understanding</label>
            <select value={data.brandValuesUnderstanding || ''} onChange={e => handleInputChange('brandValuesUnderstanding', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
              <option value="">Select understanding</option>
              <option value="excellent">Excellent (Deep understanding)</option>
              <option value="good">Good (Good understanding)</option>
              <option value="average">Average (Basic understanding)</option>
              <option value="poor">Poor (No understanding)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Collaboration & Culture Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <HandRaisedIcon className="w-5 h-5 mr-2 text-amber-600" />
          Collaboration & Team Culture
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Communication Tools</label>
            <input type="text" value={data.communicationTools || ''} onChange={e => handleInputChange('communicationTools', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" placeholder="e.g., Slack, Teams, Email" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Feedback Loops</label>
            <select value={data.feedbackLoops || ''} onChange={e => handleInputChange('feedbackLoops', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
              <option value="">Select feedback process</option>
              <option value="excellent">Excellent (Regular feedback)</option>
              <option value="good">Good (Occasional feedback)</option>
              <option value="average">Average (Rare feedback)</option>
              <option value="poor">Poor (No feedback)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Innovation Encouragement</label>
            <select value={data.innovationEncouragement || ''} onChange={e => handleInputChange('innovationEncouragement', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
              <option value="">Select encouragement</option>
              <option value="excellent">Excellent (Highly encouraged)</option>
              <option value="good">Good (Encouraged)</option>
              <option value="average">Average (Occasionally encouraged)</option>
              <option value="poor">Poor (Not encouraged)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Team Morale</label>
            <select value={data.teamMorale || ''} onChange={e => handleInputChange('teamMorale', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
              <option value="">Select morale</option>
              <option value="excellent">Excellent (Very high)</option>
              <option value="good">Good (High)</option>
              <option value="average">Average (Moderate)</option>
              <option value="poor">Poor (Low)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <ExclamationTriangleIcon className="w-5 h-5 mr-2 text-red-600" />
          Internal Audit Recommendations
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Immediate Actions (Next 30 days)</label>
            <textarea rows={3} value={data.immediateActions || ''} onChange={e => handleInputChange('immediateActions', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="Critical actions that need immediate attention..." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Short-term Goals (1-3 months)</label>
              <textarea rows={3} value={data.shortTermGoals || ''} onChange={e => handleInputChange('shortTermGoals', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="Short-term internal improvement goals..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Long-term Strategy (3-12 months)</label>
              <textarea rows={3} value={data.longTermStrategy || ''} onChange={e => handleInputChange('longTermStrategy', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="Long-term vision for internal team and branding..." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 