import React, { useState } from 'react';
import { ChartBarIcon, MegaphoneIcon, TagIcon, EyeIcon, ExclamationTriangleIcon, UserGroupIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export default function CampaignsTab() {
  const [campaignData, setCampaignData] = useState({
    // Campaign Inventory
    totalCampaigns: '',
    activeCampaigns: '',
    pausedCampaigns: '',
    completedCampaigns: '',
    awarenessCampaigns: '',
    considerationCampaigns: '',
    conversionCampaigns: '',
    retargetingCampaigns: '',
    organicCampaigns: '',
    
    // Campaign Performance
    totalBudget: '',
    totalSpent: '',
    totalImpressions: '',
    totalClicks: '',
    totalConversions: '',
    avgROAS: '',
    avgCTR: '',
    avgCPC: '',
    avgCPM: '',
    avgCPA: '',
    conversionRate: '',
    
    // Campaign Strategy
    campaignTypes: '',
    targetAudience: '',
    campaignDuration: '',
    seasonalCampaigns: '',
    crossChannelCampaigns: '',
    campaignObjectives: '',
    
    // Creative Performance
    adCreatives: '',
    creativePerformance: '',
    adCopyQuality: '',
    visualElements: '',
    landingPageAlignment: '',
    brandConsistency: '',
    
    // Targeting & Optimization
    targetingAccuracy: '',
    audienceSegmentation: '',
    bidStrategy: '',
    adScheduling: '',
    geographicTargeting: '',
    deviceTargeting: '',
    
    // Organic Campaigns Assessment
    organicReach: '',
    organicEngagement: '',
    organicConversions: '',
    organicTraffic: '',
    organicRankings: '',
    organicKeywords: '',
    organicContentPerformance: '',
    organicSocialPresence: '',
    organicBacklinks: '',
    organicBrandMentions: '',
    organicCompetitorAnalysis: '',
    organicGrowthRate: '',
    
    // Recommendations
    immediateActions: '',
    shortTermOptimization: '',
    longTermStrategy: '',
    budgetAllocation: '',
    technologyTools: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setCampaignData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Campaign Inventory Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MegaphoneIcon className="w-5 h-5 mr-2 text-blue-600" />
          Campaign Inventory Analysis
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Campaigns</label>
            <input
              type="number"
              value={campaignData.totalCampaigns}
              onChange={(e) => handleInputChange('totalCampaigns', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Active Campaigns</label>
            <input
              type="number"
              value={campaignData.activeCampaigns}
              onChange={(e) => handleInputChange('activeCampaigns', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Paused Campaigns</label>
            <input
              type="number"
              value={campaignData.pausedCampaigns}
              onChange={(e) => handleInputChange('pausedCampaigns', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Completed Campaigns</label>
            <input
              type="number"
              value={campaignData.completedCampaigns}
              onChange={(e) => handleInputChange('completedCampaigns', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Awareness Campaigns</label>
            <input
              type="number"
              value={campaignData.awarenessCampaigns}
              onChange={(e) => handleInputChange('awarenessCampaigns', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Consideration Campaigns</label>
            <input
              type="number"
              value={campaignData.considerationCampaigns}
              onChange={(e) => handleInputChange('considerationCampaigns', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Conversion Campaigns</label>
            <input
              type="number"
              value={campaignData.conversionCampaigns}
              onChange={(e) => handleInputChange('conversionCampaigns', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Retargeting Campaigns</label>
            <input
              type="number"
              value={campaignData.retargetingCampaigns}
              onChange={(e) => handleInputChange('retargetingCampaigns', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Organic Campaigns</label>
            <input
              type="number"
              value={campaignData.organicCampaigns}
              onChange={(e) => handleInputChange('organicCampaigns', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Campaign Performance Metrics */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <ChartBarIcon className="w-5 h-5 mr-2 text-green-600" />
          Campaign Performance Metrics
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Budget ($)</label>
            <input
              type="number"
              step="0.01"
              value={campaignData.totalBudget}
              onChange={(e) => handleInputChange('totalBudget', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Spent ($)</label>
            <input
              type="number"
              step="0.01"
              value={campaignData.totalSpent}
              onChange={(e) => handleInputChange('totalSpent', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Impressions</label>
            <input
              type="number"
              value={campaignData.totalImpressions}
              onChange={(e) => handleInputChange('totalImpressions', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Clicks</label>
            <input
              type="number"
              value={campaignData.totalClicks}
              onChange={(e) => handleInputChange('totalClicks', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Conversions</label>
            <input
              type="number"
              value={campaignData.totalConversions}
              onChange={(e) => handleInputChange('totalConversions', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Avg. ROAS</label>
            <input
              type="number"
              step="0.01"
              value={campaignData.avgROAS}
              onChange={(e) => handleInputChange('avgROAS', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Avg. CTR (%)</label>
            <input
              type="number"
              step="0.01"
              value={campaignData.avgCTR}
              onChange={(e) => handleInputChange('avgCTR', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Avg. CPC ($)</label>
            <input
              type="number"
              step="0.01"
              value={campaignData.avgCPC}
              onChange={(e) => handleInputChange('avgCPC', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Avg. CPM ($)</label>
            <input
              type="number"
              step="0.01"
              value={campaignData.avgCPM}
              onChange={(e) => handleInputChange('avgCPM', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Avg. CPA ($)</label>
            <input
              type="number"
              step="0.01"
              value={campaignData.avgCPA}
              onChange={(e) => handleInputChange('avgCPA', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Conversion Rate (%)</label>
            <input
              type="number"
              step="0.01"
              value={campaignData.conversionRate}
              onChange={(e) => handleInputChange('conversionRate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="0.00"
            />
          </div>
        </div>
      </div>

      {/* Organic Campaigns Assessment */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <GlobeAltIcon className="w-5 h-5 mr-2 text-teal-600" />
          Organic Campaigns Assessment
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Organic Reach</label>
            <input
              type="number"
              value={campaignData.organicReach}
              onChange={(e) => handleInputChange('organicReach', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Organic Engagement (%)</label>
            <input
              type="number"
              step="0.01"
              value={campaignData.organicEngagement}
              onChange={(e) => handleInputChange('organicEngagement', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Organic Conversions</label>
            <input
              type="number"
              value={campaignData.organicConversions}
              onChange={(e) => handleInputChange('organicConversions', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Organic Traffic</label>
            <input
              type="number"
              value={campaignData.organicTraffic}
              onChange={(e) => handleInputChange('organicTraffic', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Organic Rankings (Avg)</label>
            <input
              type="number"
              step="0.1"
              value={campaignData.organicRankings}
              onChange={(e) => handleInputChange('organicRankings', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="0.0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Organic Keywords</label>
            <input
              type="number"
              value={campaignData.organicKeywords}
              onChange={(e) => handleInputChange('organicKeywords', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Organic Content Performance</label>
            <select
              value={campaignData.organicContentPerformance}
              onChange={(e) => handleInputChange('organicContentPerformance', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">Select performance</option>
              <option value="excellent">Excellent (High organic reach)</option>
              <option value="good">Good (Moderate organic reach)</option>
              <option value="average">Average (Low organic reach)</option>
              <option value="poor">Poor (Very low organic reach)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Organic Social Presence</label>
            <select
              value={campaignData.organicSocialPresence}
              onChange={(e) => handleInputChange('organicSocialPresence', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">Select presence</option>
              <option value="excellent">Excellent (Strong organic social)</option>
              <option value="good">Good (Good organic social)</option>
              <option value="average">Average (Basic organic social)</option>
              <option value="poor">Poor (Weak organic social)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Organic Backlinks</label>
            <input
              type="number"
              value={campaignData.organicBacklinks}
              onChange={(e) => handleInputChange('organicBacklinks', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Organic Brand Mentions</label>
            <input
              type="number"
              value={campaignData.organicBrandMentions}
              onChange={(e) => handleInputChange('organicBrandMentions', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Organic Growth Rate (%)</label>
            <input
              type="number"
              step="0.01"
              value={campaignData.organicGrowthRate}
              onChange={(e) => handleInputChange('organicGrowthRate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Organic Competitor Analysis</label>
          <textarea
            rows={3}
            value={campaignData.organicCompetitorAnalysis}
            onChange={(e) => handleInputChange('organicCompetitorAnalysis', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            placeholder="Analysis of organic performance compared to competitors..."
          />
        </div>
      </div>

      {/* Campaign Strategy Assessment */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TagIcon className="w-5 h-5 mr-2 text-purple-600" />
          Campaign Strategy Assessment
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Types Distribution</label>
              <textarea
                rows={3}
                value={campaignData.campaignTypes}
                onChange={(e) => handleInputChange('campaignTypes', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Breakdown of campaign types and their performance..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience Analysis</label>
              <textarea
                rows={3}
                value={campaignData.targetAudience}
                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Analysis of target audience segments and their performance..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Duration Analysis</label>
              <select
                value={campaignData.campaignDuration}
                onChange={(e) => handleInputChange('campaignDuration', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Select duration strategy</option>
                <option value="short_term">Short-term (1-30 days)</option>
                <option value="medium_term">Medium-term (1-3 months)</option>
                <option value="long_term">Long-term (3+ months)</option>
                <option value="mixed">Mixed duration strategy</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Seasonal Campaigns</label>
              <select
                value={campaignData.seasonalCampaigns}
                onChange={(e) => handleInputChange('seasonalCampaigns', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Select seasonal strategy</option>
                <option value="excellent">Excellent (Well-planned seasonal campaigns)</option>
                <option value="good">Good (Some seasonal planning)</option>
                <option value="basic">Basic (Limited seasonal campaigns)</option>
                <option value="none">None (No seasonal strategy)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cross-Channel Campaigns</label>
              <select
                value={campaignData.crossChannelCampaigns}
                onChange={(e) => handleInputChange('crossChannelCampaigns', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Select cross-channel strategy</option>
                <option value="excellent">Excellent (Integrated cross-channel campaigns)</option>
                <option value="good">Good (Some cross-channel coordination)</option>
                <option value="basic">Basic (Limited cross-channel strategy)</option>
                <option value="none">None (Single channel focus)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Objectives</label>
              <textarea
                rows={3}
                value={campaignData.campaignObjectives}
                onChange={(e) => handleInputChange('campaignObjectives', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Analysis of campaign objectives and their alignment with business goals..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Creative Performance Assessment */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <EyeIcon className="w-5 h-5 mr-2 text-orange-600" />
          Creative Performance Assessment
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Ad Creatives</label>
            <input
              type="number"
              value={campaignData.adCreatives}
              onChange={(e) => handleInputChange('adCreatives', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Creative Performance</label>
            <select
              value={campaignData.creativePerformance}
              onChange={(e) => handleInputChange('creativePerformance', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">Select performance</option>
              <option value="excellent">Excellent (High engagement)</option>
              <option value="good">Good (Moderate engagement)</option>
              <option value="average">Average (Low engagement)</option>
              <option value="poor">Poor (Very low engagement)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ad Copy Quality</label>
            <select
              value={campaignData.adCopyQuality}
              onChange={(e) => handleInputChange('adCopyQuality', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">Select quality</option>
              <option value="excellent">Excellent (Compelling copy)</option>
              <option value="good">Good (Effective copy)</option>
              <option value="average">Average (Basic copy)</option>
              <option value="poor">Poor (Weak copy)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Visual Elements</label>
            <select
              value={campaignData.visualElements}
              onChange={(e) => handleInputChange('visualElements', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">Select quality</option>
              <option value="excellent">Excellent (High-quality visuals)</option>
              <option value="good">Good (Good visuals)</option>
              <option value="average">Average (Basic visuals)</option>
              <option value="poor">Poor (Low-quality visuals)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Landing Page Alignment</label>
            <select
              value={campaignData.landingPageAlignment}
              onChange={(e) => handleInputChange('landingPageAlignment', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">Select alignment</option>
              <option value="excellent">Excellent (Perfect alignment)</option>
              <option value="good">Good (Strong alignment)</option>
              <option value="average">Average (Moderate alignment)</option>
              <option value="poor">Poor (Weak alignment)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand Consistency</label>
            <select
              value={campaignData.brandConsistency}
              onChange={(e) => handleInputChange('brandConsistency', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">Select consistency</option>
              <option value="excellent">Excellent (Highly consistent)</option>
              <option value="good">Good (Mostly consistent)</option>
              <option value="average">Average (Some inconsistencies)</option>
              <option value="poor">Poor (Inconsistent)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Targeting & Optimization Assessment */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <UserGroupIcon className="w-5 h-5 mr-2 text-indigo-600" />
          Targeting & Optimization Assessment
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Targeting Accuracy</label>
            <select
              value={campaignData.targetingAccuracy}
              onChange={(e) => handleInputChange('targetingAccuracy', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select accuracy</option>
              <option value="excellent">Excellent (Highly accurate)</option>
              <option value="good">Good (Mostly accurate)</option>
              <option value="average">Average (Moderately accurate)</option>
              <option value="poor">Poor (Inaccurate targeting)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Audience Segmentation</label>
            <select
              value={campaignData.audienceSegmentation}
              onChange={(e) => handleInputChange('audienceSegmentation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select segmentation</option>
              <option value="excellent">Excellent (Detailed segments)</option>
              <option value="good">Good (Good segments)</option>
              <option value="average">Average (Basic segments)</option>
              <option value="poor">Poor (No segmentation)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bid Strategy</label>
            <select
              value={campaignData.bidStrategy}
              onChange={(e) => handleInputChange('bidStrategy', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select strategy</option>
              <option value="excellent">Excellent (Optimized bidding)</option>
              <option value="good">Good (Good bidding strategy)</option>
              <option value="average">Average (Basic bidding)</option>
              <option value="poor">Poor (Poor bidding strategy)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ad Scheduling</label>
            <select
              value={campaignData.adScheduling}
              onChange={(e) => handleInputChange('adScheduling', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select scheduling</option>
              <option value="excellent">Excellent (Optimized scheduling)</option>
              <option value="good">Good (Good scheduling)</option>
              <option value="average">Average (Basic scheduling)</option>
              <option value="poor">Poor (No scheduling optimization)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Geographic Targeting</label>
            <select
              value={campaignData.geographicTargeting}
              onChange={(e) => handleInputChange('geographicTargeting', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select targeting</option>
              <option value="excellent">Excellent (Precise geo-targeting)</option>
              <option value="good">Good (Good geo-targeting)</option>
              <option value="average">Average (Basic geo-targeting)</option>
              <option value="poor">Poor (No geo-targeting)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Device Targeting</label>
            <select
              value={campaignData.deviceTargeting}
              onChange={(e) => handleInputChange('deviceTargeting', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select targeting</option>
              <option value="excellent">Excellent (Optimized device targeting)</option>
              <option value="good">Good (Good device targeting)</option>
              <option value="average">Average (Basic device targeting)</option>
              <option value="poor">Poor (No device targeting)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <ExclamationTriangleIcon className="w-5 h-5 mr-2 text-red-600" />
          Campaign Audit Recommendations
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Immediate Actions (Next 30 days)</label>
            <textarea
              rows={3}
              value={campaignData.immediateActions}
              onChange={(e) => handleInputChange('immediateActions', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Critical actions that need immediate attention..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Short-term Optimization (1-3 months)</label>
              <textarea
                rows={3}
                value={campaignData.shortTermOptimization}
                onChange={(e) => handleInputChange('shortTermOptimization', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Short-term campaign optimization strategies..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Long-term Strategy (3-12 months)</label>
              <textarea
                rows={3}
                value={campaignData.longTermStrategy}
                onChange={(e) => handleInputChange('longTermStrategy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Long-term campaign strategy vision..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget Allocation</label>
              <textarea
                rows={3}
                value={campaignData.budgetAllocation}
                onChange={(e) => handleInputChange('budgetAllocation', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Recommended budget allocation across campaigns..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Technology & Tools</label>
              <textarea
                rows={3}
                value={campaignData.technologyTools}
                onChange={(e) => handleInputChange('technologyTools', e.target.value)}
                placeholder="Recommended tools and technology for campaign management..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 