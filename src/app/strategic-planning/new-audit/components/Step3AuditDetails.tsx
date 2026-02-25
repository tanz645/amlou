import React, { useEffect, useState } from 'react';
import { useAuditData } from '../AuditDataContext';
import MediaBuyingAuditResult from './MediaBuyingAuditResult';
import GenericAuditResult from './GenericAuditResult';
interface Step3AuditDetailsProps {
  selectedAuditTypes: string[];
}

interface Client { id: string; client_name: string; }
interface Project { id: string; name: string; }

const prettifyLabel = (label: string) =>
  label
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/^./, str => str.toUpperCase());

const Step3AuditDetails: React.FC<Step3AuditDetailsProps> = ({ selectedAuditTypes }) => {
  const { auditData, clientId, projectId, auditNumber } = useAuditData();
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/data/clients.json').then(res => res.json()).then(setClients);
    fetch('/data/projects.json').then(res => res.json()).then(data => setProjects(data.projects || []));
  }, []);

  const clientName = clients.find(c => c.id === clientId)?.client_name || 'Not selected';
  const projectName = projects.find(p => p.id === projectId)?.name || 'Not selected';

  const today = new Date();
  const formattedDate = today.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-8">
      {/* Show selected client, project, and audit number */}
      <div className="mb-4 p-4 bg-blue-50 rounded-lg flex flex-col md:flex-row gap-4">
        <div><span className="font-semibold">Client:</span> {clientName}</div>
        <div><span className="font-semibold">Project:</span> {projectName}</div>
        <div><span className="font-semibold">Audit Number:</span> {auditNumber || <span className="text-gray-400">Not set</span>}</div>
      </div>
      <h1 className="text-3xl font-bold text-blue-900 mb-2">Primary audit result</h1>
      <div className="text-sm text-gray-500 mb-6">Report Print Date: {formattedDate}</div>
      <div className="bg-white border border-blue-200 rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-blue-700 mb-3">Types of audits done</h2>
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedAuditTypes.map(type => (
            <span
              key={type}
              className="inline-block rounded-full bg-blue-50 text-blue-700 px-3 py-1 font-medium text-sm mr-2 mb-2"
            >
              {prettifyLabel(type)}
            </span>
          ))}
        </div>
      </div>

      {/* Render Audit Results */}
      {selectedAuditTypes.map(type => {
        if (type === 'media_buying') {
          return (
            <div key={type} className="bg-white border border-blue-200 rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold text-blue-700 mb-4">Media Buying Audit Results</h2>
              <MediaBuyingAuditResult data={auditData['media_buying'] as Record<string, any> || {}} />
            </div>
          );
        }

        // Use generic result for all others
        const title = prettifyLabel(type) + " Audit Results";
        return (
          <div key={type} className="bg-white border border-blue-200 rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">{title}</h2>
            <GenericAuditResult 
              data={auditData[type] as Record<string, any> || {}} 
              auditTypeId={type}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Step3AuditDetails;