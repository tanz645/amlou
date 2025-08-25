import React from 'react';
import { DevicePhoneMobileIcon } from '@heroicons/react/24/outline';

interface MobileTabProps {
  data: Record<string, string>;
  onDataUpdate: (data: Record<string, string>) => void;
}

export default function MobileTab({ data, onDataUpdate }: MobileTabProps) {
  const handleInputChange = (field: string, value: string) => {
    onDataUpdate({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="space-y-8">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <DevicePhoneMobileIcon className="w-5 h-5 mr-2 text-pink-600" />
          Mobile App Performance Audit
        </h3>
        
        <div className="space-y-6">
          {/* Basic Info */}
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Basic Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">App Name</label>
                <input type="text" value={data.appName || ''} onChange={e => handleInputChange('appName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="App name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                <select value={data.platform || ''} onChange={e => handleInputChange('platform', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="">Select platform</option>
                  <option value="ios">iOS</option>
                  <option value="android">Android</option>
                  <option value="both">Both</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">App Version</label>
                <input type="text" value={data.appVersion || ''} onChange={e => handleInputChange('appVersion', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="1.0.0" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bundle ID</label>
                <input type="text" value={data.bundleId || ''} onChange={e => handleInputChange('bundleId', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="com.example.app" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Developer Account</label>
                <input type="text" value={data.developerAccount || ''} onChange={e => handleInputChange('developerAccount', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Developer name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Release Date</label>
                <input type="date" value={data.releaseDate || ''} onChange={e => handleInputChange('releaseDate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
            </div>
          </div>

          {/* Technical Performance */}
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Technical Performance</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">App Size (MB)</label>
                <input type="number" step="0.1" value={data.appSize || ''} onChange={e => handleInputChange('appSize', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.0" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Startup Time (seconds)</label>
                <input type="number" step="0.1" value={data.startupTime || ''} onChange={e => handleInputChange('startupTime', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.0" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Memory Usage (MB)</label>
                <input type="number" step="0.1" value={data.memoryUsage || ''} onChange={e => handleInputChange('memoryUsage', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.0" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Battery Drain (%/hour)</label>
                <input type="number" step="0.1" value={data.batteryDrain || ''} onChange={e => handleInputChange('batteryDrain', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.0" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Network Usage (MB/session)</label>
                <input type="number" step="0.1" value={data.networkUsage || ''} onChange={e => handleInputChange('networkUsage', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.0" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Crash Rate (%)</label>
                <input type="number" step="0.01" value={data.crashRate || ''} onChange={e => handleInputChange('crashRate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Freeze Rate (%)</label>
                <input type="number" step="0.01" value={data.freezeRate || ''} onChange={e => handleInputChange('freezeRate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">API Response Time (ms)</label>
                <input type="number" value={data.apiResponseTime || ''} onChange={e => handleInputChange('apiResponseTime', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Offline Functionality</label>
                <select value={data.offlineFunctionality || ''} onChange={e => handleInputChange('offlineFunctionality', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="">Select</option>
                  <option value="full">Full</option>
                  <option value="partial">Partial</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
          </div>

          {/* User Experience */}
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">User Experience</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">UI Design Score (0-100)</label>
                <input type="number" min="0" max="100" value={data.uiDesignScore || ''} onChange={e => handleInputChange('uiDesignScore', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Navigation Ease</label>
                <select value={data.navigationEase || ''} onChange={e => handleInputChange('navigationEase', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="">Select</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="average">Average</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Onboarding Flow</label>
                <select value={data.onboardingFlow || ''} onChange={e => handleInputChange('onboardingFlow', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="">Select</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="average">Average</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Accessibility Score (0-100)</label>
                <input type="number" min="0" max="100" value={data.accessibilityScore || ''} onChange={e => handleInputChange('accessibilityScore', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dark Mode Support</label>
                <select value={data.darkModeSupport || ''} onChange={e => handleInputChange('darkModeSupport', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gesture Support</label>
                <select value={data.gestureSupport || ''} onChange={e => handleInputChange('gestureSupport', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="">Select</option>
                  <option value="comprehensive">Comprehensive</option>
                  <option value="basic">Basic</option>
                  <option value="none">None</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Haptic Feedback</label>
                <select value={data.hapticFeedback || ''} onChange={e => handleInputChange('hapticFeedback', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loading States</label>
                <select value={data.loadingStates || ''} onChange={e => handleInputChange('loadingStates', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="">Select</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="average">Average</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
            </div>
          </div>

          {/* Analytics & Engagement */}
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Analytics & Engagement</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Downloads</label>
                <input type="number" value={data.downloads || ''} onChange={e => handleInputChange('downloads', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Active Users</label>
                <input type="number" value={data.activeUsers || ''} onChange={e => handleInputChange('activeUsers', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Daily Active Users</label>
                <input type="number" value={data.dailyActiveUsers || ''} onChange={e => handleInputChange('dailyActiveUsers', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Active Users</label>
                <input type="number" value={data.monthlyActiveUsers || ''} onChange={e => handleInputChange('monthlyActiveUsers', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Retention Rate (%)</label>
                <input type="number" step="0.01" value={data.retentionRate || ''} onChange={e => handleInputChange('retentionRate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Duration (minutes)</label>
                <input type="number" step="0.1" value={data.sessionDuration || ''} onChange={e => handleInputChange('sessionDuration', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.0" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sessions Per User</label>
                <input type="number" step="0.01" value={data.sessionsPerUser || ''} onChange={e => handleInputChange('sessionsPerUser', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Screen Time (minutes/day)</label>
                <input type="number" step="0.1" value={data.screenTime || ''} onChange={e => handleInputChange('screenTime', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.0" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Feature Usage Analysis</label>
              <textarea rows={3} value={data.featureUsage || ''} onChange={e => handleInputChange('featureUsage', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Most/least used features, feature adoption rates..." />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">User Journey Analysis</label>
              <textarea rows={3} value={data.userJourney || ''} onChange={e => handleInputChange('userJourney', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="User flow analysis, drop-off points, conversion paths..." />
            </div>
          </div>

          {/* App Store Performance */}
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">App Store Performance</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">App Store Rating</label>
                <input type="number" step="0.1" min="0" max="5" value={data.appStoreRating || ''} onChange={e => handleInputChange('appStoreRating', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.0-5.0" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Review Count</label>
                <input type="number" value={data.reviewCount || ''} onChange={e => handleInputChange('reviewCount', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating Distribution</label>
                <input type="text" value={data.ratingDistribution || ''} onChange={e => handleInputChange('ratingDistribution', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="5★: 60%, 4★: 25%, 3★: 10%, 2★: 3%, 1★: 2%" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Keyword Rankings</label>
                <input type="text" value={data.keywordRankings || ''} onChange={e => handleInputChange('keywordRankings', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Top keywords and rankings" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category Ranking</label>
                <input type="number" value={data.categoryRanking || ''} onChange={e => handleInputChange('categoryRanking', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Visibility</label>
                <select value={data.searchVisibility || ''} onChange={e => handleInputChange('searchVisibility', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="">Select</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Conversion Rate (%)</label>
                <input type="number" step="0.01" value={data.conversionRate || ''} onChange={e => handleInputChange('conversionRate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Uninstall Rate (%)</label>
                <input type="number" step="0.01" value={data.uninstallRate || ''} onChange={e => handleInputChange('uninstallRate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
              </div>
            </div>
          </div>

          {/* Monetization */}
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Monetization</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monetization Model</label>
                <select value={data.monetizationModel || ''} onChange={e => handleInputChange('monetizationModel', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="">Select</option>
                  <option value="freemium">Freemium</option>
                  <option value="subscription">Subscription</option>
                  <option value="in-app-purchases">In-App Purchases</option>
                  <option value="advertising">Advertising</option>
                  <option value="paid">Paid</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Revenue ($)</label>
                <input type="number" step="0.01" value={data.revenue || ''} onChange={e => handleInputChange('revenue', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ARPU ($)</label>
                <input type="number" step="0.01" value={data.arpu || ''} onChange={e => handleInputChange('arpu', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">LTV ($)</label>
                <input type="number" step="0.01" value={data.ltv || ''} onChange={e => handleInputChange('ltv', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Conversion Funnel (%)</label>
                <input type="text" value={data.conversionFunnel || ''} onChange={e => handleInputChange('conversionFunnel', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g. 100% → 50% → 25% → 10%" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">In-App Purchase Rate (%)</label>
                <input type="number" step="0.01" value={data.inAppPurchases || ''} onChange={e => handleInputChange('inAppPurchases', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subscription Rate (%)</label>
                <input type="number" step="0.01" value={data.subscriptionRate || ''} onChange={e => handleInputChange('subscriptionRate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ad Revenue ($)</label>
                <input type="number" step="0.01" value={data.adRevenue || ''} onChange={e => handleInputChange('adRevenue', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
              </div>
            </div>
          </div>

          {/* Security & Compliance */}
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Security & Compliance</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data Encryption</label>
                <select value={data.dataEncryption || ''} onChange={e => handleInputChange('dataEncryption', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="">Select</option>
                  <option value="end-to-end">End-to-End</option>
                  <option value="transport">Transport</option>
                  <option value="at-rest">At Rest</option>
                  <option value="none">None</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Privacy Compliance</label>
                <select value={data.privacyCompliance || ''} onChange={e => handleInputChange('privacyCompliance', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="">Select</option>
                  <option value="compliant">Compliant</option>
                  <option value="partial">Partial</option>
                  <option value="non-compliant">Non-Compliant</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GDPR Compliance</label>
                <select value={data.gdprCompliance || ''} onChange={e => handleInputChange('gdprCompliance', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="">Select</option>
                  <option value="compliant">Compliant</option>
                  <option value="partial">Partial</option>
                  <option value="non-compliant">Non-Compliant</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Security Audit Status</label>
                <select value={data.securityAudit || ''} onChange={e => handleInputChange('securityAudit', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="">Select</option>
                  <option value="passed">Passed</option>
                  <option value="failed">Failed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vulnerability Scan</label>
                <select value={data.vulnerabilityScan || ''} onChange={e => handleInputChange('vulnerabilityScan', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="">Select</option>
                  <option value="clean">Clean</option>
                  <option value="minor-issues">Minor Issues</option>
                  <option value="major-issues">Major Issues</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Pinning</label>
                <select value={data.certificatePinning || ''} onChange={e => handleInputChange('certificatePinning', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="">Select</option>
                  <option value="implemented">Implemented</option>
                  <option value="not-implemented">Not Implemented</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Biometric Authentication</label>
                <select value={data.biometricAuth || ''} onChange={e => handleInputChange('biometricAuth', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="">Select</option>
                  <option value="available">Available</option>
                  <option value="not-available">Not Available</option>
                </select>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Performance Metrics</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Performance Score (0-100)</label>
                <input type="number" min="0" max="100" value={data.performanceScore || ''} onChange={e => handleInputChange('performanceScore', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Core Metrics</label>
                <input type="text" value={data.coreMetrics || ''} onChange={e => handleInputChange('coreMetrics', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="FPS, memory usage, battery efficiency" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Battery Optimization</label>
                <select value={data.batteryOptimization || ''} onChange={e => handleInputChange('batteryOptimization', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="">Select</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="average">Average</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Storage Efficiency</label>
                <select value={data.storageEfficiency || ''} onChange={e => handleInputChange('storageEfficiency', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="">Select</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="average">Average</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Network Optimization</label>
                <select value={data.networkOptimization || ''} onChange={e => handleInputChange('networkOptimization', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="">Select</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="average">Average</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cache Strategy</label>
                <select value={data.cacheStrategy || ''} onChange={e => handleInputChange('cacheStrategy', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="">Select</option>
                  <option value="aggressive">Aggressive</option>
                  <option value="moderate">Moderate</option>
                  <option value="minimal">Minimal</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
          </div>

          {/* Push Notifications */}
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Push Notifications</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Push Enabled</label>
                <select value={data.pushEnabled || ''} onChange={e => handleInputChange('pushEnabled', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Opt-in Rate (%)</label>
                <input type="number" step="0.01" value={data.optInRate || ''} onChange={e => handleInputChange('optInRate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Rate (%)</label>
                <input type="number" step="0.01" value={data.deliveryRate || ''} onChange={e => handleInputChange('deliveryRate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Open Rate (%)</label>
                <input type="number" step="0.01" value={data.openRate || ''} onChange={e => handleInputChange('openRate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Notification Strategy</label>
              <textarea rows={3} value={data.notificationStrategy || ''} onChange={e => handleInputChange('notificationStrategy', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Types of notifications, frequency, targeting strategy..." />
            </div>
          </div>

          {/* In-App Features */}
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">In-App Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Core Features</label>
                <input type="text" value={data.coreFeatures || ''} onChange={e => handleInputChange('coreFeatures', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="List of core app features" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Feature Adoption Rate (%)</label>
                <input type="number" step="0.01" value={data.featureAdoption || ''} onChange={e => handleInputChange('featureAdoption', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">User Feedback</label>
              <textarea rows={3} value={data.userFeedback || ''} onChange={e => handleInputChange('userFeedback', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Common user feedback, pain points, feature requests..." />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Bug Reports</label>
              <textarea rows={3} value={data.bugReports || ''} onChange={e => handleInputChange('bugReports', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Common bugs, crash reports, technical issues..." />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Feature Requests</label>
              <textarea rows={3} value={data.featureRequests || ''} onChange={e => handleInputChange('featureRequests', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Most requested features, user suggestions..." />
            </div>
          </div>

          {/* Crash Analytics */}
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Crash Analytics</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Crash Frequency</label>
                <select value={data.crashFrequency || ''} onChange={e => handleInputChange('crashFrequency', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="">Select</option>
                  <option value="rare">Rare</option>
                  <option value="occasional">Occasional</option>
                  <option value="frequent">Frequent</option>
                  <option value="very-frequent">Very Frequent</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Crash Types</label>
                <input type="text" value={data.crashTypes || ''} onChange={e => handleInputChange('crashTypes', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Types of crashes encountered" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Affected Devices</label>
                <input type="text" value={data.affectedDevices || ''} onChange={e => handleInputChange('affectedDevices', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Devices most affected by crashes" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Crash Resolution</label>
                <select value={data.crashResolution || ''} onChange={e => handleInputChange('crashResolution', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="">Select</option>
                  <option value="resolved">Resolved</option>
                  <option value="in-progress">In Progress</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Recommendations</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile App Performance Recommendations</label>
              <textarea rows={6} value={data.recommendations || ''} onChange={e => handleInputChange('recommendations', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Comprehensive recommendations for improving mobile app performance, user experience, monetization, and technical aspects..." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 