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
  data: Record<string, Record<string, string>>;
  onDataUpdate: (data: Record<string, Record<string, string>>) => void;
}

export default function SocialTab({ data, onDataUpdate }: SocialTabProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const handleInputChange = (platform: string, field: string, value: string) => {
    onDataUpdate({
      ...data,
      [platform]: {
        ...data[platform],
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-8">
      <AuditPlatformSelector 
        platforms={socialPlatforms} 
        onChange={setSelectedPlatforms} 
      />
      
      {selectedPlatforms.includes('general') && (
        <details className="bg-white border border-gray-200 rounded-lg group" open>
          <summary className="p-6 cursor-pointer list-none flex justify-between items-center outline-none [&::-webkit-details-marker]:hidden">
            <h3 className="text-lg font-semibold text-gray-900">General Social Media Audit</h3>
            <ChevronDownIcon className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform duration-200" />
          </summary>
          <div className="p-6 pt-0 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Followers Across All Platforms</label>
                <input
                  type="number"
                  className="w-full border rounded p-2"
                  value={data.general?.totalFollowers || ''}
                  onChange={e => handleInputChange('general', 'totalFollowers', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Real Followers Percentage (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="e.g. 85"
                  className="w-full border rounded p-2"
                  value={data.general?.realFollowersPercentage || ''}
                  onChange={e => handleInputChange('general', 'realFollowersPercentage', e.target.value)}
                />
              </div>
            </div>
          </div>
        </details>
      )}

      {selectedPlatforms.map(platformId => {
        if (platformId === 'general') return null;
        
        const platform = socialPlatforms.find(p => p.id === platformId);
        
        return (
          <details key={platformId} className="bg-white border border-gray-200 rounded-lg group" open>
            <summary className="p-6 cursor-pointer list-none flex justify-between items-center outline-none [&::-webkit-details-marker]:hidden">
              <h3 className="text-lg font-semibold text-gray-900">{platform?.name} Audit</h3>
              <ChevronDownIcon className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform duration-200" />
            </summary>
              {platformId === 'facebook' ? (
                <div className="space-y-8">
                  {/* 1. Foundation & Visual Branding */}
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3 border-b pb-2">1. Foundation & Visual Branding</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Digital Storefront Check</label>
                        <select
                          className="w-full border rounded p-2 text-sm"
                          value={data.facebook?.storefrontCheck || ''}
                          onChange={e => handleInputChange('facebook', 'storefrontCheck', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="pass">Pass (Professional in &lt;3s)</option>
                          <option value="fail">Fail (Needs improvement)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Branding Consistency</label>
                        <select
                          className="w-full border rounded p-2 text-sm"
                          value={data.facebook?.brandingConsistency || ''}
                          onChange={e => handleInputChange('facebook', 'brandingConsistency', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="consistent">Consistent Logo & Cover</option>
                          <option value="inconsistent">Inconsistent / Mismatched</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cover Photo Optimization</label>
                        <select
                          className="w-full border rounded p-2 text-sm"
                          value={data.facebook?.coverOptimization || ''}
                          onChange={e => handleInputChange('facebook', 'coverOptimization', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="optimized">Desktop & Mobile Optimized</option>
                          <option value="cutoff">Text/Faces Cut Off</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cover Media Type</label>
                        <select
                          className="w-full border rounded p-2 text-sm"
                          value={data.facebook?.coverMediaType || ''}
                          onChange={e => handleInputChange('facebook', 'coverMediaType', e.target.value)}
                        >
                          <option value="">Select type...</option>
                          <option value="video">High-engagement Video/Slideshow</option>
                          <option value="static">Static Image</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Action Button (CTA)</label>
                        <input
                          type="text"
                          placeholder="e.g. Active, linked to Shop"
                          className="w-full border rounded p-2 text-sm"
                          value={data.facebook?.actionButton || ''}
                          onChange={e => handleInputChange('facebook', 'actionButton', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pinned Post Status</label>
                        <input
                          type="text"
                          placeholder="e.g. Welcome offer, 2 months old"
                          className="w-full border rounded p-2 text-sm"
                          value={data.facebook?.pinnedPost || ''}
                          onChange={e => handleInputChange('facebook', 'pinnedPost', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 2. Information & SEO Audit */}
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3 border-b pb-2">2. Information & SEO Audit</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username (Handle) Quality</label>
                        <input
                          type="text"
                          placeholder="e.g. Clean & consistent"
                          className="w-full border rounded p-2 text-sm"
                          value={data.facebook?.usernameQuality || ''}
                          onChange={e => handleInputChange('facebook', 'usernameQuality', e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">About Section (SEO & Value Prop)</label>
                        <textarea
                          placeholder="Analysis of keywords and value proposition..."
                          className="w-full border rounded p-2 text-sm h-20"
                          value={data.facebook?.aboutSection || ''}
                          onChange={e => handleInputChange('facebook', 'aboutSection', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Accuracy</label>
                        <select
                          className="w-full border rounded p-2 text-sm"
                          value={data.facebook?.contactAccuracy || ''}
                          onChange={e => handleInputChange('facebook', 'contactAccuracy', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="verified">Verified & Clickable</option>
                          <option value="issues">Missing or Broken</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Services/Shop Setup</label>
                        <select
                          className="w-full border rounded p-2 text-sm"
                          value={data.facebook?.servicesSetup || ''}
                          onChange={e => handleInputChange('facebook', 'servicesSetup', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="complete">Fully setup & synced</option>
                          <option value="incomplete">Incomplete / Missing</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Page Transparency & Linked Accounts</label>
                        <input
                          type="text"
                          placeholder="e.g. Clear, IG/WhatsApp connected correctly"
                          className="w-full border rounded p-2 text-sm"
                          value={data.facebook?.transparencyLinks || ''}
                          onChange={e => handleInputChange('facebook', 'transparencyLinks', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3. Content Strategy & Quality */}
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3 border-b pb-2">3. Content Strategy & Quality</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Content Mix (Value vs Promo)</label>
                        <input
                          type="text"
                          placeholder="e.g. 70/30 - Needs more educational value"
                          className="w-full border rounded p-2 text-sm"
                          value={data.facebook?.contentMix || ''}
                          onChange={e => handleInputChange('facebook', 'contentMix', e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2 text-sm font-medium text-gray-700">Format Diversity (Last 30 Days %)</div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Reels %</label>
                        <input
                          type="number" min="0" max="100"
                          className="w-full border rounded p-2 text-sm"
                          value={data.facebook?.reelsPercent || ''}
                          onChange={e => handleInputChange('facebook', 'reelsPercent', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Carousels / Single Images %</label>
                        <input
                          type="number" min="0" max="100"
                          className="w-full border rounded p-2 text-sm"
                          value={data.facebook?.imagesPercent || ''}
                          onChange={e => handleInputChange('facebook', 'imagesPercent', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Visual & Video Quality</label>
                        <select
                          className="w-full border rounded p-2 text-sm"
                          value={data.facebook?.visualQuality || ''}
                          onChange={e => handleInputChange('facebook', 'visualQuality', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="high">High-res, videos subtitled</option>
                          <option value="low">Low quality, missing subtitles</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hook & Caption Quality</label>
                        <input
                          type="text"
                          placeholder="e.g. Weak hooks, buried value"
                          className="w-full border rounded p-2 text-sm"
                          value={data.facebook?.hookQuality || ''}
                          onChange={e => handleInputChange('facebook', 'hookQuality', e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Engagement Loops (CTAs in posts)</label>
                        <select
                          className="w-full border rounded p-2 text-sm"
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
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3 border-b pb-2">4. Community & Response Management</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Response Time / Badge</label>
                        <input
                          type="text"
                          placeholder="e.g. Very responsive badge active"
                          className="w-full border rounded p-2 text-sm"
                          value={data.facebook?.responseTime || ''}
                          onChange={e => handleInputChange('facebook', 'responseTime', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Comment Interaction</label>
                        <select
                          className="w-full border rounded p-2 text-sm"
                          value={data.facebook?.commentInteraction || ''}
                          onChange={e => handleInputChange('facebook', 'commentInteraction', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="active">Actively likes/replies</option>
                          <option value="ghost">Ghost town</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Review Management</label>
                        <textarea
                          placeholder="Analysis of last 5 reviews and responses..."
                          className="w-full border rounded p-2 text-sm h-20"
                          value={data.facebook?.reviewManagement || ''}
                          onChange={e => handleInputChange('facebook', 'reviewManagement', e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Automated Messaging (Inbox)</label>
                        <input
                          type="text"
                          placeholder="e.g. Instant replies & FAQs setup"
                          className="w-full border rounded p-2 text-sm"
                          value={data.facebook?.automatedMessaging || ''}
                          onChange={e => handleInputChange('facebook', 'automatedMessaging', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 5. Analytics & Performance */}
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3 border-b pb-2">5. Analytics & Performance</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Follower vs. Reach</label>
                        <input
                          type="text"
                          placeholder="e.g. Reach is <5% of followers"
                          className="w-full border rounded p-2 text-sm"
                          value={data.facebook?.followerVsReach || ''}
                          onChange={e => handleInputChange('facebook', 'followerVsReach', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Audience Alignment</label>
                        <select
                          className="w-full border rounded p-2 text-sm"
                          value={data.facebook?.audienceAlignment || ''}
                          onChange={e => handleInputChange('facebook', 'audienceAlignment', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="aligned">Matches paying customer profile</option>
                          <option value="unaligned">Misaligned demographics</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Negative Feedback Spikes</label>
                        <input
                          type="text"
                          placeholder="e.g. High 'Hide Post' on promos"
                          className="w-full border rounded p-2 text-sm"
                          value={data.facebook?.negativeFeedback || ''}
                          onChange={e => handleInputChange('facebook', 'negativeFeedback', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Peak Posting Times</label>
                        <select
                          className="w-full border rounded p-2 text-sm"
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
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3 border-b pb-2">6. Technical Infrastructure & Tracking</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Meta Pixel & API Status</label>
                        <input
                          type="text"
                          placeholder="e.g. Active, CAPI properly set up"
                          className="w-full border rounded p-2 text-sm"
                          value={data.facebook?.pixelStatus || ''}
                          onChange={e => handleInputChange('facebook', 'pixelStatus', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Domain Verification</label>
                        <select
                          className="w-full border rounded p-2 text-sm"
                          value={data.facebook?.domainVerification || ''}
                          onChange={e => handleInputChange('facebook', 'domainVerification', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="verified">Verified in Business Suite</option>
                          <option value="unverified">Unverified / Missing</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Tracking (Standard Events)</label>
                        <select
                          className="w-full border rounded p-2 text-sm"
                          value={data.facebook?.eventTracking || ''}
                          onChange={e => handleInputChange('facebook', 'eventTracking', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="standard">Tracking Lead, Purchase, etc.</option>
                          <option value="pageview">Only Page Views tracked</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ad Account Hygiene (Account Quality)</label>
                        <textarea
                          placeholder="e.g. Clean status, no rejected ads..."
                          className="w-full border rounded p-2 text-sm h-16"
                          value={data.facebook?.accountHygiene || ''}
                          onChange={e => handleInputChange('facebook', 'accountHygiene', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 7. The Competitive "Gap" Analysis */}
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3 border-b pb-2">7. The Competitive &quot;Gap&quot; Analysis</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ad Library Transparency</label>
                        <input
                          type="text"
                          placeholder="e.g. Active varying hooks vs stagnant account"
                          className="w-full border rounded p-2 text-sm"
                          value={data.facebook?.adLibrary || ''}
                          onChange={e => handleInputChange('facebook', 'adLibrary', e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Creative Comparison vs Top 3 Competitors</label>
                        <textarea
                          placeholder="Production quality, lighting, sound compared to competitors..."
                          className="w-full border rounded p-2 text-sm h-20"
                          value={data.facebook?.creativeComparison || ''}
                          onChange={e => handleInputChange('facebook', 'creativeComparison', e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Offer Differentiation (UVP)</label>
                        <input
                          type="text"
                          placeholder="e.g. Superior lead magnet clearly presented"
                          className="w-full border rounded p-2 text-sm"
                          value={data.facebook?.offerDifferentiation || ''}
                          onChange={e => handleInputChange('facebook', 'offerDifferentiation', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 8. Retention & Funnel Logic */}
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3 border-b pb-2">8. Retention & Funnel Logic</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Retention Rate</label>
                        <input
                          type="text"
                          placeholder="e.g. High Returning Viewers"
                          className="w-full border rounded p-2 text-sm"
                          value={data.facebook?.retentionRate || ''}
                          onChange={e => handleInputChange('facebook', 'retentionRate', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Click-Through Friction</label>
                        <select
                          className="w-full border rounded p-2 text-sm"
                          value={data.facebook?.clickFriction || ''}
                          onChange={e => handleInputChange('facebook', 'clickFriction', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="seamless">Seamless mobile checkout (1-2 clicks)</option>
                          <option value="high">High friction (&gt;3 clicks)</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Omnichannel Sync (Funnel Consistency)</label>
                        <input
                          type="text"
                          placeholder="e.g. Messaging perfectly aligns with SEO/Website"
                          className="w-full border rounded p-2 text-sm"
                          value={data.facebook?.omnichannelSync || ''}
                          onChange={e => handleInputChange('facebook', 'omnichannelSync', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 9. Growth & Scalability Metrics */}
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3 border-b pb-2">9. Growth & Scalability Metrics</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Content Library Depth</label>
                        <select
                          className="w-full border rounded p-2 text-sm"
                          value={data.facebook?.contentDepth || ''}
                          onChange={e => handleInputChange('facebook', 'contentDepth', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="ready">Ready for long-term PPC (Strong Evergreen)</option>
                          <option value="lacking">Not enough Evergreen content</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Scalability of Engagement</label>
                        <select
                          className="w-full border rounded p-2 text-sm"
                          value={data.facebook?.scalableEngagement || ''}
                          onChange={e => handleInputChange('facebook', 'scalableEngagement', e.target.value)}
                        >
                          <option value="">Select status...</option>
                          <option value="steady">Steady as followers increase</option>
                          <option value="dropping">Dropping as followers increase</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lead Quality</label>
                        <input
                          type="text"
                          placeholder="e.g. 90% Qualified vs Spam"
                          className="w-full border rounded p-2 text-sm"
                          value={data.facebook?.leadQuality || ''}
                          onChange={e => handleInputChange('facebook', 'leadQuality', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Profile URL</label>
                    <input
                      type="url"
                      placeholder="https://"
                      className="w-full border rounded p-2"
                      value={data[platformId]?.profileUrl || ''}
                      onChange={e => handleInputChange(platformId, 'profileUrl', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Follower Count</label>
                    <input
                      type="number"
                      className="w-full border rounded p-2"
                      value={data[platformId]?.followerCount || ''}
                      onChange={e => handleInputChange(platformId, 'followerCount', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Average Engagement Rate (%)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="w-full border rounded p-2"
                      value={data[platformId]?.engagementRate || ''}
                      onChange={e => handleInputChange(platformId, 'engagementRate', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Post Frequency (Per Week)</label>
                    <input
                      type="number"
                      min="0"
                      className="w-full border rounded p-2"
                      value={data[platformId]?.postFrequency || ''}
                      onChange={e => handleInputChange(platformId, 'postFrequency', e.target.value)}
                    />
                  </div>
                </div>
              )}
          </details>
        );
      })}
    </div>
  );
} 