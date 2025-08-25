import React, { useState } from 'react';
import AuditPlatformSelector from '../../components/AuditPlatformSelector';
import { 
  ChatBubbleLeftRightIcon,
  GlobeAltIcon,
  PlayCircleIcon,
  MusicalNoteIcon,
  HashtagIcon,
  BuildingOfficeIcon,
  PlayIcon
} from '@heroicons/react/24/outline';

const socialPlatforms = [
  { id: 'general', name: 'General Audit', icon: ChatBubbleLeftRightIcon },
  { id: 'facebook', name: 'Facebook', icon: GlobeAltIcon },
  { id: 'instagram', name: 'Instagram', icon: GlobeAltIcon },
  { id: 'youtube', name: 'YouTube', icon: PlayCircleIcon },
  { id: 'tiktok', name: 'TikTok', icon: MusicalNoteIcon },
  { id: 'twitter', name: 'Twitter', icon: HashtagIcon },
  { id: 'linkedin', name: 'LinkedIn', icon: BuildingOfficeIcon },
];

// Platform-specific form components
const GeneralSocialForm = () => {
  const [generalData, setGeneralData] = useState({
    totalFollowers: '',
    totalPosts: '',
    averageEngagement: '',
    reachRate: '',
    bestPerformingContent: '',
    postingFrequency: '',
    audienceDemographics: '',
    competitorAnalysis: '',
    recommendations: ''
  });

  const handleGeneralChange = (field: string, value: string) => {
    setGeneralData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2 text-blue-600" />
        General Social Media Audit
      </h4>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Followers Across All Platforms</label>
            <input 
              type="number" 
              value={generalData.totalFollowers}
              onChange={(e) => handleGeneralChange('totalFollowers', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Posts (Last 30 days)</label>
            <input 
              type="number" 
              value={generalData.totalPosts}
              onChange={(e) => handleGeneralChange('totalPosts', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Average Engagement Rate (%)</label>
            <input 
              type="number" 
              step="0.01"
              value={generalData.averageEngagement}
              onChange={(e) => handleGeneralChange('averageEngagement', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.00" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Average Reach Rate (%)</label>
            <input 
              type="number" 
              step="0.01"
              value={generalData.reachRate}
              onChange={(e) => handleGeneralChange('reachRate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.00" 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Best Performing Content Types</label>
          <textarea 
            rows={3} 
            value={generalData.bestPerformingContent}
            onChange={(e) => handleGeneralChange('bestPerformingContent', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
            placeholder="Video, carousel posts, stories, live content..." 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">General Social Media Recommendations</label>
          <textarea 
            rows={4} 
            value={generalData.recommendations}
            onChange={(e) => handleGeneralChange('recommendations', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
            placeholder="Cross-platform strategy, content optimization, engagement improvements..." 
          />
        </div>
      </div>
    </div>
  );
};

const FacebookForm = () => {
  const [facebookData, setFacebookData] = useState({
    // Page Condition & Profile
    pageName: '',
    pageUrl: '',
    profilePictureStatus: '',
    coverPhotoStatus: '',
    pageDescription: '',
    pageCategory: '',
    pageVerification: '',
    pageSettings: '',
    
    // Campaigns
    totalCampaigns: '',
    campaignTitles: '',
    campaignPurposes: '',
    campaignPerformance: '',
    activeCampaigns: '',
    completedCampaigns: '',
    campaignBudget: '',
    campaignROI: '',
    
    // Organic Growth
    pageLikes: '',
    pageFollowers: '',
    followerGrowth: '',
    organicReach: '',
    organicImpressions: '',
    organicEngagement: '',
    engagementRate: '',
    
    // Content Performance
    totalPosts: '',
    postFrequency: '',
    bestPostingTimes: '',
    contentTypes: '',
    topPerformingContent: '',
    
    // Audience & Demographics
    audienceDemographics: '',
    audienceInterests: '',
    audienceLocation: '',
    audienceAge: '',
    audienceGender: '',
    
    // Competitor Analysis
    competitorBenchmarks: '',
    marketPosition: '',
    competitiveAdvantages: '',
    
    // Recommendations
    pageOptimization: '',
    contentStrategy: '',
    growthStrategy: '',
    campaignOptimization: '',
    recommendations: ''
  });

  const handleFacebookChange = (field: string, value: string) => {
    setFacebookData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <GlobeAltIcon className="w-5 h-5 mr-2 text-blue-600" />
        Facebook Page Audit
      </h4>
      <div className="space-y-6">
        {/* Page Condition & Profile */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Page Condition & Profile</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Page Name</label>
              <input 
                type="text" 
                value={facebookData.pageName}
                onChange={(e) => handleFacebookChange('pageName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Page name" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Page URL</label>
              <input 
                type="url" 
                value={facebookData.pageUrl}
                onChange={(e) => handleFacebookChange('pageUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="https://facebook.com/pagename" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture Status</label>
              <select 
                value={facebookData.profilePictureStatus}
                onChange={(e) => handleFacebookChange('profilePictureStatus', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select status</option>
                <option value="optimized">Optimized</option>
                <option value="needs-improvement">Needs Improvement</option>
                <option value="missing">Missing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cover Photo Status</label>
              <select 
                value={facebookData.coverPhotoStatus}
                onChange={(e) => handleFacebookChange('coverPhotoStatus', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select status</option>
                <option value="optimized">Optimized</option>
                <option value="needs-improvement">Needs Improvement</option>
                <option value="missing">Missing</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Page Description</label>
            <textarea 
              rows={3} 
              value={facebookData.pageDescription}
              onChange={(e) => handleFacebookChange('pageDescription', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Current page description and optimization status..." 
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Page Category</label>
              <input 
                type="text" 
                value={facebookData.pageCategory}
                onChange={(e) => handleFacebookChange('pageCategory', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Business, Brand, Organization, etc." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Page Verification</label>
              <select 
                value={facebookData.pageVerification}
                onChange={(e) => handleFacebookChange('pageVerification', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select status</option>
                <option value="verified">Verified</option>
                <option value="not-verified">Not Verified</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Page Settings & Configuration</label>
            <textarea 
              rows={3} 
              value={facebookData.pageSettings}
              onChange={(e) => handleFacebookChange('pageSettings', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Privacy settings, messaging settings, review settings, business hours..." 
            />
          </div>
        </div>

        {/* Campaigns */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Campaigns Analysis</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Campaigns</label>
              <input 
                type="number" 
                value={facebookData.totalCampaigns}
                onChange={(e) => handleFacebookChange('totalCampaigns', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Active Campaigns</label>
              <input 
                type="number" 
                value={facebookData.activeCampaigns}
                onChange={(e) => handleFacebookChange('activeCampaigns', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Completed Campaigns</label>
              <input 
                type="number" 
                value={facebookData.completedCampaigns}
                onChange={(e) => handleFacebookChange('completedCampaigns', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Campaign Budget ($)</label>
              <input 
                type="number" 
                step="0.01"
                value={facebookData.campaignBudget}
                onChange={(e) => handleFacebookChange('campaignBudget', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0.00" 
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Titles & Purposes (comma-separated)</label>
            <textarea 
              rows={3} 
              value={facebookData.campaignTitles}
              onChange={(e) => handleFacebookChange('campaignTitles', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Campaign 1: Brand Awareness, Campaign 2: Lead Generation..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Performance Analysis</label>
            <textarea 
              rows={3} 
              value={facebookData.campaignPerformance}
              onChange={(e) => handleFacebookChange('campaignPerformance', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Performance metrics, ROI, conversion rates, reach, engagement..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign ROI (%)</label>
            <input 
              type="number" 
              step="0.01"
              value={facebookData.campaignROI}
              onChange={(e) => handleFacebookChange('campaignROI', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.00" 
            />
          </div>
        </div>

        {/* Organic Growth */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Organic Growth Details</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Page Likes</label>
              <input 
                type="number" 
                value={facebookData.pageLikes}
                onChange={(e) => handleFacebookChange('pageLikes', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Page Followers</label>
              <input 
                type="number" 
                value={facebookData.pageFollowers}
                onChange={(e) => handleFacebookChange('pageFollowers', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Follower Growth (Last 30 days)</label>
              <input 
                type="number" 
                value={facebookData.followerGrowth}
                onChange={(e) => handleFacebookChange('followerGrowth', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Engagement Rate (%)</label>
              <input 
                type="number" 
                step="0.01"
                value={facebookData.engagementRate}
                onChange={(e) => handleFacebookChange('engagementRate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0.00" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organic Reach (Last 28 days)</label>
              <input 
                type="number" 
                value={facebookData.organicReach}
                onChange={(e) => handleFacebookChange('organicReach', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organic Impressions (Last 28 days)</label>
              <input 
                type="number" 
                value={facebookData.organicImpressions}
                onChange={(e) => handleFacebookChange('organicImpressions', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
          </div>
        </div>

        {/* Content Performance */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Content Performance</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Posts</label>
              <input 
                type="number" 
                value={facebookData.totalPosts}
                onChange={(e) => handleFacebookChange('totalPosts', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Post Frequency (per week)</label>
              <input 
                type="number" 
                step="0.1"
                value={facebookData.postFrequency}
                onChange={(e) => handleFacebookChange('postFrequency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0.0" 
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Best Posting Times</label>
            <textarea 
              rows={2} 
              value={facebookData.bestPostingTimes}
              onChange={(e) => handleFacebookChange('bestPostingTimes', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Monday 9 AM, Wednesday 2 PM, Friday 7 PM..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Content Types Used</label>
            <textarea 
              rows={2} 
              value={facebookData.contentTypes}
              onChange={(e) => handleFacebookChange('contentTypes', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Images, Videos, Stories, Live, Carousel posts..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Top Performing Content</label>
            <textarea 
              rows={3} 
              value={facebookData.topPerformingContent}
              onChange={(e) => handleFacebookChange('topPerformingContent', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Best performing posts, videos, engagement rates..." 
            />
          </div>
        </div>

        {/* Audience & Demographics */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Audience & Demographics</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Audience Age Range</label>
              <input 
                type="text" 
                value={facebookData.audienceAge}
                onChange={(e) => handleFacebookChange('audienceAge', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="18-24, 25-34, 35-44..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Audience Gender</label>
              <input 
                type="text" 
                value={facebookData.audienceGender}
                onChange={(e) => handleFacebookChange('audienceGender', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Male: 60%, Female: 40%" 
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Audience Location</label>
            <textarea 
              rows={2} 
              value={facebookData.audienceLocation}
              onChange={(e) => handleFacebookChange('audienceLocation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Top locations, countries, cities..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Audience Interests</label>
            <textarea 
              rows={2} 
              value={facebookData.audienceInterests}
              onChange={(e) => handleFacebookChange('audienceInterests', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Top interests, hobbies, activities..." 
            />
          </div>
        </div>

        {/* Competitor Analysis */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Competitor Analysis</h5>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Competitor Benchmarks</label>
            <textarea 
              rows={3} 
              value={facebookData.competitorBenchmarks}
              onChange={(e) => handleFacebookChange('competitorBenchmarks', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Competitor page likes, engagement rates, content strategy..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Market Position</label>
            <textarea 
              rows={2} 
              value={facebookData.marketPosition}
              onChange={(e) => handleFacebookChange('marketPosition', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Position in market, competitive advantages, unique selling points..." 
            />
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h5 className="text-md font-semibold text-gray-800 mb-4">Recommendations</h5>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Page Optimization Recommendations</label>
              <textarea 
                rows={3} 
                value={facebookData.pageOptimization}
                onChange={(e) => handleFacebookChange('pageOptimization', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Profile picture, cover photo, description, settings improvements..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content Strategy Recommendations</label>
              <textarea 
                rows={3} 
                value={facebookData.contentStrategy}
                onChange={(e) => handleFacebookChange('contentStrategy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Content types, posting schedule, engagement tactics..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Growth Strategy Recommendations</label>
              <textarea 
                rows={3} 
                value={facebookData.growthStrategy}
                onChange={(e) => handleFacebookChange('growthStrategy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Organic growth tactics, audience targeting, engagement strategies..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Optimization Recommendations</label>
              <textarea 
                rows={3} 
                value={facebookData.campaignOptimization}
                onChange={(e) => handleFacebookChange('campaignOptimization', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Campaign improvements, targeting, budget allocation, performance optimization..." 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InstagramForm = () => {
  const [instagramData, setInstagramData] = useState({
    // Profile Condition & Settings
    profileUsername: '',
    profileUrl: '',
    profilePictureStatus: '',
    bioStatus: '',
    bioText: '',
    profileType: '',
    verificationStatus: '',
    profileSettings: '',
    
    // Campaigns
    totalCampaigns: '',
    campaignTitles: '',
    campaignPurposes: '',
    campaignPerformance: '',
    activeCampaigns: '',
    completedCampaigns: '',
    campaignBudget: '',
    campaignROI: '',
    
    // Organic Growth
    followers: '',
    following: '',
    followerGrowth: '',
    organicReach: '',
    organicImpressions: '',
    organicEngagement: '',
    engagementRate: '',
    
    // Content Performance
    totalPosts: '',
    postFrequency: '',
    bestPostingTimes: '',
    contentTypes: '',
    topPerformingContent: '',
    storiesPerformance: '',
    reelsPerformance: '',
    
    // Audience & Demographics
    audienceDemographics: '',
    audienceInterests: '',
    audienceLocation: '',
    audienceAge: '',
    audienceGender: '',
    
    // Competitor Analysis
    competitorBenchmarks: '',
    marketPosition: '',
    competitiveAdvantages: '',
    
    // Recommendations
    profileOptimization: '',
    contentStrategy: '',
    growthStrategy: '',
    campaignOptimization: '',
    recommendations: ''
  });

  const handleInstagramChange = (field: string, value: string) => {
    setInstagramData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <GlobeAltIcon className="w-5 h-5 mr-2 text-pink-600" />
        Instagram Profile Audit
      </h4>
      <div className="space-y-6">
        {/* Profile Condition & Settings */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Profile Condition & Settings</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Username</label>
              <input 
                type="text" 
                value={instagramData.profileUsername}
                onChange={(e) => handleInstagramChange('profileUsername', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="@username" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile URL</label>
              <input 
                type="url" 
                value={instagramData.profileUrl}
                onChange={(e) => handleInstagramChange('profileUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="https://instagram.com/username" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture Status</label>
              <select 
                value={instagramData.profilePictureStatus}
                onChange={(e) => handleInstagramChange('profilePictureStatus', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select status</option>
                <option value="optimized">Optimized</option>
                <option value="needs-improvement">Needs Improvement</option>
                <option value="missing">Missing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio Status</label>
              <select 
                value={instagramData.bioStatus}
                onChange={(e) => handleInstagramChange('bioStatus', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select status</option>
                <option value="optimized">Optimized</option>
                <option value="needs-improvement">Needs Improvement</option>
                <option value="missing">Missing</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio Text</label>
            <textarea 
              rows={3} 
              value={instagramData.bioText}
              onChange={(e) => handleInstagramChange('bioText', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Current bio text and optimization status..." 
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Type</label>
              <select 
                value={instagramData.profileType}
                onChange={(e) => handleInstagramChange('profileType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select type</option>
                <option value="personal">Personal</option>
                <option value="business">Business</option>
                <option value="creator">Creator</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Verification Status</label>
              <select 
                value={instagramData.verificationStatus}
                onChange={(e) => handleInstagramChange('verificationStatus', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select status</option>
                <option value="verified">Verified</option>
                <option value="not-verified">Not Verified</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Settings & Configuration</label>
            <textarea 
              rows={3} 
              value={instagramData.profileSettings}
              onChange={(e) => handleInstagramChange('profileSettings', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Privacy settings, story settings, comment settings, business hours..." 
            />
          </div>
        </div>

        {/* Campaigns */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Campaigns Analysis</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Campaigns</label>
              <input 
                type="number" 
                value={instagramData.totalCampaigns}
                onChange={(e) => handleInstagramChange('totalCampaigns', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Active Campaigns</label>
              <input 
                type="number" 
                value={instagramData.activeCampaigns}
                onChange={(e) => handleInstagramChange('activeCampaigns', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Completed Campaigns</label>
              <input 
                type="number" 
                value={instagramData.completedCampaigns}
                onChange={(e) => handleInstagramChange('completedCampaigns', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Campaign Budget ($)</label>
              <input 
                type="number" 
                step="0.01"
                value={instagramData.campaignBudget}
                onChange={(e) => handleInstagramChange('campaignBudget', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0.00" 
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Titles & Purposes (comma-separated)</label>
            <textarea 
              rows={3} 
              value={instagramData.campaignTitles}
              onChange={(e) => handleInstagramChange('campaignTitles', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Campaign 1: Brand Awareness, Campaign 2: Lead Generation..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Performance Analysis</label>
            <textarea 
              rows={3} 
              value={instagramData.campaignPerformance}
              onChange={(e) => handleInstagramChange('campaignPerformance', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Performance metrics, ROI, conversion rates, reach, engagement..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign ROI (%)</label>
            <input 
              type="number" 
              step="0.01"
              value={instagramData.campaignROI}
              onChange={(e) => handleInstagramChange('campaignROI', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.00" 
            />
          </div>
        </div>

        {/* Organic Growth */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Organic Growth Details</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Followers</label>
              <input 
                type="number" 
                value={instagramData.followers}
                onChange={(e) => handleInstagramChange('followers', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Following</label>
              <input 
                type="number" 
                value={instagramData.following}
                onChange={(e) => handleInstagramChange('following', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Follower Growth (Last 30 days)</label>
              <input 
                type="number" 
                value={instagramData.followerGrowth}
                onChange={(e) => handleInstagramChange('followerGrowth', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Engagement Rate (%)</label>
              <input 
                type="number" 
                step="0.01"
                value={instagramData.engagementRate}
                onChange={(e) => handleInstagramChange('engagementRate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0.00" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organic Reach (Last 28 days)</label>
              <input 
                type="number" 
                value={instagramData.organicReach}
                onChange={(e) => handleInstagramChange('organicReach', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organic Impressions (Last 28 days)</label>
              <input 
                type="number" 
                value={instagramData.organicImpressions}
                onChange={(e) => handleInstagramChange('organicImpressions', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
          </div>
        </div>

        {/* Content Performance */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Content Performance</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Posts</label>
              <input 
                type="number" 
                value={instagramData.totalPosts}
                onChange={(e) => handleInstagramChange('totalPosts', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Post Frequency (per week)</label>
              <input 
                type="number" 
                step="0.1"
                value={instagramData.postFrequency}
                onChange={(e) => handleInstagramChange('postFrequency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0.0" 
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Best Posting Times</label>
            <textarea 
              rows={2} 
              value={instagramData.bestPostingTimes}
              onChange={(e) => handleInstagramChange('bestPostingTimes', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Monday 9 AM, Wednesday 2 PM, Friday 7 PM..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Content Types Used</label>
            <textarea 
              rows={2} 
              value={instagramData.contentTypes}
              onChange={(e) => handleInstagramChange('contentTypes', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Photos, Videos, Stories, Reels, IGTV, Carousel posts..." 
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stories Performance</label>
              <textarea 
                rows={2} 
                value={instagramData.storiesPerformance}
                onChange={(e) => handleInstagramChange('storiesPerformance', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Story views, engagement, completion rates..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reels Performance</label>
              <textarea 
                rows={2} 
                value={instagramData.reelsPerformance}
                onChange={(e) => handleInstagramChange('reelsPerformance', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Reel views, engagement, completion rates..." 
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Top Performing Content</label>
            <textarea 
              rows={3} 
              value={instagramData.topPerformingContent}
              onChange={(e) => handleInstagramChange('topPerformingContent', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Best performing posts, videos, engagement rates..." 
            />
          </div>
        </div>

        {/* Audience & Demographics */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Audience & Demographics</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Audience Age Range</label>
              <input 
                type="text" 
                value={instagramData.audienceAge}
                onChange={(e) => handleInstagramChange('audienceAge', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="18-24, 25-34, 35-44..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Audience Gender</label>
              <input 
                type="text" 
                value={instagramData.audienceGender}
                onChange={(e) => handleInstagramChange('audienceGender', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Male: 60%, Female: 40%" 
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Audience Location</label>
            <textarea 
              rows={2} 
              value={instagramData.audienceLocation}
              onChange={(e) => handleInstagramChange('audienceLocation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Top locations, countries, cities..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Audience Interests</label>
            <textarea 
              rows={2} 
              value={instagramData.audienceInterests}
              onChange={(e) => handleInstagramChange('audienceInterests', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Top interests, hobbies, activities..." 
            />
          </div>
        </div>

        {/* Competitor Analysis */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Competitor Analysis</h5>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Competitor Benchmarks</label>
            <textarea 
              rows={3} 
              value={instagramData.competitorBenchmarks}
              onChange={(e) => handleInstagramChange('competitorBenchmarks', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Competitor followers, engagement rates, content strategy..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Market Position</label>
            <textarea 
              rows={2} 
              value={instagramData.marketPosition}
              onChange={(e) => handleInstagramChange('marketPosition', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Position in market, competitive advantages, unique selling points..." 
            />
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h5 className="text-md font-semibold text-gray-800 mb-4">Recommendations</h5>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Optimization Recommendations</label>
              <textarea 
                rows={3} 
                value={instagramData.profileOptimization}
                onChange={(e) => handleInstagramChange('profileOptimization', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Profile picture, bio, settings improvements..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content Strategy Recommendations</label>
              <textarea 
                rows={3} 
                value={instagramData.contentStrategy}
                onChange={(e) => handleInstagramChange('contentStrategy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Content types, posting schedule, engagement tactics..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Growth Strategy Recommendations</label>
              <textarea 
                rows={3} 
                value={instagramData.growthStrategy}
                onChange={(e) => handleInstagramChange('growthStrategy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Organic growth tactics, audience targeting, engagement strategies..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Optimization Recommendations</label>
              <textarea 
                rows={3} 
                value={instagramData.campaignOptimization}
                onChange={(e) => handleInstagramChange('campaignOptimization', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Campaign improvements, targeting, budget allocation, performance optimization..." 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TikTokForm = () => {
  const [tiktokData, setTiktokData] = useState({
    // Profile Condition & Settings
    profileUsername: '',
    profileUrl: '',
    profilePictureStatus: '',
    bioStatus: '',
    bioText: '',
    profileType: '',
    verificationStatus: '',
    profileSettings: '',
    
    // Campaigns
    totalCampaigns: '',
    campaignTitles: '',
    campaignPurposes: '',
    campaignPerformance: '',
    activeCampaigns: '',
    completedCampaigns: '',
    campaignBudget: '',
    campaignROI: '',
    
    // Organic Growth
    followers: '',
    following: '',
    followerGrowth: '',
    organicReach: '',
    organicImpressions: '',
    organicEngagement: '',
    engagementRate: '',
    
    // Content Performance
    totalVideos: '',
    videoFrequency: '',
    bestPostingTimes: '',
    contentTypes: '',
    topPerformingContent: '',
    averageViews: '',
    averageLikes: '',
    averageComments: '',
    averageShares: '',
    
    // Audience & Demographics
    audienceDemographics: '',
    audienceInterests: '',
    audienceLocation: '',
    audienceAge: '',
    audienceGender: '',
    
    // Competitor Analysis
    competitorBenchmarks: '',
    marketPosition: '',
    competitiveAdvantages: '',
    
    // Recommendations
    profileOptimization: '',
    contentStrategy: '',
    growthStrategy: '',
    campaignOptimization: '',
    recommendations: ''
  });

  const handleTikTokChange = (field: string, value: string) => {
    setTiktokData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <MusicalNoteIcon className="w-5 h-5 mr-2 text-black" />
        TikTok Profile Audit
      </h4>
      <div className="space-y-6">
        {/* Profile Condition & Settings */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Profile Condition & Settings</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Username</label>
              <input 
                type="text" 
                value={tiktokData.profileUsername}
                onChange={(e) => handleTikTokChange('profileUsername', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="@username" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile URL</label>
              <input 
                type="url" 
                value={tiktokData.profileUrl}
                onChange={(e) => handleTikTokChange('profileUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="https://tiktok.com/@username" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture Status</label>
              <select 
                value={tiktokData.profilePictureStatus}
                onChange={(e) => handleTikTokChange('profilePictureStatus', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select status</option>
                <option value="optimized">Optimized</option>
                <option value="needs-improvement">Needs Improvement</option>
                <option value="missing">Missing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio Status</label>
              <select 
                value={tiktokData.bioStatus}
                onChange={(e) => handleTikTokChange('bioStatus', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select status</option>
                <option value="optimized">Optimized</option>
                <option value="needs-improvement">Needs Improvement</option>
                <option value="missing">Missing</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio Text</label>
            <textarea 
              rows={3} 
              value={tiktokData.bioText}
              onChange={(e) => handleTikTokChange('bioText', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Current bio text and optimization status..." 
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Type</label>
              <select 
                value={tiktokData.profileType}
                onChange={(e) => handleTikTokChange('profileType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select type</option>
                <option value="personal">Personal</option>
                <option value="business">Business</option>
                <option value="creator">Creator</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Verification Status</label>
              <select 
                value={tiktokData.verificationStatus}
                onChange={(e) => handleTikTokChange('verificationStatus', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select status</option>
                <option value="verified">Verified</option>
                <option value="not-verified">Not Verified</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Settings & Configuration</label>
            <textarea 
              rows={3} 
              value={tiktokData.profileSettings}
              onChange={(e) => handleTikTokChange('profileSettings', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Privacy settings, comment settings, duet settings, stitch settings..." 
            />
          </div>
        </div>

        {/* Campaigns */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Campaigns Analysis</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Campaigns</label>
              <input 
                type="number" 
                value={tiktokData.totalCampaigns}
                onChange={(e) => handleTikTokChange('totalCampaigns', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Active Campaigns</label>
              <input 
                type="number" 
                value={tiktokData.activeCampaigns}
                onChange={(e) => handleTikTokChange('activeCampaigns', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Completed Campaigns</label>
              <input 
                type="number" 
                value={tiktokData.completedCampaigns}
                onChange={(e) => handleTikTokChange('completedCampaigns', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Campaign Budget ($)</label>
              <input 
                type="number" 
                step="0.01"
                value={tiktokData.campaignBudget}
                onChange={(e) => handleTikTokChange('campaignBudget', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0.00" 
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Titles & Purposes (comma-separated)</label>
            <textarea 
              rows={3} 
              value={tiktokData.campaignTitles}
              onChange={(e) => handleTikTokChange('campaignTitles', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Campaign 1: Brand Awareness, Campaign 2: Lead Generation..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Performance Analysis</label>
            <textarea 
              rows={3} 
              value={tiktokData.campaignPerformance}
              onChange={(e) => handleTikTokChange('campaignPerformance', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Performance metrics, ROI, conversion rates, reach, engagement..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign ROI (%)</label>
            <input 
              type="number" 
              step="0.01"
              value={tiktokData.campaignROI}
              onChange={(e) => handleTikTokChange('campaignROI', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.00" 
            />
          </div>
        </div>

        {/* Organic Growth */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Organic Growth Details</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Followers</label>
              <input 
                type="number" 
                value={tiktokData.followers}
                onChange={(e) => handleTikTokChange('followers', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Following</label>
              <input 
                type="number" 
                value={tiktokData.following}
                onChange={(e) => handleTikTokChange('following', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Follower Growth (Last 30 days)</label>
              <input 
                type="number" 
                value={tiktokData.followerGrowth}
                onChange={(e) => handleTikTokChange('followerGrowth', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Engagement Rate (%)</label>
              <input 
                type="number" 
                step="0.01"
                value={tiktokData.engagementRate}
                onChange={(e) => handleTikTokChange('engagementRate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0.00" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organic Reach (Last 28 days)</label>
              <input 
                type="number" 
                value={tiktokData.organicReach}
                onChange={(e) => handleTikTokChange('organicReach', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organic Impressions (Last 28 days)</label>
              <input 
                type="number" 
                value={tiktokData.organicImpressions}
                onChange={(e) => handleTikTokChange('organicImpressions', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
          </div>
        </div>

        {/* Content Performance */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Content Performance</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Videos</label>
              <input 
                type="number" 
                value={tiktokData.totalVideos}
                onChange={(e) => handleTikTokChange('totalVideos', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Video Frequency (per week)</label>
              <input 
                type="number" 
                step="0.1"
                value={tiktokData.videoFrequency}
                onChange={(e) => handleTikTokChange('videoFrequency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0.0" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Average Views per Video</label>
              <input 
                type="number" 
                value={tiktokData.averageViews}
                onChange={(e) => handleTikTokChange('averageViews', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Average Likes per Video</label>
              <input 
                type="number" 
                value={tiktokData.averageLikes}
                onChange={(e) => handleTikTokChange('averageLikes', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Average Comments per Video</label>
              <input 
                type="number" 
                value={tiktokData.averageComments}
                onChange={(e) => handleTikTokChange('averageComments', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Average Shares per Video</label>
              <input 
                type="number" 
                value={tiktokData.averageShares}
                onChange={(e) => handleTikTokChange('averageShares', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Best Posting Times</label>
            <textarea 
              rows={2} 
              value={tiktokData.bestPostingTimes}
              onChange={(e) => handleTikTokChange('bestPostingTimes', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Monday 9 AM, Wednesday 2 PM, Friday 7 PM..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Content Types Used</label>
            <textarea 
              rows={2} 
              value={tiktokData.contentTypes}
              onChange={(e) => handleTikTokChange('contentTypes', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Dance, Comedy, Tutorial, Storytime, Trending sounds..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Top Performing Content</label>
            <textarea 
              rows={3} 
              value={tiktokData.topPerformingContent}
              onChange={(e) => handleTikTokChange('topPerformingContent', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Best performing videos, engagement rates, viral content..." 
            />
          </div>
        </div>

        {/* Audience & Demographics */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Audience & Demographics</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Audience Age Range</label>
              <input 
                type="text" 
                value={tiktokData.audienceAge}
                onChange={(e) => handleTikTokChange('audienceAge', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="18-24, 25-34, 35-44..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Audience Gender</label>
              <input 
                type="text" 
                value={tiktokData.audienceGender}
                onChange={(e) => handleTikTokChange('audienceGender', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Male: 60%, Female: 40%" 
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Audience Location</label>
            <textarea 
              rows={2} 
              value={tiktokData.audienceLocation}
              onChange={(e) => handleTikTokChange('audienceLocation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Top locations, countries, cities..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Audience Interests</label>
            <textarea 
              rows={2} 
              value={tiktokData.audienceInterests}
              onChange={(e) => handleTikTokChange('audienceInterests', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Top interests, hobbies, activities..." 
            />
          </div>
        </div>

        {/* Competitor Analysis */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Competitor Analysis</h5>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Competitor Benchmarks</label>
            <textarea 
              rows={3} 
              value={tiktokData.competitorBenchmarks}
              onChange={(e) => handleTikTokChange('competitorBenchmarks', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Competitor followers, engagement rates, content strategy..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Market Position</label>
            <textarea 
              rows={2} 
              value={tiktokData.marketPosition}
              onChange={(e) => handleTikTokChange('marketPosition', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Position in market, competitive advantages, unique selling points..." 
            />
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h5 className="text-md font-semibold text-gray-800 mb-4">Recommendations</h5>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Optimization Recommendations</label>
              <textarea 
                rows={3} 
                value={tiktokData.profileOptimization}
                onChange={(e) => handleTikTokChange('profileOptimization', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Profile picture, bio, settings improvements..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content Strategy Recommendations</label>
              <textarea 
                rows={3} 
                value={tiktokData.contentStrategy}
                onChange={(e) => handleTikTokChange('contentStrategy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Content types, posting schedule, engagement tactics..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Growth Strategy Recommendations</label>
              <textarea 
                rows={3} 
                value={tiktokData.growthStrategy}
                onChange={(e) => handleTikTokChange('growthStrategy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Organic growth tactics, audience targeting, engagement strategies..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Optimization Recommendations</label>
              <textarea 
                rows={3} 
                value={tiktokData.campaignOptimization}
                onChange={(e) => handleTikTokChange('campaignOptimization', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Campaign improvements, targeting, budget allocation, performance optimization..." 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TwitterForm = () => {
  const [twitterData, setTwitterData] = useState({
    // Profile Condition & Settings
    profileUsername: '',
    profileUrl: '',
    profilePictureStatus: '',
    bioStatus: '',
    bioText: '',
    profileType: '',
    verificationStatus: '',
    profileSettings: '',
    
    // Campaigns
    totalCampaigns: '',
    campaignTitles: '',
    campaignPurposes: '',
    campaignPerformance: '',
    activeCampaigns: '',
    completedCampaigns: '',
    campaignBudget: '',
    campaignROI: '',
    
    // Organic Growth
    followers: '',
    following: '',
    followerGrowth: '',
    organicReach: '',
    organicImpressions: '',
    organicEngagement: '',
    engagementRate: '',
    
    // Content Performance
    tweets: '',
    tweetFrequency: '',
    bestPostingTimes: '',
    contentTypes: '',
    topPerformingContent: '',
    averageLikes: '',
    averageRetweets: '',
    averageReplies: '',
    averageShares: '',
    
    // Audience & Demographics
    audienceDemographics: '',
    audienceInterests: '',
    audienceLocation: '',
    audienceAge: '',
    audienceGender: '',
    
    // Competitor Analysis
    competitorBenchmarks: '',
    marketPosition: '',
    competitiveAdvantages: '',
    
    // Recommendations
    profileOptimization: '',
    contentStrategy: '',
    growthStrategy: '',
    campaignOptimization: '',
    recommendations: ''
  });

  const handleTwitterChange = (field: string, value: string) => {
    setTwitterData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <HashtagIcon className="w-5 h-5 mr-2 text-blue-400" />
        Twitter Profile Audit
      </h4>
      <div className="space-y-6">
        {/* Profile Condition & Settings */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Profile Condition & Settings</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Username</label>
              <input 
                type="text" 
                value={twitterData.profileUsername}
                onChange={(e) => handleTwitterChange('profileUsername', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="@username" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile URL</label>
              <input 
                type="url" 
                value={twitterData.profileUrl}
                onChange={(e) => handleTwitterChange('profileUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="https://twitter.com/username" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture Status</label>
              <select 
                value={twitterData.profilePictureStatus}
                onChange={(e) => handleTwitterChange('profilePictureStatus', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select status</option>
                <option value="optimized">Optimized</option>
                <option value="needs-improvement">Needs Improvement</option>
                <option value="missing">Missing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio Status</label>
              <select 
                value={twitterData.bioStatus}
                onChange={(e) => handleTwitterChange('bioStatus', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select status</option>
                <option value="optimized">Optimized</option>
                <option value="needs-improvement">Needs Improvement</option>
                <option value="missing">Missing</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio Text</label>
            <textarea 
              rows={3} 
              value={twitterData.bioText}
              onChange={(e) => handleTwitterChange('bioText', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Current bio text and optimization status..." 
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Type</label>
              <select 
                value={twitterData.profileType}
                onChange={(e) => handleTwitterChange('profileType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select type</option>
                <option value="personal">Personal</option>
                <option value="business">Business</option>
                <option value="creator">Creator</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Verification Status</label>
              <select 
                value={twitterData.verificationStatus}
                onChange={(e) => handleTwitterChange('verificationStatus', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select status</option>
                <option value="verified">Verified</option>
                <option value="not-verified">Not Verified</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Settings & Configuration</label>
            <textarea 
              rows={3} 
              value={twitterData.profileSettings}
              onChange={(e) => handleTwitterChange('profileSettings', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Privacy settings, tweet settings, notification settings..." 
            />
          </div>
        </div>

        {/* Campaigns */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Campaigns Analysis</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Campaigns</label>
              <input 
                type="number" 
                value={twitterData.totalCampaigns}
                onChange={(e) => handleTwitterChange('totalCampaigns', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Active Campaigns</label>
              <input 
                type="number" 
                value={twitterData.activeCampaigns}
                onChange={(e) => handleTwitterChange('activeCampaigns', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Completed Campaigns</label>
              <input 
                type="number" 
                value={twitterData.completedCampaigns}
                onChange={(e) => handleTwitterChange('completedCampaigns', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Campaign Budget ($)</label>
              <input 
                type="number" 
                step="0.01"
                value={twitterData.campaignBudget}
                onChange={(e) => handleTwitterChange('campaignBudget', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0.00" 
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Titles & Purposes (comma-separated)</label>
            <textarea 
              rows={3} 
              value={twitterData.campaignTitles}
              onChange={(e) => handleTwitterChange('campaignTitles', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Campaign 1: Brand Awareness, Campaign 2: Lead Generation..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Performance Analysis</label>
            <textarea 
              rows={3} 
              value={twitterData.campaignPerformance}
              onChange={(e) => handleTwitterChange('campaignPerformance', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Performance metrics, ROI, conversion rates, reach, engagement..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign ROI (%)</label>
            <input 
              type="number" 
              step="0.01"
              value={twitterData.campaignROI}
              onChange={(e) => handleTwitterChange('campaignROI', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.00" 
            />
          </div>
        </div>

        {/* Organic Growth */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Organic Growth Details</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Followers</label>
              <input 
                type="number" 
                value={twitterData.followers}
                onChange={(e) => handleTwitterChange('followers', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Following</label>
              <input 
                type="number" 
                value={twitterData.following}
                onChange={(e) => handleTwitterChange('following', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Follower Growth (Last 30 days)</label>
              <input 
                type="number" 
                value={twitterData.followerGrowth}
                onChange={(e) => handleTwitterChange('followerGrowth', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Engagement Rate (%)</label>
              <input 
                type="number" 
                step="0.01"
                value={twitterData.engagementRate}
                onChange={(e) => handleTwitterChange('engagementRate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0.00" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organic Reach (Last 28 days)</label>
              <input 
                type="number" 
                value={twitterData.organicReach}
                onChange={(e) => handleTwitterChange('organicReach', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organic Impressions (Last 28 days)</label>
              <input 
                type="number" 
                value={twitterData.organicImpressions}
                onChange={(e) => handleTwitterChange('organicImpressions', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
          </div>
        </div>

        {/* Content Performance */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Content Performance</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Tweets</label>
              <input 
                type="number" 
                value={twitterData.tweets}
                onChange={(e) => handleTwitterChange('tweets', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tweet Frequency (per week)</label>
              <input 
                type="number" 
                step="0.1"
                value={twitterData.tweetFrequency}
                onChange={(e) => handleTwitterChange('tweetFrequency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0.0" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Average Likes per Tweet</label>
              <input 
                type="number" 
                value={twitterData.averageLikes}
                onChange={(e) => handleTwitterChange('averageLikes', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Average Retweets per Tweet</label>
              <input 
                type="number" 
                value={twitterData.averageRetweets}
                onChange={(e) => handleTwitterChange('averageRetweets', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Average Replies per Tweet</label>
              <input 
                type="number" 
                value={twitterData.averageReplies}
                onChange={(e) => handleTwitterChange('averageReplies', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Average Shares per Tweet</label>
              <input 
                type="number" 
                value={twitterData.averageShares}
                onChange={(e) => handleTwitterChange('averageShares', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Best Posting Times</label>
            <textarea 
              rows={2} 
              value={twitterData.bestPostingTimes}
              onChange={(e) => handleTwitterChange('bestPostingTimes', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Monday 9 AM, Wednesday 2 PM, Friday 7 PM..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Content Types Used</label>
            <textarea 
              rows={2} 
              value={twitterData.contentTypes}
              onChange={(e) => handleTwitterChange('contentTypes', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Text tweets, images, videos, polls, threads..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Top Performing Content</label>
            <textarea 
              rows={3} 
              value={twitterData.topPerformingContent}
              onChange={(e) => handleTwitterChange('topPerformingContent', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Best performing tweets, engagement rates, viral content..." 
            />
          </div>
        </div>

        {/* Audience & Demographics */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Audience & Demographics</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Audience Age Range</label>
              <input 
                type="text" 
                value={twitterData.audienceAge}
                onChange={(e) => handleTwitterChange('audienceAge', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="18-24, 25-34, 35-44..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Audience Gender</label>
              <input 
                type="text" 
                value={twitterData.audienceGender}
                onChange={(e) => handleTwitterChange('audienceGender', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Male: 60%, Female: 40%" 
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Audience Location</label>
            <textarea 
              rows={2} 
              value={twitterData.audienceLocation}
              onChange={(e) => handleTwitterChange('audienceLocation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Top locations, countries, cities..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Audience Interests</label>
            <textarea 
              rows={2} 
              value={twitterData.audienceInterests}
              onChange={(e) => handleTwitterChange('audienceInterests', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Top interests, hobbies, activities..." 
            />
          </div>
        </div>

        {/* Competitor Analysis */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Competitor Analysis</h5>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Competitor Benchmarks</label>
            <textarea 
              rows={3} 
              value={twitterData.competitorBenchmarks}
              onChange={(e) => handleTwitterChange('competitorBenchmarks', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Competitor followers, engagement rates, content strategy..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Market Position</label>
            <textarea 
              rows={2} 
              value={twitterData.marketPosition}
              onChange={(e) => handleTwitterChange('marketPosition', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Position in market, competitive advantages, unique selling points..." 
            />
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h5 className="text-md font-semibold text-gray-800 mb-4">Recommendations</h5>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Optimization Recommendations</label>
              <textarea 
                rows={3} 
                value={twitterData.profileOptimization}
                onChange={(e) => handleTwitterChange('profileOptimization', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Profile picture, bio, settings improvements..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content Strategy Recommendations</label>
              <textarea 
                rows={3} 
                value={twitterData.contentStrategy}
                onChange={(e) => handleTwitterChange('contentStrategy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Content types, posting schedule, hashtag strategy..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Growth Strategy Recommendations</label>
              <textarea 
                rows={3} 
                value={twitterData.growthStrategy}
                onChange={(e) => handleTwitterChange('growthStrategy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Organic growth tactics, audience targeting, engagement strategies..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Optimization Recommendations</label>
              <textarea 
                rows={3} 
                value={twitterData.campaignOptimization}
                onChange={(e) => handleTwitterChange('campaignOptimization', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Campaign improvements, targeting, budget allocation, performance optimization..." 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LinkedInForm = () => {
  const [linkedinData, setLinkedinData] = useState({
    // Profile Condition & Settings
    profileUrl: '',
    profilePictureStatus: '',
    headlineStatus: '',
    headlineText: '',
    profileType: '',
    verificationStatus: '',
    profileSettings: '',
    
    // Campaigns
    totalCampaigns: '',
    campaignTitles: '',
    campaignPurposes: '',
    campaignPerformance: '',
    activeCampaigns: '',
    completedCampaigns: '',
    campaignBudget: '',
    campaignROI: '',
    
    // Organic Growth
    followers: '',
    connections: '',
    followerGrowth: '',
    organicReach: '',
    organicImpressions: '',
    organicEngagement: '',
    engagementRate: '',
    
    // Content Performance
    posts: '',
    postFrequency: '',
    bestPostingTimes: '',
    contentTypes: '',
    topPerformingContent: '',
    averageLikes: '',
    averageComments: '',
    averageShares: '',
    averageViews: '',
    
    // Audience & Demographics
    audienceDemographics: '',
    audienceInterests: '',
    audienceLocation: '',
    audienceAge: '',
    audienceGender: '',
    audienceIndustry: '',
    audienceJobTitles: '',
    
    // Competitor Analysis
    competitorBenchmarks: '',
    marketPosition: '',
    competitiveAdvantages: '',
    
    // Recommendations
    profileOptimization: '',
    contentStrategy: '',
    growthStrategy: '',
    campaignOptimization: '',
    recommendations: ''
  });

  const handleLinkedInChange = (field: string, value: string) => {
    setLinkedinData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <BuildingOfficeIcon className="w-5 h-5 mr-2 text-blue-700" />
        LinkedIn Profile Audit
      </h4>
      <div className="space-y-6">
        {/* Profile Condition & Settings */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Profile Condition & Settings</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile URL</label>
              <input 
                type="url" 
                value={linkedinData.profileUrl}
                onChange={(e) => handleLinkedInChange('profileUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="https://linkedin.com/in/username" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture Status</label>
              <select 
                value={linkedinData.profilePictureStatus}
                onChange={(e) => handleLinkedInChange('profilePictureStatus', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select status</option>
                <option value="optimized">Optimized</option>
                <option value="needs-improvement">Needs Improvement</option>
                <option value="missing">Missing</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Headline Status</label>
              <select 
                value={linkedinData.headlineStatus}
                onChange={(e) => handleLinkedInChange('headlineStatus', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select status</option>
                <option value="optimized">Optimized</option>
                <option value="needs-improvement">Needs Improvement</option>
                <option value="missing">Missing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Verification Status</label>
              <select 
                value={linkedinData.verificationStatus}
                onChange={(e) => handleLinkedInChange('verificationStatus', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select status</option>
                <option value="verified">Verified</option>
                <option value="not-verified">Not Verified</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Headline Text</label>
            <textarea 
              rows={3} 
              value={linkedinData.headlineText}
              onChange={(e) => handleLinkedInChange('headlineText', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Current headline text and optimization status..." 
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Type</label>
              <select 
                value={linkedinData.profileType}
                onChange={(e) => handleLinkedInChange('profileType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select type</option>
                <option value="personal">Personal</option>
                <option value="business">Business</option>
                <option value="company">Company Page</option>
                <option value="showcase">Showcase Page</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Settings & Configuration</label>
              <textarea 
                rows={2} 
                value={linkedinData.profileSettings}
                onChange={(e) => handleLinkedInChange('profileSettings', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Privacy settings, notification settings, profile visibility..." 
              />
            </div>
          </div>
        </div>

        {/* Campaigns */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Campaigns Analysis</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Campaigns</label>
              <input 
                type="number" 
                value={linkedinData.totalCampaigns}
                onChange={(e) => handleLinkedInChange('totalCampaigns', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Active Campaigns</label>
              <input 
                type="number" 
                value={linkedinData.activeCampaigns}
                onChange={(e) => handleLinkedInChange('activeCampaigns', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Completed Campaigns</label>
              <input 
                type="number" 
                value={linkedinData.completedCampaigns}
                onChange={(e) => handleLinkedInChange('completedCampaigns', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Campaign Budget ($)</label>
              <input 
                type="number" 
                step="0.01"
                value={linkedinData.campaignBudget}
                onChange={(e) => handleLinkedInChange('campaignBudget', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0.00" 
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Titles & Purposes (comma-separated)</label>
            <textarea 
              rows={3} 
              value={linkedinData.campaignTitles}
              onChange={(e) => handleLinkedInChange('campaignTitles', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Campaign 1: Brand Awareness, Campaign 2: Lead Generation..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Performance Analysis</label>
            <textarea 
              rows={3} 
              value={linkedinData.campaignPerformance}
              onChange={(e) => handleLinkedInChange('campaignPerformance', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Performance metrics, ROI, conversion rates, reach, engagement..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign ROI (%)</label>
            <input 
              type="number" 
              step="0.01"
              value={linkedinData.campaignROI}
              onChange={(e) => handleLinkedInChange('campaignROI', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.00" 
            />
          </div>
        </div>

        {/* Organic Growth */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Organic Growth Details</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Followers</label>
              <input 
                type="number" 
                value={linkedinData.followers}
                onChange={(e) => handleLinkedInChange('followers', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Connections</label>
              <input 
                type="number" 
                value={linkedinData.connections}
                onChange={(e) => handleLinkedInChange('connections', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Follower Growth (Last 30 days)</label>
              <input 
                type="number" 
                value={linkedinData.followerGrowth}
                onChange={(e) => handleLinkedInChange('followerGrowth', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Engagement Rate (%)</label>
              <input 
                type="number" 
                step="0.01"
                value={linkedinData.engagementRate}
                onChange={(e) => handleLinkedInChange('engagementRate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0.00" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organic Reach (Last 28 days)</label>
              <input 
                type="number" 
                value={linkedinData.organicReach}
                onChange={(e) => handleLinkedInChange('organicReach', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organic Impressions (Last 28 days)</label>
              <input 
                type="number" 
                value={linkedinData.organicImpressions}
                onChange={(e) => handleLinkedInChange('organicImpressions', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
          </div>
        </div>

        {/* Content Performance */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Content Performance</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Posts</label>
              <input 
                type="number" 
                value={linkedinData.posts}
                onChange={(e) => handleLinkedInChange('posts', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Post Frequency (per week)</label>
              <input 
                type="number" 
                step="0.1"
                value={linkedinData.postFrequency}
                onChange={(e) => handleLinkedInChange('postFrequency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0.0" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Average Likes per Post</label>
              <input 
                type="number" 
                value={linkedinData.averageLikes}
                onChange={(e) => handleLinkedInChange('averageLikes', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Average Comments per Post</label>
              <input 
                type="number" 
                value={linkedinData.averageComments}
                onChange={(e) => handleLinkedInChange('averageComments', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Average Shares per Post</label>
              <input 
                type="number" 
                value={linkedinData.averageShares}
                onChange={(e) => handleLinkedInChange('averageShares', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Average Views per Post</label>
              <input 
                type="number" 
                value={linkedinData.averageViews}
                onChange={(e) => handleLinkedInChange('averageViews', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Best Posting Times</label>
            <textarea 
              rows={2} 
              value={linkedinData.bestPostingTimes}
              onChange={(e) => handleLinkedInChange('bestPostingTimes', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Tuesday 9 AM, Wednesday 2 PM, Thursday 1 PM..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Content Types Used</label>
            <textarea 
              rows={2} 
              value={linkedinData.contentTypes}
              onChange={(e) => handleLinkedInChange('contentTypes', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Text posts, images, videos, articles, polls, carousels..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Top Performing Content</label>
            <textarea 
              rows={3} 
              value={linkedinData.topPerformingContent}
              onChange={(e) => handleLinkedInChange('topPerformingContent', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Best performing posts, engagement rates, viral content..." 
            />
          </div>
        </div>

        {/* Audience & Demographics */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Audience & Demographics</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Audience Age Range</label>
              <input 
                type="text" 
                value={linkedinData.audienceAge}
                onChange={(e) => handleLinkedInChange('audienceAge', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="25-34, 35-44, 45-54..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Audience Gender</label>
              <input 
                type="text" 
                value={linkedinData.audienceGender}
                onChange={(e) => handleLinkedInChange('audienceGender', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Male: 60%, Female: 40%" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Audience Industry</label>
              <input 
                type="text" 
                value={linkedinData.audienceIndustry}
                onChange={(e) => handleLinkedInChange('audienceIndustry', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Technology, Finance, Healthcare, Marketing..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Audience Job Titles</label>
              <input 
                type="text" 
                value={linkedinData.audienceJobTitles}
                onChange={(e) => handleLinkedInChange('audienceJobTitles', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Manager, Director, CEO, Specialist..." 
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Audience Location</label>
            <textarea 
              rows={2} 
              value={linkedinData.audienceLocation}
              onChange={(e) => handleLinkedInChange('audienceLocation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Top locations, countries, cities..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Audience Interests</label>
            <textarea 
              rows={2} 
              value={linkedinData.audienceInterests}
              onChange={(e) => handleLinkedInChange('audienceInterests', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Professional interests, industry focus, business topics..." 
            />
          </div>
        </div>

        {/* Competitor Analysis */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Competitor Analysis</h5>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Competitor Benchmarks</label>
            <textarea 
              rows={3} 
              value={linkedinData.competitorBenchmarks}
              onChange={(e) => handleLinkedInChange('competitorBenchmarks', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Competitor followers, engagement rates, content strategy..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Market Position</label>
            <textarea 
              rows={2} 
              value={linkedinData.marketPosition}
              onChange={(e) => handleLinkedInChange('marketPosition', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Position in market, competitive advantages, unique selling points..." 
            />
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h5 className="text-md font-semibold text-gray-800 mb-4">Recommendations</h5>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Optimization Recommendations</label>
              <textarea 
                rows={3} 
                value={linkedinData.profileOptimization}
                onChange={(e) => handleLinkedInChange('profileOptimization', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Profile picture, headline, summary, experience improvements..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content Strategy Recommendations</label>
              <textarea 
                rows={3} 
                value={linkedinData.contentStrategy}
                onChange={(e) => handleLinkedInChange('contentStrategy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Content types, posting schedule, professional content, thought leadership..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Growth Strategy Recommendations</label>
              <textarea 
                rows={3} 
                value={linkedinData.growthStrategy}
                onChange={(e) => handleLinkedInChange('growthStrategy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Organic growth tactics, networking strategies, professional engagement..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Optimization Recommendations</label>
              <textarea 
                rows={3} 
                value={linkedinData.campaignOptimization}
                onChange={(e) => handleLinkedInChange('campaignOptimization', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Campaign improvements, targeting, budget allocation, performance optimization..." 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const YouTubeForm = () => {
  const [youtubeData, setYoutubeData] = useState({
    // Channel Condition & Settings
    channelName: '',
    channelUrl: '',
    channelPictureStatus: '',
    channelDescription: '',
    channelCategory: '',
    verificationStatus: '',
    channelSettings: '',
    
    // Campaigns
    totalCampaigns: '',
    campaignTitles: '',
    campaignPurposes: '',
    campaignPerformance: '',
    activeCampaigns: '',
    completedCampaigns: '',
    campaignBudget: '',
    campaignROI: '',
    
    // Organic Growth
    subscribers: '',
    subscriberGrowth: '',
    totalViews: '',
    viewGrowth: '',
    watchTime: '',
    engagementRate: '',
    
    // Content Performance
    totalVideos: '',
    videoFrequency: '',
    bestPostingTimes: '',
    contentTypes: '',
    topPerformingContent: '',
    averageViews: '',
    averageLikes: '',
    averageComments: '',
    averageShares: '',
    
    // Audience & Demographics
    audienceDemographics: '',
    audienceInterests: '',
    audienceLocation: '',
    audienceAge: '',
    audienceGender: '',
    
    // Competitor Analysis
    competitorBenchmarks: '',
    marketPosition: '',
    competitiveAdvantages: '',
    
    // Recommendations
    channelOptimization: '',
    contentStrategy: '',
    growthStrategy: '',
    campaignOptimization: '',
    recommendations: ''
  });

  const handleYouTubeChange = (field: string, value: string) => {
    setYoutubeData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <PlayIcon className="w-5 h-5 mr-2 text-red-600" />
        YouTube Channel Audit
      </h4>
      <div className="space-y-6">
        {/* Channel Condition & Settings */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Channel Condition & Settings</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Channel Name</label>
              <input 
                type="text" 
                value={youtubeData.channelName}
                onChange={(e) => handleYouTubeChange('channelName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Channel name" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Channel URL</label>
              <input 
                type="url" 
                value={youtubeData.channelUrl}
                onChange={(e) => handleYouTubeChange('channelUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="https://youtube.com/channel/..." 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Channel Picture Status</label>
              <select 
                value={youtubeData.channelPictureStatus}
                onChange={(e) => handleYouTubeChange('channelPictureStatus', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select status</option>
                <option value="optimized">Optimized</option>
                <option value="needs-improvement">Needs Improvement</option>
                <option value="missing">Missing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Verification Status</label>
              <select 
                value={youtubeData.verificationStatus}
                onChange={(e) => handleYouTubeChange('verificationStatus', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select status</option>
                <option value="verified">Verified</option>
                <option value="not-verified">Not Verified</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Channel Description</label>
            <textarea 
              rows={3} 
              value={youtubeData.channelDescription}
              onChange={(e) => handleYouTubeChange('channelDescription', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Current channel description and optimization status..." 
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Channel Category</label>
              <input 
                type="text" 
                value={youtubeData.channelCategory}
                onChange={(e) => handleYouTubeChange('channelCategory', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Entertainment, Education, Gaming, etc." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Channel Settings & Configuration</label>
              <textarea 
                rows={2} 
                value={youtubeData.channelSettings}
                onChange={(e) => handleYouTubeChange('channelSettings', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Privacy settings, comment settings, monetization status..." 
              />
            </div>
          </div>
        </div>

        {/* Campaigns */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Campaigns Analysis</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Campaigns</label>
              <input 
                type="number" 
                value={youtubeData.totalCampaigns}
                onChange={(e) => handleYouTubeChange('totalCampaigns', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Active Campaigns</label>
              <input 
                type="number" 
                value={youtubeData.activeCampaigns}
                onChange={(e) => handleYouTubeChange('activeCampaigns', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Completed Campaigns</label>
              <input 
                type="number" 
                value={youtubeData.completedCampaigns}
                onChange={(e) => handleYouTubeChange('completedCampaigns', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Campaign Budget ($)</label>
              <input 
                type="number" 
                step="0.01"
                value={youtubeData.campaignBudget}
                onChange={(e) => handleYouTubeChange('campaignBudget', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0.00" 
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Titles & Purposes (comma-separated)</label>
            <textarea 
              rows={3} 
              value={youtubeData.campaignTitles}
              onChange={(e) => handleYouTubeChange('campaignTitles', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Campaign 1: Brand Awareness, Campaign 2: Lead Generation..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Performance Analysis</label>
            <textarea 
              rows={3} 
              value={youtubeData.campaignPerformance}
              onChange={(e) => handleYouTubeChange('campaignPerformance', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Performance metrics, ROI, conversion rates, reach, engagement..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign ROI (%)</label>
            <input 
              type="number" 
              step="0.01"
              value={youtubeData.campaignROI}
              onChange={(e) => handleYouTubeChange('campaignROI', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="0.00" 
            />
          </div>
        </div>

        {/* Organic Growth */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Organic Growth Details</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subscribers</label>
              <input 
                type="number" 
                value={youtubeData.subscribers}
                onChange={(e) => handleYouTubeChange('subscribers', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subscriber Growth (Last 30 days)</label>
              <input 
                type="number" 
                value={youtubeData.subscriberGrowth}
                onChange={(e) => handleYouTubeChange('subscriberGrowth', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Views</label>
              <input 
                type="number" 
                value={youtubeData.totalViews}
                onChange={(e) => handleYouTubeChange('totalViews', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">View Growth (Last 30 days)</label>
              <input 
                type="number" 
                value={youtubeData.viewGrowth}
                onChange={(e) => handleYouTubeChange('viewGrowth', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Watch Time (hours)</label>
              <input 
                type="number" 
                step="0.1"
                value={youtubeData.watchTime}
                onChange={(e) => handleYouTubeChange('watchTime', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0.0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Engagement Rate (%)</label>
              <input 
                type="number" 
                step="0.01"
                value={youtubeData.engagementRate}
                onChange={(e) => handleYouTubeChange('engagementRate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0.00" 
              />
            </div>
          </div>
        </div>

        {/* Content Performance */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Content Performance</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Videos</label>
              <input 
                type="number" 
                value={youtubeData.totalVideos}
                onChange={(e) => handleYouTubeChange('totalVideos', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Video Frequency (per week)</label>
              <input 
                type="number" 
                step="0.1"
                value={youtubeData.videoFrequency}
                onChange={(e) => handleYouTubeChange('videoFrequency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0.0" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Average Views per Video</label>
              <input 
                type="number" 
                value={youtubeData.averageViews}
                onChange={(e) => handleYouTubeChange('averageViews', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Average Likes per Video</label>
              <input 
                type="number" 
                value={youtubeData.averageLikes}
                onChange={(e) => handleYouTubeChange('averageLikes', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Average Comments per Video</label>
              <input 
                type="number" 
                value={youtubeData.averageComments}
                onChange={(e) => handleYouTubeChange('averageComments', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Average Shares per Video</label>
              <input 
                type="number" 
                value={youtubeData.averageShares}
                onChange={(e) => handleYouTubeChange('averageShares', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="0" 
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Best Posting Times</label>
            <textarea 
              rows={2} 
              value={youtubeData.bestPostingTimes}
              onChange={(e) => handleYouTubeChange('bestPostingTimes', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Monday 9 AM, Wednesday 2 PM, Friday 7 PM..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Content Types Used</label>
            <textarea 
              rows={2} 
              value={youtubeData.contentTypes}
              onChange={(e) => handleYouTubeChange('contentTypes', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Tutorials, Reviews, Vlogs, Live streams, Shorts..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Top Performing Content</label>
            <textarea 
              rows={3} 
              value={youtubeData.topPerformingContent}
              onChange={(e) => handleYouTubeChange('topPerformingContent', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Best performing videos, engagement rates, viral content..." 
            />
          </div>
        </div>

        {/* Audience & Demographics */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Audience & Demographics</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Audience Age Range</label>
              <input 
                type="text" 
                value={youtubeData.audienceAge}
                onChange={(e) => handleYouTubeChange('audienceAge', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="18-24, 25-34, 35-44..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Audience Gender</label>
              <input 
                type="text" 
                value={youtubeData.audienceGender}
                onChange={(e) => handleYouTubeChange('audienceGender', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Male: 60%, Female: 40%" 
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Audience Location</label>
            <textarea 
              rows={2} 
              value={youtubeData.audienceLocation}
              onChange={(e) => handleYouTubeChange('audienceLocation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Top locations, countries, cities..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Audience Interests</label>
            <textarea 
              rows={2} 
              value={youtubeData.audienceInterests}
              onChange={(e) => handleYouTubeChange('audienceInterests', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Top interests, hobbies, activities..." 
            />
          </div>
        </div>

        {/* Competitor Analysis */}
        <div className="border-b border-gray-200 pb-4">
          <h5 className="text-md font-semibold text-gray-800 mb-4">Competitor Analysis</h5>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Competitor Benchmarks</label>
            <textarea 
              rows={3} 
              value={youtubeData.competitorBenchmarks}
              onChange={(e) => handleYouTubeChange('competitorBenchmarks', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Competitor subscribers, engagement rates, content strategy..." 
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Market Position</label>
            <textarea 
              rows={2} 
              value={youtubeData.marketPosition}
              onChange={(e) => handleYouTubeChange('marketPosition', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Position in market, competitive advantages, unique selling points..." 
            />
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h5 className="text-md font-semibold text-gray-800 mb-4">Recommendations</h5>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Channel Optimization Recommendations</label>
              <textarea 
                rows={3} 
                value={youtubeData.channelOptimization}
                onChange={(e) => handleYouTubeChange('channelOptimization', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Channel picture, description, category improvements..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content Strategy Recommendations</label>
              <textarea 
                rows={3} 
                value={youtubeData.contentStrategy}
                onChange={(e) => handleYouTubeChange('contentStrategy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Content types, posting schedule, SEO optimization..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Growth Strategy Recommendations</label>
              <textarea 
                rows={3} 
                value={youtubeData.growthStrategy}
                onChange={(e) => handleYouTubeChange('growthStrategy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Subscribers growth tactics, audience targeting, content optimization..." 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Optimization Recommendations</label>
              <textarea 
                rows={3} 
                value={youtubeData.campaignOptimization}
                onChange={(e) => handleYouTubeChange('campaignOptimization', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                placeholder="Campaign improvements, targeting, budget allocation, performance optimization..." 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function SocialTab() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const handlePlatformChange = (platforms: string[]) => {
    setSelectedPlatforms(platforms);
  };

  const renderPlatformForm = (platformId: string) => {
    switch (platformId) {
      case 'general':
        return <GeneralSocialForm />;
      case 'facebook':
        return <FacebookForm />;
      case 'instagram':
        return <InstagramForm />;
      case 'youtube':
        return <YouTubeForm />;
      case 'tiktok':
        return <TikTokForm />;
      case 'twitter':
        return <TwitterForm />;
      case 'linkedin':
        return <LinkedInForm />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Platform Selector */}
      <AuditPlatformSelector 
        platforms={socialPlatforms} 
        onChange={handlePlatformChange}
      />

      {/* Platform-Specific Forms */}
      {selectedPlatforms.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Platform-Specific Audits</h3>
          {selectedPlatforms.map(platformId => (
            <div key={platformId}>
              {renderPlatformForm(platformId)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 