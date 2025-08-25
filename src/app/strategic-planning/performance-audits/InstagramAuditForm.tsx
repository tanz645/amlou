import React, { useState } from 'react';
import { BaseSocialAuditForm } from './SocialAuditForm';

const InstagramAuditForm: React.FC = () => {
  // Instagram-specific state
  const [storiesPerformance, setStoriesPerformance] = useState('');
  const [reelsPerformance, setReelsPerformance] = useState('');
  const [shopping, setShopping] = useState('');
  const [hashtagPerformance, setHashtagPerformance] = useState('');
  const [igtv, setIgtv] = useState('');

  return (
    <div>
      <BaseSocialAuditForm platform="instagram" />
      <section className="bg-pink-50 border border-pink-200 rounded-lg p-4 mb-6 mt-6">
        <h4 className="font-semibold text-pink-800 mb-4 text-lg">Instagram-Specific Fields</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stories Performance</label>
            <textarea value={storiesPerformance} onChange={e => setStoriesPerformance(e.target.value)} className="w-full px-3 py-2 border border-pink-200 rounded-md focus:ring-2 focus:ring-pink-400 focus:border-pink-400 text-sm" placeholder="Insights on Instagram Stories" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reels Performance</label>
            <textarea value={reelsPerformance} onChange={e => setReelsPerformance(e.target.value)} className="w-full px-3 py-2 border border-pink-200 rounded-md focus:ring-2 focus:ring-pink-400 focus:border-pink-400 text-sm" placeholder="Insights on Instagram Reels" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shopping</label>
            <select value={shopping} onChange={e => setShopping(e.target.value)} className="w-full px-3 py-2 border border-pink-200 rounded-md focus:ring-2 focus:ring-pink-400 focus:border-pink-400 text-sm">
              <option value="">Select</option>
              <option value="enabled">Enabled</option>
              <option value="not_enabled">Not Enabled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hashtag Performance</label>
            <textarea value={hashtagPerformance} onChange={e => setHashtagPerformance(e.target.value)} className="w-full px-3 py-2 border border-pink-200 rounded-md focus:ring-2 focus:ring-pink-400 focus:border-pink-400 text-sm" placeholder="Insights on hashtags used" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">IGTV</label>
            <select value={igtv} onChange={e => setIgtv(e.target.value)} className="w-full px-3 py-2 border border-pink-200 rounded-md focus:ring-2 focus:ring-pink-400 focus:border-pink-400 text-sm">
              <option value="">Select</option>
              <option value="used">Used</option>
              <option value="not_used">Not Used</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InstagramAuditForm; 