import React, { useState } from 'react';
import AuditPlatformSelector from '../components/AuditPlatformSelector';
import { 
  ChatBubbleLeftRightIcon,
  GlobeAltIcon,
  PlayCircleIcon,
  MusicalNoteIcon,
  HashtagIcon,
  BuildingOfficeIcon,
  ChevronDownIcon
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

interface SocialTabProps {
  data: Record<string, any>;
  onDataUpdate: (data: Record<string, any>) => void;
}

export default function SocialTab({ data, onDataUpdate }: SocialTabProps) {
  const selectedPlatforms = (data.selectedPlatforms as string[]) || [];

  const handlePlatformChange = (platforms: string[]) => {
    onDataUpdate({
      ...data,
      selectedPlatforms: platforms
    });
  };

  const handleInputChange = (platform: string, field: string, value: string) => {
    onDataUpdate({
      ...data,
      [platform]: {
        ...data[platform],
        [field]: value
      }
    });
  };

  const inputClasses = "w-full border-gray-300 rounded-md shadow-sm text-sm focus:border-blue-500 py-2.5 px-3 focus:ring-blue-500 transition-colors bg-gray-50/50 hover:bg-white border";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1.5";
  const sectionHeaderClasses = "font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-3 flex items-center";

  return (
    <div className="space-y-6">
      <AuditPlatformSelector 
        platforms={socialPlatforms} 
        selectedPlatforms={selectedPlatforms}
        onChange={handlePlatformChange} 
      />
      
      {selectedPlatforms.includes('general') && (
        <details className="bg-white border border-gray-200 rounded-xl shadow-sm group overflow-hidden" open>
          <summary className="p-6 cursor-pointer list-none flex justify-between items-center outline-none [&::-webkit-details-marker]:hidden bg-gray-50/50 hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100/50 text-blue-600 rounded-lg">
                <ChatBubbleLeftRightIcon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">General Social Media Audit</h3>
            </div>
            <ChevronDownIcon className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform duration-200" />
          </summary>
          <div className="p-6 pt-4 border-t border-gray-100">
            <div className="space-y-8">
              {/* Audience & Reach */}
              <div>
                <h4 className="font-medium text-gray-800 mb-4 pb-2 border-b border-gray-100">Audience & Reach</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClasses}>Total Followers Across All Platforms</label>
                    <input
                      type="number"
                      placeholder="e.g. 15000"
                      className={inputClasses}
                      value={data.general?.totalFollowers || ''}
                      onChange={e => handleInputChange('general', 'totalFollowers', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Real Followers Percentage (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="e.g. 85"
                      className={inputClasses}
                      value={data.general?.realFollowersPercentage || ''}
                      onChange={e => handleInputChange('general', 'realFollowersPercentage', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Primary Target Audience</label>
                    <input
                      type="text"
                      placeholder="e.g. B2B, Gen Z tech enthusiasts"
                      className={inputClasses}
                      value={data.general?.primaryAudience || ''}
                      onChange={e => handleInputChange('general', 'primaryAudience', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Average Overall Engagement Rate (%)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="e.g. 3.2"
                      className={inputClasses}
                      value={data.general?.overallEngagementRate || ''}
                      onChange={e => handleInputChange('general', 'overallEngagementRate', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Brand & Strategy */}
              <div>
                <h4 className="font-medium text-gray-800 mb-4 pb-2 border-b border-gray-100">Brand & Strategy</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClasses}>Brand Voice & Tone</label>
                    <input
                      type="text"
                      placeholder="e.g. Professional, authoritative yet approachable"
                      className={inputClasses}
                      value={data.general?.brandVoice || ''}
                      onChange={e => handleInputChange('general', 'brandVoice', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Cross-Platform Consistency</label>
                    <select
                      className={inputClasses}
                      value={data.general?.crossPlatformConsistency || ''}
                      onChange={e => handleInputChange('general', 'crossPlatformConsistency', e.target.value)}
                    >
                      <option value="">Select status...</option>
                      <option value="highly_consistent">Highly Consistent (Visuals & Messaging)</option>
                      <option value="somewhat_consistent">Somewhat Consistent</option>
                      <option value="inconsistent">Inconsistent / Fractured</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClasses}>Primary Marketing Objective</label>
                    <select
                      className={inputClasses}
                      value={data.general?.primaryObjective || ''}
                      onChange={e => handleInputChange('general', 'primaryObjective', e.target.value)}
                    >
                      <option value="">Select objective...</option>
                      <option value="brand_awareness">Brand Awareness</option>
                      <option value="lead_generation">Lead Generation</option>
                      <option value="community_building">Community Building</option>
                      <option value="sales">Direct Sales / E-commerce</option>
                      <option value="customer_support">Customer Support</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClasses}>Overall Content Strategy</label>
                    <input
                      type="text"
                      placeholder="e.g. 60% Educational, 30% Entertaining, 10% Promo"
                      className={inputClasses}
                      value={data.general?.overallContentStrategy || ''}
                      onChange={e => handleInputChange('general', 'overallContentStrategy', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Operations & Technology */}
              <div>
                <h4 className="font-medium text-gray-800 mb-4 pb-2 border-b border-gray-100">Operations & Technology</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClasses}>Social Media Management Tools Used</label>
                    <input
                      type="text"
                      placeholder="e.g. Hootsuite, Sprout Social, Buffer"
                      className={inputClasses}
                      value={data.general?.managementTools || ''}
                      onChange={e => handleInputChange('general', 'managementTools', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Social Search Engine Appearance</label>
                    <select
                      className={inputClasses}
                      value={data.general?.socialSearchAppearance || ''}
                      onChange={e => handleInputChange('general', 'socialSearchAppearance', e.target.value)}
                    >
                      <option value="">Select status...</option>
                      <option value="excellent">Excellent (Profiles rank high for brand name)</option>
                      <option value="needs_improvement">Needs Improvement</option>
                      <option value="poor">Poor (Profiles difficult to find)</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClasses}>General Observations & Biggest Opportunity</label>
                    <textarea
                      placeholder="Summary of the overall social presence and the #1 area for growth..."
                      className={`${inputClasses} min-h-[80px]`}
                      value={data.general?.generalObservations || ''}
                      onChange={e => handleInputChange('general', 'generalObservations', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </details>
      )}

      {selectedPlatforms.map(platformId => {
        if (platformId === 'general') return null;
        
        const platform = socialPlatforms.find(p => p.id === platformId);
        const Icon = platform?.icon || GlobeAltIcon;
        
        return (
          <details key={platformId} className="bg-white border border-gray-200 rounded-xl shadow-sm group overflow-hidden" open>
            <summary className="p-6 cursor-pointer list-none flex justify-between items-center outline-none [&::-webkit-details-marker]:hidden bg-gray-50/50 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100/50 text-blue-600 rounded-lg">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{platform?.name} Audit</h3>
              </div>
              <ChevronDownIcon className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform duration-200" />
            </summary>
            <div className="p-6 pt-4 border-t border-gray-100">
              {platformId === 'facebook' ? (
                <div className="space-y-10">
                  {/* 1. Foundation & Visual Branding */}
                  <div className="bg-gray-50/30 rounded-lg border border-gray-100 p-5">
                    <h4 className={sectionHeaderClasses}>
                      <span className="bg-gray-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3">1</span>
                      Foundation & Visual Branding
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                      <div>
                        <label className={labelClasses}>Digital Storefront Check</label>
                        <select
                          className={inputClasses}
                          value={data.facebook?.storefrontCheck || ''}
                          onChange={e => handleInputChange('facebook', 'storefrontCheck', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="pass">Pass (Professional in &lt;3s)</option>
                          <option value="fail">Fail (Needs improvement)</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClasses}>Branding Consistency</label>
                        <select
                          className={inputClasses}
                          value={data.facebook?.brandingConsistency || ''}
                          onChange={e => handleInputChange('facebook', 'brandingConsistency', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="consistent">Consistent Logo & Cover</option>
                          <option value="inconsistent">Inconsistent / Mismatched</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClasses}>Cover Photo Optimization</label>
                        <select
                          className={inputClasses}
                          value={data.facebook?.coverOptimization || ''}
                          onChange={e => handleInputChange('facebook', 'coverOptimization', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="optimized">Desktop & Mobile Optimized</option>
                          <option value="cutoff">Text/Faces Cut Off</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClasses}>Cover Media Type</label>
                        <select
                          className={inputClasses}
                          value={data.facebook?.coverMediaType || ''}
                          onChange={e => handleInputChange('facebook', 'coverMediaType', e.target.value)}
                        >
                          <option value="">Select type...</option>
                          <option value="video">High-engagement Video/Slideshow</option>
                          <option value="static">Static Image</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClasses}>Action Button (CTA)</label>
                        <input
                          type="text"
                          placeholder="e.g. Active, linked to Shop"
                          className={inputClasses}
                          value={data.facebook?.actionButton || ''}
                          onChange={e => handleInputChange('facebook', 'actionButton', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>Pinned Post Status</label>
                        <input
                          type="text"
                          placeholder="e.g. Welcome offer, 2 months old"
                          className={inputClasses}
                          value={data.facebook?.pinnedPost || ''}
                          onChange={e => handleInputChange('facebook', 'pinnedPost', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 2. Information & SEO Audit */}
                  <div className="bg-gray-50/30 rounded-lg border border-gray-100 p-5">
                    <h4 className={sectionHeaderClasses}>
                      <span className="bg-gray-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3">2</span>
                      Information & SEO Audit
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClasses}>Username (Handle) Quality</label>
                        <input
                          type="text"
                          placeholder="e.g. Clean & consistent"
                          className={inputClasses}
                          value={data.facebook?.usernameQuality || ''}
                          onChange={e => handleInputChange('facebook', 'usernameQuality', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>Contact Accuracy</label>
                        <select
                          className={inputClasses}
                          value={data.facebook?.contactAccuracy || ''}
                          onChange={e => handleInputChange('facebook', 'contactAccuracy', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="verified">Verified & Clickable</option>
                          <option value="issues">Missing or Broken</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className={labelClasses}>About Section (SEO & Value Prop)</label>
                        <textarea
                          placeholder="Analysis of keywords and value proposition..."
                          className={`${inputClasses} min-h-[80px]`}
                          value={data.facebook?.aboutSection || ''}
                          onChange={e => handleInputChange('facebook', 'aboutSection', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>Services/Shop Setup</label>
                        <select
                          className={inputClasses}
                          value={data.facebook?.servicesSetup || ''}
                          onChange={e => handleInputChange('facebook', 'servicesSetup', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="complete">Fully setup & synced</option>
                          <option value="incomplete">Incomplete / Missing</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClasses}>Page Transparency & Linked Accounts</label>
                        <input
                          type="text"
                          placeholder="e.g. Clear, IG/WhatsApp connected correctly"
                          className={inputClasses}
                          value={data.facebook?.transparencyLinks || ''}
                          onChange={e => handleInputChange('facebook', 'transparencyLinks', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3. Content Strategy & Quality */}
                  <div className="bg-gray-50/30 rounded-lg border border-gray-100 p-5">
                    <h4 className={sectionHeaderClasses}>
                      <span className="bg-gray-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3">3</span>
                      Content Strategy & Quality
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="md:col-span-2">
                        <label className={labelClasses}>Content Mix (Value vs Promo)</label>
                        <input
                          type="text"
                          placeholder="e.g. 70/30 - Needs more educational value"
                          className={inputClasses}
                          value={data.facebook?.contentMix || ''}
                          onChange={e => handleInputChange('facebook', 'contentMix', e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2 border-l-2 border-blue-200 pl-4 py-1 mt-2">
                        <span className="text-sm font-semibold text-gray-700 block mb-3">Format Diversity (Last 30 Days %)</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-gray-500 mb-1 font-medium">Reels %</label>
                            <input
                              type="number" min="0" max="100"
                              className={inputClasses}
                              placeholder="0"
                              value={data.facebook?.reelsPercent || ''}
                              onChange={e => handleInputChange('facebook', 'reelsPercent', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 mb-1 font-medium">Carousels / Single Images %</label>
                            <input
                              type="number" min="0" max="100"
                              className={inputClasses}
                              placeholder="0"
                              value={data.facebook?.imagesPercent || ''}
                              onChange={e => handleInputChange('facebook', 'imagesPercent', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className={labelClasses}>Visual & Video Quality</label>
                        <select
                          className={inputClasses}
                          value={data.facebook?.visualQuality || ''}
                          onChange={e => handleInputChange('facebook', 'visualQuality', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="high">High-res, videos subtitled</option>
                          <option value="low">Low quality, missing subtitles</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClasses}>Hook & Caption Quality</label>
                        <input
                          type="text"
                          placeholder="e.g. Weak hooks, buried value"
                          className={inputClasses}
                          value={data.facebook?.hookQuality || ''}
                          onChange={e => handleInputChange('facebook', 'hookQuality', e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className={labelClasses}>Engagement Loops (CTAs in posts)</label>
                        <select
                          className={inputClasses}
                          value={data.facebook?.engagementLoops || ''}
                          onChange={e => handleInputChange('facebook', 'engagementLoops', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="consistent">Consistent questions/instructions</option>
                          <option value="inconsistent">Missing clear CTAs</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 4. Community & Response Management */}
                  <div className="bg-gray-50/30 rounded-lg border border-gray-100 p-5">
                    <h4 className={sectionHeaderClasses}>
                      <span className="bg-gray-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3">4</span>
                      Community & Response Management
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClasses}>Response Time / Badge</label>
                        <input
                          type="text"
                          placeholder="e.g. Very responsive badge active"
                          className={inputClasses}
                          value={data.facebook?.responseTime || ''}
                          onChange={e => handleInputChange('facebook', 'responseTime', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>Comment Interaction</label>
                        <select
                          className={inputClasses}
                          value={data.facebook?.commentInteraction || ''}
                          onChange={e => handleInputChange('facebook', 'commentInteraction', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="active">Actively likes/replies</option>
                          <option value="ghost">Ghost town</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className={labelClasses}>Review Management</label>
                        <textarea
                          placeholder="Analysis of last 5 reviews and responses..."
                          className={`${inputClasses} min-h-[80px]`}
                          value={data.facebook?.reviewManagement || ''}
                          onChange={e => handleInputChange('facebook', 'reviewManagement', e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className={labelClasses}>Automated Messaging (Inbox)</label>
                        <input
                          type="text"
                          placeholder="e.g. Instant replies & FAQs setup"
                          className={inputClasses}
                          value={data.facebook?.automatedMessaging || ''}
                          onChange={e => handleInputChange('facebook', 'automatedMessaging', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 5. Analytics & Performance */}
                  <div className="bg-gray-50/30 rounded-lg border border-gray-100 p-5">
                    <h4 className={sectionHeaderClasses}>
                      <span className="bg-gray-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3">5</span>
                      Analytics & Performance
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClasses}>Follower vs. Reach</label>
                        <input
                          type="text"
                          placeholder="e.g. Reach is <5% of followers"
                          className={inputClasses}
                          value={data.facebook?.followerVsReach || ''}
                          onChange={e => handleInputChange('facebook', 'followerVsReach', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>Audience Alignment</label>
                        <select
                          className={inputClasses}
                          value={data.facebook?.audienceAlignment || ''}
                          onChange={e => handleInputChange('facebook', 'audienceAlignment', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="aligned">Matches paying customer profile</option>
                          <option value="unaligned">Misaligned demographics</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClasses}>Negative Feedback Spikes</label>
                        <input
                          type="text"
                          placeholder="e.g. High 'Hide Post' on promos"
                          className={inputClasses}
                          value={data.facebook?.negativeFeedback || ''}
                          onChange={e => handleInputChange('facebook', 'negativeFeedback', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>Peak Posting Times</label>
                        <select
                          className={inputClasses}
                          value={data.facebook?.peakTimes || ''}
                          onChange={e => handleInputChange('facebook', 'peakTimes', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="optimized">Posting when audience online</option>
                          <option value="convenient">Posting at convenient staff times</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 6. Technical Infrastructure & Tracking */}
                  <div className="bg-gray-50/30 rounded-lg border border-gray-100 p-5">
                    <h4 className={sectionHeaderClasses}>
                      <span className="bg-gray-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3">6</span>
                      Technical Infrastructure & Tracking
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="md:col-span-2">
                        <label className={labelClasses}>Meta Pixel & API Status</label>
                        <input
                          type="text"
                          placeholder="e.g. Active, CAPI properly set up"
                          className={inputClasses}
                          value={data.facebook?.pixelStatus || ''}
                          onChange={e => handleInputChange('facebook', 'pixelStatus', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>Domain Verification</label>
                        <select
                          className={inputClasses}
                          value={data.facebook?.domainVerification || ''}
                          onChange={e => handleInputChange('facebook', 'domainVerification', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="verified">Verified in Business Suite</option>
                          <option value="unverified">Unverified / Missing</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClasses}>Event Tracking (Standard Events)</label>
                        <select
                          className={inputClasses}
                          value={data.facebook?.eventTracking || ''}
                          onChange={e => handleInputChange('facebook', 'eventTracking', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="standard">Tracking Lead, Purchase, etc.</option>
                          <option value="pageview">Only Page Views tracked</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className={labelClasses}>Ad Account Hygiene (Account Quality)</label>
                        <textarea
                          placeholder="e.g. Clean status, no rejected ads..."
                          className={`${inputClasses} min-h-[60px]`}
                          value={data.facebook?.accountHygiene || ''}
                          onChange={e => handleInputChange('facebook', 'accountHygiene', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 7. The Competitive "Gap" Analysis */}
                  <div className="bg-gray-50/30 rounded-lg border border-gray-100 p-5">
                    <h4 className={sectionHeaderClasses}>
                      <span className="bg-gray-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3">7</span>
                      The Competitive &quot;Gap&quot; Analysis
                    </h4>
                    <div className="grid grid-cols-1 gap-5">
                      <div>
                        <label className={labelClasses}>Ad Library Transparency</label>
                        <input
                          type="text"
                          placeholder="e.g. Active varying hooks vs stagnant account"
                          className={inputClasses}
                          value={data.facebook?.adLibrary || ''}
                          onChange={e => handleInputChange('facebook', 'adLibrary', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>Creative Comparison vs Top 3 Competitors</label>
                        <textarea
                          placeholder="Production quality, lighting, sound compared to competitors..."
                          className={`${inputClasses} min-h-[80px]`}
                          value={data.facebook?.creativeComparison || ''}
                          onChange={e => handleInputChange('facebook', 'creativeComparison', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>Offer Differentiation (UVP)</label>
                        <input
                          type="text"
                          placeholder="e.g. Superior lead magnet clearly presented"
                          className={inputClasses}
                          value={data.facebook?.offerDifferentiation || ''}
                          onChange={e => handleInputChange('facebook', 'offerDifferentiation', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 8. Retention & Funnel Logic */}
                  <div className="bg-gray-50/30 rounded-lg border border-gray-100 p-5">
                    <h4 className={sectionHeaderClasses}>
                      <span className="bg-gray-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3">8</span>
                      Retention & Funnel Logic
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClasses}>Retention Rate</label>
                        <input
                          type="text"
                          placeholder="e.g. High Returning Viewers"
                          className={inputClasses}
                          value={data.facebook?.retentionRate || ''}
                          onChange={e => handleInputChange('facebook', 'retentionRate', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>Click-Through Friction</label>
                        <select
                          className={inputClasses}
                          value={data.facebook?.clickFriction || ''}
                          onChange={e => handleInputChange('facebook', 'clickFriction', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="seamless">Seamless mobile checkout (1-2 clicks)</option>
                          <option value="high">High friction (&gt;3 clicks)</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className={labelClasses}>Omnichannel Sync (Funnel Consistency)</label>
                        <input
                          type="text"
                          placeholder="e.g. Messaging perfectly aligns with SEO/Website"
                          className={inputClasses}
                          value={data.facebook?.omnichannelSync || ''}
                          onChange={e => handleInputChange('facebook', 'omnichannelSync', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 9. Growth & Scalability Metrics */}
                  <div className="bg-gray-50/30 rounded-lg border border-gray-100 p-5">
                    <h4 className={sectionHeaderClasses}>
                      <span className="bg-gray-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3">9</span>
                      Growth & Scalability Metrics
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="md:col-span-2">
                        <label className={labelClasses}>Content Library Depth</label>
                        <select
                          className={inputClasses}
                          value={data.facebook?.contentDepth || ''}
                          onChange={e => handleInputChange('facebook', 'contentDepth', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="ready">Ready for long-term PPC (Strong Evergreen)</option>
                          <option value="lacking">Not enough Evergreen content</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClasses}>Scalability of Engagement</label>
                        <select
                          className={inputClasses}
                          value={data.facebook?.scalableEngagement || ''}
                          onChange={e => handleInputChange('facebook', 'scalableEngagement', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="steady">Steady as followers increase</option>
                          <option value="dropping">Dropping as followers increase</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClasses}>Lead Quality</label>
                        <input
                          type="text"
                          placeholder="e.g. 90% Qualified vs Spam"
                          className={inputClasses}
                          value={data.facebook?.leadQuality || ''}
                          onChange={e => handleInputChange('facebook', 'leadQuality', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : platformId === 'instagram' ? (
                <div className="space-y-10">
                  {/* 1. Profile & Bio Optimization */}
                  <div className="bg-gray-50/30 rounded-lg border border-gray-100 p-5">
                    <h4 className={sectionHeaderClasses}>
                      <span className="bg-gray-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3">1</span>
                      Profile & Bio Optimization
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClasses}>Profile Picture / Avatar</label>
                        <select
                          className={inputClasses}
                          value={data.instagram?.profilePicture || ''}
                          onChange={e => handleInputChange('instagram', 'profilePicture', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="optimized">Clear, recognizable, branded</option>
                          <option value="needs_improvement">Blurry, hard to read, unbranded</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClasses}>Name Field SEO</label>
                        <input
                          type="text"
                          placeholder="e.g. Uses keywords instead of just brand name"
                          className={inputClasses}
                          value={data.instagram?.nameFieldSeo || ''}
                          onChange={e => handleInputChange('instagram', 'nameFieldSeo', e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className={labelClasses}>Bio Formatting & Value Prop</label>
                        <textarea
                          placeholder="e.g. Clear bullet points, strong hook, obvious value..."
                          className={`${inputClasses} min-h-[60px]`}
                          value={data.instagram?.bioFormatting || ''}
                          onChange={e => handleInputChange('instagram', 'bioFormatting', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>Link-in-Bio Tool</label>
                        <select
                          className={inputClasses}
                          value={data.instagram?.linkInBio || ''}
                          onChange={e => handleInputChange('instagram', 'linkInBio', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="optimized">Using Linktree/StanStore with clear CTAs</option>
                          <option value="single_link">Just a single unoptimized website link</option>
                          <option value="missing">No link provided</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClasses}>Story Highlights Cohesion</label>
                        <select
                          className={inputClasses}
                          value={data.instagram?.highlightsCohesion || ''}
                          onChange={e => handleInputChange('instagram', 'highlightsCohesion', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="branded">Custom covers, well-organized</option>
                          <option value="messy">Random covers, cluttered</option>
                          <option value="missing">No highlights used</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 2. Visual Grid & Aesthetics */}
                  <div className="bg-gray-50/30 rounded-lg border border-gray-100 p-5">
                    <h4 className={sectionHeaderClasses}>
                      <span className="bg-gray-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3">2</span>
                      Visual Grid & Aesthetics
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClasses}>Visual Identity / Brand Colors</label>
                        <select
                          className={inputClasses}
                          value={data.instagram?.visualIdentity || ''}
                          onChange={e => handleInputChange('instagram', 'visualIdentity', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="cohesive">Highly cohesive & recognizable</option>
                          <option value="inconsistent">Inconsistent, changing filters/colors</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClasses}>&quot;First 9 Squares&quot; Impression</label>
                        <input
                          type="text"
                          placeholder="e.g. Instantly tells me what they do"
                          className={inputClasses}
                          value={data.instagram?.firstNineImpression || ''}
                          onChange={e => handleInputChange('instagram', 'firstNineImpression', e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className={labelClasses}>Text-to-Image Ratio</label>
                        <input
                          type="text"
                          placeholder="e.g. Too many text graphics, needs more human faces"
                          className={inputClasses}
                          value={data.instagram?.textToImageRatio || ''}
                          onChange={e => handleInputChange('instagram', 'textToImageRatio', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3. Content Strategy & Formats */}
                  <div className="bg-gray-50/30 rounded-lg border border-gray-100 p-5">
                    <h4 className={sectionHeaderClasses}>
                      <span className="bg-gray-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3">3</span>
                      Content Strategy & Formats
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="md:col-span-2 border-l-2 border-blue-200 pl-4 py-1 mt-2 mb-2">
                        <span className="text-sm font-semibold text-gray-700 block mb-3">Format Distribution (Last 30 Days)</span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs text-gray-500 mb-1 font-medium">Reels %</label>
                            <input
                              type="number" min="0" max="100" className={inputClasses} placeholder="0"
                              value={data.instagram?.reelsPercent || ''}
                              onChange={e => handleInputChange('instagram', 'reelsPercent', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 mb-1 font-medium">Carousels %</label>
                            <input
                              type="number" min="0" max="100" className={inputClasses} placeholder="0"
                              value={data.instagram?.carouselsPercent || ''}
                              onChange={e => handleInputChange('instagram', 'carouselsPercent', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 mb-1 font-medium">Single Images %</label>
                            <input
                              type="number" min="0" max="100" className={inputClasses} placeholder="0"
                              value={data.instagram?.imagesPercent || ''}
                              onChange={e => handleInputChange('instagram', 'imagesPercent', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className={labelClasses}>Carousel Depth & Value</label>
                        <select
                          className={inputClasses}
                          value={data.instagram?.carouselDepth || ''}
                          onChange={e => handleInputChange('instagram', 'carouselDepth', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="high">Educational, highly savable</option>
                          <option value="low">Superficial, low value</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClasses}>Reels Hook & Pacing</label>
                        <input
                          type="text"
                          placeholder="e.g. Strong 3s hooks, good editing"
                          className={inputClasses}
                          value={data.instagram?.reelsPacing || ''}
                          onChange={e => handleInputChange('instagram', 'reelsPacing', e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className={labelClasses}>Stories Strategy (Daily Usage)</label>
                        <select
                          className={inputClasses}
                          value={data.instagram?.storiesStrategy || ''}
                          onChange={e => handleInputChange('instagram', 'storiesStrategy', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="active">Daily, uses polls/stickers, builds connection</option>
                          <option value="inconsistent">Inconsistent, just reposts feed</option>
                          <option value="absent">Rarely uses Stories</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 4. Engagement & Community */}
                  <div className="bg-gray-50/30 rounded-lg border border-gray-100 p-5">
                    <h4 className={sectionHeaderClasses}>
                      <span className="bg-gray-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3">4</span>
                      Engagement & Community
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClasses}>Comment Response Rate</label>
                        <select
                          className={inputClasses}
                          value={data.instagram?.commentResponse || ''}
                          onChange={e => handleInputChange('instagram', 'commentResponse', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="excellent">Replies to almost everything</option>
                          <option value="poor">Ignores comments</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClasses}>Proactive Outbound Engagement</label>
                        <select
                          className={inputClasses}
                          value={data.instagram?.outboundEngagement || ''}
                          onChange={e => handleInputChange('instagram', 'outboundEngagement', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="active">Commenting on Ideal Client/Peer posts</option>
                          <option value="inactive">Post & Ghost behavior</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className={labelClasses}>DM Automation (ManyChat) Usage</label>
                        <input
                          type="text"
                          placeholder="e.g. Using 'Comment X for Link' workflow"
                          className={inputClasses}
                          value={data.instagram?.dmAutomation || ''}
                          onChange={e => handleInputChange('instagram', 'dmAutomation', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 5. Hashtag & Discoverability */}
                  <div className="bg-gray-50/30 rounded-lg border border-gray-100 p-5">
                    <h4 className={sectionHeaderClasses}>
                      <span className="bg-gray-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3">5</span>
                      Hashtag & Discoverability
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClasses}>SEO Keyword Usage in Captions</label>
                        <input
                          type="text"
                          placeholder="e.g. Good native SEO vs just emojis"
                          className={inputClasses}
                          value={data.instagram?.seoKeywords || ''}
                          onChange={e => handleInputChange('instagram', 'seoKeywords', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>Location Tagging</label>
                        <select
                          className={inputClasses}
                          value={data.instagram?.locationTagging || ''}
                          onChange={e => handleInputChange('instagram', 'locationTagging', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="consistent">Consistently tags relevant locations</option>
                          <option value="inconsistent">Missed opportunity</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className={labelClasses}>Hashtag Strategy (Relevance & Volume)</label>
                        <textarea
                          placeholder="e.g. Using 3-5 hyper-relevant tags vs 30 spammy tags..."
                          className={`${inputClasses} min-h-[60px]`}
                          value={data.instagram?.hashtagStrategy || ''}
                          onChange={e => handleInputChange('instagram', 'hashtagStrategy', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 6. Growth & Analytics */}
                  <div className="bg-gray-50/30 rounded-lg border border-gray-100 p-5">
                    <h4 className={sectionHeaderClasses}>
                      <span className="bg-gray-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3">6</span>
                      Growth & Analytics
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClasses}>Reach vs Engagement Ratio</label>
                        <input
                          type="text"
                          placeholder="e.g. High reach via Reels, low core engagement"
                          className={inputClasses}
                          value={data.instagram?.reachVsEngagement || ''}
                          onChange={e => handleInputChange('instagram', 'reachVsEngagement', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>Follower Growth Velocity</label>
                        <select
                          className={inputClasses}
                          value={data.instagram?.growthVelocity || ''}
                          onChange={e => handleInputChange('instagram', 'growthVelocity', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="growing">Positive upward trend</option>
                          <option value="stagnant">Stagnant / Plateau</option>
                          <option value="declining">Losing followers</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className={labelClasses}>Conversion / Traffic Generation</label>
                        <input
                          type="text"
                          placeholder="e.g. Is the audience actually clicking the link in bio?"
                          className={inputClasses}
                          value={data.instagram?.trafficGeneration || ''}
                          onChange={e => handleInputChange('instagram', 'trafficGeneration', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClasses}>Profile URL</label>
                    <input
                      type="url"
                      placeholder="https://"
                      className={inputClasses}
                      value={data[platformId]?.profileUrl || ''}
                      onChange={e => handleInputChange(platformId, 'profileUrl', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Follower Count</label>
                    <input
                      type="number"
                      placeholder="e.g. 5000"
                      className={inputClasses}
                      value={data[platformId]?.followerCount || ''}
                      onChange={e => handleInputChange(platformId, 'followerCount', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Average Engagement Rate (%)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="e.g. 3.5"
                      className={inputClasses}
                      value={data[platformId]?.engagementRate || ''}
                      onChange={e => handleInputChange(platformId, 'engagementRate', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Post Frequency (Per Week)</label>
                    <input
                      type="number"
                      min="0"
                      placeholder="e.g. 4"
                      className={inputClasses}
                      value={data[platformId]?.postFrequency || ''}
                      onChange={e => handleInputChange(platformId, 'postFrequency', e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          </details>
        );
      })}
    </div>
  );
}
