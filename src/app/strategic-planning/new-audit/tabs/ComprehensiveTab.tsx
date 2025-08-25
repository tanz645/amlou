import React from 'react';

interface ComprehensiveTabProps {
  data: Record<string, string>;
  onDataUpdate: (data: Record<string, string>) => void;
}

export default function ComprehensiveTab({ data, onDataUpdate }: ComprehensiveTabProps) {
  const handleInputChange = (fieldName: string, value: string) => {
    onDataUpdate({
      ...data,
      [fieldName]: value
    });
  };

  const handleCheckboxChange = (fieldName: string, checked: boolean) => {
    onDataUpdate({
      ...data,
      [fieldName]: checked ? 'Yes' : 'No'
    });
  };

  return (
    <div className="space-y-8">
      {/* Branding Audit */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Branding Audit</h3>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Brand Guidelines Availability</label>
          <div className="flex flex-col gap-2 mb-4">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={data.logoUsageGuidelines === 'Yes'}
                onChange={(e) => handleCheckboxChange('logoUsageGuidelines', e.target.checked)}
              /> 
              Logo Usage Guidelines
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={data.colorPaletteDocumentation === 'Yes'}
                onChange={(e) => handleCheckboxChange('colorPaletteDocumentation', e.target.checked)}
              /> 
              Color Palette Documentation
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={data.typographyGuidelines === 'Yes'}
                onChange={(e) => handleCheckboxChange('typographyGuidelines', e.target.checked)}
              /> 
              Typography Guidelines
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={data.brandVoiceMessaging === 'Yes'}
                onChange={(e) => handleCheckboxChange('brandVoiceMessaging', e.target.checked)}
              /> 
              Brand Voice & Messaging
            </label>
          </div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Internal Branding</label>
          <textarea 
            className="w-full border rounded p-2 mb-2" 
            rows={2} 
            placeholder="Describe office branding, employee brand awareness, training, etc."
            value={data.internalBranding || ''}
            onChange={(e) => handleInputChange('internalBranding', e.target.value)}
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">External Branding</label>
          <textarea 
            className="w-full border rounded p-2 mb-2" 
            rows={2} 
            placeholder="Website, social media, marketing materials, customer touchpoints, etc."
            value={data.externalBranding || ''}
            onChange={(e) => handleInputChange('externalBranding', e.target.value)}
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">Brand Consistency Observations</label>
          <textarea 
            className="w-full border rounded p-2 mb-2" 
            rows={2} 
            placeholder="Observations on consistency across channels."
            value={data.brandConsistencyObservations || ''}
            onChange={(e) => handleInputChange('brandConsistencyObservations', e.target.value)}
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">Brand Strength Score (1-10)</label>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={data.brandStrengthScore || '5'}
            onChange={(e) => handleInputChange('brandStrengthScore', e.target.value)}
            className="w-full" 
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">Priority Areas for Improvement</label>
          <textarea 
            className="w-full border rounded p-2 mb-2" 
            rows={2} 
            placeholder="List priority areas for improvement."
            value={data.priorityAreasImprovement || ''}
            onChange={(e) => handleInputChange('priorityAreasImprovement', e.target.value)}
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">Key Recommendations</label>
          <textarea 
            className="w-full border rounded p-2 mb-2" 
            rows={2} 
            placeholder="Key recommendations for brand improvement."
            value={data.keyRecommendations || ''}
            onChange={(e) => handleInputChange('keyRecommendations', e.target.value)}
          />
        </div>
      </div>

      {/* Communication Channels Audit */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Communication Channels Audit</h3>
        <div className="space-y-6">
          {/* Owned Channels */}
          <div>
            <h4 className="text-md font-medium text-gray-800 mb-3">Owned Channels</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input 
                    type="text" 
                    className="border rounded p-2" 
                    placeholder="Website URL"
                    value={data.websiteUrl || ''}
                    onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                  />
                  <select 
                    className="border rounded p-2"
                    value={data.websitePerformance || ''}
                    onChange={(e) => handleInputChange('websitePerformance', e.target.value)}
                  >
                    <option value="">Select Performance</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Average">Average</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>
                <textarea 
                  className="w-full border rounded p-2 mt-2" 
                  rows={2} 
                  placeholder="Website observations and recommendations"
                  value={data.websiteObservations || ''}
                  onChange={(e) => handleInputChange('websiteObservations', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blog/Content Hub</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input 
                    type="text" 
                    className="border rounded p-2" 
                    placeholder="Blog URL"
                    value={data.blogUrl || ''}
                    onChange={(e) => handleInputChange('blogUrl', e.target.value)}
                  />
                  <select 
                    className="border rounded p-2"
                    value={data.blogPerformance || ''}
                    onChange={(e) => handleInputChange('blogPerformance', e.target.value)}
                  >
                    <option value="">Select Performance</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Average">Average</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>
                <textarea 
                  className="w-full border rounded p-2 mt-2" 
                  rows={2} 
                  placeholder="Blog performance and content quality assessment"
                  value={data.blogObservations || ''}
                  onChange={(e) => handleInputChange('blogObservations', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Newsletter</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input 
                    type="text" 
                    className="border rounded p-2" 
                    placeholder="Frequency"
                    value={data.emailFrequency || ''}
                    onChange={(e) => handleInputChange('emailFrequency', e.target.value)}
                  />
                  <input 
                    type="text" 
                    className="border rounded p-2" 
                    placeholder="Subscriber Count"
                    value={data.emailSubscriberCount || ''}
                    onChange={(e) => handleInputChange('emailSubscriberCount', e.target.value)}
                  />
                  <input 
                    type="text" 
                    className="border rounded p-2" 
                    placeholder="Open Rate %"
                    value={data.emailOpenRate || ''}
                    onChange={(e) => handleInputChange('emailOpenRate', e.target.value)}
                  />
                </div>
                <textarea 
                  className="w-full border rounded p-2 mt-2" 
                  rows={2} 
                  placeholder="Email strategy and performance notes"
                  value={data.emailObservations || ''}
                  onChange={(e) => handleInputChange('emailObservations', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Social Media Channels */}
          <div>
            <h4 className="text-md font-medium text-gray-800 mb-3">Social Media Channels</h4>
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                  <input 
                    type="text" 
                    className="border rounded p-2 w-full" 
                    placeholder="Followers"
                    value={data.facebookFollowers || ''}
                    onChange={(e) => handleInputChange('facebookFollowers', e.target.value)}
                  />
                  <select 
                    className="border rounded p-2 w-full mt-1"
                    value={data.facebookPerformance || ''}
                    onChange={(e) => handleInputChange('facebookPerformance', e.target.value)}
                  >
                    <option value="">Performance</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Average">Average</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                  <input 
                    type="text" 
                    className="border rounded p-2 w-full" 
                    placeholder="Followers"
                    value={data.instagramFollowers || ''}
                    onChange={(e) => handleInputChange('instagramFollowers', e.target.value)}
                  />
                  <select 
                    className="border rounded p-2 w-full mt-1"
                    value={data.instagramPerformance || ''}
                    onChange={(e) => handleInputChange('instagramPerformance', e.target.value)}
                  >
                    <option value="">Performance</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Average">Average</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                  <input 
                    type="text" 
                    className="border rounded p-2 w-full" 
                    placeholder="Followers"
                    value={data.linkedinFollowers || ''}
                    onChange={(e) => handleInputChange('linkedinFollowers', e.target.value)}
                  />
                  <select 
                    className="border rounded p-2 w-full mt-1"
                    value={data.linkedinPerformance || ''}
                    onChange={(e) => handleInputChange('linkedinPerformance', e.target.value)}
                  >
                    <option value="">Performance</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Average">Average</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Twitter/X</label>
                  <input 
                    type="text" 
                    className="border rounded p-2 w-full" 
                    placeholder="Followers"
                    value={data.twitterFollowers || ''}
                    onChange={(e) => handleInputChange('twitterFollowers', e.target.value)}
                  />
                  <select 
                    className="border rounded p-2 w-full mt-1"
                    value={data.twitterPerformance || ''}
                    onChange={(e) => handleInputChange('twitterPerformance', e.target.value)}
                  >
                    <option value="">Performance</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Average">Average</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">TikTok</label>
                  <input 
                    type="text" 
                    className="border rounded p-2 w-full" 
                    placeholder="Followers"
                    value={data.tiktokFollowers || ''}
                    onChange={(e) => handleInputChange('tiktokFollowers', e.target.value)}
                  />
                  <select 
                    className="border rounded p-2 w-full mt-1"
                    value={data.tiktokPerformance || ''}
                    onChange={(e) => handleInputChange('tiktokPerformance', e.target.value)}
                  >
                    <option value="">Performance</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Average">Average</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">YouTube</label>
                  <input 
                    type="text" 
                    className="border rounded p-2 w-full" 
                    placeholder="Subscribers"
                    value={data.youtubeSubscribers || ''}
                    onChange={(e) => handleInputChange('youtubeSubscribers', e.target.value)}
                  />
                  <select 
                    className="border rounded p-2 w-full mt-1"
                    value={data.youtubePerformance || ''}
                    onChange={(e) => handleInputChange('youtubePerformance', e.target.value)}
                  >
                    <option value="">Performance</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Average">Average</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Social Media Strategy Assessment</label>
                <textarea 
                  className="w-full border rounded p-2" 
                  rows={3} 
                  placeholder="Overall social media strategy, content quality, engagement rates, posting frequency, and recommendations"
                  value={data.socialMediaStrategyAssessment || ''}
                  onChange={(e) => handleInputChange('socialMediaStrategyAssessment', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Paid Channels */}
          <div>
            <h4 className="text-md font-medium text-gray-800 mb-3">Paid Channels</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Google Ads</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input 
                    type="text" 
                    className="border rounded p-2" 
                    placeholder="Monthly Budget"
                    value={data.googleAdsBudget || ''}
                    onChange={(e) => handleInputChange('googleAdsBudget', e.target.value)}
                  />
                  <input 
                    type="text" 
                    className="border rounded p-2" 
                    placeholder="CTR %"
                    value={data.googleAdsCTR || ''}
                    onChange={(e) => handleInputChange('googleAdsCTR', e.target.value)}
                  />
                  <input 
                    type="text" 
                    className="border rounded p-2" 
                    placeholder="Conversion Rate %"
                    value={data.googleAdsConversionRate || ''}
                    onChange={(e) => handleInputChange('googleAdsConversionRate', e.target.value)}
                  />
                </div>
                <textarea 
                  className="w-full border rounded p-2 mt-2" 
                  rows={2} 
                  placeholder="Google Ads performance and optimization notes"
                  value={data.googleAdsObservations || ''}
                  onChange={(e) => handleInputChange('googleAdsObservations', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Facebook/Instagram Ads</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input 
                    type="text" 
                    className="border rounded p-2" 
                    placeholder="Monthly Budget"
                    value={data.facebookAdsBudget || ''}
                    onChange={(e) => handleInputChange('facebookAdsBudget', e.target.value)}
                  />
                  <input 
                    type="text" 
                    className="border rounded p-2" 
                    placeholder="CPC"
                    value={data.facebookAdsCPC || ''}
                    onChange={(e) => handleInputChange('facebookAdsCPC', e.target.value)}
                  />
                  <input 
                    type="text" 
                    className="border rounded p-2" 
                    placeholder="ROAS"
                    value={data.facebookAdsROAS || ''}
                    onChange={(e) => handleInputChange('facebookAdsROAS', e.target.value)}
                  />
                </div>
                <textarea 
                  className="w-full border rounded p-2 mt-2" 
                  rows={2} 
                  placeholder="Social ads performance and targeting assessment"
                  value={data.facebookAdsObservations || ''}
                  onChange={(e) => handleInputChange('facebookAdsObservations', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Other Paid Channels</label>
                <textarea 
                  className="w-full border rounded p-2" 
                  rows={2} 
                  placeholder="LinkedIn Ads, Display Ads, Video Ads, etc."
                  value={data.otherPaidChannels || ''}
                  onChange={(e) => handleInputChange('otherPaidChannels', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Earned Channels */}
          <div>
            <h4 className="text-md font-medium text-gray-800 mb-3">Earned Channels</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PR & Media Coverage</label>
                <textarea 
                  className="w-full border rounded p-2" 
                  rows={2} 
                  placeholder="Recent media mentions, press releases, media relationships"
                  value={data.prMediaCoverage || ''}
                  onChange={(e) => handleInputChange('prMediaCoverage', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Influencer Partnerships</label>
                <textarea 
                  className="w-full border rounded p-2" 
                  rows={2} 
                  placeholder="Current influencer relationships, performance, and opportunities"
                  value={data.influencerPartnerships || ''}
                  onChange={(e) => handleInputChange('influencerPartnerships', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns Audit */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaigns Audit</h3>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Recent Campaigns Overview</label>
          <textarea className="w-full border rounded p-2 mb-2" rows={2} placeholder="Describe recent marketing campaigns." />
          <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Objectives</label>
          <textarea className="w-full border rounded p-2 mb-2" rows={2} placeholder="What were the goals of each campaign?" />
          <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Performance Metrics</label>
          <textarea className="w-full border rounded p-2 mb-2" rows={2} placeholder="KPIs, ROI, engagement, conversions, etc." />
          <label className="block text-sm font-medium text-gray-700 mb-2">Key Learnings & Recommendations</label>
          <textarea className="w-full border rounded p-2 mb-2" rows={2} placeholder="What worked, what didn't, and what to improve?" />
        </div>
      </div>

      {/* Communication Quality Audit */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Communication Quality Audit</h3>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Content Quality Assessment</label>
          <textarea className="w-full border rounded p-2 mb-2" rows={2} placeholder="Assess clarity, consistency, tone, and value of content." />
          <label className="block text-sm font-medium text-gray-700 mb-2">Content Types & Formats</label>
          <textarea className="w-full border rounded p-2 mb-2" rows={2} placeholder="Blog, video, social posts, email, etc." />
          <label className="block text-sm font-medium text-gray-700 mb-2">Content Calendar & Planning</label>
          <textarea className="w-full border rounded p-2 mb-2" rows={2} placeholder="Is there a content calendar? How is planning managed?" />
          <label className="block text-sm font-medium text-gray-700 mb-2">Distribution & Reach</label>
          <textarea className="w-full border rounded p-2 mb-2" rows={2} placeholder="How is content distributed? What is the reach?" />
          <label className="block text-sm font-medium text-gray-700 mb-2">Performance Metrics</label>
          <textarea className="w-full border rounded p-2 mb-2" rows={2} placeholder="Engagement, shares, open rates, etc." />
          <label className="block text-sm font-medium text-gray-700 mb-2">Recommendations for Communication Quality Improvement</label>
          <textarea className="w-full border rounded p-2 mb-2" rows={2} placeholder="How can communication quality be improved?" />
        </div>
      </div>
    </div>
  );
} 