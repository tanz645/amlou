import React from 'react';
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

const auditTypes = [
  {
    id: "ppc",
    name: "PPC Audit",
    description: "Paid advertising and PPC campaign performance analysis",
    icon: "TagIcon",
    duration: "1-2 hours",
    color: "red"
  },
  {
    id: "media_buying",
    name: "Media Buying Audit",
    description: "Media buying strategy and performance analysis",
    icon: "TagIcon",
    duration: "1-2 hours",
    color: "rose"
  },
  {
    id: "comprehensive",
    name: "Comprehensive Audit",
    description: "Full analysis across all platforms and channels",
    icon: "MagnifyingGlassIcon",
    duration: "2-3 hours",
    color: "purple"
  },
  {
    id: "seo",
    name: "SEO Audit",
    description: "Search engine optimization analysis",
    icon: "GlobeAltIcon",
    duration: "1-2 hours",
    color: "blue"
  },
  {
    id: "social",
    name: "Social Media Audit",
    description: "Social media performance analysis",
    icon: "ChatBubbleLeftRightIcon",
    duration: "1-2 hours",
    color: "green"
  },
  {
    id: "email",
    name: "Email Marketing Audit",
    description: "Email campaign and deliverability analysis",
    icon: "EnvelopeIcon",
    duration: "1 hour",
    color: "orange"
  },
  {
    id: "website",
    name: "Website Performance Audit",
    description: "Website analytics and user experience analysis",
    icon: "ComputerDesktopIcon",
    duration: "1-2 hours",
    color: "indigo"
  },
  {
    id: "mobile",
    name: "Mobile App Audit",
    description: "Mobile application performance analysis",
    icon: "DevicePhoneMobileIcon",
    duration: "1-2 hours",
    color: "pink"
  },
  {
    id: "content",
    name: "Content Audit",
    description: "Content quality, relevance, and performance analysis",
    icon: "DocumentTextIcon",
    duration: "1-2 hours",
    color: "teal"
  },
  {
    id: "campaigns",
    name: "Campaigns Audit",
    description: "Analysis of marketing campaigns, objectives, and results",
    icon: "ChartBarIcon",
    duration: "1-2 hours",
    color: "teal"
  },
  {
    id: "internal",
    name: "Internal Audit",
    description: "Internal processes, compliance, and operational analysis",
    icon: "UserGroupIcon",
    duration: "2-3 hours",
    color: "amber"
  },
];

interface Step1AuditTypesProps {
  selectedAuditTypes: string[];
  onAuditTypeToggle: (auditTypeId: string) => void;
}

export default function Step1AuditTypes({ selectedAuditTypes, onAuditTypeToggle }: Step1AuditTypesProps) {
  const selectedAudits = auditTypes.filter(type => selectedAuditTypes.includes(type.id));

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      purple: "bg-purple-100 text-purple-700 border-purple-200",
      blue: "bg-blue-100 text-blue-700 border-blue-200",
      green: "bg-green-100 text-green-700 border-green-200",
      orange: "bg-orange-100 text-orange-700 border-orange-200",
      red: "bg-red-100 text-red-700 border-red-200",
      indigo: "bg-indigo-100 text-indigo-700 border-indigo-200",
      pink: "bg-pink-100 text-pink-700 border-pink-200",
      teal: "bg-teal-100 text-teal-700 border-teal-200",
      amber: "bg-amber-100 text-amber-700 border-amber-200",
    };
    return colorMap[color] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const getTotalDuration = () => {
    return selectedAudits.reduce((total, audit) => {
      const duration = audit.duration.split('-')[1]?.split(' ')[0] || '2';
      return total + parseInt(duration);
    }, 0);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">Choose Audit Types</h2>
        <p className="text-gray-600 text-sm">Select one or more audit types to perform</p>
      </div>
      

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
        {auditTypes.map((auditType) => {
          const isSelected = selectedAuditTypes.includes(auditType.id);
          
          return (
            <button
              key={auditType.id}
              onClick={() => onAuditTypeToggle(auditType.id)}
              className={`p-3 md:p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                isSelected 
                  ? `${getColorClasses(auditType.color)} border-current` 
                  : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`h-5 w-5 md:h-6 md:w-6 ${isSelected ? 'text-current' : 'text-gray-600'}`} />
                {isSelected && <CheckCircleIcon className="h-4 w-4 md:h-5 md:w-5 text-current" />}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-xs md:text-sm">{auditType.name}</h3>
              <p className="text-xs text-gray-600 mb-2">{auditType.description}</p>
              <div className="flex items-center text-xs text-gray-500">
                <ClockIcon className="h-3 w-3 mr-1" />
                {auditType.duration}
              </div>
            </button>
          );
        })}
      </div>

      {selectedAuditTypes.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4">
          <h3 className="font-medium text-blue-900 mb-2 text-sm">Selected Audits ({selectedAuditTypes.length})</h3>
          <div className="flex flex-wrap gap-2">
            {selectedAudits.map((audit) => (
              <span key={audit.id} className={`px-2 py-1 rounded-full text-xs font-medium ${getColorClasses(audit.color)}`}>
                {audit.name}
              </span>
            ))}
          </div>
          <p className="text-xs md:text-sm text-blue-700 mt-2">
            Estimated total duration: {getTotalDuration()} hours
          </p>
        </div>
      )}
    </div>
  );
} 