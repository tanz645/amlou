"use client";

import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import PageHeader from '../../../../components/elements/PageHeader';
import StepProgressBar from '../../../../components/StepProgressBar';
import Step1AuditTypes from './components/Step1AuditTypes';
import Step2AuditForms from './components/Step2AuditForms';
import Step3AuditDetails from './components/Step3AuditDetails';

export default function NewAuditPage() {
  const [selectedAuditTypes, setSelectedAuditTypes] = useState<string[]>([]);
  const [auditName, setAuditName] = useState("");
  const [clientName, setClientName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [step, setStep] = useState(1);
  const [auditData, setAuditData] = useState<{ [key: string]: Record<string, string> }>({});
  const [auditNumber, setAuditNumber] = useState(
    `AUD-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`
  );
  const [auditDate, setAuditDate] = useState(new Date().toISOString().split('T')[0]);

  const handleAuditTypeToggle = (auditTypeId: string) => {
    setSelectedAuditTypes(prev => 
      prev.includes(auditTypeId) 
        ? prev.filter(id => id !== auditTypeId)
        : [...prev, auditTypeId]
    );
  };

  const handleAuditDataUpdate = (auditTypeId: string, data: Record<string, string>) => {
    setAuditData(prev => ({
      ...prev,
      [auditTypeId]: data
    }));
  };

  const canProceed = () => {
    if (step === 1) return selectedAuditTypes.length > 0;
    if (step === 2) return true; // Always allow proceeding from step 2
    if (step === 3) return auditName.trim() !== "";
    return false;
  };

  const handleNext = () => {
    if (canProceed()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => setStep(step - 1);

  const handleCreateAudit = () => {
    // Redirect to audits page
    window.location.href = "/strategic-planning/performance-audits";
  };

  const getTotalDuration = () => {
    const auditTypes = [
      { id: "comprehensive", duration: "2-3 hours" },
      { id: "seo", duration: "1-2 hours" },
      { id: "social", duration: "1-2 hours" },
      { id: "email", duration: "1 hour" },
      { id: "media_buying", duration: "1-2 hours" },
      { id: "website", duration: "1-2 hours" },
      { id: "mobile", duration: "1-2 hours" },
      { id: "content", duration: "1-2 hours" },
      { id: "campaigns", duration: "1-2 hours" },
      { id: "internal", duration: "2-3 hours" },
    ];

    return selectedAuditTypes.reduce((total, auditTypeId) => {
      const audit = auditTypes.find(type => type.id === auditTypeId);
      const duration = audit?.duration.split('-')[1]?.split(' ')[0] || '2';
      return total + parseInt(duration);
    }, 0);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Step1AuditTypes
            selectedAuditTypes={selectedAuditTypes}
            onAuditTypeToggle={handleAuditTypeToggle}
          />
        );
      case 2:
        return (
          <Step2AuditForms
            selectedAuditTypes={selectedAuditTypes}
            onAuditDataUpdate={handleAuditDataUpdate}
            auditData={auditData}
          />
        );
      case 3:
        return (
          <Step3AuditDetails
            auditName={auditName}
            onAuditNameChange={setAuditName}
            clientName={clientName}
            onClientNameChange={setClientName}
            projectName={projectName}
            onProjectNameChange={setProjectName}
            auditNumber={auditNumber}
            onAuditNumberChange={setAuditNumber}
            auditDate={auditDate}
            onAuditDateChange={setAuditDate}
            selectedAuditTypes={selectedAuditTypes}
            totalDuration={getTotalDuration()}
            auditData={auditData}
            onBack={handleBack}
            onFinish={handleCreateAudit}
          />
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
            name: "Back to Audits",
            icon: ArrowLeftIcon,
            onClick: () => window.location.href = "/strategic-planning/performance-audits"
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
      </div>
    </div>
  );
}