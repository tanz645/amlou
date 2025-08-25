import React, { useState } from 'react';

const initialState = {
  platform: '',
  // General Info
  pageName: '',
  pageUrl: '',
  pageCategory: '',
  verificationStatus: '',
  // Profile Info Comments
  profilePictureComment: '',
  coverPhotoComment: '',
  descriptionComment: '',
  otherProfileInfo: '',
  // Audience
  followers: '',
  audienceDemographics: '',
  audienceGrowth: '',
  // Content & Posting
  avgPostsPerWeek: '',
  contentTypes: '',
  bestContent: '',
  bestTimes: '',
  // Engagement
  engagementRate: '',
  avgReach: '',
  engagementActions: '',
  negativeFeedback: '',
  // Recommendations
  keyIssues: '',
  quickWins: '',
  recommendations: '',
  otherNotes: '',
};

const CATEGORY_OPTIONS = [
  'Brand', 'Personal', 'News', 'Entertainment', 'Nonprofit', 'Other'
];
const AUDIENCE_GROWTH_OPTIONS = [
  'Declining', 'Stable', 'Growing', 'Rapidly Growing'
];
const CONTENT_TYPE_OPTIONS = [
  'Video', 'Image', 'Link', 'Story', 'Reel', 'Text', 'Live', 'Poll', 'Other'
];
const ENGAGEMENT_ACTIONS_OPTIONS = [
  'Likes', 'Comments', 'Shares', 'Saves', 'Clicks', 'Other'
];
const NEGATIVE_FEEDBACK_OPTIONS = [
  'Hides', 'Unlikes', 'Reports', 'Spam', 'Other'
];

interface BaseSocialAuditFormProps {
  platform: string;
}

export const BaseSocialAuditForm: React.FC<BaseSocialAuditFormProps> = ({ platform }) => {
  const [form, setForm] = useState({ ...initialState, platform });
  const [contentTypesUsed, setContentTypesUsed] = useState<string[]>([]);
  const [engagementActions, setEngagementActions] = useState<string[]>([]);
  const [negativeFeedback, setNegativeFeedback] = useState<string[]>([]);
  const [profilePicture, setProfilePicture] = useState('');
  const [coverPhoto, setCoverPhoto] = useState('');
  const [description, setDescription] = useState('');

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  const handleMultiCheckbox = (state: string[], setState: (v: string[]) => void, value: string) => {
    if (state.includes(value)) {
      setState(state.filter((v) => v !== value));
    } else {
      setState([...state, value]);
    }
  };

  if (!platform) return null;

  return (
    <form className="space-y-8">
      {/* Page/Profile Information section for all platforms */}
      <section className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-gray-800 mb-4 text-lg">Page/Profile Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Page/Profile Name</label>
            <input type="text" value={form.pageName} onChange={e => handleChange('pageName', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Page/Profile URL</label>
            <input type="text" value={form.pageUrl} onChange={e => handleChange('pageUrl', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select value={form.pageCategory} onChange={e => handleChange('pageCategory', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-sm">
              <option value="">Select</option>
              {CATEGORY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Verification Status</label>
            <select value={form.verificationStatus} onChange={e => handleChange('verificationStatus', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-sm">
              <option value="">Select</option>
              <option value="verified">Verified</option>
              <option value="not_verified">Not Verified</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
            <select value={profilePicture} onChange={e => setProfilePicture(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-sm">
              <option value="">Select</option>
              <option value="present">Present</option>
              <option value="missing">Missing</option>
            </select>
            <textarea value={form.profilePictureComment || ''} onChange={e => handleChange('profilePictureComment', e.target.value)} className="w-full mt-2 px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-sm" placeholder="Comments on profile picture quality, branding, etc." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Photo</label>
            <select value={coverPhoto} onChange={e => setCoverPhoto(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-sm">
              <option value="">Select</option>
              <option value="present">Present</option>
              <option value="missing">Missing</option>
            </select>
            <textarea value={form.coverPhotoComment || ''} onChange={e => handleChange('coverPhotoComment', e.target.value)} className="w-full mt-2 px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-sm" placeholder="Comments on cover photo quality, branding, etc." />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description / Bio</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-sm" placeholder="Enter page description or bio" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Other Important Info (optional)</label>
            <textarea value={form.otherProfileInfo || ''} onChange={e => handleChange('otherProfileInfo', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-sm" placeholder="Any other important profile information or comments" />
          </div>
        </div>
      </section>
      {/* Audience & Demographics */}
      <section className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-green-800 mb-4 text-lg">Audience & Demographics</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Followers</label>
            <input type="number" value={form.followers} onChange={e => handleChange('followers', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Audience Demographics</label>
            <textarea rows={2} value={form.audienceDemographics} onChange={e => handleChange('audienceDemographics', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="Age, gender, location, etc." />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Audience Growth Rate</label>
            <select value={form.audienceGrowth} onChange={e => handleChange('audienceGrowth', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm">
              <option value="">Select</option>
              {AUDIENCE_GROWTH_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>
      </section>
      {/* Content & Posting */}
      <section className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-green-800 mb-4 text-lg">Content & Posting</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Average Posts per Week</label>
            <input type="number" value={form.avgPostsPerWeek} onChange={e => handleChange('avgPostsPerWeek', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content Types Used</label>
            <div className="flex flex-wrap gap-2">
              {CONTENT_TYPE_OPTIONS.map(opt => (
                <label key={opt} className="flex items-center gap-1 text-xs bg-green-100 px-2 py-1 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={contentTypesUsed.includes(opt)}
                    onChange={() => handleMultiCheckbox(contentTypesUsed, setContentTypesUsed, opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Best Performing Content</label>
            <textarea rows={2} value={form.bestContent} onChange={e => handleChange('bestContent', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="Describe/link top posts" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Best Posting Times</label>
            <input type="text" value={form.bestTimes} onChange={e => handleChange('bestTimes', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" placeholder="e.g. Wed 8pm, Sat 10am" />
          </div>
        </div>
      </section>
      {/* Engagement Metrics */}
      <section className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-green-800 mb-4 text-lg">Engagement Metrics</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Average Engagement Rate (%)</label>
            <input type="number" step="0.01" value={form.engagementRate} onChange={e => handleChange('engagementRate', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Average Reach</label>
            <input type="number" value={form.avgReach} onChange={e => handleChange('avgReach', e.target.value)} className="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Top Engagement Actions</label>
            <div className="flex flex-wrap gap-2">
              {ENGAGEMENT_ACTIONS_OPTIONS.map(opt => (
                <label key={opt} className="flex items-center gap-1 text-xs bg-green-100 px-2 py-1 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={engagementActions.includes(opt)}
                    onChange={() => handleMultiCheckbox(engagementActions, setEngagementActions, opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Negative Feedback</label>
            <div className="flex flex-wrap gap-2">
              {NEGATIVE_FEEDBACK_OPTIONS.map(opt => (
                <label key={opt} className="flex items-center gap-1 text-xs bg-green-100 px-2 py-1 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={negativeFeedback.includes(opt)}
                    onChange={() => handleMultiCheckbox(negativeFeedback, setNegativeFeedback, opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Recommendations & Next Steps */}
      <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-yellow-800 mb-4 text-lg">Recommendations & Next Steps</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Key Issues Identified</label>
            <textarea rows={2} value={form.keyIssues} onChange={e => handleChange('keyIssues', e.target.value)} className="w-full px-3 py-2 border border-yellow-200 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quick Wins</label>
            <textarea rows={2} value={form.quickWins} onChange={e => handleChange('quickWins', e.target.value)} className="w-full px-3 py-2 border border-yellow-200 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Strategic Recommendations</label>
            <textarea rows={2} value={form.recommendations} onChange={e => handleChange('recommendations', e.target.value)} className="w-full px-3 py-2 border border-yellow-200 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Other Notes</label>
            <textarea rows={2} value={form.otherNotes} onChange={e => handleChange('otherNotes', e.target.value)} className="w-full px-3 py-2 border border-yellow-200 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm" />
          </div>
        </div>
      </section>
    </form>
  );
}; 