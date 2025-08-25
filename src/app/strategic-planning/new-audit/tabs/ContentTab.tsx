import React from 'react';

interface ContentTabProps {
  data: Record<string, string>;
  onDataUpdate: (data: Record<string, string>) => void;
}

export default function ContentTab({ data, onDataUpdate }: ContentTabProps) {
  const handleInputChange = (fieldName: string, value: string) => {
    onDataUpdate({
      ...data,
      [fieldName]: value
    });
  };

  return (
    <div className="space-y-8">
      {/* Content Inventory */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Inventory</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Content Pieces</label>
            <input 
              type="text" 
              className="w-full border rounded p-2" 
              placeholder="e.g., 150 blog posts, 50 videos, 200 social posts"
              value={data.totalContentPieces || ''}
              onChange={(e) => handleInputChange('totalContentPieces', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content Types Available</label>
            <textarea 
              className="w-full border rounded p-2" 
              rows={3} 
              placeholder="Blog posts, videos, infographics, case studies, whitepapers, etc."
              value={data.contentTypesAvailable || ''}
              onChange={(e) => handleInputChange('contentTypesAvailable', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content Age Distribution</label>
            <textarea 
              className="w-full border rounded p-2" 
              rows={2} 
              placeholder="How old is your content? Recent vs. older content ratio"
              value={data.contentAgeDistribution || ''}
              onChange={(e) => handleInputChange('contentAgeDistribution', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Content Performance Metrics */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Performance Metrics</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Average Page Views</label>
              <input 
                type="text" 
                className="w-full border rounded p-2" 
                placeholder="e.g., 1,500"
                value={data.averagePageViews || ''}
                onChange={(e) => handleInputChange('averagePageViews', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Average Time on Page</label>
              <input 
                type="text" 
                className="w-full border rounded p-2" 
                placeholder="e.g., 2:30"
                value={data.averageTimeOnPage || ''}
                onChange={(e) => handleInputChange('averageTimeOnPage', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bounce Rate</label>
              <input 
                type="text" 
                className="w-full border rounded p-2" 
                placeholder="e.g., 45%"
                value={data.bounceRate || ''}
                onChange={(e) => handleInputChange('bounceRate', e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Social Shares</label>
              <input 
                type="text" 
                className="w-full border rounded p-2" 
                placeholder="e.g., 250"
                value={data.socialShares || ''}
                onChange={(e) => handleInputChange('socialShares', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Comments/Engagement</label>
              <input 
                type="text" 
                className="w-full border rounded p-2" 
                placeholder="e.g., 75"
                value={data.commentsEngagement || ''}
                onChange={(e) => handleInputChange('commentsEngagement', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Conversion Rate</label>
              <input 
                type="text" 
                className="w-full border rounded p-2" 
                placeholder="e.g., 3.2%"
                value={data.conversionRate || ''}
                onChange={(e) => handleInputChange('conversionRate', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Quality Assessment */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Quality Assessment</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content Relevance Score (1-10)</label>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={data.contentRelevanceScore || '5'}
              onChange={(e) => handleInputChange('contentRelevanceScore', e.target.value)}
              className="w-full" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content Accuracy Assessment</label>
            <textarea 
              className="w-full border rounded p-2" 
              rows={3} 
              placeholder="How accurate and up-to-date is your content? Any outdated information?"
              value={data.contentAccuracyAssessment || ''}
              onChange={(e) => handleInputChange('contentAccuracyAssessment', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content Depth & Value</label>
            <textarea 
              className="w-full border rounded p-2" 
              rows={3} 
              placeholder="Does your content provide real value? Is it comprehensive enough?"
              value={data.contentDepthValue || ''}
              onChange={(e) => handleInputChange('contentDepthValue', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content Consistency</label>
            <textarea 
              className="w-full border rounded p-2" 
              rows={2} 
              placeholder="Is your content consistent in tone, style, and messaging?"
              value={data.contentConsistency || ''}
              onChange={(e) => handleInputChange('contentConsistency', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Content Strategy */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Strategy</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content Calendar</label>
            <textarea 
              className="w-full border rounded p-2" 
              rows={2} 
              placeholder="Do you have a content calendar? How often do you publish?"
              value={data.contentCalendar || ''}
              onChange={(e) => handleInputChange('contentCalendar', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content Themes & Topics</label>
            <textarea 
              className="w-full border rounded p-2" 
              rows={3} 
              placeholder="What themes and topics do you cover? Are they aligned with your audience needs?"
              value={data.contentThemesTopics || ''}
              onChange={(e) => handleInputChange('contentThemesTopics', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SEO Integration</label>
            <textarea 
              className="w-full border rounded p-2" 
              rows={2} 
              placeholder="How well is SEO integrated into your content creation process?"
              value={data.seoIntegration || ''}
              onChange={(e) => handleInputChange('seoIntegration', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content Distribution Strategy</label>
            <textarea 
              className="w-full border rounded p-2" 
              rows={2} 
              placeholder="How do you distribute and promote your content?"
              value={data.contentDistributionStrategy || ''}
              onChange={(e) => handleInputChange('contentDistributionStrategy', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Content Recommendations */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Recommendations</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content Gaps</label>
            <textarea 
              className="w-full border rounded p-2" 
              rows={3} 
              placeholder="What content gaps have you identified? What topics are missing?"
              value={data.contentGaps || ''}
              onChange={(e) => handleInputChange('contentGaps', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content Optimization Opportunities</label>
            <textarea 
              className="w-full border rounded p-2" 
              rows={3} 
              placeholder="Which content pieces could be optimized or updated?"
              value={data.contentOptimizationOpportunities || ''}
              onChange={(e) => handleInputChange('contentOptimizationOpportunities', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Content Ideas</label>
            <textarea 
              className="w-full border rounded p-2" 
              rows={3} 
              placeholder="What new content types or topics should you create?"
              value={data.newContentIdeas || ''}
              onChange={(e) => handleInputChange('newContentIdeas', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content Performance Improvements</label>
            <textarea 
              className="w-full border rounded p-2" 
              rows={3} 
              placeholder="Specific recommendations for improving content performance"
              value={data.contentPerformanceImprovements || ''}
              onChange={(e) => handleInputChange('contentPerformanceImprovements', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 