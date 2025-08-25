import React, { useEffect } from 'react';

interface AuditHeaderProps {
  clientId: string;
  setClientId?: (id: string) => void;
  projectId: string;
  setProjectId?: (id: string) => void;
  auditNumber: string;
  readOnly?: boolean;
  clients?: { id: string; client_name: string }[];
  projects?: { id: string; name: string; client_id: string }[];
}

const AuditHeader: React.FC<AuditHeaderProps> = ({ clientId, setClientId, projectId, setProjectId, auditNumber, readOnly = false, clients = [], projects = [] }) => {
  // Find selected client and project
  const client = clients.find(c => c.id === clientId);
  const filteredProjects = projects.filter(p => p.client_id === clientId);
  const project = filteredProjects.find(p => p.id === projectId);

  // When client changes, reset project (only in editable mode)
  useEffect(() => {
    if (!readOnly && setProjectId && clientId && (!projectId || !filteredProjects.some(p => p.id === projectId))) {
      setProjectId(filteredProjects[0]?.id || '');
    }
    // eslint-disable-next-line
  }, [clientId]);

  return (
    <div className="flex flex-col md:flex-row md:items-end gap-4 bg-white border border-blue-100 rounded-xl shadow p-6 mb-6">
      {/* Client */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-blue-700 mb-1">Client</label>
        {readOnly ? (
          <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-800 font-semibold">{client?.client_name || '-'}</div>
        ) : (
          <select
            className="w-full border rounded-lg px-3 py-2"
            value={clientId}
            onChange={e => setClientId && setClientId(e.target.value)}
          >
            <option value="">Select a client...</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>{client.client_name}</option>
            ))}
          </select>
        )}
      </div>
      {/* Project */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-blue-700 mb-1">Project</label>
        {readOnly ? (
          <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-800 font-semibold">{project?.name || '-'}</div>
        ) : (
          <select
            className="w-full border rounded-lg px-3 py-2"
            value={projectId}
            onChange={e => setProjectId && setProjectId(e.target.value)}
            disabled={!clientId}
          >
            <option value="">{clientId ? 'Select a project...' : 'Select a client first'}</option>
            {filteredProjects.map(project => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
        )}
      </div>
      {/* Audit number (read-only) */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-blue-700 mb-1">Audit Number</label>
        <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-800 font-mono tracking-wide">{auditNumber}</div>
      </div>
    </div>
  );
};

export default AuditHeader; 