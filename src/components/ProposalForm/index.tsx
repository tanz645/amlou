'use client';

import { useState } from 'react';
import { Service, ProposalData, LeadData, Challenge, StrategicPillar, Phase } from '../../types/proposal';
import BasicInfoSection from './BasicInfoSection';
import ChallengesSection from './ChallengesSection';
import StrategicPillarsSection from './StrategicPillarsSection';
import ExecutionApproachSection from './ExecutionApproachSection';
import PhasesSection from './PhasesSection';
import GanttChartSection from './GanttChartSection';
import ServicesSection from './ServicesSection';
import TermsSection from './TermsSection';

interface ProposalFormProps {
  leadData?: LeadData;
  onSubmit: (proposalData: ProposalData) => void;
  onCancel?: () => void;
  submitButtonText?: string;
  showCancelButton?: boolean;
}

// Enhanced services data with categories
const availableServices: Service[] = [
  { service_id: 'seo_audit', name: 'SEO Audit & Technical Fixes', unit_price: 100, description: 'Complete technical audit, site speed optimization, and Core Web Vitals improvements', category: 'One-time', quantity: 1 },
  { service_id: 'keyword_research', name: 'Keyword Research & Strategy', unit_price: 150, description: 'Comprehensive keyword research and content strategy development', category: 'One-time', quantity: 1 },
  { service_id: 'technical_setup', name: 'Technical Setup', unit_price: 75, description: 'XML sitemap, robots.txt, Google Search Console setup, and schema markup implementation', category: 'One-time', quantity: 1 },
  { service_id: 'content_seo', name: 'Content & On-Page SEO', unit_price: 120, description: '4 blog posts (1 per week, keyword-optimized), 4 Google Business Profile posts, Product/category page updates', category: 'Monthly', quantity: 1 },
  { service_id: 'technical_monitoring', name: 'Technical SEO & Monitoring', unit_price: 100, description: 'Monthly SEO & site health audit, Fixing technical issues, Monthly keyword ranking and CTR tracking', category: 'Monthly', quantity: 1 },
  { service_id: 'link_building', name: 'Link Building & Authority', unit_price: 100, description: '8-12 backlink outreach attempts (2-3 per week), 4-6 directory/citation submissions, Digital PR / light guest posting opportunities secured', category: 'Monthly', quantity: 1 },
  { service_id: 'performance_optimization', name: 'Performance Optimization & Strategy', unit_price: 80, description: 'A/B testing titles & meta, Competitor benchmarking updates, Quarterly strategy recalibration, Retargeting setup (light budget testing)', category: 'Monthly', quantity: 1 },
  { service_id: 'content_creation', name: 'Content Creation', unit_price: 30, description: '1 keyword-optimized blog post, 1 Google Business Profile post, Content optimization and internal linking', category: 'Weekly', quantity: 1 },
  { service_id: 'technical_monitoring_weekly', name: 'Technical Monitoring', unit_price: 25, description: 'Site health check, crawl error monitoring, keyword ranking updates, performance tracking', category: 'Weekly', quantity: 1 },
  { service_id: 'link_building_weekly', name: 'Link Building Activities', unit_price: 25, description: '2-3 backlink outreach attempts, Directory submissions, UGC collection and integration', category: 'Weekly', quantity: 1 },
  { service_id: 'performance_analysis', name: 'Performance Analysis', unit_price: 20, description: 'A/B testing implementation, CTR analysis, competitor monitoring, strategy adjustments', category: 'Weekly', quantity: 1 }
];

export default function ProposalForm({ 
  leadData, 
  onSubmit, 
  onCancel, 
  submitButtonText = "Save and send",
  showCancelButton = true 
}: ProposalFormProps) {
  // Form data state
  const [formData, setFormData] = useState({
    project_title: '',
    description: '',
    timeline_days: 30,
    valid_until: '',
    selected_lead_id: '',
    execution_description: ''
  });

  // Sample leads data
  const [leads] = useState([
    { id: '1', name: 'John Smith', company: 'TechCorp Inc.', email: 'john@techcorp.com', phone: '+1 (555) 123-4567', logo: 'https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=TC' },
    { id: '2', name: 'Sarah Johnson', company: 'Digital Solutions', email: 'sarah@digitalsolutions.com', phone: '+1 (555) 234-5678', logo: 'https://via.placeholder.com/40x40/10B981/FFFFFF?text=DS' },
    { id: '3', name: 'Mike Wilson', company: 'StartupXYZ', email: 'mike@startupxyz.com', phone: '+1 (555) 345-6789', logo: 'https://via.placeholder.com/40x40/8B5CF6/FFFFFF?text=SX' }
  ]);

  // Enhanced proposal sections
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 'challenge_1',
      title: 'Technical SEO Issues',
      description: 'Current website lacks proper SEO optimization',
      points: ['Poor keyword targeting', 'Technical SEO issues', 'Limited content strategy']
    }
  ]);

  const [strategicPillars, setStrategicPillars] = useState<StrategicPillar[]>([
    {
      id: 'pillar_1',
      title: 'Technical Foundation',
      subtitle: 'Optimize technical aspects',
      description: 'Build a strong technical foundation for SEO success',
      activities: ['Site audit', 'Speed optimization', 'Technical fixes'],
      relatedChallenges: []
    }
  ]);

  const [phases, setPhases] = useState<Phase[]>([
    {
      id: 'phase_1',
      title: 'Foundation & Audit',
      duration: '4 weeks',
      goals: ['Complete technical audit', 'Identify optimization opportunities'],
      actions: ['Site analysis', 'Competitor research', 'Strategy development']
    }
  ]);

  // Execution approach items
  const [executionItems, setExecutionItems] = useState([
    {
      id: 'exec_1',
      title: 'Technical Foundation',
      description: 'Build a strong technical foundation for SEO success',
      subItems: [
        'Site architecture optimization and crawlability improvements',
        'URL structure and internal linking framework',
        'Core Web Vitals and site speed optimization'
      ],
      relatedPillars: [] as string[]
    },
    {
      id: 'exec_2',
      title: 'Content Strategy',
      description: 'Develop comprehensive content strategy',
      subItems: [
        'Keyword research and content mapping',
        'Weekly blog content creation and optimization',
        'Product page optimization and schema markup'
      ],
      relatedPillars: [] as string[]
    },
    {
      id: 'exec_3',
      title: 'Authority Building',
      description: 'Build domain authority and trust',
      subItems: [
        'Backlink acquisition and outreach campaigns',
        'Local SEO and Google Business Profile optimization',
        'User-generated content and review management'
      ],
      relatedPillars: [] as string[]
    }
  ]);

  // Services and pricing
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [showServiceSelector, setShowServiceSelector] = useState(false);
  const [showCustomService, setShowCustomService] = useState(false);
  const [customService, setCustomService] = useState({
    name: '',
    description: '',
    unit_price: 0,
    category: 'Custom'
  });

  // Terms and conditions
  const [terms, setTerms] = useState([
    'Payment terms: 50% upfront, 50% on completion',
    'Project timeline: 30 days from start date',
    'Revisions: 2 rounds of revisions included'
  ]);

  // Event handlers
  const handleFormDataUpdate = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Challenge handlers
  const handleAddChallenge = () => {
    const newChallenge: Challenge = {
      id: `challenge_${Math.random().toString(36).substr(2, 9)}`,
      title: '',
      description: '',
      points: ['']
    };
    setChallenges([...challenges, newChallenge]);
  };

  const handleUpdateChallenge = (index: number, field: string, value: string) => {
    const updated = [...challenges];
    updated[index] = { ...updated[index], [field]: value };
    setChallenges(updated);
  };

  const handleUpdateChallengePoint = (challengeIndex: number, pointIndex: number, value: string) => {
    const updated = [...challenges];
    updated[challengeIndex].points[pointIndex] = value;
    setChallenges(updated);
  };

  const handleAddChallengePoint = (challengeIndex: number) => {
    const updated = [...challenges];
    updated[challengeIndex].points.push('');
    setChallenges(updated);
  };

  const handleRemoveChallengePoint = (challengeIndex: number, pointIndex: number) => {
    const updated = [...challenges];
    updated[challengeIndex].points.splice(pointIndex, 1);
    setChallenges(updated);
  };

  const handleRemoveChallenge = (index: number) => {
    setChallenges(challenges.filter((_, i) => i !== index));
  };

  // Strategic pillar handlers
  const handleAddStrategicPillar = () => {
    const newPillar: StrategicPillar = {
      id: `pillar_${Math.random().toString(36).substr(2, 9)}`,
      title: '',
      subtitle: '',
      description: '',
      activities: [''],
      relatedChallenges: []
    };
    setStrategicPillars([...strategicPillars, newPillar]);
  };

  const handleUpdateStrategicPillar = (index: number, field: string, value: string) => {
    const updated = [...strategicPillars];
    updated[index] = { ...updated[index], [field]: value };
    setStrategicPillars(updated);
  };

  const handleUpdatePillarActivity = (pillarIndex: number, activityIndex: number, value: string) => {
    const updated = [...strategicPillars];
    updated[pillarIndex].activities[activityIndex] = value;
    setStrategicPillars(updated);
  };

  const handleAddPillarActivity = (pillarIndex: number) => {
    const updated = [...strategicPillars];
    updated[pillarIndex].activities.push('');
    setStrategicPillars(updated);
  };

  const handleRemovePillarActivity = (pillarIndex: number, activityIndex: number) => {
    const updated = [...strategicPillars];
    updated[pillarIndex].activities.splice(activityIndex, 1);
    setStrategicPillars(updated);
  };

  const handleUpdatePillarChallenges = (pillarIndex: number, challengeIds: string[]) => {
    const updated = [...strategicPillars];
    updated[pillarIndex].relatedChallenges = challengeIds;
    setStrategicPillars(updated);
  };

  const handleRemoveStrategicPillar = (index: number) => {
    setStrategicPillars(strategicPillars.filter((_, i) => i !== index));
  };

  // Phase handlers
  const handleAddPhase = () => {
    const newPhase: Phase = {
      id: `phase_${Math.random().toString(36).substr(2, 9)}`,
      title: '',
      duration: '4 weeks',
      goals: [''],
      actions: ['']
    };
    setPhases([...phases, newPhase]);
  };

  const handleUpdatePhase = (index: number, field: string, value: string) => {
    const updated = [...phases];
    updated[index] = { ...updated[index], [field]: value };
    setPhases(updated);
  };

  const handleUpdatePhaseGoal = (phaseIndex: number, goalIndex: number, value: string) => {
    const updated = [...phases];
    updated[phaseIndex].goals[goalIndex] = value;
    setPhases(updated);
  };

  const handleAddPhaseGoal = (phaseIndex: number) => {
    const updated = [...phases];
    updated[phaseIndex].goals.push('');
    setPhases(updated);
  };

  const handleRemovePhaseGoal = (phaseIndex: number, goalIndex: number) => {
    const updated = [...phases];
    updated[phaseIndex].goals.splice(goalIndex, 1);
    setPhases(updated);
  };

  const handleUpdatePhaseAction = (phaseIndex: number, actionIndex: number, value: string) => {
    const updated = [...phases];
    updated[phaseIndex].actions[actionIndex] = value;
    setPhases(updated);
  };

  const handleAddPhaseAction = (phaseIndex: number) => {
    const updated = [...phases];
    updated[phaseIndex].actions.push('');
    setPhases(updated);
  };

  const handleRemovePhaseAction = (phaseIndex: number, actionIndex: number) => {
    const updated = [...phases];
    updated[phaseIndex].actions.splice(actionIndex, 1);
    setPhases(updated);
  };

  const handleRemovePhase = (index: number) => {
    setPhases(phases.filter((_, i) => i !== index));
  };

  // Execution approach handlers
  const handleAddExecutionItem = () => {
    const newItem = {
      id: `exec_${Math.random().toString(36).substr(2, 9)}`,
      title: '',
      description: '',
      subItems: [''],
      relatedPillars: []
    };
    setExecutionItems([...executionItems, newItem]);
  };

  const handleUpdateExecutionItem = (index: number, field: string, value: string) => {
    const updated = [...executionItems];
    if (field === 'title' || field === 'description') {
      updated[index] = { ...updated[index], [field]: value };
    }
    setExecutionItems(updated);
  };

  const handleUpdateExecutionSubItem = (itemIndex: number, subItemIndex: number, value: string) => {
    const updated = [...executionItems];
    updated[itemIndex].subItems[subItemIndex] = value;
    setExecutionItems(updated);
  };

  const handleAddExecutionSubItem = (itemIndex: number) => {
    const updated = [...executionItems];
    updated[itemIndex].subItems.push('');
    setExecutionItems(updated);
  };

  const handleRemoveExecutionSubItem = (itemIndex: number, subItemIndex: number) => {
    const updated = [...executionItems];
    updated[itemIndex].subItems.splice(subItemIndex, 1);
    setExecutionItems(updated);
  };

  const handleUpdateExecutionPillars = (itemIndex: number, pillarIds: string[]) => {
    const updated = [...executionItems];
    updated[itemIndex].relatedPillars = pillarIds;
    setExecutionItems(updated);
  };

  const handleRemoveExecutionItem = (index: number) => {
    setExecutionItems(executionItems.filter((_, i) => i !== index));
  };

  // Service handlers
  const handleAddService = (service: Service) => {
    const newService = { ...service, quantity: 1 };
    setSelectedServices([...selectedServices, newService]);
    setShowServiceSelector(false);
  };

  const handleUpdateServiceQuantity = (index: number, quantity: number) => {
    const updated = [...selectedServices];
    updated[index].quantity = quantity;
    setSelectedServices(updated);
  };

  const handleRemoveService = (index: number) => {
    setSelectedServices(selectedServices.filter((_, i) => i !== index));
  };

  const handleAddCustomService = () => {
    if (customService.name && customService.description && customService.unit_price > 0) {
      const newService: Service = {
        service_id: `custom_${Math.random().toString(36).substr(2, 9)}`,
        name: customService.name,
        description: customService.description,
        unit_price: customService.unit_price,
        quantity: 1,
        category: customService.category
      };
      setSelectedServices([...selectedServices, newService]);
      setCustomService({ name: '', description: '', unit_price: 0, category: 'Custom' });
      setShowCustomService(false);
    }
  };

  const handleUpdateCustomService = (field: string, value: string | number) => {
    setCustomService(prev => ({ ...prev, [field]: value }));
  };

  const handleCloseCustomService = () => {
    setCustomService({ name: '', description: '', unit_price: 0, category: 'Custom' });
    setShowCustomService(false);
  };

  // Terms handlers
  const handleAddTerm = () => {
    setTerms([...terms, '']);
  };

  const handleUpdateTerm = (index: number, value: string) => {
    const updated = [...terms];
    updated[index] = value;
    setTerms(updated);
  };

  const handleRemoveTerm = (index: number) => {
    setTerms(terms.filter((_, i) => i !== index));
  };

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const totalCost = selectedServices.reduce((sum, service) => sum + (service.unit_price * service.quantity), 0);
    const depositAmount = totalCost * 0.5;
    const finalCost = totalCost;

    const proposalData: ProposalData = {
      proposal_id: `prop_${Math.random().toString(36).substr(2, 9)}`,
      lead_id: formData.selected_lead_id ? parseInt(formData.selected_lead_id) : null,
      client_id: leadData?.id?.toString() || '',
      client_name: leadData?.name || '',
      client_email: leadData?.email || '',
      client_phone: leadData?.phone || '',
      project_title: formData.project_title,
      description: formData.description,
      challenges,
      strategic_pillars: strategicPillars,
      phases,
      deliverables: [],
      services: selectedServices,
      total_cost: totalCost,
      deposit_amount: depositAmount,
      final_cost: finalCost,
      timeline_days: formData.timeline_days,
      created_date: new Date().toISOString().split('T')[0],
      sent_date: null,
      status: 'draft',
      valid_until: formData.valid_until,
      notes: '',
      terms_and_conditions: terms,
      team_info: {
        technical_writers: true,
        seo_specialists: true,
        dedicated_consultant: true
      },
      payment_terms: {
        advance_percentage: 50,
        payment_schedule: '50% upfront, 50% on completion',
        refund_policy: 'No refunds after work begins'
      }
    };

    onSubmit(proposalData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <BasicInfoSection
        formData={formData}
        leads={leads}
        onUpdate={handleFormDataUpdate}
      />

      <ChallengesSection
        challenges={challenges}
        onAddChallenge={handleAddChallenge}
        onUpdateChallenge={handleUpdateChallenge}
        onUpdateChallengePoint={handleUpdateChallengePoint}
        onAddChallengePoint={handleAddChallengePoint}
        onRemoveChallengePoint={handleRemoveChallengePoint}
        onRemoveChallenge={handleRemoveChallenge}
      />

      <StrategicPillarsSection
        strategicPillars={strategicPillars}
        challenges={challenges}
        onAddStrategicPillar={handleAddStrategicPillar}
        onUpdateStrategicPillar={handleUpdateStrategicPillar}
        onUpdatePillarActivity={handleUpdatePillarActivity}
        onAddPillarActivity={handleAddPillarActivity}
        onRemovePillarActivity={handleRemovePillarActivity}
        onUpdatePillarChallenges={handleUpdatePillarChallenges}
        onRemoveStrategicPillar={handleRemoveStrategicPillar}
      />

      <ExecutionApproachSection
        executionDescription={formData.execution_description}
        executionItems={executionItems}
        strategicPillars={strategicPillars}
        onUpdateExecutionDescription={(value) => handleFormDataUpdate('execution_description', value)}
        onAddExecutionItem={handleAddExecutionItem}
        onUpdateExecutionItem={handleUpdateExecutionItem}
        onUpdateExecutionSubItem={handleUpdateExecutionSubItem}
        onAddExecutionSubItem={handleAddExecutionSubItem}
        onRemoveExecutionSubItem={handleRemoveExecutionSubItem}
        onUpdateExecutionPillars={handleUpdateExecutionPillars}
        onRemoveExecutionItem={handleRemoveExecutionItem}
      />

      <PhasesSection
        phases={phases}
        onAddPhase={handleAddPhase}
        onUpdatePhase={handleUpdatePhase}
        onUpdatePhaseGoal={handleUpdatePhaseGoal}
        onAddPhaseGoal={handleAddPhaseGoal}
        onRemovePhaseGoal={handleRemovePhaseGoal}
        onUpdatePhaseAction={handleUpdatePhaseAction}
        onAddPhaseAction={handleAddPhaseAction}
        onRemovePhaseAction={handleRemovePhaseAction}
        onRemovePhase={handleRemovePhase}
      />

      <GanttChartSection phases={phases} />

      <ServicesSection
        selectedServices={selectedServices}
        availableServices={availableServices}
        showServiceSelector={showServiceSelector}
        showCustomService={showCustomService}
        customService={customService}
        onAddService={handleAddService}
        onUpdateServiceQuantity={handleUpdateServiceQuantity}
        onRemoveService={handleRemoveService}
        onSetShowServiceSelector={setShowServiceSelector}
        onSetShowCustomService={setShowCustomService}
        onUpdateCustomService={handleUpdateCustomService}
        onAddCustomService={handleAddCustomService}
        onCloseCustomService={handleCloseCustomService}
      />

      <TermsSection
        terms={terms}
        onAddTerm={handleAddTerm}
        onUpdateTerm={handleUpdateTerm}
        onRemoveTerm={handleRemoveTerm}
      />

      {/* Submit Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Ready to Create Proposal?</h3>
            <p className="text-sm text-gray-600">Review all sections before submitting</p>
          </div>
          <div className="flex space-x-3">
            {showCancelButton && onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {submitButtonText}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
