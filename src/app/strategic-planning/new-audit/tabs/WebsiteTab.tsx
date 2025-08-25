import React from 'react';
import { ComputerDesktopIcon } from '@heroicons/react/24/outline';

interface WebsiteTabProps {
  data: Record<string, string>;
  onDataUpdate: (data: Record<string, string>) => void;
}

export default function WebsiteTab({ data, onDataUpdate }: WebsiteTabProps) {
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
          <ComputerDesktopIcon className="w-5 h-5 mr-2 text-indigo-600" />
          Website Performance Audit
        </h3>
        
        <div className="space-y-4">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
              <input type="url" value={data.websiteUrl || ''} onChange={e => handleInputChange('websiteUrl', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="https://example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hosting Provider</label>
              <input type="text" value={data.hostingProvider || ''} onChange={e => handleInputChange('hostingProvider', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g. Vercel, AWS, Bluehost" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CMS/Platform</label>
              <input type="text" value={data.cms || ''} onChange={e => handleInputChange('cms', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g. WordPress, Next.js" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SSL Enabled?</label>
              <select value={data.sslEnabled || ''} onChange={e => handleInputChange('sslEnabled', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          {/* Technical Performance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Page Load Time (s)</label>
              <input type="number" step="0.1" value={data.pageLoadTime || ''} onChange={e => handleInputChange('pageLoadTime', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time to First Byte (ms)</label>
              <input type="number" value={data.ttfb || ''} onChange={e => handleInputChange('ttfb', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Core Web Vitals</label>
              <input type="text" value={data.coreWebVitals || ''} onChange={e => handleInputChange('coreWebVitals', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="LCP, FID, CLS scores" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Uptime (%)</label>
              <input type="number" step="0.01" value={data.uptime || ''} onChange={e => handleInputChange('uptime', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="99.99" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Error Rate (%)</label>
              <input type="number" step="0.01" value={data.errorRate || ''} onChange={e => handleInputChange('errorRate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
          </div>

          {/* User Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Friendly?</label>
              <select value={data.mobileFriendly || ''} onChange={e => handleInputChange('mobileFriendly', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Accessibility Score (0-100)</label>
              <input type="number" min="0" max="100" value={data.accessibilityScore || ''} onChange={e => handleInputChange('accessibilityScore', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0-100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Navigation Ease</label>
              <input type="text" value={data.navigationEase || ''} onChange={e => handleInputChange('navigationEase', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Describe navigation structure" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Design Consistency</label>
              <input type="text" value={data.designConsistency || ''} onChange={e => handleInputChange('designConsistency', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Consistent branding, colors, fonts?" />
            </div>
          </div>

          {/* Traffic & Engagement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bounce Rate (%)</label>
              <input type="number" step="0.01" value={data.bounceRate || ''} onChange={e => handleInputChange('bounceRate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Avg Session Duration (s)</label>
              <input type="number" step="0.1" value={data.avgSessionDuration || ''} onChange={e => handleInputChange('avgSessionDuration', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pages Per Session</label>
              <input type="number" step="0.01" value={data.pagesPerSession || ''} onChange={e => handleInputChange('pagesPerSession', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Unique Visitors</label>
              <input type="number" value={data.uniqueVisitors || ''} onChange={e => handleInputChange('uniqueVisitors', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Returning Visitors</label>
              <input type="number" value={data.returningVisitors || ''} onChange={e => handleInputChange('returningVisitors', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Top Pages (comma-separated)</label>
              <input type="text" value={data.topPages || ''} onChange={e => handleInputChange('topPages', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="/home, /about, /contact" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Exit Pages (comma-separated)</label>
              <input type="text" value={data.exitPages || ''} onChange={e => handleInputChange('exitPages', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="/checkout, /cart" />
            </div>
          </div>

          {/* Conversion Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Conversion Rate (%)</label>
              <input type="number" step="0.01" value={data.conversionRate || ''} onChange={e => handleInputChange('conversionRate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Goal Completions</label>
              <input type="number" value={data.goalCompletions || ''} onChange={e => handleInputChange('goalCompletions', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Funnel Drop-off Rate (%)</label>
              <input type="number" step="0.01" value={data.funnelDropoff || ''} onChange={e => handleInputChange('funnelDropoff', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
          </div>

          {/* Content & SEO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content Quality</label>
              <input type="text" value={data.contentQuality || ''} onChange={e => handleInputChange('contentQuality', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Freshness, relevance, depth" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SEO Score (0-100)</label>
              <input type="number" min="0" max="100" value={data.seoScore || ''} onChange={e => handleInputChange('seoScore', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0-100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Index Coverage Issues</label>
              <input type="text" value={data.indexCoverage || ''} onChange={e => handleInputChange('indexCoverage', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Describe issues" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Broken Links</label>
              <input type="number" value={data.brokenLinks || ''} onChange={e => handleInputChange('brokenLinks', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0" />
            </div>
          </div>

          {/* User Journey & CTAs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">User Journey Clarity</label>
              <input type="text" value={data.userJourneyClarity || ''} onChange={e => handleInputChange('userJourneyClarity', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Describe clarity of user journey" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CTA Visibility & Placement</label>
              <input type="text" value={data.ctaVisibility || ''} onChange={e => handleInputChange('ctaVisibility', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Are CTAs prominent?" />
            </div>
          </div>

          {/* Mobile & Device */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Traffic (%)</label>
              <input type="number" step="0.01" value={data.mobileTraffic || ''} onChange={e => handleInputChange('mobileTraffic', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Desktop Traffic (%)</label>
              <input type="number" step="0.01" value={data.desktopTraffic || ''} onChange={e => handleInputChange('desktopTraffic', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tablet Traffic (%)</label>
              <input type="number" step="0.01" value={data.tabletTraffic || ''} onChange={e => handleInputChange('tabletTraffic', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Design Issues</label>
            <input type="text" value={data.mobileDesignIssues || ''} onChange={e => handleInputChange('mobileDesignIssues', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Describe any mobile-specific issues" />
          </div>

          {/* Security */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Security Headers Present?</label>
              <select value={data.securityHeaders || ''} onChange={e => handleInputChange('securityHeaders', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Malware Scan Status</label>
              <input type="text" value={data.malwareScan || ''} onChange={e => handleInputChange('malwareScan', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Any malware detected?" />
            </div>
          </div>

          {/* Business Functionality */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Tools/Features</label>
              <input type="text" value={data.businessTools || ''} onChange={e => handleInputChange('businessTools', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g. booking, e-commerce, chat" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Integrations</label>
              <input type="text" value={data.integrations || ''} onChange={e => handleInputChange('integrations', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g. CRM, analytics, payment" />
            </div>
          </div>

          {/* Competitive Analysis */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Competitor Benchmarks</label>
            <textarea rows={3} value={data.competitorBenchmarks || ''} onChange={e => handleInputChange('competitorBenchmarks', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="How does the site compare to competitors?" />
          </div>

          {/* Recommendations */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Website Performance Recommendations</label>
            <textarea rows={4} value={data.recommendations || ''} onChange={e => handleInputChange('recommendations', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Recommendations for improving website performance..." />
          </div>
        </div>
      </div>
    </div>
  );
} 