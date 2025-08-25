import React, { useState } from 'react';
import ComprehensiveTab from '../tabs/ComprehensiveTab';
import SEOTab from '../tabs/SEOTab';
import SocialTab from '../tabs/SocialTab';
import EmailTab from '../tabs/EmailTab';
import MediaBuyingTab from '../tabs/MediaBuyingTab';
import WebsiteTab from '../tabs/WebsiteTab';
import MobileTab from '../tabs/MobileTab';
import ContentTab from '../tabs/ContentTab';
import CampaignsTab from '../tabs/CampaignsTab';
import InternalTab from '../tabs/InternalTab';

interface Step2AuditFormsProps {
  selectedAuditTypes: string[];
  onAuditDataUpdate: (auditTypeId: string, data: Record<string, string>) => void;
  auditData: { [key: string]: Record<string, string> };
}

export default function Step2AuditForms({ 
  selectedAuditTypes, 
  onAuditDataUpdate, 
  auditData 
}: Step2AuditFormsProps) {
  const [activeTab, setActiveTab] = useState<string>(selectedAuditTypes[0] || '');

  const auditTypes = [
    { id: "comprehensive", name: "Comprehensive Audit" },
    { id: "seo", name: "SEO Audit" },
    { id: "social", name: "Social Media Audit" },
    { id: "email", name: "Email Marketing Audit" },
    { id: "media_buying", name: "Media Buying Audit" },
    { id: "website", name: "Website Performance Audit" },
    { id: "mobile", name: "Mobile App Audit" },
    { id: "content", name: "Content Audit" },
    { id: "campaigns", name: "Campaigns Audit" },
    { id: "internal", name: "Internal Audit" },
  ];

  const renderAuditForm = (auditTypeId: string) => {
    const currentData = auditData[auditTypeId] || {};
    
    switch (auditTypeId) {
      case 'comprehensive':
        return <ComprehensiveTab data={currentData} onDataUpdate={(data) => onAuditDataUpdate(auditTypeId, data)} />;
      case 'seo':
        return <SEOTab data={currentData} onDataUpdate={(data) => onAuditDataUpdate(auditTypeId, data)} />;
      case 'social':
        return <SocialTab data={currentData} onDataUpdate={(data) => onAuditDataUpdate(auditTypeId, data)} />;
      case 'email':
        return <EmailTab data={currentData} onDataUpdate={(data) => onAuditDataUpdate(auditTypeId, data)} />;
      case 'media_buying':
        return <MediaBuyingTab data={currentData} onDataUpdate={(data) => onAuditDataUpdate(auditTypeId, data)} />;
      case 'website':
        return <WebsiteTab data={currentData} onDataUpdate={(data) => onAuditDataUpdate(auditTypeId, data)} />;
      case 'mobile':
        return <MobileTab data={currentData} onDataUpdate={(data) => onAuditDataUpdate(auditTypeId, data)} />;
      case 'content':
        return <ContentTab data={currentData} onDataUpdate={(data) => onAuditDataUpdate(auditTypeId, data)} />;
      case 'campaigns':
        return <CampaignsTab data={currentData} onDataUpdate={(data) => onAuditDataUpdate(auditTypeId, data)} />;
      case 'internal':
        return <InternalTab data={currentData} onDataUpdate={(data) => onAuditDataUpdate(auditTypeId, data)} />;
      default:
        return <div>Select an audit type to get started.</div>;
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">Complete Digital Marketing Audit Forms</h2>
        <p className="text-gray-600 text-sm">Do your audit step by step based on your marketing communication channels and platforms</p>
      </div>

      {/* Tabs for selected audit types */}
      {selectedAuditTypes.length > 1 && (
        <div className="border-b border-gray-200">
          <div className="flex space-x-1 overflow-x-auto pb-1">
            {selectedAuditTypes.map((auditTypeId) => {
              const audit = auditTypes.find(type => type.id === auditTypeId);
              const isActive = activeTab === auditTypeId;
              
              return (
                <button
                  key={auditTypeId}
                  onClick={() => setActiveTab(auditTypeId)}
                  className={`px-3 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                    isActive 
                      ? 'bg-white border border-gray-200 border-b-0 text-gray-900' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {audit?.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Content for active tab */}
      <div className="space-y-4">
        {renderAuditForm(activeTab || selectedAuditTypes[0])}
      </div>
    </div>
  );
} 