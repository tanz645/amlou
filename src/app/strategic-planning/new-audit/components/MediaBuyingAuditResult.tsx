import React from 'react';

interface MediaBuyingAuditResultProps {
  data: Record<string, unknown>;
}

const renderList = (items: unknown) =>
  Array.isArray(items) && items.length > 0 ? (
    <span className="text-gray-800">{items.join(', ')}</span>
  ) : (
    <span className="text-gray-400 italic">N/A</span>
  );

const renderValue = (value: unknown) =>
  typeof value === 'string' && value.trim() !== '' ? (
    <span className="text-gray-800">{value}</span>
  ) : (
    <span className="text-gray-400 italic">N/A</span>
  );

const sectionBox = (title: string, children: React.ReactNode) => (
  <div className="bg-white border border-blue-100 rounded-xl shadow p-5 mb-6">
    <h3 className="text-lg font-semibold text-blue-700 mb-3">{title}</h3>
    {children}
  </div>
);

const MediaBuyingAuditResult: React.FC<MediaBuyingAuditResultProps> = ({ data }) => {
  // 1. Overall Marketing Goals
  const marketingGoals = data.marketingGoals as string[] | undefined;
  const notesGaps = data.notesGaps;

  // 2. Campaign Level Audit
  const campaignAudits = Array.isArray(data.campaignAudits) ? (data.campaignAudits as Record<string, unknown>[]) : [];

  // 3. Ad Set Level Audit
  const adSetAudits = Array.isArray(data.adSetAudits) ? (data.adSetAudits as Record<string, unknown>[]) : [];

  // 4. Ad Level Audit
  const adLevelAudits = Array.isArray(data.adLevelAudits) ? (data.adLevelAudits as Record<string, unknown>[]) : [];

  // 5. Tracking, Attribution & Compliance
  const trackingFields = [
    { key: 'pixelSdkSetup', label: 'Pixel/SDK Setup' },
    { key: 'eventTracking', label: 'Event Tracking' },
    { key: 'utmTracking', label: 'UTM Tracking' },
    { key: 'attributionModel', label: 'Attribution Model' },
    { key: 'adDisapprovals', label: 'Ad Disapprovals' },
    { key: 'policyViolations', label: 'Policy Violations' },
    { key: 'notesRecommendationsTracking', label: 'Notes & Recommendations' },
  ];

  // 6. Media Mix & Channel Analysis
  const mediaMixFields = [
    { key: 'channelBreakdown', label: 'Channel Breakdown' },
    { key: 'budgetDistribution', label: 'Budget Distribution' },
    { key: 'performanceByChannel', label: 'Performance by Channel' },
    { key: 'opportunitiesToReallocate', label: 'Opportunities to Reallocate' },
  ];

  // 7. Waste & Efficiency
  const wasteFields = [
    { key: 'lowPerformingSegments', label: 'Low Performing Segments' },
    { key: 'highFrequencyIssues', label: 'High Frequency Issues' },
    { key: 'underperformingCreatives', label: 'Underperforming Creatives' },
    { key: 'notesActionPoints', label: 'Notes & Action Points' },
  ];

  // 8. Summary & Action Plan
  const summaryFields = [
    { key: 'keyStrengths', label: 'Key Strengths' },
    { key: 'keyWeaknesses', label: 'Key Weaknesses' },
    { key: 'topPriorityFixes', label: 'Top Priority Fixes' },
    { key: 'quickWins', label: 'Quick Wins' },
    { key: 'longTermOpportunities', label: 'Long-Term Opportunities' },
    { key: 'ownerDeadline', label: 'Owner & Deadline' },
  ];

  // 9. Footer
  const footerFields = [
    { key: 'auditConductedBy', label: 'Audit Conducted By' },
    { key: 'dateOfAudit', label: 'Date of Audit' },
    { key: 'signatureReviewer', label: 'Signature / Reviewer' },
  ];

  return (
    <div className="space-y-8">
      {/* Audit Number at the top if present */}
      {typeof data.auditNumber === 'string' && data.auditNumber.trim() !== '' && (
        <div className="text-sm text-gray-500 mb-2 font-mono tracking-wide">
          Audit Number: {data.auditNumber}
        </div>
      )}
      {/* 1. Overall Marketing Goals */}
      {sectionBox(
        'Overall Marketing Goals',
        <div className="space-y-2">
          <div>
            <span className="font-medium">Marketing Goals: </span>
            {renderList(marketingGoals)}
          </div>
          <div>
            <span className="font-medium">Notes & Gaps: </span>
            {renderValue(notesGaps)}
          </div>
        </div>
      )}

      {/* 2. Campaign Level Audit */}
      {sectionBox(
        'Campaign Level Audit',
        campaignAudits.length > 0 ? (
          <div className="space-y-4">
            {campaignAudits.map((c, idx) => (
              <div key={idx} className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                <div className="font-semibold text-blue-800 mb-2">Campaign {idx + 1}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div><span className="font-medium">Campaign Name: </span>{renderValue(c.campaignName)}</div>
                  <div><span className="font-medium">Marketing Goals Supported: </span>{renderList(c.marketingGoalsSupported)}</div>
                  <div><span className="font-medium">Objective Set Correctly: </span>{renderValue(c.objectiveSetCorrectly)}</div>
                  <div><span className="font-medium">Buying Type: </span>{renderValue(c.buyingType)}</div>
                  <div><span className="font-medium">Budget Allocation: </span>{renderValue(c.budgetAllocationCampaign)}</div>
                  <div><span className="font-medium">Optimization Strategy: </span>{renderValue(c.optimizationStrategy)}</div>
                  <div><span className="font-medium">Performance KPIs: </span>{renderValue(c.performanceKPIs)}</div>
                  <div><span className="font-medium">Date Range: </span>{renderValue(c.dateRange)}</div>
                  <div><span className="font-medium">Compliance Check: </span>{renderValue(c.complianceCheck)}</div>
                  <div className="md:col-span-2"><span className="font-medium">Notes & Recommendations: </span>{renderValue(c.notesRecommendationsCampaign)}</div>
                </div>
              </div>
            ))}
          </div>
        ) : <span className="text-gray-400 italic">No campaigns audited.</span>
      )}

      {/* 3. Ad Set Level Audit */}
      {sectionBox(
        'Ad Set Level Audit',
        adSetAudits.length > 0 ? (
          <div className="space-y-4">
            {adSetAudits.map((a, idx) => (
              <div key={idx} className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                <div className="font-semibold text-blue-800 mb-2">Ad Set {idx + 1}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div><span className="font-medium">Ad Set Name: </span>{renderValue(a.adSetName)}</div>
                  <div><span className="font-medium">Demographics: </span>{renderValue(a.demographics)}</div>
                  <div><span className="font-medium">Interests: </span>{renderList(a.interests)}</div>
                  <div><span className="font-medium">Behaviors: </span>{renderList(a.behaviors)}</div>
                  <div><span className="font-medium">Lookalikes: </span>{renderValue(a.lookalikes)}</div>
                  <div><span className="font-medium">Audience Overlap: </span>{renderValue(a.audienceOverlap)}</div>
                  <div><span className="font-medium">Placements: </span>{renderValue(a.placements)}</div>
                  <div><span className="font-medium">Budget Type: </span>{renderValue(a.budgetType)}</div>
                  <div><span className="font-medium">Budget Amount: </span>{renderValue(a.budgetAmount)}</div>
                  <div><span className="font-medium">Pacing Strategy: </span>{renderValue(a.pacingStrategy)}</div>
                  <div><span className="font-medium">Frequency: </span>{renderValue(a.frequency)}</div>
                  <div><span className="font-medium">Performance KPIs: </span>{renderValue(a.performanceKPIs)}</div>
                  <div className="md:col-span-2"><span className="font-medium">Notes & Recommendations: </span>{renderValue(a.notesRecommendations)}</div>
                </div>
              </div>
            ))}
          </div>
        ) : <span className="text-gray-400 italic">No ad sets audited.</span>
      )}

      {/* 4. Ad Level Audit */}
      {sectionBox(
        'Ad Level Audit',
        adLevelAudits.length > 0 ? (
          <div className="space-y-4">
            {adLevelAudits.map((ad, idx) => (
              <div key={idx} className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                <div className="font-semibold text-blue-800 mb-2">Ad {idx + 1}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div><span className="font-medium">Ad Name / ID: </span>{renderValue(ad.adNameId)}</div>
                  <div><span className="font-medium">Creative Format: </span>{renderValue(ad.creativeFormat)}</div>
                  <div><span className="font-medium">Creative Relevance: </span>{renderValue(ad.creativeRelevance)}</div>
                  <div><span className="font-medium">CTA Effectiveness: </span>{renderValue(ad.ctaEffectiveness)}</div>
                  <div><span className="font-medium">Ad Copy Compliance: </span>{renderValue(ad.adCopyCompliance)}</div>
                  <div><span className="font-medium">Destination URL: </span>{renderValue(ad.destinationUrl)}</div>
                  <div><span className="font-medium">Performance KPIs: </span>{renderValue(ad.performanceKPIsAd)}</div>
                  <div><span className="font-medium">A/B Testing: </span>{renderValue(ad.abTesting)}</div>
                  <div className="md:col-span-2"><span className="font-medium">Notes & Recommendations: </span>{renderValue(ad.notesRecommendationsAd)}</div>
                </div>
              </div>
            ))}
          </div>
        ) : <span className="text-gray-400 italic">No ads audited.</span>
      )}

      {/* 5. Tracking, Attribution & Compliance */}
      {sectionBox(
        'Tracking, Attribution & Compliance',
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {trackingFields.map(f => (
            <div key={f.key}><span className="font-medium">{f.label}: </span>{renderValue(data[f.key])}</div>
          ))}
        </div>
      )}

      {/* 6. Media Mix & Channel Analysis */}
      {sectionBox(
        'Media Mix & Channel Analysis',
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {mediaMixFields.map(f => (
            <div key={f.key}><span className="font-medium">{f.label}: </span>{renderValue(data[f.key])}</div>
          ))}
        </div>
      )}

      {/* 7. Waste & Efficiency */}
      {sectionBox(
        'Waste & Efficiency',
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {wasteFields.map(f => (
            <div key={f.key}><span className="font-medium">{f.label}: </span>{renderValue(data[f.key])}</div>
          ))}
        </div>
      )}

      {/* 8. Summary & Action Plan */}
      {sectionBox(
        'Summary & Action Plan',
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {summaryFields.map(f => (
            <div key={f.key}><span className="font-medium">{f.label}: </span>{renderValue(data[f.key])}</div>
          ))}
        </div>
      )}

      {/* 9. Footer */}
      <div className="flex flex-col md:flex-row gap-4 mt-2 text-sm text-gray-600">
        {footerFields.map(f => (
          <div key={f.key}><span className="font-medium">{f.label}: </span>{renderValue(data[f.key])}</div>
        ))}
      </div>
    </div>
  );
};

export default MediaBuyingAuditResult; 