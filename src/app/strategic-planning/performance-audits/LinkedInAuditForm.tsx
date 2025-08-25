import React, { useState } from 'react';
import { BaseSocialAuditForm } from './SocialAuditForm';

const CONTENT_TYPE_OPTIONS = [
  'Articles', 'Posts', 'Videos', 'Documents', 'Other'
];
const ENGAGEMENT_METRICS_OPTIONS = [
  'Reactions', 'Comments', 'Shares', 'Other'
];

const LinkedInAuditForm: React.FC = () => {
  const [followers, setFollowers] = useState('');
  const [employeeCount, setEmployeeCount] = useState('');
  const [companyUpdates, setCompanyUpdates] = useState('');
  const [industryFollowers, setIndustryFollowers] = useState('');
  const [contentTypes, setContentTypes] = useState<string[]>([]);
  const [engagementMetrics, setEngagementMetrics] = useState<string[]>([]);
  const [insightTag, setInsightTag] = useState('');
  const [leadGenForms, setLeadGenForms] = useState('');
  const [showcasePages, setShowcasePages] = useState('');
  const [competitorBenchmarking, setCompetitorBenchmarking] = useState('');
  const [recommendations, setRecommendations] = useState('');

  const handleMultiCheckbox = (state: string[], setState: (v: string[]) => void, value: string) => {
    if (state.includes(value)) {
      setState(state.filter((v) => v !== value));
    } else {
      setState([...state, value]);
    }
  };

  return (
    <div>
      <BaseSocialAuditForm platform="linkedin" />
      <section className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 mt-6">
        <h4 className="font-semibold text-blue-800 mb-4 text-lg">LinkedIn-Specific Fields</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Page Followers</label>
            <input type="number" value={followers} onChange={e => setFollowers(e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee Count</label>
            <input type="number" value={employeeCount} onChange={e => setEmployeeCount(e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Updates (frequency, engagement)</label>
            <input type="text" value={companyUpdates} onChange={e => setCompanyUpdates(e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="e.g. Weekly, High Engagement" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry Followers</label>
            <input type="number" value={industryFollowers} onChange={e => setIndustryFollowers(e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Content Types</label>
            <div className="flex flex-wrap gap-2">
              {CONTENT_TYPE_OPTIONS.map(opt => (
                <label key={opt} className="flex items-center gap-1 text-xs bg-blue-100 px-2 py-1 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={contentTypes.includes(opt)}
                    onChange={() => handleMultiCheckbox(contentTypes, setContentTypes, opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Engagement Metrics</label>
            <div className="flex flex-wrap gap-2">
              {ENGAGEMENT_METRICS_OPTIONS.map(opt => (
                <label key={opt} className="flex items-center gap-1 text-xs bg-blue-100 px-2 py-1 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={engagementMetrics.includes(opt)}
                    onChange={() => handleMultiCheckbox(engagementMetrics, setEngagementMetrics, opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Insight Tag Installed?</label>
            <select value={insightTag} onChange={e => setInsightTag(e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm">
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lead Gen Forms Used?</label>
            <select value={leadGenForms} onChange={e => setLeadGenForms(e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm">
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Showcase Pages</label>
            <input type="text" value={showcasePages} onChange={e => setShowcasePages(e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="List showcase pages if any" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Competitor Benchmarking</label>
            <textarea value={competitorBenchmarking} onChange={e => setCompetitorBenchmarking(e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="List competitor company pages and compare metrics" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Recommendations for LinkedIn</label>
            <textarea value={recommendations} onChange={e => setRecommendations(e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="List actionable recommendations for LinkedIn strategy" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LinkedInAuditForm; 