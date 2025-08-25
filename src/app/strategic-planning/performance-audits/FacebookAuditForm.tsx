import React, { useState } from 'react';
import { BaseSocialAuditForm } from './SocialAuditForm';

const FacebookAuditForm: React.FC = () => {
  // Facebook-specific state
  const [pageLikes, setPageLikes] = useState('');
  const [pixelInstalled, setPixelInstalled] = useState('');
  const [pixelEvents, setPixelEvents] = useState('');
  const [pixelHealth, setPixelHealth] = useState('');
  const [adLibraryInsights, setAdLibraryInsights] = useState('');
  const [messengerSetup, setMessengerSetup] = useState('');
  const [reviewsRatings, setReviewsRatings] = useState('');
  const [policyViolations, setPolicyViolations] = useState('');

  return (
    <div>
      <BaseSocialAuditForm platform="facebook" />
      <section className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 mt-6">
        <h4 className="font-semibold text-blue-800 mb-4 text-lg">Facebook-Specific Fields</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Page Likes</label>
            <input type="number" value={pageLikes} onChange={e => setPageLikes(e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pixel Installed?</label>
            <select value={pixelInstalled} onChange={e => setPixelInstalled(e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm">
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pixel Events</label>
            <input type="text" value={pixelEvents} onChange={e => setPixelEvents(e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="e.g. PageView, Lead, Purchase" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pixel Health</label>
            <textarea value={pixelHealth} onChange={e => setPixelHealth(e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Any issues or warnings?" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Ad Library Insights</label>
            <textarea value={adLibraryInsights} onChange={e => setAdLibraryInsights(e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm" placeholder="Insights from Facebook Ad Library" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Messenger Setup</label>
            <select value={messengerSetup} onChange={e => setMessengerSetup(e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm">
              <option value="">Select</option>
              <option value="none">None</option>
              <option value="auto-replies">Auto-replies</option>
              <option value="bots">Bots</option>
              <option value="both">Both</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reviews & Ratings</label>
            <select value={reviewsRatings} onChange={e => setReviewsRatings(e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm">
              <option value="">Select</option>
              <option value="1">1 star</option>
              <option value="2">2 stars</option>
              <option value="3">3 stars</option>
              <option value="4">4 stars</option>
              <option value="5">5 stars</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Policy Violations/Restrictions</label>
            <select value={policyViolations} onChange={e => setPolicyViolations(e.target.value)} className="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm">
              <option value="">Select</option>
              <option value="none">None</option>
              <option value="minor">Minor</option>
              <option value="major">Major</option>
              <option value="account_at_risk">Account at Risk</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FacebookAuditForm; 