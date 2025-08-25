import React from 'react';

interface SEOTabProps {
  data: Record<string, string>;
  onDataUpdate: (data: Record<string, string>) => void;
}

export default function SEOTab({ data, onDataUpdate }: SEOTabProps) {
  const handleInputChange = (fieldName: string, value: string) => {
    onDataUpdate({
      ...data,
      [fieldName]: value
    });
  };

  return (
    <div className="space-y-8">
      {/* Technical SEO */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical SEO</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Website Speed</label>
            <input 
              type="text" 
              className="w-full border rounded p-2" 
              placeholder="e.g., 2.5 seconds"
              value={data.websiteSpeed || ''}
              onChange={(e) => handleInputChange('websiteSpeed', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Responsiveness</label>
            <select 
              className="w-full border rounded p-2"
              value={data.mobileResponsiveness || ''}
              onChange={(e) => handleInputChange('mobileResponsiveness', e.target.value)}
            >
              <option value="">Select status</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Average">Average</option>
              <option value="Poor">Poor</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SSL Certificate</label>
            <select 
              className="w-full border rounded p-2"
              value={data.sslCertificate || ''}
              onChange={(e) => handleInputChange('sslCertificate', e.target.value)}
            >
              <option value="">Select status</option>
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
              <option value="Missing">Missing</option>
            </select>
          </div>
        </div>
      </div>

      {/* On-Page SEO */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">On-Page SEO</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title Tags Optimization</label>
            <textarea 
              className="w-full border rounded p-2" 
              rows={2} 
              placeholder="Assessment of title tag optimization"
              value={data.titleTagsOptimization || ''}
              onChange={(e) => handleInputChange('titleTagsOptimization', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Meta Descriptions</label>
            <textarea 
              className="w-full border rounded p-2" 
              rows={2} 
              placeholder="Assessment of meta descriptions"
              value={data.metaDescriptions || ''}
              onChange={(e) => handleInputChange('metaDescriptions', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Header Tags (H1, H2, H3)</label>
            <textarea 
              className="w-full border rounded p-2" 
              rows={2} 
              placeholder="Assessment of header tag usage"
              value={data.headerTags || ''}
              onChange={(e) => handleInputChange('headerTags', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Content SEO */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Content SEO</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Keyword Research</label>
            <textarea 
              className="w-full border rounded p-2" 
              rows={3} 
              placeholder="Current keyword strategy and opportunities"
              value={data.keywordResearch || ''}
              onChange={(e) => handleInputChange('keywordResearch', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content Optimization</label>
            <textarea 
              className="w-full border rounded p-2" 
              rows={3} 
              placeholder="How well is content optimized for target keywords?"
              value={data.contentOptimization || ''}
              onChange={(e) => handleInputChange('contentOptimization', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* SEO Recommendations */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Recommendations</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Technical Improvements</label>
            <textarea 
              className="w-full border rounded p-2" 
              rows={3} 
              placeholder="Technical SEO improvements needed"
              value={data.technicalImprovements || ''}
              onChange={(e) => handleInputChange('technicalImprovements', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content Strategy</label>
            <textarea 
              className="w-full border rounded p-2" 
              rows={3} 
              placeholder="Content strategy recommendations for SEO"
              value={data.contentStrategy || ''}
              onChange={(e) => handleInputChange('contentStrategy', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 