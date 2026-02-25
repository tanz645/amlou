import React, { useState, useEffect } from 'react';
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
import PPCTab from '../tabs/PPCTab';
import { useAuditData } from '../AuditDataContext';

interface Step2AuditFormsProps {
  selectedAuditTypes: string[];
}

interface Client { id: string; client_name: string; }
interface Project { id: string; name: string; }

export default function Step2AuditForms({ 
  selectedAuditTypes
}: Step2AuditFormsProps) {
  const [activeTab, setActiveTab] = useState<string>(selectedAuditTypes[0] || '');
  const { auditData, setAuditData, clientId, projectId, auditNumber } = useAuditData();
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/data/clients.json').then(res => res.json()).then(setClients);
    fetch('/data/projects.json').then(res => res.json()).then(data => setProjects(data.projects || []));
  }, []);

  const clientName = clients.find(c => c.id === clientId)?.client_name || 'Not selected';
  const projectName = projects.find(p => p.id === projectId)?.name || 'Not selected';

  const auditTypes = [
    { id: "comprehensive", name: "Comprehensive Audit" },
    { id: "ppc", name: "PPC Audit" },
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
    const currentData = (auditData[auditTypeId] as Record<string, string>) || {};
    const handleDataUpdate = (data: Record<string, string>) => setAuditData(auditTypeId, data);
    switch (auditTypeId) {
      case 'comprehensive':
        return <ComprehensiveTab data={currentData} onDataUpdate={handleDataUpdate} />;
      case 'ppc':
        return <PPCTab data={currentData} onDataUpdate={handleDataUpdate} />;
      case 'seo':
        return <SEOTab data={currentData} onDataUpdate={handleDataUpdate} />;
      case 'social':
        return <SocialTab data={currentData} onDataUpdate={handleDataUpdate} />;
      case 'email':
        return <EmailTab data={currentData} onDataUpdate={handleDataUpdate} />;
      case 'media_buying':
        return <MediaBuyingTab />;
      case 'website':
        return <WebsiteTab data={currentData} onDataUpdate={handleDataUpdate} />;
      case 'mobile':
        return <MobileTab data={currentData} onDataUpdate={handleDataUpdate} />;
      case 'content':
        return <ContentTab data={currentData} onDataUpdate={handleDataUpdate} />;
      case 'campaigns':
        return <CampaignsTab data={currentData} onDataUpdate={handleDataUpdate} />;
      case 'internal':
        return <InternalTab data={currentData} onDataUpdate={handleDataUpdate} />;
      default:
        return <div>Select an audit type to get started.</div>;
    }
  };

  return (
    <div>
      {/* Show selected client, project, and audit number */}
      <div className="mb-4 p-4 bg-blue-50 rounded-lg flex flex-col md:flex-row gap-4">
        <div><span className="font-semibold">Client:</span> {clientName}</div>
        <div><span className="font-semibold">Project:</span> {projectName}</div>
        <div><span className="font-semibold">Audit Number:</span> {auditNumber || <span className="text-gray-400">Not set</span>}</div>
      </div>
      {/* Tabs and forms */}
      <div className="mb-4">
        <div className="flex gap-2 mb-2">
          {selectedAuditTypes.map((type) => {
            const auditType = auditTypes.find((a) => a.id === type);
            return (
              <button
                key={type}
                className={`px-4 py-2 rounded-lg font-medium ${activeTab === type ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'}`}
                onClick={() => setActiveTab(type)}
              >
                {auditType ? auditType.name : type}
              </button>
            );
          })}
        </div>
        {activeTab && renderAuditForm(activeTab)}
      </div>
    </div>
  );
} 