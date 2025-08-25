'use client';

import React, { useState } from 'react';
import { DocumentTextIcon, ChartBarIcon, CheckCircleIcon, PlusIcon, PencilIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Audit {
  id: string;
  date: string;
  auditor: string;
  status: 'completed' | 'in_progress' | 'pending';
  strengths: string[];
  concerns: string[];
  risks: string[];
  recommendations: string[];
  notes: string;
}

interface Project {
  id: string;
  name: string;
  status: string;
}

interface AuditStrategyProps {
  project: Project;
}

const AuditStrategy: React.FC<AuditStrategyProps> = ({ project }) => {
  const [expandedAudits, setExpandedAudits] = useState<string[]>(['1']);
  const [editingAudit, setEditingAudit] = useState<string | null>(null);

  // Mock audit data - in real app this would come from API
  const [audits, setAudits] = useState<Audit[]>([
    {
      id: '1',
      date: '2024-01-15',
      auditor: 'John Smith',
      status: 'completed',
      strengths: [
        'Strong client communication',
        'Experienced project team',
        'Clear deliverables defined'
      ],
      concerns: [
        'Timeline may need adjustment',
        'Resource allocation review needed'
      ],
      risks: [
        'Potential scope creep',
        'Client feedback delays'
      ],
      recommendations: [
        'Schedule weekly progress reviews',
        'Establish clear communication protocols',
        'Set up automated status reporting'
      ],
      notes: 'Overall project is progressing well with minor adjustments needed for timeline management.'
    },
    {
      id: '2',
      date: '2024-01-08',
      auditor: 'Sarah Johnson',
      status: 'completed',
      strengths: [
        'Excellent technical architecture',
        'Strong stakeholder engagement'
      ],
      concerns: [
        'Budget monitoring required'
      ],
      risks: [
        'Third-party dependency delays'
      ],
      recommendations: [
        'Implement budget tracking tools',
        'Establish backup vendor relationships'
      ],
      notes: 'Technical foundation is solid, focus on budget management and vendor relationships.'
    }
  ]);

  const toggleAudit = (auditId: string) => {
    setExpandedAudits(prev => 
      prev.includes(auditId) 
        ? prev.filter(id => id !== auditId)
        : [...prev, auditId]
    );
  };

  const startEditing = (auditId: string) => {
    setEditingAudit(auditId);
  };

  const saveAudit = (auditId: string, updatedData: Partial<Audit>) => {
    setAudits(prev => prev.map(audit => 
      audit.id === auditId ? { ...audit, ...updatedData } : audit
    ));
    setEditingAudit(null);
  };

  const createNewAudit = () => {
    const newAudit: Audit = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      auditor: '',
      status: 'pending',
      strengths: [],
      concerns: [],
      risks: [],
      recommendations: [],
      notes: ''
    };
    setAudits(prev => [newAudit, ...prev]);
    setExpandedAudits(prev => [newAudit.id, ...prev]);
    setEditingAudit(newAudit.id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Project Status Header */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">{project.name}</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            project.status === 'completed' ? 'bg-green-100 text-green-800' :
            project.status === 'active' ? 'bg-blue-100 text-blue-800' :
            project.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {project.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>
      </div>

      {/* Audits Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <DocumentTextIcon className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-semibold">Project Audits</h3>
          </div>
          <button
            onClick={createNewAudit}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
          >
            <PlusIcon className="w-4 h-4" />
            New Audit
          </button>
        </div>

        <div className="space-y-4">
          {audits.map((audit) => (
            <div key={audit.id} className="border rounded-lg">
              <button
                onClick={() => toggleAudit(audit.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {expandedAudits.includes(audit.id) ? (
                    <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronRightIcon className="w-5 h-5 text-gray-500" />
                  )}
                  <div className="text-left">
                    <h4 className="font-medium text-gray-900">Audit #{audit.id}</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(audit.date).toLocaleDateString()} • {audit.auditor}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(audit.status)}`}>
                    {audit.status.replace('_', ' ').toUpperCase()}
                  </span>
                  {editingAudit !== audit.id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startEditing(audit.id);
                      }}
                      className="p-1 text-gray-400 hover:text-blue-600"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </button>

              {expandedAudits.includes(audit.id) && (
                <div className="px-4 pb-4">
                  {editingAudit === audit.id ? (
                    <div className="space-y-4 mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                          <input
                            type="date"
                            value={audit.date}
                            onChange={(e) => saveAudit(audit.id, { date: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Auditor</label>
                          <input
                            type="text"
                            value={audit.auditor}
                            onChange={(e) => saveAudit(audit.id, { auditor: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                        <textarea
                          value={audit.notes}
                          onChange={(e) => saveAudit(audit.id, { notes: e.target.value })}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <div className="space-y-4">
                        <div className="p-4 bg-green-50 rounded-lg">
                          <h5 className="font-medium text-green-900 mb-2">Strengths</h5>
                          <ul className="text-green-700 text-sm space-y-1">
                            {audit.strengths.map((strength, index) => (
                              <li key={index}>• {strength}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="p-4 bg-yellow-50 rounded-lg">
                          <h5 className="font-medium text-yellow-900 mb-2">Areas of Concern</h5>
                          <ul className="text-yellow-700 text-sm space-y-1">
                            {audit.concerns.map((concern, index) => (
                              <li key={index}>• {concern}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="p-4 bg-red-50 rounded-lg">
                          <h5 className="font-medium text-red-900 mb-2">Risks</h5>
                          <ul className="text-red-700 text-sm space-y-1">
                            {audit.risks.map((risk, index) => (
                              <li key={index}>• {risk}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h5 className="font-medium text-blue-900 mb-2">Recommendations</h5>
                          <ul className="text-blue-700 text-sm space-y-1">
                            {audit.recommendations.map((rec, index) => (
                              <li key={index}>• {rec}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Strategy Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <ChartBarIcon className="w-6 h-6 text-green-600" />
          <h3 className="text-xl font-semibold">Strategic Plan</h3>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Phase 1: Planning & Setup</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <CheckCircleIcon className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">Project scope definition</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircleIcon className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">Team assembly and roles assignment</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircleIcon className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">Timeline and milestone creation</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Phase 2: Development</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-blue-300 rounded-full"></div>
                <span className="text-sm text-gray-700">Core development work</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-blue-300 rounded-full"></div>
                <span className="text-sm text-gray-700">Regular client check-ins</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-blue-300 rounded-full"></div>
                <span className="text-sm text-gray-700">Quality assurance testing</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Phase 3: Delivery</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-500">Final review and approval</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-500">Client training and handover</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-500">Project closure and documentation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditStrategy; 