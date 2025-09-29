'use client';

import { useState } from 'react';
import { 
  DocumentTextIcon,
  CurrencyDollarIcon,
  PlusIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  ChartBarIcon,
  UserGroupIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { Service, ProposalData, LeadData, Challenge, StrategicPillar, Phase, Deliverable } from '../types/proposal';

interface ProposalFormProps {
  leadData?: LeadData;
  onSubmit: (proposalData: ProposalData) => void;
  onCancel?: () => void;
  submitButtonText?: string;
  showCancelButton?: boolean;
}

// Enhanced services data with categories
const availableServices = [
  { service_id: 'seo_audit', name: 'SEO Audit & Technical Fixes', unit_price: 100, description: 'Complete technical audit, site speed optimization, and Core Web Vitals improvements', category: 'One-time' },
  { service_id: 'keyword_research', name: 'Keyword Research & Strategy', unit_price: 150, description: 'Comprehensive keyword research and content strategy development', category: 'One-time' },
  { service_id: 'technical_setup', name: 'Technical Setup', unit_price: 75, description: 'XML sitemap, robots.txt, Google Search Console setup, and schema markup implementation', category: 'One-time' },
  { service_id: 'content_seo', name: 'Content & On-Page SEO', unit_price: 120, description: '4 blog posts (1 per week, keyword-optimized), 4 Google Business Profile posts, Product/category page updates', category: 'Monthly' },
  { service_id: 'technical_monitoring', name: 'Technical SEO & Monitoring', unit_price: 100, description: 'Monthly SEO & site health audit, Fixing technical issues, Monthly keyword ranking and CTR tracking', category: 'Monthly' },
  { service_id: 'link_building', name: 'Link Building & Authority', unit_price: 100, description: '8-12 backlink outreach attempts (2-3 per week), 4-6 directory/citation submissions, Digital PR / light guest posting opportunities secured', category: 'Monthly' },
  { service_id: 'performance_optimization', name: 'Performance Optimization & Strategy', unit_price: 80, description: 'A/B testing titles & meta, Competitor benchmarking updates, Quarterly strategy recalibration, Retargeting setup (light budget testing)', category: 'Monthly' },
  { service_id: 'content_creation', name: 'Content Creation', unit_price: 30, description: '1 keyword-optimized blog post, 1 Google Business Profile post, Content optimization and internal linking', category: 'Weekly' },
  { service_id: 'technical_monitoring_weekly', name: 'Technical Monitoring', unit_price: 25, description: 'Site health check, crawl error monitoring, keyword ranking updates, performance tracking', category: 'Weekly' },
  { service_id: 'link_building_weekly', name: 'Link Building Activities', unit_price: 25, description: '2-3 backlink outreach attempts, Directory submissions, UGC collection and integration', category: 'Weekly' },
  { service_id: 'performance_analysis', name: 'Performance Analysis', unit_price: 20, description: 'A/B testing implementation, CTR analysis, competitor monitoring, strategy adjustments', category: 'Weekly' }
];

export default function ProposalForm({ 
  leadData, 
  onSubmit, 
  onCancel, 
  submitButtonText = "Create Proposal",
  showCancelButton = true 
}: ProposalFormProps) {
  const [formData, setFormData] = useState({
    project_title: '',
    description: '',
    timeline_days: 30,
    valid_until: '',
    notes: '',
    discount_percentage: 0,
    terms_and_conditions: [
      'Payment terms: 50% deposit upon agreement, 50% upon completion',
      'Project timeline: As specified in the proposal',
      'Revisions: Up to 3 rounds of revisions included',
      'Support: 30 days of post-launch support included',
      'Ownership: Full ownership transfers upon final payment'
    ]
  });

  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [showServiceSelector, setShowServiceSelector] = useState(false);
  
  // Enhanced proposal sections
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 'challenge_1',
      title: 'Low Organic Visibility',
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
      activities: ['Site audit', 'Speed optimization', 'Technical fixes']
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

  const [deliverables] = useState<Deliverable[]>([
    {
      category: 'SEO Audit',
      description: 'Comprehensive technical and content audit',
      frequency: 'One-time',
      quantity: 1
    }
  ]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddChallenge = () => {
    const newChallenge: Challenge = {
      id: `challenge_${Date.now()}`,
      title: '',
      description: '',
      points: ['']
    };
    setChallenges([...challenges, newChallenge]);
  };

  const handleUpdateChallenge = (index: number, field: string, value: string) => {
    const updated = [...challenges];
    if (field === 'title' || field === 'description') {
      updated[index] = { ...updated[index], [field]: value };
    }
    setChallenges(updated);
  };

  const handleAddChallengePoint = (challengeIndex: number) => {
    const updated = [...challenges];
    updated[challengeIndex].points.push('');
    setChallenges(updated);
  };

  const handleUpdateChallengePoint = (challengeIndex: number, pointIndex: number, value: string) => {
    const updated = [...challenges];
    updated[challengeIndex].points[pointIndex] = value;
    setChallenges(updated);
  };

  const handleRemoveChallenge = (index: number) => {
    setChallenges(challenges.filter((_, i) => i !== index));
  };

  const handleAddStrategicPillar = () => {
    const newPillar: StrategicPillar = {
      id: `pillar_${Date.now()}`,
      title: '',
      subtitle: '',
      description: '',
      activities: ['']
    };
    setStrategicPillars([...strategicPillars, newPillar]);
  };

  const handleUpdateStrategicPillar = (index: number, field: string, value: string) => {
    const updated = [...strategicPillars];
    if (field === 'title' || field === 'subtitle' || field === 'description') {
      updated[index] = { ...updated[index], [field]: value };
    }
    setStrategicPillars(updated);
  };

  const handleAddPillarActivity = (pillarIndex: number) => {
    const updated = [...strategicPillars];
    updated[pillarIndex].activities.push('');
    setStrategicPillars(updated);
  };

  const handleUpdatePillarActivity = (pillarIndex: number, activityIndex: number, value: string) => {
    const updated = [...strategicPillars];
    updated[pillarIndex].activities[activityIndex] = value;
    setStrategicPillars(updated);
  };

  const handleRemoveStrategicPillar = (index: number) => {
    setStrategicPillars(strategicPillars.filter((_, i) => i !== index));
  };

  const handleAddPhase = () => {
    const newPhase: Phase = {
      id: `phase_${Date.now()}`,
      title: '',
      duration: '',
      goals: [''],
      actions: ['']
    };
    setPhases([...phases, newPhase]);
  };

  const handleUpdatePhase = (index: number, field: string, value: string) => {
    const updated = [...phases];
    if (field === 'title' || field === 'duration') {
      updated[index] = { ...updated[index], [field]: value };
    }
    setPhases(updated);
  };

  const handleAddPhaseGoal = (phaseIndex: number) => {
    const updated = [...phases];
    updated[phaseIndex].goals.push('');
    setPhases(updated);
  };

  const handleUpdatePhaseGoal = (phaseIndex: number, goalIndex: number, value: string) => {
    const updated = [...phases];
    updated[phaseIndex].goals[goalIndex] = value;
    setPhases(updated);
  };

  const handleAddPhaseAction = (phaseIndex: number) => {
    const updated = [...phases];
    updated[phaseIndex].actions.push('');
    setPhases(updated);
  };

  const handleUpdatePhaseAction = (phaseIndex: number, actionIndex: number, value: string) => {
    const updated = [...phases];
    updated[phaseIndex].actions[actionIndex] = value;
    setPhases(updated);
  };

  const handleRemovePhase = (index: number) => {
    setPhases(phases.filter((_, i) => i !== index));
  };

  const handleAddService = (service: Omit<Service, 'quantity'> & { service_id: string; name: string; unit_price: number; description: string; category?: string }) => {
    const newService: Service = {
      service_id: service.service_id,
      name: service.name,
      quantity: 1,
      unit_price: service.unit_price,
      description: service.description,
      category: service.category
    };
    setSelectedServices([...selectedServices, newService]);
    setShowServiceSelector(false);
  };

  const handleRemoveService = (index: number) => {
    setSelectedServices(selectedServices.filter((_, i) => i !== index));
  };

  const handleUpdateServiceQuantity = (index: number, quantity: number) => {
    const updated = [...selectedServices];
    updated[index].quantity = quantity;
    setSelectedServices(updated);
  };

  const calculateDiscount = (total: number, discountPercentage: number) => {
    return (total * discountPercentage) / 100;
  };

  const calculateFinalCost = (total: number, discount: number) => {
    return total - discount;
  };

  const handleAddTerm = () => {
    setFormData(prev => ({
      ...prev,
      terms_and_conditions: [...prev.terms_and_conditions, '']
    }));
  };

  const handleUpdateTerm = (index: number, value: string) => {
    const updated = [...formData.terms_and_conditions];
    updated[index] = value;
    setFormData(prev => ({ ...prev, terms_and_conditions: updated }));
  };

  const handleRemoveTerm = (index: number) => {
    const updated = formData.terms_and_conditions.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, terms_and_conditions: updated }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const totalCost = selectedServices.reduce((sum, service) => sum + (service.unit_price * service.quantity), 0);
    const discountAmount = calculateDiscount(totalCost, formData.discount_percentage);
    const finalCost = calculateFinalCost(totalCost, discountAmount);

    const proposalData: ProposalData = {
      proposal_id: `PROP-${Date.now()}`,
      lead_id: leadData?.id || null,
      client_id: leadData?.id?.toString() || '',
      client_name: leadData?.name || '',
      client_email: leadData?.email || '',
      client_phone: '',
      project_title: formData.project_title,
      description: formData.description,
      challenges,
      strategic_pillars: strategicPillars,
      phases,
      deliverables,
      services: selectedServices,
      total_cost: totalCost,
      deposit_amount: finalCost * 0.5,
      discount_percentage: formData.discount_percentage,
      final_cost: finalCost,
      timeline_days: formData.timeline_days,
      created_date: new Date().toISOString().split('T')[0],
      sent_date: null,
      status: 'draft' as const,
      valid_until: formData.valid_until,
      notes: formData.notes,
      terms_and_conditions: formData.terms_and_conditions,
      team_info: {
        technical_writers: true,
        seo_specialists: true,
        dedicated_consultant: true
      },
      payment_terms: {
        advance_percentage: 50,
        payment_schedule: '50% deposit upon agreement, 50% upon completion',
        refund_policy: 'Payments for completed work are non-refundable; however, advances for upcoming work will be adjusted or refunded as needed'
      }
    };

    onSubmit(proposalData);
  };

  return (
    <div className="space-y-6">
      {/* Form Progress Indicator */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Proposal Sections</h3>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2 text-xs">
          {[
            'Basic Info', 'Challenges', 'Strategy', 'Execution', 'Phases',
            'Gantt Chart', 'Deliverables', 'Services', 'Terms'
          ].map((section) => (
            <div key={section} className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
              <span className="text-blue-700">{section}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Basic Information Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <DocumentTextIcon className="w-5 h-5 mr-2" />
          Basic Information
        </h2>
        <div className="space-y-6">
          {/* Client Information */}
          {leadData && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Client Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={leadData.name}
                    disabled
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company</label>
                  <input
                    type="text"
                    value={leadData.company}
                    disabled
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={leadData.email}
                    disabled
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Project Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Project Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Title</label>
              <input
                type="text"
                value={formData.project_title}
                onChange={(e) => handleInputChange('project_title', e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Timeline (days)</label>
                <input
                  type="number"
                  value={formData.timeline_days}
                  onChange={(e) => handleInputChange('timeline_days', parseInt(e.target.value))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Valid Until</label>
                <input
                  type="date"
                  value={formData.valid_until}
                  onChange={(e) => handleInputChange('valid_until', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
                <input
                  type="number"
                  value={formData.discount_percentage}
                  onChange={(e) => handleInputChange('discount_percentage', parseInt(e.target.value))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Challenges Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
          Challenges (Problems that need to be dealt with)
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Challenges</h3>
            <button
              type="button"
              onClick={handleAddChallenge}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Challenge
            </button>
          </div>
          
          {challenges.map((challenge, index) => (
            <div key={challenge.id} className="border border-gray-200 rounded-lg p-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Challenge Title</label>
                  <input
                    type="text"
                    value={challenge.title}
                    onChange={(e) => handleUpdateChallenge(index, 'title', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={challenge.description}
                    onChange={(e) => handleUpdateChallenge(index, 'description', e.target.value)}
                    rows={2}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Key Points</label>
                    <button
                      type="button"
                      onClick={() => handleAddChallengePoint(index)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      + Add Point
                    </button>
                  </div>
                  {challenge.points.map((point, pointIndex) => (
                    <input
                      key={pointIndex}
                      type="text"
                      value={point}
                      onChange={(e) => handleUpdateChallengePoint(index, pointIndex, e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Challenge point"
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveChallenge(index)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Remove Challenge
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Pillars Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <LightBulbIcon className="w-5 h-5 mr-2" />
          Strategic Pillars
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Strategic Pillars</h3>
            <button
              type="button"
              onClick={handleAddStrategicPillar}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Pillar
            </button>
          </div>
          
          {strategicPillars.map((pillar, index) => (
            <div key={pillar.id} className="border border-gray-200 rounded-lg p-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Pillar Title</label>
                  <input
                    type="text"
                    value={pillar.title}
                    onChange={(e) => handleUpdateStrategicPillar(index, 'title', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                  <input
                    type="text"
                    value={pillar.subtitle}
                    onChange={(e) => handleUpdateStrategicPillar(index, 'subtitle', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={pillar.description}
                    onChange={(e) => handleUpdateStrategicPillar(index, 'description', e.target.value)}
                    rows={2}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Sub-items</label>
                    <button
                      type="button"
                      onClick={() => handleAddPillarActivity(index)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      + Add Activity
                    </button>
                  </div>
                  {pillar.activities.map((activity, activityIndex) => (
                    <input
                      key={activityIndex}
                      type="text"
                      value={activity}
                      onChange={(e) => handleUpdatePillarActivity(index, activityIndex, e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Activity"
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveStrategicPillar(index)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Remove Pillar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Execution Approach Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <LightBulbIcon className="w-5 h-5 mr-2" />
          Execution Approach
        </h2>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Execution Approach</h3>
          <p className="text-gray-700 mb-4">
            A comprehensive approach to address the identified challenges through strategic implementation 
            of SEO best practices, content optimization, and technical improvements.
          </p>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-lg font-medium text-gray-900 mb-2">1. Technical Foundation</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    defaultChecked
                  />
                  <span className="text-gray-700">Site architecture optimization and crawlability improvements</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    defaultChecked
                  />
                  <span className="text-gray-700">URL structure and internal linking framework</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    defaultChecked
                  />
                  <span className="text-gray-700">Core Web Vitals and site speed optimization</span>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-lg font-medium text-gray-900 mb-2">2. Content Strategy</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    defaultChecked
                  />
                  <span className="text-gray-700">Keyword research and content mapping</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    defaultChecked
                  />
                  <span className="text-gray-700">Weekly blog content creation and optimization</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    defaultChecked
                  />
                  <span className="text-gray-700">Product page optimization and schema markup</span>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-lg font-medium text-gray-900 mb-2">3. Authority Building</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    defaultChecked
                  />
                  <span className="text-gray-700">Backlink acquisition and outreach campaigns</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    defaultChecked
                  />
                  <span className="text-gray-700">Local SEO and Google Business Profile optimization</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    defaultChecked
                  />
                  <span className="text-gray-700">User-generated content and review management</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phases Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <ChartBarIcon className="w-5 h-5 mr-2" />
          Phases Distribution
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Project Phases</h3>
            <button
              type="button"
              onClick={handleAddPhase}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Phase
            </button>
          </div>
          
          {phases.map((phase, index) => (
            <div key={phase.id} className="border border-gray-200 rounded-lg p-4">
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phase Title</label>
                    <input
                      type="text"
                      value={phase.title}
                      onChange={(e) => handleUpdatePhase(index, 'title', e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Duration</label>
                    <input
                      type="text"
                      value={phase.duration}
                      onChange={(e) => handleUpdatePhase(index, 'duration', e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 4 weeks"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">Goals</label>
                      <button
                        type="button"
                        onClick={() => handleAddPhaseGoal(index)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        + Add Goal
                      </button>
                    </div>
                    {phase.goals.map((goal, goalIndex) => (
                      <input
                        key={goalIndex}
                        type="text"
                        value={goal}
                        onChange={(e) => handleUpdatePhaseGoal(index, goalIndex, e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Phase goal"
                      />
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">Actions</label>
                      <button
                        type="button"
                        onClick={() => handleAddPhaseAction(index)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        + Add Action
                      </button>
                    </div>
                    {phase.actions.map((action, actionIndex) => (
                      <input
                        key={actionIndex}
                        type="text"
                        value={action}
                        onChange={(e) => handleUpdatePhaseAction(index, actionIndex, e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Phase action"
                      />
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemovePhase(index)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Remove Phase
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gantt Chart Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <ChartBarIcon className="w-5 h-5 mr-2" />
          Gantt Chart - Project Timeline (Weekly View)
        </h2>
        <p className="text-gray-700 mb-4">
          Visual timeline showing project phases across 24 weeks. Changes in phases will automatically update this chart.
        </p>
        
        <div className="overflow-x-auto">
          <div className="min-w-[1200px]">
            {/* Timeline Header - 24 weeks */}
            <div className="flex border-b border-gray-200 mb-4">
              <div className="w-48 flex-shrink-0 p-2 font-medium text-gray-700">Activity</div>
              <div className="flex-1 grid grid-cols-24 gap-1">
                {Array.from({length: 24}, (_, i) => `W${i+1}`).map((week) => (
                  <div key={week} className="text-center text-xs font-medium text-gray-700 p-1">
                    {week}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Dynamic Gantt Chart Rows based on phases */}
            <div className="space-y-2">
              {phases.map((phase, phaseIndex) => {
                const startWeek = phaseIndex * 4 + 1; // Each phase starts 4 weeks after the previous
                const duration = Math.max(4, Math.ceil(parseInt(phase.duration.split(' ')[0]) || 4)); // Extract number from duration
                const endWeek = Math.min(24, startWeek + duration - 1);
                
                return (
                  <div key={phase.id} className="flex items-center">
                    <div className="w-48 flex-shrink-0 p-2 text-sm text-gray-700">{phase.title}</div>
                    <div className="flex-1 grid grid-cols-24 gap-1">
                      {Array.from({length: 24}, (_, weekIndex) => {
                        const weekNum = weekIndex + 1;
                        const isActive = weekNum >= startWeek && weekNum <= endWeek;
                        const colorClass = isActive ? 
                          (phaseIndex % 4 === 0 ? 'bg-blue-500' : 
                           phaseIndex % 4 === 1 ? 'bg-green-500' : 
                           phaseIndex % 4 === 2 ? 'bg-purple-500' : 'bg-orange-500') : 
                          'bg-gray-200';
                        
                        return (
                          <div 
                            key={weekIndex} 
                            className={`${colorClass} rounded h-6 flex items-center justify-center text-white text-xs font-medium`}
                          >
                            {isActive ? '●' : ''}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-4 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span>Phase 1</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>Phase 2</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span>Phase 3</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span>Phase 4</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deliverables Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <CheckCircleIcon className="w-5 h-5 mr-2" />
          Deliverables
        </h2>
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Deliverables</h3>
          
          {/* One Time Deliverables */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-lg font-medium text-gray-900 mb-4">One Time Deliverables</h4>
            <div className="space-y-3">
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-900">SEO Audit & Technical Fixes</h5>
                  <span className="text-sm text-gray-600">$100</span>
                </div>
                <p className="text-gray-700 text-sm">Complete technical audit, site speed optimization, and Core Web Vitals improvements</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-900">Keyword Research & Strategy</h5>
                  <span className="text-sm text-gray-600">$150</span>
                </div>
                <p className="text-gray-700 text-sm">Comprehensive keyword research and content strategy development</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-900">Technical Setup</h5>
                  <span className="text-sm text-gray-600">$75</span>
                </div>
                <p className="text-gray-700 text-sm">XML sitemap, robots.txt, Google Search Console setup, and schema markup implementation</p>
              </div>
            </div>
          </div>

          {/* Monthly Deliverables */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Monthly Deliverables</h4>
            <div className="space-y-3">
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-900">Content & On-Page SEO</h5>
                  <span className="text-sm text-gray-600">$120/month</span>
                </div>
                <p className="text-gray-700 text-sm">4 blog posts (1 per week, keyword-optimized), 4 Google Business Profile posts, Product/category page updates</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-900">Technical SEO & Monitoring</h5>
                  <span className="text-sm text-gray-600">$100/month</span>
                </div>
                <p className="text-gray-700 text-sm">Monthly SEO & site health audit, Fixing technical issues, Monthly keyword ranking and CTR tracking</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-900">Link Building & Authority</h5>
                  <span className="text-sm text-gray-600">$100/month</span>
                </div>
                <p className="text-gray-700 text-sm">8-12 backlink outreach attempts (2-3 per week), 4-6 directory/citation submissions, Digital PR / light guest posting opportunities secured</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-900">Performance Optimization & Strategy</h5>
                  <span className="text-sm text-gray-600">$80/month</span>
                </div>
                <p className="text-gray-700 text-sm">A/B testing titles & meta, Competitor benchmarking updates, Quarterly strategy recalibration, Retargeting setup (light budget testing)</p>
              </div>
            </div>
          </div>

          {/* Weekly Deliverables */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Weekly Deliverables</h4>
            <div className="space-y-3">
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-900">Content Creation</h5>
                  <span className="text-sm text-gray-600">$30/week</span>
                </div>
                <p className="text-gray-700 text-sm">1 keyword-optimized blog post, 1 Google Business Profile post, Content optimization and internal linking</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-900">Technical Monitoring</h5>
                  <span className="text-sm text-gray-600">$25/week</span>
                </div>
                <p className="text-gray-700 text-sm">Site health check, crawl error monitoring, keyword ranking updates, performance tracking</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-900">Link Building Activities</h5>
                  <span className="text-sm text-gray-600">$25/week</span>
                </div>
                <p className="text-gray-700 text-sm">2-3 backlink outreach attempts, Directory submissions, UGC collection and integration</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-900">Performance Analysis</h5>
                  <span className="text-sm text-gray-600">$20/week</span>
                </div>
                <p className="text-gray-700 text-sm">A/B testing implementation, CTR analysis, competitor monitoring, strategy adjustments</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <CurrencyDollarIcon className="w-5 h-5 mr-2" />
          Services
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Services</h3>
            <button
              type="button"
              onClick={() => setShowServiceSelector(true)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Service
            </button>
          </div>
          
          {selectedServices.length > 0 ? (
            <div className="space-y-3">
              {selectedServices.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{service.name}</h4>
                    <p className="text-sm text-gray-600">{service.description}</p>
                    {service.category && (
                      <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                        {service.category}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <label className="text-sm text-gray-700">Qty:</label>
                      <input
                        type="number"
                        min="1"
                        value={service.quantity}
                        onChange={(e) => handleUpdateServiceQuantity(index, parseInt(e.target.value))}
                        className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">${service.unit_price * service.quantity}</div>
                      <div className="text-sm text-gray-600">${service.unit_price} each</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveService(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Pricing Summary */}
              <div className="border-t border-gray-200 pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">${selectedServices.reduce((sum, service) => sum + (service.unit_price * service.quantity), 0).toLocaleString()}</span>
                  </div>
                  {formData.discount_percentage > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount ({formData.discount_percentage}%):</span>
                      <span className="font-medium text-green-600">-${calculateDiscount(selectedServices.reduce((sum, service) => sum + (service.unit_price * service.quantity), 0), formData.discount_percentage).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${calculateFinalCost(selectedServices.reduce((sum, service) => sum + (service.unit_price * service.quantity), 0), calculateDiscount(selectedServices.reduce((sum, service) => sum + (service.unit_price * service.quantity), 0), formData.discount_percentage)).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No services selected. Click &quot;Add Service&quot; to get started.</p>
          )}
        </div>
      </div>

      {/* Terms Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <UserGroupIcon className="w-5 h-5 mr-2" />
          Terms & Conditions
        </h2>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Terms & Conditions</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Terms and Conditions</label>
            <div className="space-y-2">
              {formData.terms_and_conditions.map((term, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <textarea
                    value={term}
                    onChange={(e) => handleUpdateTerm(index, e.target.value)}
                    rows={2}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter term or condition"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveTerm(index)}
                    className="text-red-600 hover:text-red-800 mt-2"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddTerm}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800"
            >
              + Add Term
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any additional notes or special considerations..."
            />
          </div>
        </div>
      </div>

      {/* Submit Section */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        {showCancelButton && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        )}
        <button
          onClick={handleSubmit}
          className="ml-auto px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {submitButtonText}
        </button>
      </div>

      {/* Service Selector Modal */}
      {showServiceSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Select Service</h3>
              <button
                onClick={() => setShowServiceSelector(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableServices.map((service) => (
                  <div key={service.service_id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer" onClick={() => handleAddService(service)}>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{service.name}</h4>
                        <span className="text-sm font-medium text-blue-600">${service.unit_price}</span>
                      </div>
                      <p className="text-sm text-gray-600">{service.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                          {service.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}