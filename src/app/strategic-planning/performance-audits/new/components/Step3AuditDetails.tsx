'use client';

import React, { useState } from 'react';
import { DocumentTextIcon, ChartBarIcon, MegaphoneIcon, EyeIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import jsPDF from 'jspdf';

interface AuditData {
  [key: string]: Record<string, unknown>;
}

interface Step3AuditDetailsProps {
  auditName: string;
  onAuditNameChange: (name: string) => void;
  clientName: string;
  onClientNameChange: (name: string) => void;
  projectName: string;
  onProjectNameChange: (name: string) => void;
  auditNumber: string;
  onAuditNumberChange: (num: string) => void;
  auditDate: string;
  onAuditDateChange: (date: string) => void;
  selectedAuditTypes: string[];
  totalDuration: number;
  auditData?: AuditData;
  onBack: () => void;
  onFinish: () => void;
}

const Step3AuditDetails: React.FC<Step3AuditDetailsProps> = ({ 
  auditName, 
  onAuditNameChange, 
  clientName,
  onClientNameChange,
  projectName,
  onProjectNameChange,
  auditNumber,
  onAuditNumberChange,
  auditDate,
  onAuditDateChange,
  selectedAuditTypes, 
  totalDuration,
  auditData = {},
  onBack,
  onFinish
}: Step3AuditDetailsProps) => {
  const [resultType, setResultType] = useState<'detailed' | 'summary'>('detailed');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  // Track issues: { [auditType]: { [fieldKey]: boolean } }
  const [issueFields, setIssueFields] = useState<{ [auditType: string]: { [fieldKey: string]: boolean } }>({});

  const handleIssueToggle = (auditType: string, fieldKey: string) => {
    setIssueFields(prev => ({
      ...prev,
      [auditType]: {
        ...prev[auditType],
        [fieldKey]: !prev[auditType]?.[fieldKey]
      }
    }));
  };

  // Get audit type names
  const getAuditTypeName = (typeId: string) => {
    const typeNames: { [key: string]: string } = {
      comprehensive: 'Comprehensive Audit',
      content: 'Content Audit',
      seo: 'SEO Audit',
      social: 'Social Media Audit',
      email: 'Email Marketing Audit',
      media_buying: 'Media Buying Audit',
      website: 'Website Performance Audit',
      mobile: 'Mobile App Audit',
      campaigns: 'Campaigns Audit',
      internal: 'Internal Audit'
    };
    return typeNames[typeId] || typeId;
  };

  // Get icon for audit type
  const getAuditIcon = (auditTypeId: string) => {
    const icons: { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> } = {
      comprehensive: DocumentTextIcon,
      seo: ChartBarIcon,
      social: MegaphoneIcon,
      email: DocumentTextIcon,
      media_buying: ChartBarIcon,
      website: EyeIcon,
      mobile: EyeIcon,
      content: DocumentTextIcon,
      campaigns: MegaphoneIcon,
      internal: AcademicCapIcon
    };
    return icons[auditTypeId] || DocumentTextIcon;
  };

  // Get color for audit type
  const getAuditColor = (auditTypeId: string) => {
    const colors: { [key: string]: string } = {
      comprehensive: "text-blue-600",
      seo: "text-green-600",
      social: "text-purple-600",
      email: "text-orange-600",
      media_buying: "text-indigo-600",
      website: "text-teal-600",
      mobile: "text-pink-600",
      content: "text-blue-600",
      campaigns: "text-green-600",
      internal: "text-amber-600"
    };
    return colors[auditTypeId] || "text-gray-600";
  };

  // Helper function to display field value
  const displayFieldValue = (value: unknown) => {
    if (value === null || value === undefined || value === '') {
      return 'N/A';
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  };

  // Define all possible fields for each audit type
  const getAuditTypeFields = (auditTypeId: string) => {
    const fieldDefinitions: { [key: string]: { [key: string]: string } } = {
      comprehensive: {
        // Branding Audit
        logoUsageGuidelines: "Logo Usage Guidelines",
        colorPaletteDocumentation: "Color Palette Documentation",
        typographyGuidelines: "Typography Guidelines",
        brandVoiceMessaging: "Brand Voice & Messaging",
        internalBranding: "Internal Branding",
        externalBranding: "External Branding",
        brandConsistencyObservations: "Brand Consistency Observations",
        brandStrengthScore: "Brand Strength Score (1-10)",
        priorityAreasImprovement: "Priority Areas for Improvement",
        keyRecommendations: "Key Recommendations",
        
        // Communication Channels - Owned
        websiteUrl: "Website URL",
        websitePerformance: "Website Performance",
        websiteObservations: "Website Observations",
        blogUrl: "Blog URL",
        blogPerformance: "Blog Performance",
        blogObservations: "Blog Observations",
        emailFrequency: "Email Frequency",
        emailSubscriberCount: "Email Subscriber Count",
        emailOpenRate: "Email Open Rate",
        emailObservations: "Email Observations",
        
        // Social Media
        facebookFollowers: "Facebook Followers",
        facebookPerformance: "Facebook Performance",
        instagramFollowers: "Instagram Followers",
        instagramPerformance: "Instagram Performance",
        linkedinFollowers: "LinkedIn Followers",
        linkedinPerformance: "LinkedIn Performance",
        twitterFollowers: "Twitter/X Followers",
        twitterPerformance: "Twitter/X Performance",
        tiktokFollowers: "TikTok Followers",
        tiktokPerformance: "TikTok Performance",
        youtubeSubscribers: "YouTube Subscribers",
        youtubePerformance: "YouTube Performance",
        socialMediaStrategyAssessment: "Social Media Strategy Assessment",
        
        // Paid Channels
        googleAdsBudget: "Google Ads Budget",
        googleAdsCTR: "Google Ads CTR",
        googleAdsConversionRate: "Google Ads Conversion Rate",
        googleAdsObservations: "Google Ads Observations",
        facebookAdsBudget: "Facebook Ads Budget",
        facebookAdsCPC: "Facebook Ads CPC",
        facebookAdsROAS: "Facebook Ads ROAS",
        facebookAdsObservations: "Facebook Ads Observations",
        otherPaidChannels: "Other Paid Channels",
        
        // Earned Channels
        prMediaCoverage: "PR & Media Coverage",
        influencerPartnerships: "Influencer Partnerships"
      },
      
      content: {
        // Content Inventory
        totalContentPieces: "Total Content Pieces",
        contentTypesAvailable: "Content Types Available",
        contentAgeDistribution: "Content Age Distribution",
        
        // Content Performance Metrics
        averagePageViews: "Average Page Views",
        averageTimeOnPage: "Average Time on Page",
        bounceRate: "Bounce Rate",
        socialShares: "Social Shares",
        commentsEngagement: "Comments/Engagement",
        conversionRate: "Conversion Rate",
        
        // Content Quality Assessment
        contentRelevanceScore: "Content Relevance Score (1-10)",
        contentAccuracyAssessment: "Content Accuracy Assessment",
        contentDepthValue: "Content Depth & Value",
        contentConsistency: "Content Consistency",
        
        // Content Strategy
        contentCalendar: "Content Calendar",
        contentThemesTopics: "Content Themes & Topics",
        seoIntegration: "SEO Integration",
        contentDistributionStrategy: "Content Distribution Strategy",
        
        // Content Recommendations
        contentGaps: "Content Gaps",
        contentOptimizationOpportunities: "Content Optimization Opportunities",
        newContentIdeas: "New Content Ideas",
        contentPerformanceImprovements: "Content Performance Improvements"
      },
      
      seo: {
        // Technical SEO
        websiteSpeed: "Website Speed",
        mobileResponsiveness: "Mobile Responsiveness",
        sslCertificate: "SSL Certificate",
        
        // On-Page SEO
        titleTagsOptimization: "Title Tags Optimization",
        metaDescriptions: "Meta Descriptions",
        headerTags: "Header Tags (H1, H2, H3)",
        
        // Content SEO
        keywordResearch: "Keyword Research",
        contentOptimization: "Content Optimization",
        
        // SEO Recommendations
        technicalImprovements: "Technical Improvements",
        contentStrategy: "Content Strategy"
      },
      
      social: {
        // Social Media Performance
        socialFollowers: "Total Social Followers",
        socialEngagement: "Average Engagement Rate",
        socialReach: "Average Reach",
        socialImpressions: "Total Impressions",
        
        // Content Strategy
        contentCalendar: "Content Calendar",
        postingFrequency: "Posting Frequency",
        contentTypes: "Content Types Used",
        
        // Platform Performance
        facebookMetrics: "Facebook Performance",
        instagramMetrics: "Instagram Performance",
        linkedinMetrics: "LinkedIn Performance",
        twitterMetrics: "Twitter Performance",
        
        // Recommendations
        socialStrategy: "Social Media Strategy",
        contentRecommendations: "Content Recommendations"
      },
      
      email: {
        // Email Performance
        subscriberCount: "Subscriber Count",
        openRate: "Average Open Rate",
        clickRate: "Average Click Rate",
        conversionRate: "Conversion Rate",
        
        // Email Strategy
        emailFrequency: "Email Frequency",
        emailTypes: "Email Types",
        segmentation: "Segmentation Strategy",
        
        // Content Quality
        subjectLines: "Subject Line Performance",
        emailDesign: "Email Design Quality",
        
        // Recommendations
        emailStrategy: "Email Strategy",
        optimizationTips: "Optimization Tips"
      },
      
      media_buying: {
        // Media Buying Performance
        totalBudget: "Total Media Buying Budget",
        totalImpressions: "Total Impressions",
        totalReach: "Total Reach",
        totalClicks: "Total Clicks",
        totalConversions: "Total Conversions",
        
        // Platform Performance
        googleAdsPerformance: "Google Ads Performance",
        facebookAdsPerformance: "Facebook Ads Performance",
        displayAdsPerformance: "Display Ads Performance",
        videoAdsPerformance: "Video Ads Performance",
        
        // Campaign Strategy
        targetingStrategy: "Targeting Strategy",
        creativeStrategy: "Creative Strategy",
        biddingStrategy: "Bidding Strategy",
        
        // Recommendations
        mediaBuyingOptimization: "Media Buying Optimization",
        budgetAllocation: "Budget Allocation Strategy"
      },
      
      website: {
        // Website Performance
        pageLoadSpeed: "Page Load Speed",
        mobilePerformance: "Mobile Performance",
        desktopPerformance: "Desktop Performance",
        coreWebVitals: "Core Web Vitals Score",
        
        // User Experience
        bounceRate: "Bounce Rate",
        timeOnSite: "Average Time on Site",
        pagesPerSession: "Pages Per Session",
        conversionRate: "Conversion Rate",
        
        // Technical Performance
        serverResponseTime: "Server Response Time",
        imageOptimization: "Image Optimization",
        cssOptimization: "CSS Optimization",
        jsOptimization: "JavaScript Optimization",
        
        // Recommendations
        performanceOptimization: "Performance Optimization",
        userExperienceImprovements: "User Experience Improvements"
      },
      
      mobile: {
        // Mobile App Performance
        appDownloads: "App Downloads",
        activeUsers: "Active Users",
        userRetention: "User Retention Rate",
        crashRate: "App Crash Rate",
        
        // App Store Performance
        appStoreRating: "App Store Rating",
        appStoreReviews: "App Store Reviews",
        appStoreRanking: "App Store Ranking",
        appStoreOptimization: "App Store Optimization",
        
        // User Engagement
        sessionDuration: "Average Session Duration",
        screenViews: "Screen Views",
        userActions: "User Actions",
        featureUsage: "Feature Usage",
        
        // Technical Performance
        appLoadTime: "App Load Time",
        apiResponseTime: "API Response Time",
        batteryUsage: "Battery Usage",
        dataUsage: "Data Usage",
        
        // Recommendations
        appOptimization: "App Optimization",
        userExperienceImprovements: "User Experience Improvements"
      },
      
      campaigns: {
        // Campaign Performance
        campaignBudget: "Total Campaign Budget",
        campaignReach: "Total Reach",
        campaignImpressions: "Total Impressions",
        campaignClicks: "Total Clicks",
        campaignConversions: "Total Conversions",
        
        // Campaign Strategy
        campaignTypes: "Campaign Types",
        targetingStrategy: "Targeting Strategy",
        creativeStrategy: "Creative Strategy",
        
        // Platform Performance
        googleAdsPerformance: "Google Ads Performance",
        facebookAdsPerformance: "Facebook Ads Performance",
        otherPlatforms: "Other Platforms",
        
        // Recommendations
        campaignOptimization: "Campaign Optimization",
        budgetAllocation: "Budget Allocation"
      },
      
      internal: {
        // Team Structure
        teamSize: "Team Size",
        teamRoles: "Team Roles",
        teamSkills: "Team Skills Assessment",
        
        // Marketing Process
        marketingProcess: "Marketing Process",
        workflowEfficiency: "Workflow Efficiency",
        collaborationTools: "Collaboration Tools",
        
        // Branding Alignment
        brandAlignment: "Brand Alignment",
        brandTraining: "Brand Training",
        
        // Recommendations
        teamDevelopment: "Team Development",
        processImprovements: "Process Improvements"
      }
    };
    
    return fieldDefinitions[auditTypeId] || {};
  };

  // Render detailed audit data section
  const renderDetailedAuditSection = (auditTypeId: string) => {
    const fields = getAuditTypeFields(auditTypeId);
    const auditTypeData = auditData[auditTypeId] || {};
    const IconComponent = getAuditIcon(auditTypeId);
    const colorClass = getAuditColor(auditTypeId);
    return (
      <div key={auditTypeId} className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
        <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
          <IconComponent className={`w-5 h-5 mr-2 ${colorClass}`} />
          {getAuditTypeName(auditTypeId)}
        </h4>
        <div className="space-y-2">
          {Object.entries(fields).map(([key, label]) => (
            <div
              key={key}
              className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mb-3"
            >
              <div>
                <span className="font-medium text-gray-800">{label}:</span>
                <span className="ml-2 text-gray-700">{displayFieldValue(auditTypeData[key])}</span>
                {issueFields[auditTypeId]?.[key] && <span className="ml-2 text-red-500">⚠️</span>}
              </div>
              <label className="flex items-center space-x-2 ml-6 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={!!issueFields[auditTypeId]?.[key]}
                  onChange={() => handleIssueToggle(auditTypeId, key)}
                  className="form-checkbox h-4 w-4 text-red-500"
                />
                <span className="text-xs text-gray-600 whitespace-nowrap">Add to Issue</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render summary audit data section
  const renderSummaryAuditSection = (auditTypeId: string) => {
    const IconComponent = getAuditIcon(auditTypeId);
    const colorClass = getAuditColor(auditTypeId);
    
    return (
      <div key={auditTypeId} className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <IconComponent className={`w-4 h-4 mr-2 ${colorClass}`} />
            <span className="font-medium text-gray-900">{getAuditTypeName(auditTypeId)}</span>
          </div>
          <span className="text-sm text-gray-500">Completed</span>
        </div>
        
        <div className="mt-3 text-sm text-gray-600">
          <p className="italic">Summary data will be displayed here after form completion.</p>
          <p className="mt-1">Key highlights and main recommendations will be shown.</p>
        </div>
      </div>
    );
  };

  // PDF Download Function
  const downloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const doc = new jsPDF({ unit: 'pt', format: 'a4' });
      const logoWidth = 60;
      const logoHeight = 20; // 3:1 ratio
      const logoX = 40;
      const logoY = 40;
      // Info block: 5 lines, 14pt each
      const infoBlockHeight = 5 * 14;
      // Vertically center info block with logo
      const infoY = logoY + (logoHeight / 2) - (infoBlockHeight / 2) + 7;
      const infoX = 540; // right margin for info block
      let logoDataUrl = '';
      try {
        const response = await fetch('/alhisab-logo.png');
        const blob = await response.blob();
        const reader = new FileReader();
        const dataUrlPromise = new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
        });
        reader.readAsDataURL(blob);
        logoDataUrl = await dataUrlPromise;
        doc.addImage(logoDataUrl, 'PNG', logoX, logoY, logoWidth, logoHeight, undefined, 'FAST');
      } catch { /* ignore logo load errors */ }

      // Info block to the right of the logo, right-aligned, vertical
      doc.setFontSize(10);
      doc.setTextColor(120);
      let infoLine = infoY;
      doc.text(`Client: ${clientName || '-'}`, infoX, infoLine, { align: 'right' });
      infoLine += 14;
      doc.text(`Project: ${projectName || '-'}`, infoX, infoLine, { align: 'right' });
      infoLine += 14;
      doc.text(`Audit ID: ${auditNumber}`, infoX, infoLine, { align: 'right' });
      infoLine += 14;
      doc.text(`Prepared by: Al-Hisab Team`, infoX, infoLine, { align: 'right' });
      infoLine += 14;
      doc.text(`Date: ${new Date(auditDate).toLocaleDateString()}`, infoX, infoLine, { align: 'right' });
      doc.setTextColor(0);

      // Add more vertical space below header
      const headerBottom = Math.max(logoY + logoHeight, infoY + infoBlockHeight);
      const titleY = headerBottom + 32;
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text(auditName || 'Digital Marketing Audit Report', 40, titleY);
      doc.setFontSize(13);
      doc.setFont('helvetica', 'normal');
      doc.text(`Audit Types: ${selectedAuditTypes.map(getAuditTypeName).join(', ')}`, 40, titleY + 20);
      doc.text(`View: ${resultType === 'detailed' ? 'Detailed Audit' : 'Audit Summary'}`, 40, titleY + 38);

      let yPosition = titleY + 60;
      doc.setLineWidth(0.5);
      doc.setDrawColor(200);

      // Audit Type Cards
      selectedAuditTypes.forEach((auditType) => {
        const fields = getAuditTypeFields(auditType);
        // Card border
        doc.roundedRect(40, yPosition, 515, 28 + Object.keys(fields).length * 22, 8, 8, 'S');
        // Card header
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(40, 80, 180);
        doc.text(getAuditTypeName(auditType), 52, yPosition + 20);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0);
        let fieldY = yPosition + 40;
        doc.setFontSize(11);
        Object.entries(fields).forEach(([key, label]) => {
          const value = auditData[auditType]?.[key] || 'N/A';
          const isIssue = !!issueFields[auditType]?.[key];
          // Color for issues
          if (isIssue) {
            doc.setTextColor(220, 38, 38); // red
          } else {
            doc.setTextColor(55, 65, 81); // gray-700
          }
          doc.text(`${label}:`, 60, fieldY);
          doc.setTextColor(isIssue ? 220 : 55, isIssue ? 38 : 65, isIssue ? 38 : 81);
          doc.text(String(value), 220, fieldY);
          if (isIssue) {
            doc.setFontSize(13);
            doc.text('⚠️', 500, fieldY);
            doc.setFontSize(11);
          }
          fieldY += 22;
        });
        yPosition = fieldY + 16;
        if (yPosition > 700) {
          doc.addPage();
          yPosition = 60;
        }
      });

      // Footer
      doc.setFontSize(10);
      doc.setTextColor(120);
      doc.text('Prepared by Al-Hisab Team', 40, 800);
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 420, 800);

      doc.save(`audit-report-${auditNumber}-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Audit Results Summary</h2>
        <p className="text-gray-600">Review your audit details and results before creating the final report</p>
      </div>

      {/* Audit Information Inputs */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Audit Information</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-2">
                Client Name *
              </label>
              <input
                type="text"
                id="clientName"
                value={clientName}
                onChange={(e) => onClientNameChange(e.target.value)}
                placeholder="e.g., Acme Corp."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-2">
                Project Name *
              </label>
              <input
                type="text"
                id="projectName"
                value={projectName}
                onChange={(e) => onProjectNameChange(e.target.value)}
                placeholder="e.g., Website Redesign"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="auditNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Audit Number *
              </label>
              <input
                type="text"
                id="auditNumber"
                value={auditNumber}
                onChange={(e) => onAuditNumberChange(e.target.value)}
                placeholder="e.g., AUD-2024-01-001"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="auditDate" className="block text-sm font-medium text-gray-700 mb-2">
                Audit Date *
              </label>
              <input
                type="date"
                id="auditDate"
                value={auditDate}
                onChange={(e) => onAuditDateChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="auditName" className="block text-sm font-medium text-gray-700 mb-2">
              Audit Name *
            </label>
            <input
              type="text"
              id="auditName"
              value={auditName}
              onChange={(e) => onAuditNameChange(e.target.value)}
              placeholder="e.g., Q1 2024 Marketing Performance Audit"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Audit Summary</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Audit Number:</span>
                <span className="font-medium">{auditNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Audit Date:</span>
                <span className="font-medium">{new Date(auditDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Audit Types:</span>
                <span className="font-medium">{selectedAuditTypes.length} selected</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Duration:</span>
                <span className="font-medium">{totalDuration} hours</span>
              </div>
              <div className="flex justify-between">
                <span>Created Date:</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Result Type Selection */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Audit Report Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              resultType === 'detailed'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setResultType('detailed')}
          >
            <div className="flex items-center mb-2">
              <input
                type="radio"
                name="resultType"
                checked={resultType === 'detailed'}
                onChange={() => setResultType('detailed')}
                className="mr-2"
              />
              <h4 className="font-medium text-gray-900">Detailed Audit</h4>
            </div>
            <p className="text-sm text-gray-600">
              Detailed report with all audit data, metrics, assessments, and complete recommendations.
            </p>
          </div>

          <div
            className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              resultType === 'summary'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setResultType('summary')}
          >
            <div className="flex items-center mb-2">
              <input
                type="radio"
                name="resultType"
                checked={resultType === 'summary'}
                onChange={() => setResultType('summary')}
                className="mr-2"
              />
              <h4 className="font-medium text-gray-900">Audit Summary</h4>
            </div>
            <p className="text-sm text-gray-600">
              Condensed report with key findings, main recommendations, and essential action items.
            </p>
          </div>
        </div>
      </div>

      {/* Selected Audit Types Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Audit Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {selectedAuditTypes.map((auditTypeId) => {
            const IconComponent = getAuditIcon(auditTypeId);
            const colorClass = getAuditColor(auditTypeId);
            
            return (
              <div key={auditTypeId} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <IconComponent className={`w-4 h-4 mr-2 ${colorClass}`} />
                <span className="text-sm font-medium text-gray-700">
                  {getAuditTypeName(auditTypeId)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Audit Results Sections */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {resultType === 'detailed' ? 'Detailed Audit Results' : 'Audit Results Summary'}
        </h3>
        {selectedAuditTypes.map((auditTypeId) => 
          resultType === 'detailed' 
            ? renderDetailedAuditSection(auditTypeId)
            : renderSummaryAuditSection(auditTypeId)
        )}
      </div>

      {/* Final Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Ready to Create Audit Report</h3>
        <div className="space-y-3 text-sm text-blue-800">
          <p>✓ Audit Number: <strong>{auditNumber}</strong></p>
          <p>✓ Audit Date: <strong>{new Date(auditDate).toLocaleDateString()}</strong></p>
          <p>✓ You have completed {selectedAuditTypes.length} audit type{selectedAuditTypes.length > 1 ? 's' : ''}</p>
          <p>✓ All audit data has been collected and reviewed</p>
          <p>✓ Report type: <strong>{resultType === 'detailed' ? 'Detailed Audit' : 'Audit Summary'}</strong></p>
          <p>✓ Your audit report will be generated with the name: <strong>{auditName || '[Audit Name]'}</strong></p>
          <p className="mt-4 font-medium">Click &quot;Create Audit&quot; to generate your {resultType === 'detailed' ? 'detailed' : 'summary'} audit report.</p>
        </div>
      </div>

      {/* PDF Download Button */}
      <div className="mt-4 text-center">
        <button
          onClick={downloadPDF}
          disabled={isGeneratingPDF}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGeneratingPDF ? 'Generating PDF...' : 'Download PDF'}
        </button>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={onFinish}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Create Audit
        </button>
      </div>
    </div>
  );
}

export default Step3AuditDetails; 