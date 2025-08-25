import React, { useState } from 'react';
import { BaseSocialAuditForm } from './SocialAuditForm';

const CONTENT_TYPE_OPTIONS = [
  'Trends', 'Challenges', 'Tutorials', 'Ads', 'Other'
];
const ENGAGEMENT_METRICS_OPTIONS = [
  'Likes', 'Comments', 'Shares', 'Saves', 'Other'
];

const TikTokAuditForm: React.FC = () => {
  const [followers, setFollowers] = useState('');
  const [avgVideoViews, setAvgVideoViews] = useState('');
  const [viralVideos, setViralVideos] = useState('');
  const [contentTypes, setContentTypes] = useState<string[]>([]);
  const [engagementMetrics, setEngagementMetrics] = useState<string[]>([]);
  const [hashtagPerformance, setHashtagPerformance] = useState('');
  const [pixelInstalled, setPixelInstalled] = useState('');
  const [adCampaigns, setAdCampaigns] = useState('');
  const [influencerCollabs, setInfluencerCollabs] = useState('');
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
      <BaseSocialAuditForm platform="tiktok" />
      <section className="bg-pink-50 border border-pink-200 rounded-lg p-4 mb-6 mt-6">
        <h4 className="font-semibold text-pink-800 mb-4 text-lg">TikTok-Specific Fields</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Followers</label>
            <input type="number" value={followers} onChange={e => setFollowers(e.target.value)} className="w-full px-3 py-2 border border-pink-200 rounded-md focus:ring-2 focus:ring-pink-400 focus:border-pink-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Average Video Views</label>
            <input type="number" value={avgVideoViews} onChange={e => setAvgVideoViews(e.target.value)} className="w-full px-3 py-2 border border-pink-200 rounded-md focus:ring-2 focus:ring-pink-400 focus:border-pink-400 text-sm" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Viral Videos (examples/links)</label>
            <textarea value={viralVideos} onChange={e => setViralVideos(e.target.value)} className="w-full px-3 py-2 border border-pink-200 rounded-md focus:ring-2 focus:ring-pink-400 focus:border-pink-400 text-sm" placeholder="List or link to viral videos" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Content Types</label>
            <div className="flex flex-wrap gap-2">
              {CONTENT_TYPE_OPTIONS.map(opt => (
                <label key={opt} className="flex items-center gap-1 text-xs bg-pink-100 px-2 py-1 rounded cursor-pointer">
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
                <label key={opt} className="flex items-center gap-1 text-xs bg-pink-100 px-2 py-1 rounded cursor-pointer">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Hashtag Performance</label>
            <textarea value={hashtagPerformance} onChange={e => setHashtagPerformance(e.target.value)} className="w-full px-3 py-2 border border-pink-200 rounded-md focus:ring-2 focus:ring-pink-400 focus:border-pink-400 text-sm" placeholder="Insights on hashtags used" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">TikTok Pixel Installed?</label>
            <select value={pixelInstalled} onChange={e => setPixelInstalled(e.target.value)} className="w-full px-3 py-2 border border-pink-200 rounded-md focus:ring-2 focus:ring-pink-400 focus:border-pink-400 text-sm">
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ad Campaigns Run?</label>
            <select value={adCampaigns} onChange={e => setAdCampaigns(e.target.value)} className="w-full px-3 py-2 border border-pink-200 rounded-md focus:ring-2 focus:ring-pink-400 focus:border-pink-400 text-sm">
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Influencer Collaborations</label>
            <input type="text" value={influencerCollabs} onChange={e => setInfluencerCollabs(e.target.value)} className="w-full px-3 py-2 border border-pink-200 rounded-md focus:ring-2 focus:ring-pink-400 focus:border-pink-400 text-sm" placeholder="List influencers or campaigns" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Recommendations for TikTok</label>
            <textarea value={recommendations} onChange={e => setRecommendations(e.target.value)} className="w-full px-3 py-2 border border-pink-200 rounded-md focus:ring-2 focus:ring-pink-400 focus:border-pink-400 text-sm" placeholder="List actionable recommendations for TikTok strategy" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default TikTokAuditForm; 