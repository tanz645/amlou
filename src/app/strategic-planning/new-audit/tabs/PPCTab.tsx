import React from 'react';

interface PPCTabProps {
  data: Record<string, any>;
  onDataUpdate: (data: Record<string, any>) => void;
}

export default function PPCTab({ data, onDataUpdate }: PPCTabProps) {
  const handleInputChange = (field: string, value: any) => {
    onDataUpdate({
      ...data,
      [field]: value
    });
  };

  const inputClasses = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClasses = "block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wider";
  const sectionHeaderClasses = "text-md font-bold text-gray-900 mb-4 flex items-center border-b pb-2";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 1. Account Structure & Settings */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 overflow-hidden">
        <h3 className={sectionHeaderClasses}>
           Account Structure & Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClasses}>Account Name</label>
            <input 
              type="text" 
              className={inputClasses} 
              placeholder="e.g. Google Ads Account"
              value={data.accountName || ''}
              onChange={(e) => handleInputChange('accountName', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClasses}>Platform</label>
            <select 
              className={inputClasses}
              value={data.platform || ''}
              onChange={(e) => handleInputChange('platform', e.target.value)}
            >
              <option value="">Select Platform...</option>
              <option value="Google Ads">Google Ads</option>
              <option value="Microsoft (Bing) Ads">Microsoft (Bing) Ads</option>
              <option value="Meta Ads">Meta Ads</option>
              <option value="LinkedIn Ads">LinkedIn Ads</option>
              <option value="Twitter Ads">Twitter Ads</option>
            </select>
          </div>
          <div>
            <label className={labelClasses}>Campaign Structure Type</label>
            <select 
              className={inputClasses}
              value={data.campaignStructure || ''}
              onChange={(e) => handleInputChange('campaignStructure', e.target.value)}
            >
              <option value="">Select Type...</option>
              <option value="Alpha/Beta">Alpha/Beta</option>
              <option value="Hagakure">Hagakure</option>
              <option value="SKAGs">SKAGs</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className={labelClasses}>Bidding Strategies Used</label>
            <input 
              type="text" 
              className={inputClasses} 
              placeholder="e.g. Target ROAS, Max Conversions"
              value={data.biddingStrategies || ''}
              onChange={(e) => handleInputChange('biddingStrategies', e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className={labelClasses}>Budget Management Style</label>
            <select 
              className={inputClasses}
              value={data.budgetManagement || ''}
              onChange={(e) => handleInputChange('budgetManagement', e.target.value)}
            >
              <option value="">Select Style...</option>
              <option value="Aggressive">Aggressive</option>
              <option value="Balanced">Balanced</option>
              <option value="Conservative">Conservative</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Keywords & Targeting */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 overflow-hidden">
        <h3 className={sectionHeaderClasses}>
           Keywords & Targeting
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClasses}>Match Type Distribution</label>
            <input 
              type="text" 
              className={inputClasses} 
              placeholder="e.g. 40% Broad, 30% Phrase, 30% Exact"
              value={data.matchTypeDistribution || ''}
              onChange={(e) => handleInputChange('matchTypeDistribution', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClasses}>Negative Keyword List Quality</label>
            <select 
              className={inputClasses}
              value={data.negativeKeywordsQuality || ''}
              onChange={(e) => handleInputChange('negativeKeywordsQuality', e.target.value)}
            >
              <option value="">Select Quality...</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Needs Work">Needs Work</option>
              <option value="Missing">Missing</option>
            </select>
          </div>
          <div>
            <label className={labelClasses}>Search Terms Review Frequency</label>
            <input 
              type="text" 
              className={inputClasses} 
              placeholder="e.g. Weekly, Monthly"
              value={data.searchTermsReview || ''}
              onChange={(e) => handleInputChange('searchTermsReview', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClasses}>Location Targeting Accuracy</label>
            <select 
              className={inputClasses}
              value={data.locationTargeting || ''}
              onChange={(e) => handleInputChange('locationTargeting', e.target.value)}
            >
              <option value="">Select Accuracy...</option>
              <option value="Accurate">Accurate</option>
              <option value="Loose">Loose</option>
              <option value="Incorrect">Incorrect</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className={labelClasses}>Audience Targeting Used</label>
            <textarea 
              className={`${inputClasses} min-h-[80px]`} 
              placeholder="Describe remarketing, in-market, or custom intent audiences used..."
              value={data.audienceTargeting || ''}
              onChange={(e) => handleInputChange('audienceTargeting', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* 3. Ad Creatives & Messaging */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 overflow-hidden">
        <h3 className={sectionHeaderClasses}>
           Ad Creatives & Messaging
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClasses}>Average Ad Strength</label>
            <select 
              className={inputClasses}
              value={data.avgAdStrength || ''}
              onChange={(e) => handleInputChange('avgAdStrength', e.target.value)}
            >
              <option value="">Select Strength...</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Average">Average</option>
              <option value="Poor">Poor</option>
            </select>
          </div>
          <div>
            <label className={labelClasses}>Value Proposition Clarity</label>
            <select 
              className={inputClasses}
              value={data.valuePropClarity || ''}
              onChange={(e) => handleInputChange('valuePropClarity', e.target.value)}
            >
              <option value="">Select Clarity...</option>
              <option value="Clear">Clear</option>
              <option value="Somewhat Clear">Somewhat Clear</option>
              <option value="Vague">Vague</option>
            </select>
          </div>
          <div>
            <label className={labelClasses}>CTA Effectiveness</label>
            <input 
              type="text" 
              className={inputClasses} 
              placeholder="e.g. Strong direct response hooks"
              value={data.ctaEffectiveness || ''}
              onChange={(e) => handleInputChange('ctaEffectiveness', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClasses}>A/B Testing Frequency</label>
            <input 
              type="text" 
              className={inputClasses} 
              placeholder="e.g. Ongoing, Seasonal"
              value={data.abTesting || ''}
              onChange={(e) => handleInputChange('abTesting', e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className={labelClasses}>Ad Extension Usage</label>
            <textarea 
              className={`${inputClasses} min-h-[60px]`} 
              placeholder="Sitelinks, callouts, structured snippets, call extensions, etc..."
              value={data.adExtensionUsage || ''}
              onChange={(e) => handleInputChange('adExtensionUsage', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* 4. Tracking & Conversion */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 overflow-hidden">
        <h3 className={sectionHeaderClasses}>
           Tracking & Conversion
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClasses}>Conversion Tracking Status</label>
            <select 
              className={inputClasses}
              value={data.conversionTrackingStatus || ''}
              onChange={(e) => handleInputChange('conversionTrackingStatus', e.target.value)}
            >
              <option value="">Select Status...</option>
              <option value="Fully Functional">Fully Functional</option>
              <option value="Partial Issues">Partial Issues</option>
              <option value="Broken">Broken</option>
              <option value="Not Set">Not Set</option>
            </select>
          </div>
          <div>
            <label className={labelClasses}>GTM Integration</label>
            <select 
              className={inputClasses}
              value={data.gtmIntegration || ''}
              onChange={(e) => handleInputChange('gtmIntegration', e.target.value)}
            >
              <option value="">Select...</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className={labelClasses}>Attribution Model</label>
            <input 
              type="text" 
              className={inputClasses} 
              placeholder="e.g. Data-driven, Last click"
              value={data.attributionModel || ''}
              onChange={(e) => handleInputChange('attributionModel', e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className={labelClasses}>Lead/Sale Quality Observation</label>
            <textarea 
              className={`${inputClasses} min-h-[80px]`} 
              placeholder="General observations on the quality of traffic and conversions..."
              value={data.leadQuality || ''}
              onChange={(e) => handleInputChange('leadQuality', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* 5. Performance Metrics */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 overflow-hidden">
        <h3 className={sectionHeaderClasses}>
           Performance Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div>
            <label className={labelClasses}>Avg. CTR %</label>
            <input 
              type="number" step="0.01"
              className={inputClasses} 
              placeholder="0.00"
              value={data.avgCtr || ''}
              onChange={(e) => handleInputChange('avgCtr', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClasses}>Avg. CPC</label>
            <input 
              type="number" step="0.01"
              className={inputClasses} 
              placeholder="0.00"
              value={data.avgCpc || ''}
              onChange={(e) => handleInputChange('avgCpc', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClasses}>Conversion Rate %</label>
            <input 
              type="number" step="0.01"
              className={inputClasses} 
              placeholder="0.00"
              value={data.conversionRate || ''}
              onChange={(e) => handleInputChange('conversionRate', e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className={labelClasses}>ROAS / CPA Performance</label>
            <input 
              type="text" 
              className={inputClasses} 
              placeholder="e.g. 400% ROAS / $50 CPA"
              value={data.roasCpa || ''}
              onChange={(e) => handleInputChange('roasCpa', e.target.value)}
            />
          </div>
          <div className="md:col-span-1">
            <label className={labelClasses}>Impression Share Lost</label>
            <input 
              type="text" 
              className={inputClasses} 
              placeholder="Lost (Budget/Rank)"
              value={data.impressionShareLost || ''}
              onChange={(e) => handleInputChange('impressionShareLost', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
