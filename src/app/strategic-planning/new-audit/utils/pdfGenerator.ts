import jsPDF from 'jspdf';
import autoTable, { UserOptions } from 'jspdf-autotable';
import { AUDIT_FIELD_DEFINITIONS, AuditTypeDefinition } from './auditFieldDefinitions';

interface AuditData {
  [key: string]: any;
}

interface GeneratePDFOptions {
  auditData: AuditData;
  selectedAuditTypes: string[];
  clientName: string;
  projectName: string;
  auditNumber: string;
}

const prettifyLabel = (label: string) =>
  label
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();

const formatValue = (value: any): string => {
  if (value === null || value === undefined || value === '') return 'N/A';
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return String(value);
};

export const generateAuditPDF = async ({
  auditData,
  selectedAuditTypes,
  clientName,
  projectName,
  auditNumber,
}: GeneratePDFOptions) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  let yPos = 20;

  // Header - Title
  doc.setFontSize(22);
  doc.setTextColor(30, 58, 138); // blue-900
  doc.text('Strategic Audit Report', margin, yPos);
  yPos += 10;

  // Header - Metadata
  doc.setFontSize(10);
  doc.setTextColor(100);
  const date = new Date().toLocaleDateString();
  doc.text(`Generated on: ${date}`, margin, yPos);
  yPos += 15;

  // Client Info Section
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.setFont('helvetica', 'bold');
  doc.text('Client Information', margin, yPos);
  yPos += 7;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const clientInfo = [
    [`Client:`, clientName],
    [`Project:`, projectName],
    [`Audit ID:`, auditNumber],
  ];

  autoTable(doc, {
    startY: yPos,
    body: clientInfo,
    theme: 'plain',
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 30 },
      1: { cellWidth: 100 },
    },
    margin: { left: margin },
  });
  
  yPos = (doc as any).lastAutoTable.finalY + 15;

  // Audit Types Summary
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Audits Performed', margin, yPos);
  yPos += 7;
  
  const typesText = selectedAuditTypes.map(type => AUDIT_FIELD_DEFINITIONS[type]?.name || prettifyLabel(type)).join(', ');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const splitTypes = doc.splitTextToSize(typesText, pageWidth - margin * 2);
  doc.text(splitTypes, margin, yPos);
  yPos += splitTypes.length * 5 + 10;

  // Results Sections
  selectedAuditTypes.forEach((type) => {
    const definition = AUDIT_FIELD_DEFINITIONS[type];
    
    // Check for page break
    if (yPos > 240) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(29, 78, 216); // blue-700
    doc.text(`${definition?.name || prettifyLabel(type)} Results`, margin, yPos);
    yPos += 10;

    const data = auditData[type] || {};

    if (type === 'media_buying') {
      yPos = renderMediaBuyingTables(doc, data, yPos, margin);
    } else if (definition) {
      yPos = renderDefinedAuditResults(doc, type, definition, data, yPos, margin);
    } else {
      yPos = renderGenericAuditTable(doc, data, yPos, margin);
    }
    
    yPos += 20;
  });

  // Footer
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `Al-Hisab Strategic Audit - Page ${i} of ${totalPages}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  doc.save(`audit-${auditNumber}-${new Date().toISOString().split('T')[0]}.pdf`);
};

const renderDefinedAuditResults = (doc: jsPDF, type: string, definition: AuditTypeDefinition, data: any, startY: number, margin: number) => {
  let currentY = startY;

  const sectionsToRender = type === 'social' && data.selectedPlatforms
    ? definition.sections?.filter(section => {
        const platformId = section.name.split(' ')[0].toLowerCase();
        return (data.selectedPlatforms as string[]).includes(platformId);
      })
    : definition.sections;

  if (sectionsToRender) {
    sectionsToRender.forEach(section => {
      // Check for page break
      if (currentY > 240) {
        doc.addPage();
        currentY = 20;
      }

      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(50);
      doc.text(section.name, margin + 2, currentY);
      currentY += 5;

      const sectionData = type === 'social' 
        ? data[section.name.split(' ')[0].toLowerCase()] || {} 
        : data;

      const tableData = section.fields.map(field => [
        field.label,
        formatValue(sectionData[field.id])
      ]);

      autoTable(doc, {
        startY: currentY,
        body: tableData,
        theme: 'grid',
        styles: { fontSize: 9 },
        columnStyles: {
          0: { fontStyle: 'bold', cellWidth: 50 },
          1: { cellWidth: 'auto' },
        },
        margin: { left: margin + 2, right: margin + 2 },
      });

      currentY = (doc as any).lastAutoTable.finalY + 10;
    });
  } else if (definition.fields) {
    const tableData = definition.fields.map(field => [
      field.label,
      formatValue(data[field.id])
    ]);

    autoTable(doc, {
      startY: currentY,
      head: [['Field', 'Result']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [243, 244, 246], textColor: [31, 41, 55], fontStyle: 'bold' },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 60 },
        1: { cellWidth: 'auto' },
      },
      margin: { left: margin, right: margin },
    });
    currentY = (doc as any).lastAutoTable.finalY + 10;
  }

  return currentY;
};

const renderGenericAuditTable = (doc: jsPDF, data: any, startY: number, margin: number) => {
  const tableData: any[] = [];
  
  Object.entries(data).forEach(([key, value]) => {
    if (key === 'selectedPlatforms') return;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      Object.entries(value).forEach(([subKey, subVal]) => {
        tableData.push([`${prettifyLabel(key)} - ${prettifyLabel(subKey)}`, formatValue(subVal)]);
      });
    } else {
      tableData.push([prettifyLabel(key), formatValue(value)]);
    }
  });

  if (tableData.length === 0) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    doc.text('No data provided for this audit type.', margin, startY);
    return startY + 10;
  }

  autoTable(doc, {
    startY,
    head: [['Field', 'Result']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [243, 244, 246], textColor: [31, 41, 55], fontStyle: 'bold' },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 60 },
      1: { cellWidth: 'auto' },
    },
    margin: { left: margin, right: margin },
  });

  return (doc as any).lastAutoTable.finalY;
};

const renderMediaBuyingTables = (doc: jsPDF, data: any, startY: number, margin: number) => {
  let currentY = startY;

  const sectionHeader = (title: string, y: number) => {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 64, 175); // blue-700
    doc.text(title, margin + 5, y);
    doc.setTextColor(0, 0, 0);
    return y + 6;
  };

  // 1. Overall Marketing Goals
  currentY = sectionHeader('1. Overall Marketing Goals', currentY);
  const marketingData = [
    ['Marketing Goals', formatValue(data.marketingGoals)],
    ['Marketing Platforms', formatValue(data.marketingPlatforms)],
    ['Notes & Gaps', formatValue(data.notesGaps)]
  ];

  autoTable(doc, {
    startY: currentY,
    body: marketingData,
    theme: 'grid',
    styles: { fontSize: 9 },
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50 } },
    margin: { left: margin + 5 }
  });
  currentY = (doc as any).lastAutoTable.finalY + 10;

  // 2. Campaigns
  if (Array.isArray(data.campaignAudits) && data.campaignAudits.length > 0) {
    currentY = sectionHeader('2. Campaign Level Audit', currentY);
    const campaignRows = data.campaignAudits.map((c: any) => [
      c.campaignName || 'N/A',
      formatValue(c.marketingGoalsSupported),
      c.objectiveSetCorrectly || 'N/A',
      c.scalingPotential || 'N/A',
      c.performanceKPIs || 'N/A'
    ]);

    autoTable(doc, {
      startY: currentY,
      head: [['Campaign Name', 'Goals Supported', 'Objective', 'Scaling', 'KPIs']],
      body: campaignRows,
      theme: 'striped',
      styles: { fontSize: 8 },
      margin: { left: margin + 5 }
    });
    currentY = (doc as any).lastAutoTable.finalY + 10;
  }

  // 3. Ad Sets
  if (Array.isArray(data.adSetAudits) && data.adSetAudits.length > 0) {
    if (currentY > 250) { doc.addPage(); currentY = 20; }
    currentY = sectionHeader('3. Ad Set Level Audit', currentY);
    const adSetRows = data.adSetAudits.map((a: any) => [
      a.adSetName || 'N/A',
      a.audienceSize || 'N/A',
      a.placements || 'N/A',
      a.frequency || 'N/A',
      a.performanceKPIs || 'N/A'
    ]);

    autoTable(doc, {
      startY: currentY,
      head: [['Ad Set Name', 'Audience Size', 'Placements', 'Freq', 'KPIs']],
      body: adSetRows,
      theme: 'striped',
      styles: { fontSize: 8 },
      margin: { left: margin + 5 }
    });
    currentY = (doc as any).lastAutoTable.finalY + 10;
  }

  // 4. Ads
  if (Array.isArray(data.adLevelAudits) && data.adLevelAudits.length > 0) {
    if (currentY > 250) { doc.addPage(); currentY = 20; }
    currentY = sectionHeader('4. Ad Level Audit', currentY);
    const adRows = data.adLevelAudits.map((ad: any) => [
      ad.adNameId || 'N/A',
      ad.creativeFormat || 'N/A',
      ad.hookStrength || 'N/A',
      ad.performanceKPIsAd || 'N/A'
    ]);

    autoTable(doc, {
      startY: currentY,
      head: [['Ad Name/ID', 'Format', 'Hook Strength', 'KPIs']],
      body: adRows,
      theme: 'striped',
      styles: { fontSize: 8 },
      margin: { left: margin + 5 }
    });
    currentY = (doc as any).lastAutoTable.finalY + 10;
  }

  // 5. Tracking & Compliance
  if (currentY > 250) { doc.addPage(); currentY = 20; }
  currentY = sectionHeader('5. Tracking, Attribution & Compliance', currentY);
  const trackingFields = [
    ['Pixel/SDK Setup', formatValue(data.pixelSdkSetup)],
    ['Event Tracking', formatValue(data.eventTracking)],
    ['UTM Tracking', formatValue(data.utmTracking)],
    ['Attribution Model', formatValue(data.attributionModel)],
    ['Policy Violations', formatValue(data.policyViolations)],
  ];

  autoTable(doc, {
    startY: currentY,
    body: trackingFields,
    theme: 'grid',
    styles: { fontSize: 9 },
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50 } },
    margin: { left: margin + 5 }
  });
  currentY = (doc as any).lastAutoTable.finalY + 10;

  // 6. Media Mix
  if (currentY > 250) { doc.addPage(); currentY = 20; }
  currentY = sectionHeader('6. Media Mix & Channel Analysis', currentY);
  const mediaMixData = [
    ['Channel Breakdown', formatValue(data.channelBreakdown)],
    ['Budget Distribution', formatValue(data.budgetDistribution)],
    ['ROI by Channel', formatValue(data.performanceByChannel)],
  ];

  autoTable(doc, {
    startY: currentY,
    body: mediaMixData,
    theme: 'grid',
    styles: { fontSize: 9 },
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50 } },
    margin: { left: margin + 5 }
  });
  currentY = (doc as any).lastAutoTable.finalY + 10;

  // 7. Waste & Efficiency
  if (currentY > 250) { doc.addPage(); currentY = 20; }
  currentY = sectionHeader('7. Waste & Efficiency', currentY);
  const wasteData = [
    ['Low Performing Segments', formatValue(data.lowPerformingSegments)],
    ['Ad Fatigue / Frequency', formatValue(data.highFrequencyIssues)],
    ['Underperforming Creatives', formatValue(data.underperformingCreatives)],
  ];

  autoTable(doc, {
    startY: currentY,
    body: wasteData,
    theme: 'grid',
    styles: { fontSize: 9 },
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50 } },
    margin: { left: margin + 5 }
  });
  currentY = (doc as any).lastAutoTable.finalY + 10;

  // 8. Summary & Footer
  if (currentY > 240) { doc.addPage(); currentY = 20; }
  currentY = sectionHeader('8. Summary & Action Plan', currentY);
  const summaryData = [
    ['Key Strengths', formatValue(data.keyStrengths)],
    ['Key Weaknesses', formatValue(data.keyWeaknesses)],
    ['Top Priority Fixes', formatValue(data.topPriorityFixes)],
    ['Quick Wins', formatValue(data.quickWins)],
  ];

  autoTable(doc, {
    startY: currentY,
    body: summaryData,
    theme: 'grid',
    styles: { fontSize: 9 },
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50 } },
    margin: { left: margin + 5 }
  });
  currentY = (doc as any).lastAutoTable.finalY + 10;

  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text(`Audit Conducted By: ${data.auditConductedBy || 'N/A'} | Date: ${data.dateOfAudit || 'N/A'}`, margin + 5, currentY);

  return currentY + 10;
};
