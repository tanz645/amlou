import React from 'react';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

interface EmailTabProps {
  data: Record<string, string>;
  onDataUpdate: (data: Record<string, string>) => void;
}

export default function EmailTab({ data, onDataUpdate }: EmailTabProps) {
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
          <EnvelopeIcon className="w-5 h-5 mr-2 text-orange-600" />
          Email Marketing Audit
        </h3>
        {/* Provider & Infrastructure */}
        <div className="mb-8">
          <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Provider & Infrastructure</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Service Provider</label>
              <input type="text" value={data.emailProvider || ''} onChange={e => handleInputChange('emailProvider', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Mailchimp, SendGrid, etc." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sending Domain</label>
              <input type="text" value={data.sendingDomain || ''} onChange={e => handleInputChange('sendingDomain', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="yourdomain.com" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">DKIM Status</label>
              <select value={data.dkimStatus || ''} onChange={e => handleInputChange('dkimStatus', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">Select</option>
                <option value="valid">Valid</option>
                <option value="invalid">Invalid</option>
                <option value="not-set">Not Set</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SPF Status</label>
              <select value={data.spfStatus || ''} onChange={e => handleInputChange('spfStatus', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">Select</option>
                <option value="valid">Valid</option>
                <option value="invalid">Invalid</option>
                <option value="not-set">Not Set</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">DMARC Status</label>
              <select value={data.dmarcStatus || ''} onChange={e => handleInputChange('dmarcStatus', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">Select</option>
                <option value="valid">Valid</option>
                <option value="invalid">Invalid</option>
                <option value="not-set">Not Set</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dedicated IP</label>
              <select value={data.dedicatedIP || ''} onChange={e => handleInputChange('dedicatedIP', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sending Reputation</label>
              <input type="text" value={data.sendingReputation || ''} onChange={e => handleInputChange('sendingReputation', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Good, Fair, Poor, or score" />
            </div>
          </div>
        </div>
        {/* List Health */}
        <div className="mb-8">
          <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">List Health</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subscriber Count</label>
              <input type="number" value={data.subscriberCount || ''} onChange={e => handleInputChange('subscriberCount', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">List Growth Rate (%)</label>
              <input type="number" step="0.01" value={data.listGrowthRate || ''} onChange={e => handleInputChange('listGrowthRate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">List Churn Rate (%)</label>
              <input type="number" step="0.01" value={data.listChurnRate || ''} onChange={e => handleInputChange('listChurnRate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">List Source</label>
              <input type="text" value={data.listSource || ''} onChange={e => handleInputChange('listSource', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Organic, purchased, imported, etc." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">List Cleaning Frequency</label>
              <input type="text" value={data.listCleaningFrequency || ''} onChange={e => handleInputChange('listCleaningFrequency', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Monthly, quarterly, etc." />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Inactive Subscribers (%)</label>
              <input type="number" step="0.01" value={data.inactiveSubscribers || ''} onChange={e => handleInputChange('inactiveSubscribers', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">List Segmentation</label>
              <input type="text" value={data.listSegmentation || ''} onChange={e => handleInputChange('listSegmentation', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="By interest, behavior, etc." />
            </div>
          </div>
        </div>
        {/* Campaign Performance */}
        <div className="mb-8">
          <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Campaign Performance</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Campaigns Sent (Last 12 months)</label>
              <input type="number" value={data.totalCampaigns || ''} onChange={e => handleInputChange('totalCampaigns', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Avg. Open Rate (%)</label>
              <input type="number" step="0.01" value={data.avgOpenRate || ''} onChange={e => handleInputChange('avgOpenRate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Avg. Click Rate (%)</label>
              <input type="number" step="0.01" value={data.avgClickRate || ''} onChange={e => handleInputChange('avgClickRate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Avg. Bounce Rate (%)</label>
              <input type="number" step="0.01" value={data.avgBounceRate || ''} onChange={e => handleInputChange('avgBounceRate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Avg. Unsubscribe Rate (%)</label>
              <input type="number" step="0.01" value={data.avgUnsubscribeRate || ''} onChange={e => handleInputChange('avgUnsubscribeRate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Avg. Spam Complaint Rate (%)</label>
              <input type="number" step="0.01" value={data.avgSpamComplaintRate || ''} onChange={e => handleInputChange('avgSpamComplaintRate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Best Performing Campaign</label>
            <textarea rows={2} value={data.bestPerformingCampaign || ''} onChange={e => handleInputChange('bestPerformingCampaign', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Name, metrics, what worked..." />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Worst Performing Campaign</label>
            <textarea rows={2} value={data.worstPerformingCampaign || ''} onChange={e => handleInputChange('worstPerformingCampaign', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Name, metrics, what went wrong..." />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Frequency</label>
            <input type="text" value={data.campaignFrequency || ''} onChange={e => handleInputChange('campaignFrequency', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Weekly, monthly, etc." />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Send Time Optimization</label>
            <input type="text" value={data.sendTimeOptimization || ''} onChange={e => handleInputChange('sendTimeOptimization', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Best send times, A/B test results..." />
          </div>
        </div>
        {/* Deliverability */}
        <div className="mb-8">
          <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Deliverability</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deliverability Score</label>
              <input type="number" step="0.01" value={data.deliverabilityScore || ''} onChange={e => handleInputChange('deliverabilityScore', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Inbox Placement (%)</label>
              <input type="number" step="0.01" value={data.inboxPlacement || ''} onChange={e => handleInputChange('inboxPlacement', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Spam Folder Rate (%)</label>
              <input type="number" step="0.01" value={data.spamFolderRate || ''} onChange={e => handleInputChange('spamFolderRate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blocklist Status</label>
              <input type="text" value={data.blocklistStatus || ''} onChange={e => handleInputChange('blocklistStatus', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Listed, not listed, details..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Authentication Issues</label>
              <input type="text" value={data.authenticationIssues || ''} onChange={e => handleInputChange('authenticationIssues', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="SPF, DKIM, DMARC issues..." />
            </div>
          </div>
        </div>
        {/* Content & Design */}
        <div className="mb-8">
          <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Content & Design</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Template Type</label>
              <input type="text" value={data.templateType || ''} onChange={e => handleInputChange('templateType', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Drag-and-drop, custom HTML, etc." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Optimization</label>
              <select value={data.mobileOptimization || ''} onChange={e => handleInputChange('mobileOptimization', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">Select</option>
                <option value="fully-optimized">Fully Optimized</option>
                <option value="partially-optimized">Partially Optimized</option>
                <option value="not-optimized">Not Optimized</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image to Text Ratio</label>
              <input type="text" value={data.imageToTextRatio || ''} onChange={e => handleInputChange('imageToTextRatio', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g. 60:40" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Use of Personalization</label>
              <select value={data.useOfPersonalization || ''} onChange={e => handleInputChange('useOfPersonalization', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">Select</option>
                <option value="none">None</option>
                <option value="basic">Basic (name, company)</option>
                <option value="advanced">Advanced (dynamic content, behavior) </option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject Line Performance</label>
            <textarea rows={2} value={data.subjectLinePerformance || ''} onChange={e => handleInputChange('subjectLinePerformance', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Best/worst subject lines, open rates, A/B test results..." />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Call to Action Effectiveness</label>
            <textarea rows={2} value={data.callToActionEffectiveness || ''} onChange={e => handleInputChange('callToActionEffectiveness', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Click rates, button design, placement, clarity..." />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Accessibility</label>
            <textarea rows={2} value={data.accessibility || ''} onChange={e => handleInputChange('accessibility', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Alt text, font size, color contrast, screen reader support..." />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">A/B Testing Results</label>
            <textarea rows={2} value={data.aBTestingResults || ''} onChange={e => handleInputChange('aBTestingResults', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Subject, content, CTA, design tests..." />
          </div>
        </div>
        {/* Automation & Workflows */}
        <div className="mb-8">
          <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Automation & Workflows</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Automation Tools Used</label>
              <input type="text" value={data.automationTools || ''} onChange={e => handleInputChange('automationTools', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Mailchimp, HubSpot, etc." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Active Workflows</label>
              <input type="number" value={data.workflowsActive || ''} onChange={e => handleInputChange('workflowsActive', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Workflow Types</label>
              <input type="text" value={data.workflowTypes || ''} onChange={e => handleInputChange('workflowTypes', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Welcome, nurture, re-engagement, etc." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Workflow Performance</label>
              <textarea rows={2} value={data.workflowPerformance || ''} onChange={e => handleInputChange('workflowPerformance', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Open/click rates, conversion, drop-off points..." />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Triggered Emails</label>
              <input type="number" value={data.triggeredEmails || ''} onChange={e => handleInputChange('triggeredEmails', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Drip Campaigns</label>
              <input type="number" value={data.dripCampaigns || ''} onChange={e => handleInputChange('dripCampaigns', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cart Abandonment Workflows</label>
              <input type="number" value={data.cartAbandonment || ''} onChange={e => handleInputChange('cartAbandonment', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Re-Engagement Workflows</label>
              <input type="number" value={data.reEngagement || ''} onChange={e => handleInputChange('reEngagement', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0" />
            </div>
          </div>
        </div>
        {/* Compliance */}
        <div className="mb-8">
          <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Compliance</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">GDPR Compliance</label>
              <select value={data.gdprStatus || ''} onChange={e => handleInputChange('gdprStatus', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">Select</option>
                <option value="compliant">Compliant</option>
                <option value="partial">Partially Compliant</option>
                <option value="not-compliant">Not Compliant</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CAN-SPAM Compliance</label>
              <select value={data.canSpamStatus || ''} onChange={e => handleInputChange('canSpamStatus', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">Select</option>
                <option value="compliant">Compliant</option>
                <option value="partial">Partially Compliant</option>
                <option value="not-compliant">Not Compliant</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Unsubscribe Process</label>
              <input type="text" value={data.unsubscribeProcess || ''} onChange={e => handleInputChange('unsubscribeProcess', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="One-click, double opt-out, etc." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Privacy Policy</label>
              <input type="text" value={data.privacyPolicy || ''} onChange={e => handleInputChange('privacyPolicy', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Link, summary, etc." />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Consent Management</label>
            <textarea rows={2} value={data.consentManagement || ''} onChange={e => handleInputChange('consentManagement', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Opt-in process, consent records, etc." />
          </div>
        </div>
        {/* Segmentation & Personalization */}
        <div className="mb-8">
          <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Segmentation & Personalization</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Segments Used</label>
              <input type="text" value={data.segmentsUsed || ''} onChange={e => handleInputChange('segmentsUsed', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Interest, behavior, location, etc." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dynamic Content Usage</label>
              <select value={data.dynamicContent || ''} onChange={e => handleInputChange('dynamicContent', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">Select</option>
                <option value="none">None</option>
                <option value="basic">Basic</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Behavioral Targeting</label>
              <input type="text" value={data.behavioralTargeting || ''} onChange={e => handleInputChange('behavioralTargeting', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Clicks, opens, purchases, etc." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Demographic Targeting</label>
              <input type="text" value={data.demographicTargeting || ''} onChange={e => handleInputChange('demographicTargeting', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Age, gender, location, etc." />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Purchase History Targeting</label>
            <input type="text" value={data.purchaseHistoryTargeting || ''} onChange={e => handleInputChange('purchaseHistoryTargeting', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Product, frequency, value, etc." />
          </div>
        </div>
        {/* Testing & Optimization */}
        <div className="mb-8">
          <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Testing & Optimization</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject Line Tests</label>
              <input type="text" value={data.subjectLineTests || ''} onChange={e => handleInputChange('subjectLineTests', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="A/B, multivariate, etc." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content Tests</label>
              <input type="text" value={data.contentTests || ''} onChange={e => handleInputChange('contentTests', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="A/B, multivariate, etc." />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Send Time Tests</label>
              <input type="text" value={data.sendTimeTests || ''} onChange={e => handleInputChange('sendTimeTests', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="A/B, time zone, etc." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Device Tests</label>
              <input type="text" value={data.deviceTests || ''} onChange={e => handleInputChange('deviceTests', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Mobile, desktop, tablet, etc." />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Optimization Insights</label>
            <textarea rows={2} value={data.optimizationInsights || ''} onChange={e => handleInputChange('optimizationInsights', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Key learnings, next steps..." />
          </div>
        </div>
        {/* Analytics & Reporting */}
        <div className="mb-8">
          <h5 className="text-md font-semibold text-gray-800 mb-4 border-b pb-2">Analytics & Reporting</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reporting Tools Used</label>
              <input type="text" value={data.reportingTools || ''} onChange={e => handleInputChange('reportingTools', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Native, Google Analytics, etc." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">KPIs Tracked</label>
              <input type="text" value={data.kpisTracked || ''} onChange={e => handleInputChange('kpisTracked', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Open, click, conversion, etc." />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ROI (%)</label>
              <input type="number" step="0.01" value={data.roi || ''} onChange={e => handleInputChange('roi', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Revenue Per Email ($)</label>
              <input type="number" step="0.01" value={data.revenuePerEmail || ''} onChange={e => handleInputChange('revenuePerEmail', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Conversion Rate (%)</label>
              <input type="number" step="0.01" value={data.conversionRate || ''} onChange={e => handleInputChange('conversionRate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0.00" />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Attribution Model</label>
            <input type="text" value={data.attributionModel || ''} onChange={e => handleInputChange('attributionModel', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Last click, first click, multi-touch, etc." />
          </div>
        </div>
        {/* Recommendations */}
        <div>
          <h5 className="text-md font-semibold text-gray-800 mb-4">Recommendations & Notes</h5>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority Actions</label>
              <textarea rows={3} value={data.priorityActions || ''} onChange={e => handleInputChange('priorityActions', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="High-priority fixes, quick wins..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Long-term Strategy</label>
              <textarea rows={3} value={data.longTermStrategy || ''} onChange={e => handleInputChange('longTermStrategy', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Long-term recommendations, resource allocation..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Resource Needs</label>
              <textarea rows={2} value={data.resourceNeeds || ''} onChange={e => handleInputChange('resourceNeeds', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Tools, team, budget, etc." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
              <textarea rows={2} value={data.notes || ''} onChange={e => handleInputChange('notes', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Other observations, context, etc." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 