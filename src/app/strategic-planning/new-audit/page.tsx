"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import PageHeader from '../../../components/elements/PageHeader';
import StepProgressBar from '../../../components/StepProgressBar';
import Step1AuditTypes from './components/Step1AuditTypes';
import Step2AuditForms from './components/Step2AuditForms';
import Step3AuditDetails from './components/Step3AuditDetails';
import { AuditDataProvider, useAuditData } from './AuditDataContext';
import AuditHeader from './components/AuditHeader';

import { AUDIT_FIELD_DEFINITIONS } from "./utils/auditFieldDefinitions";

export default function NewAuditPage() {
  return (
    <AuditDataProvider>
      <NewAuditPageContent />
    </AuditDataProvider>
  );
}

function NewAuditPageContent() {
  const [selectedAuditTypes, setSelectedAuditTypes] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const { clientId, setClientId, projectId, setProjectId, auditNumber, setAuditNumber, setAuditData, auditData } = useAuditData();
  const [clients, setClients] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);


  // Generate audit number on mount if not set
  useEffect(() => {
    if (!auditNumber) {
      setAuditNumber(
        `AUD-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`
      );
    }
  }, [auditNumber, setAuditNumber]);

  // Load clients for Step 1, and both clients/projects for Step 3
  useEffect(() => {
    fetch('/data/clients.json')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setClients(data);
        else if (data && Array.isArray(data.clients)) setClients(data.clients);
        else setClients([]);
      });
    if (step === 3) {
      fetch('/data/projects.json')
        .then(res => res.json())
        .then(data => setProjects(data.projects));
    }
  }, [step]);

  const selectedClient = clients.find((c) => c.id === clientId);
  const clientProjects = selectedClient?.projects || [];


  // Returns an object with all fields for a given audit type, all set to null
  const getDefaultAuditData = (auditTypeId: string): Record<string, unknown> => {
    const def = AUDIT_FIELD_DEFINITIONS[auditTypeId];
    if (!def) return {};

    const data: Record<string, any> = {};
    
    // Special handling for social (nested platforms)
    if (auditTypeId === 'social') {
      def.sections?.forEach(section => {
        const platformId = section.name.split(' ')[0].toLowerCase(); // e.g., 'facebook', 'instagram', 'general'
        data[platformId] = {};
        section.fields.forEach(field => {
          data[platformId][field.id] = null;
        });
      });
    } else {
      def.sections?.forEach(section => {
        section.fields.forEach(field => {
          data[field.id] = null;
        });
      });
      def.fields?.forEach(field => {
        data[field.id] = null;
      });
    }

    // Media buying still needs its specialized structure
    if (auditTypeId === 'media_buying') {
      return {
        marketingGoals: null,
        notesGaps: null,
        campaignAudits: [],
        adSetAudits: [],
        adLevelAudits: [],
        pixelSdkSetup: null,
        eventTracking: null,
        utmTracking: null,
        attributionModel: null,
        adDisapprovals: null,
        policyViolations: null,
        notesRecommendationsTracking: null,
        channelBreakdown: null,
        budgetDistribution: null,
        performanceByChannel: null,
        opportunitiesToReallocate: null,
        lowPerformingSegments: null,
        highFrequencyIssues: null,
        underperformingCreatives: null,
        notesActionPoints: null,
        keyStrengths: null,
        keyWeaknesses: null,
        topPriorityFixes: null,
        quickWins: null,
        longTermOpportunities: null,
        ownerDeadline: null,
        auditConductedBy: null,
        dateOfAudit: null,
        signatureReviewer: null,
      };
    }

    return data;
  };

  const handleAuditTypeToggle = (auditTypeId: string) => {
    setSelectedAuditTypes(prev => {
      const isSelected = prev.includes(auditTypeId);
      if (isSelected) {
        setAuditData(auditTypeId, {});
        return prev.filter(id => id !== auditTypeId);
      } else {
        setAuditData(auditTypeId, getDefaultAuditData(auditTypeId));
        return [...prev, auditTypeId];
      }
    });
  };

  const canProceed = () => {
    if (step === 1) return selectedAuditTypes.length > 0;
    if (step === 2) return true; // Always allow proceeding from step 2
    return false;
  };

  const handleNext = () => {
    if (canProceed()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => setStep(step - 1);

  const handleCreateAudit = () => {
    // Redirect to strategic planning dashboard or perform save logic
    window.location.href = "/strategic-planning";
  };

  const handleDownload = async () => {
    try {
      const { generateAuditPDF } = await import('./utils/pdfGenerator');
      
      const selectedClient = clients.find((c) => c.id === clientId);
      const selectedProject = projects.find((p) => p.id === projectId);
      
      await generateAuditPDF({
        auditData,
        selectedAuditTypes,
        clientName: selectedClient?.client_name || 'N/A',
        projectName: selectedProject?.name || 'N/A',
        auditNumber,
      });
    } catch (error) {
      console.error('Error in handleDownload:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <AuditHeader
              clientId={clientId}
              setClientId={setClientId}
              projectId={projectId}
              setProjectId={setProjectId}
              auditNumber={auditNumber}
              clients={clients}
              projects={clientProjects}
            />
            <Step1AuditTypes
              selectedAuditTypes={selectedAuditTypes}
              onAuditTypeToggle={handleAuditTypeToggle}
            />
          </>
        );
      case 2:
        return (
          <Step2AuditForms
            selectedAuditTypes={selectedAuditTypes}
          />
        );
      case 3:
        return (
          <>
            <AuditHeader
              clientId={clientId}
              projectId={projectId}
              auditNumber={auditNumber}
              readOnly={true}
              clients={clients}
              projects={projects}
            />
            <Step3AuditDetails
              selectedAuditTypes={selectedAuditTypes}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-3 md:p-4 max-w-7xl mx-auto">
      <PageHeader 
        title="Create New Audit" 
        actions={[
          {
            name: "Back to Strategic Planning",
            icon: ArrowLeftIcon,
            onClick: () => window.location.href = "/strategic-planning"
          }
        ]}
      />

      {/* Progress Bar */}
      <StepProgressBar currentStep={step} />

      {/* Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm">
        {renderStepContent()}

        {/* Navigation */}
        {step < 3 && (
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`px-6 py-2 rounded-lg border transition-colors ${
                step === 1
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Back
            </button>

            <div className="flex space-x-3">
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  canProceed()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleBack}
              className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
            <div className="flex space-x-3">
              <button
                onClick={handleDownload}
                className="px-6 py-2 rounded-lg border border-blue-600 text-blue-600 bg-white hover:bg-blue-50"
              >
                Download
              </button>
              <button
                onClick={handleCreateAudit}
                className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 