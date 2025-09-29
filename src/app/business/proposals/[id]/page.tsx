'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeftIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PencilIcon,
  PaperAirplaneIcon,
  XCircleIcon,
  PlusIcon,
  LightBulbIcon,
  ChartBarIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

// Enhanced sample proposals data with comprehensive structure
const sampleProposals = [
  {
    proposal_id: "PROP-20250115-001",
    client_id: "cli_001",
    client_name: "Rabfy.com",
    client_email: "contact@rabfy.com",
    client_phone: "+8801712345678",
    project_title: "SEO & Content Marketing for Rabfy's Sales Growth",
    description: "Comprehensive SEO and content marketing strategy to drive organic traffic, reach the right audience, boost long-term sales, and optimize the stores of Rabfy. This SEO will play a key role in driving organic traffic, reaching the right audience, boosting long-term sales, and optimize the stores of Rabfy.",
    
    // Enhanced proposal structure
    challenges: [
      {
        id: "challenge_1",
        title: "Site Architecture & Indexing",
        description: "Technical challenges that need to be addressed for better SEO performance",
        points: [
          "Logical Hierarchical Structure: Ability to organize categories, products, and blogs in a parent-child hierarchy for better crawlability.",
          "Human-Readable URLs (URL Alias System): Clean, keyword-rich URLs instead of IDs (e.g., /electronics/laptops/dell-xps-15).",
          "Pagination Support: Proper rel=\"next/prev\" or modern handling for multi-page content.",
          "URL Parameter Handling: Using Google Search Console to define how Google should treat query parameters.",
          "Breadcrumbs & Internal Linking: Logical navigation, contextual product links, and clear category-to-product relationships."
        ]
      },
      {
        id: "challenge_2",
        title: "Content & On-Page SEO",
        description: "Content optimization challenges for better search visibility",
        points: [
          "Meta Tag Management: System for inserting and managing title tags, description meta tags, canonical tags, and Open Graph tags.",
          "Content Quality: Creating high-quality, keyword-optimized content that provides value to users.",
          "Internal Linking Strategy: Building logical connections between related content and products."
        ]
      }
    ],
    
    strategic_pillars: [
      {
        id: "pillar_1",
        title: "Research & Audit - The Foundation Check",
        subtitle: "Initial assessment and groundwork",
        description: "Comprehensive analysis to understand current state and opportunities",
        activities: [
          "Keyword research (transactional + informational)",
          "Competitor gap analysis",
          "SEO & technical audit"
        ]
      },
      {
        id: "pillar_2",
        title: "On-Page Optimization - The SEO Core",
        subtitle: "Optimizing individual web pages",
        description: "Core SEO improvements for better rankings and user experience",
        activities: [
          "Keyword mapping for all pages",
          "Meta tags, headers, schema",
          "Internal linking framework (navigation, breadcrumbs)",
          "Product page optimization"
        ]
      },
      {
        id: "pillar_3",
        title: "Content & Visibility - The Growth Engine",
        subtitle: "Content creation and visibility enhancement",
        description: "Strategic content creation to drive traffic and engagement",
        activities: [
          "Weekly blog posts (keyword-optimized)",
          "Google Business Profile posts",
          "Product FAQs and UGC integration",
          "Content hub strategy (pillar pages + supporting articles)"
        ]
      }
    ],
    
    phases: [
      {
        id: "phase_1",
        title: "Foundation & Quick Wins",
        duration: "Month 1-2",
        goals: ["Prepare the platform, fix errors, and build an SEO baseline"],
        actions: [
          "Conduct full SEO audit covering technical aspects, on-page elements, and backlinks",
          "Perform competitor benchmarking, focusing on keywords, backlinks, and identifying content gaps",
          "Execute keyword research & mapping to assign keywords to categories, products, and blogs",
          "Fix technical basics: Optimizing Robots.txt, XML sitemap, and canonical tags"
        ]
      },
      {
        id: "phase_2",
        title: "Content & On-Page Growth",
        duration: "Month 2-3",
        goals: ["Start ranking for long-tail and mid-tail keywords, boost trust signals"],
        actions: [
          "Publish weekly blogs (optimized for high-intent keywords)",
          "Create pillar content + supporting blogs (content hub model)",
          "On-page optimization: Meta tags, headers, alt text",
          "Product/category page optimization (unique content, schema, FAQs)"
        ]
      }
    ],
    
    deliverables: [
      {
        category: "Content & On-Page SEO",
        description: "4 blog posts (1 per week, keyword-optimized), 4 Google Business Profile posts, Product/category page updates",
        frequency: "Monthly",
        quantity: 4
      },
      {
        category: "Technical SEO & Monitoring",
        description: "Monthly SEO & site health audit, Fixing technical issues, Monthly keyword ranking and CTR tracking",
        frequency: "Monthly"
      },
      {
        category: "Link Building & Authority",
        description: "8-12 backlink outreach attempts (2-3 per week), 4-6 directory/citation submissions, Digital PR / light guest posting opportunities secured",
        frequency: "Monthly"
      }
    ],
    
    services: [
      { service_id: "seo_001", name: "SEO Audit & Technical Fixes", quantity: 1, unit_price: 100, description: "Site audit & fixes (speed, Core Web Vitals, errors), Sitemap/robots updates, Keyword ranking & CTR monitoring, Monthly performance report", category: "SEO" },
      { service_id: "seo_002", name: "Content & On-Page SEO", quantity: 1, unit_price: 120, description: "1 blog post/week (writing + optimization), 1 GBP post/week, Product page updates (meta, schema, FAQs), Internal linking", category: "SEO" },
      { service_id: "seo_003", name: "Link Building & Authority", quantity: 1, unit_price: 100, description: "2-3 backlink outreach attempts/week, Directory/citation submissions, Digital PR/light guest posts, UGC management (reviews/testimonials)", category: "SEO" },
      { service_id: "seo_004", name: "Performance Optimization & Strategy", quantity: 1, unit_price: 80, description: "A/B testing titles & meta, Competitor benchmarking updates, Quarterly strategy recalibration, Retargeting setup (light budget testing)", category: "SEO" }
    ],
    total_cost: 400,
    deposit_amount: 200,
    discount_percentage: 40,
    final_cost: 240,
    timeline_days: 180,
    created_date: "2025-01-15",
    sent_date: "2025-01-16",
    status: "sent" as const,
    valid_until: "2025-02-15",
    notes: "While the challenges are common in all of our stores, this R&D initiative will initially be focused on three pilot stores. And all of our activities will be applied to all of the given stores.",
    terms_and_conditions: [
      "Payment: From the second month onward, the full monthly payment must be made in advance before the commencement of work.",
      "Termination: Either party may terminate this agreement by providing one month's written notice; however, termination is not permitted during the initial three-month period.",
      "Refunds: Payments for completed work are non-refundable; however, advances for upcoming work will be adjusted or refunded as needed.",
      "Team: We have skilled technical writers and experienced SEO specialists on our team, along with a dedicated consultant to ensure the highest quality standards."
    ],
    team_info: {
      technical_writers: true,
      seo_specialists: true,
      dedicated_consultant: true
    },
    payment_terms: {
      advance_percentage: 50,
      payment_schedule: "50% deposit upon agreement, 50% upon completion",
      refund_policy: "Payments for completed work are non-refundable; however, advances for upcoming work will be adjusted or refunded as needed"
    }
  },
  {
    proposal_id: "PROP-20250114-002",
    client_id: "cli_002",
    client_name: "John Smith",
    client_email: "info@aquatech.com",
    client_phone: "+1 5551234567",
    project_title: "Mobile App Development",
    description: "Cross-platform mobile application for food delivery with real-time tracking, user authentication, and payment integration.",
    services: [
      { service_id: "ser_004", name: "Mobile App Design", quantity: 1, unit_price: 800, description: "Complete mobile app UI/UX design with user flow and wireframes" },
      { service_id: "ser_005", name: "React Native Development", quantity: 1, unit_price: 2000, description: "Cross-platform mobile app development using React Native" },
      { service_id: "ser_006", name: "API Integration", quantity: 1, unit_price: 600, description: "Backend API development and third-party service integrations" }
    ],
    total_cost: 3400,
    deposit_amount: 1700,
    timeline_days: 60,
    created_date: "2025-01-14",
    sent_date: "2025-01-15",
    status: "accepted" as const,
    valid_until: "2025-02-14",
    notes: "Client accepted with minor timeline adjustments - extended by 5 days for additional features",
    terms_and_conditions: [
      "Payment terms: 50% deposit upon agreement, 50% upon completion",
      "Project timeline: 60 days from start date",
      "Platforms: iOS and Android",
      "Testing: Comprehensive testing on both platforms included",
      "App Store: Assistance with app store submission included"
    ]
  }
];

interface Challenge {
  id: string;
  title: string;
  description: string;
  points: string[];
}

interface StrategicPillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  activities: string[];
}

interface Phase {
  id: string;
  title: string;
  duration: string;
  goals: string[];
  actions: string[];
}

interface Deliverable {
  category: string;
  description: string;
  frequency: string;
  quantity?: number;
}

interface Proposal {
  proposal_id: string;
  client_id: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  project_title: string;
  description: string;
  
  // Enhanced proposal structure
  challenges?: Challenge[];
  strategic_pillars?: StrategicPillar[];
  phases?: Phase[];
  deliverables?: Deliverable[];
  
  // Services and pricing
  services: Array<{
    service_id: string;
    name: string;
    quantity: number;
    unit_price: number;
    description: string;
    category?: string;
  }>;
  total_cost: number;
  deposit_amount: number;
  discount_percentage?: number;
  final_cost?: number;
  
  // Timeline
  timeline_days: number;
  created_date: string;
  sent_date: string | null;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  valid_until: string;
  
  // Additional information
  notes: string;
  terms_and_conditions: string[];
  
  // Team and quality assurance
  team_info?: {
    technical_writers: boolean;
    seo_specialists: boolean;
    dedicated_consultant: boolean;
  };
  
  // Payment terms
  payment_terms?: {
    advance_percentage: number;
    payment_schedule: string;
    refund_policy: string;
  };
}

export default function BusinessProposalDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [id, setId] = useState<string>('');
  const [proposal, setProposal] = useState<Proposal | undefined>(undefined);

  useEffect(() => {
    params.then(({ id: resolvedId }) => {
      setId(resolvedId);
      const foundProposal = sampleProposals.find((p) => p.proposal_id === resolvedId);
      setProposal(foundProposal);
    });
  }, [params]);

  if (!id || !proposal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading proposal details...</p>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { color: 'bg-gray-100 text-gray-800', icon: PencilIcon, label: 'Draft' },
      sent: { color: 'bg-blue-100 text-blue-800', icon: PaperAirplaneIcon, label: 'Sent' },
      accepted: { color: 'bg-green-100 text-green-800', icon: CheckCircleIcon, label: 'Accepted' },
      rejected: { color: 'bg-red-100 text-red-800', icon: XCircleIcon, label: 'Rejected' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full ${config.color}`}>
        <Icon className="w-4 h-4 mr-2" />
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntilExpiry = () => {
    const now = new Date();
    const expiry = new Date(proposal.valid_until);
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleBack = () => {
    router.push('/business/proposals');
  };

  const handleEdit = () => {
    // TODO: Implement edit functionality
    alert('Edit proposal (not implemented)');
  };

  const handleSend = () => {
    // TODO: Implement send functionality
    alert('Send proposal (not implemented)');
  };

  const handleCreateAgreement = () => {
    // TODO: Implement create agreement functionality
    alert('Create agreement from proposal (not implemented)');
  };


  const handleDownload = () => {
    // TODO: Implement download functionality
    alert('Download proposal (not implemented)');
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    alert('Save proposal (not implemented)');
  };

  const daysUntilExpiry = getDaysUntilExpiry();
  const isExpiringSoon = daysUntilExpiry <= 7 && daysUntilExpiry > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Proposals
          </button>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{proposal.project_title}</h1>
                {getStatusBadge(proposal.status)}
              </div>
              <p className="text-lg text-gray-600 mb-4">{proposal.proposal_id}</p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <CalendarDaysIcon className="w-4 h-4 mr-2" />
                  <span>Created: {formatDate(proposal.created_date)}</span>
                </div>
                {proposal.sent_date && (
                  <div className="flex items-center">
                    <PaperAirplaneIcon className="w-4 h-4 mr-2" />
                    <span>Sent: {formatDate(proposal.sent_date)}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  <span>Valid until: {formatDate(proposal.valid_until)}</span>
                  {isExpiringSoon && (
                    <span className="ml-2 text-orange-600 font-medium">
                      ({daysUntilExpiry} days left)
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleDownload}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <DocumentTextIcon className="w-4 h-4 mr-2" />
                Download Proposal
              </button>
              <button
                onClick={handleSave}
                className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                <CheckCircleIcon className="w-4 h-4 mr-2" />
                Save Proposal
              </button>
              <button
                onClick={handleSend}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                <PaperAirplaneIcon className="w-4 h-4 mr-2" />
                Send Proposal
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <DocumentTextIcon className="w-5 h-5 mr-2" />
                Overview
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">{proposal.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Timeline</div>
                  <div className="text-sm text-gray-900">{proposal.timeline_days} days</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Valid Until</div>
                  <div className="text-sm text-gray-900">{formatDate(proposal.valid_until)}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Total Cost</div>
                  <div className="text-sm text-gray-900">${(proposal.final_cost || proposal.total_cost).toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* Challenges Section */}
            {proposal.challenges && proposal.challenges.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
                  Challenges (Problems that need to be dealt with)
                </h2>
                <div className="space-y-4">
                  {proposal.challenges.map((challenge) => (
                    <div key={challenge.id} className="border-l-4 border-orange-400 pl-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{challenge.title}</h3>
                      <p className="text-gray-600 mb-3">{challenge.description}</p>
                      <ul className="space-y-2">
                        {challenge.points.map((point, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Strategic Pillars Section */}
            {proposal.strategic_pillars && proposal.strategic_pillars.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <LightBulbIcon className="w-5 h-5 mr-2" />
                  Strategic Pillars
                </h2>
                <div className="space-y-4">
                  {proposal.strategic_pillars.map((pillar, index) => (
                    <div key={pillar.id} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {index + 1}. {pillar.title}
                      </h3>
                      <p className="text-gray-700 mb-3">{pillar.description}</p>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Sub-items:</h4>
                        <ul className="space-y-1">
                          {pillar.activities.map((activity, activityIndex) => (
                            <li key={activityIndex} className="flex items-start">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700">{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Execution Approach Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <LightBulbIcon className="w-5 h-5 mr-2" />
                Execution Approach
              </h2>
              <p className="text-gray-700 mb-4">
                A comprehensive approach to address the identified challenges through strategic implementation 
                of SEO best practices, content optimization, and technical improvements.
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">1. Technical Foundation</h3>
                  <ul className="space-y-1">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">Site architecture optimization and crawlability improvements</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">URL structure and internal linking framework</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">Core Web Vitals and site speed optimization</span>
                    </li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">2. Content Strategy</h3>
                  <ul className="space-y-1">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">Keyword research and content mapping</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">Weekly blog content creation and optimization</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">Product page optimization and schema markup</span>
                    </li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">3. Authority Building</h3>
                  <ul className="space-y-1">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">Backlink acquisition and outreach campaigns</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">Local SEO and Google Business Profile optimization</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">User-generated content and review management</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Phases Distribution Section */}
            {proposal.phases && proposal.phases.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <ChartBarIcon className="w-5 h-5 mr-2" />
                  Phases Distribution
                </h2>
                <p className="text-gray-700 mb-6">
                  Divided into several goals to meet the challenges where the Execution approach will be divided into phases.
                </p>
                <div className="space-y-6">
                  {proposal.phases.map((phase, index) => (
                    <div key={phase.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-medium text-gray-900">Phase {index + 1}: {phase.title}</h3>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                          {phase.duration}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Goals:</h4>
                          <ul className="space-y-1">
                            {phase.goals.map((goal, goalIndex) => (
                              <li key={goalIndex} className="flex items-start">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                                <span className="text-gray-700">{goal}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Actions:</h4>
                          <ul className="space-y-1">
                            {phase.actions.map((action, actionIndex) => (
                              <li key={actionIndex} className="flex items-start">
                                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                                <span className="text-gray-700">{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gantt Chart Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <ChartBarIcon className="w-5 h-5 mr-2" />
                Gantt Chart - Project Timeline
              </h2>
              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  {/* Timeline Header */}
                  <div className="flex border-b border-gray-200 mb-4">
                    <div className="w-48 flex-shrink-0 p-2 font-medium text-gray-700">Activity</div>
                    <div className="flex-1 grid grid-cols-6 gap-2">
                      {['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'].map((month) => (
                        <div key={month} className="text-center text-sm font-medium text-gray-700 p-2">
                          {month}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Gantt Chart Rows */}
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-48 flex-shrink-0 p-2 text-sm text-gray-700">SEO Audit & Technical Fixes</div>
                      <div className="flex-1 grid grid-cols-6 gap-2">
                        <div className="col-span-2 bg-blue-500 rounded h-6 flex items-center justify-center text-white text-xs font-medium">
                          Active
                        </div>
                        <div className="bg-gray-200 rounded h-6"></div>
                        <div className="bg-gray-200 rounded h-6"></div>
                        <div className="bg-gray-200 rounded h-6"></div>
                        <div className="bg-gray-200 rounded h-6"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-48 flex-shrink-0 p-2 text-sm text-gray-700">Content & On-Page SEO</div>
                      <div className="flex-1 grid grid-cols-6 gap-2">
                        <div className="bg-gray-200 rounded h-6"></div>
                        <div className="col-span-3 bg-green-500 rounded h-6 flex items-center justify-center text-white text-xs font-medium">
                          Active
                        </div>
                        <div className="bg-gray-200 rounded h-6"></div>
                        <div className="bg-gray-200 rounded h-6"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-48 flex-shrink-0 p-2 text-sm text-gray-700">Link Building & Authority</div>
                      <div className="flex-1 grid grid-cols-6 gap-2">
                        <div className="bg-gray-200 rounded h-6"></div>
                        <div className="bg-gray-200 rounded h-6"></div>
                        <div className="col-span-2 bg-purple-500 rounded h-6 flex items-center justify-center text-white text-xs font-medium">
                          Active
                        </div>
                        <div className="bg-gray-200 rounded h-6"></div>
                        <div className="bg-gray-200 rounded h-6"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-48 flex-shrink-0 p-2 text-sm text-gray-700">Performance Optimization</div>
                      <div className="flex-1 grid grid-cols-6 gap-2">
                        <div className="bg-gray-200 rounded h-6"></div>
                        <div className="bg-gray-200 rounded h-6"></div>
                        <div className="bg-gray-200 rounded h-6"></div>
                        <div className="col-span-3 bg-orange-500 rounded h-6 flex items-center justify-center text-white text-xs font-medium">
                          Active
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* One Time Deliverables */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircleIcon className="w-5 h-5 mr-2" />
                One Time Deliverables
              </h2>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">SEO Audit & Technical Fixes</h3>
                  <p className="text-gray-700 text-sm">Complete technical audit, site speed optimization, and Core Web Vitals improvements</p>
                  <div className="mt-2 text-sm text-gray-600">Value: $100</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Keyword Research & Strategy</h3>
                  <p className="text-gray-700 text-sm">Comprehensive keyword research and content strategy development</p>
                  <div className="mt-2 text-sm text-gray-600">Value: $150</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Technical Setup</h3>
                  <p className="text-gray-700 text-sm">XML sitemap, robots.txt, Google Search Console setup, and schema markup implementation</p>
                  <div className="mt-2 text-sm text-gray-600">Value: $75</div>
                </div>
              </div>
            </div>

            {/* Monthly Deliverables */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircleIcon className="w-5 h-5 mr-2" />
                Monthly Deliverables
              </h2>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Content & On-Page SEO</h3>
                  <p className="text-gray-700 text-sm">4 blog posts (1 per week, keyword-optimized), 4 Google Business Profile posts, Product/category page updates</p>
                  <div className="mt-2 text-sm text-gray-600">Monthly Value: $120</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Technical SEO & Monitoring</h3>
                  <p className="text-gray-700 text-sm">Monthly SEO & site health audit, Fixing technical issues, Monthly keyword ranking and CTR tracking</p>
                  <div className="mt-2 text-sm text-gray-600">Monthly Value: $100</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Link Building & Authority</h3>
                  <p className="text-gray-700 text-sm">8-12 backlink outreach attempts (2-3 per week), 4-6 directory/citation submissions, Digital PR / light guest posting opportunities secured</p>
                  <div className="mt-2 text-sm text-gray-600">Monthly Value: $100</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Performance Optimization & Strategy</h3>
                  <p className="text-gray-700 text-sm">A/B testing titles & meta, Competitor benchmarking updates, Quarterly strategy recalibration, Retargeting setup (light budget testing)</p>
                  <div className="mt-2 text-sm text-gray-600">Monthly Value: $80</div>
                </div>
              </div>
            </div>

            {/* Weekly Deliverables */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircleIcon className="w-5 h-5 mr-2" />
                Weekly Deliverables
              </h2>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Content Creation</h3>
                  <p className="text-gray-700 text-sm">1 keyword-optimized blog post, 1 Google Business Profile post, Content optimization and internal linking</p>
                  <div className="mt-2 text-sm text-gray-600">Weekly Value: $30</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Technical Monitoring</h3>
                  <p className="text-gray-700 text-sm">Site health check, crawl error monitoring, keyword ranking updates, performance tracking</p>
                  <div className="mt-2 text-sm text-gray-600">Weekly Value: $25</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Link Building Activities</h3>
                  <p className="text-gray-700 text-sm">2-3 backlink outreach attempts, Directory submissions, UGC collection and integration</p>
                  <div className="mt-2 text-sm text-gray-600">Weekly Value: $25</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Performance Analysis</h3>
                  <p className="text-gray-700 text-sm">A/B testing implementation, CTR analysis, competitor monitoring, strategy adjustments</p>
                  <div className="mt-2 text-sm text-gray-600">Weekly Value: $20</div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircleIcon className="w-5 h-5 mr-2" />
                Services & Pricing
              </h2>
              <div className="space-y-4">
                {proposal.services.map((service, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-gray-900">{service.name}</h3>
                          {service.category && (
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                              {service.category}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Qty: {service.quantity}</div>
                        <div className="font-semibold text-gray-900">${service.unit_price.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                      <span className="text-sm text-gray-600">Subtotal:</span>
                      <span className="font-semibold text-gray-900">
                        ${(service.quantity * service.unit_price).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms and Conditions */}
            {proposal.terms_and_conditions && proposal.terms_and_conditions.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Terms and Conditions</h2>
                <ul className="space-y-2">
                  {proposal.terms_and_conditions.map((term, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{term}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Notes */}
            {proposal.notes && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Notes</h2>
                <p className="text-gray-700">{proposal.notes}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Client Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Information</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-500">Name</div>
                  <div className="text-sm text-gray-900">{proposal.client_name}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Email</div>
                  <div className="text-sm text-gray-900">{proposal.client_email}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Phone</div>
                  <div className="text-sm text-gray-900">{proposal.client_phone}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Client ID</div>
                  <div className="text-sm text-gray-900 font-mono">{proposal.client_id}</div>
                </div>
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <CurrencyDollarIcon className="w-5 h-5 mr-2" />
                Pricing Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Subtotal:</span>
                  <span className="text-sm text-gray-900">${proposal.total_cost.toLocaleString()}</span>
                </div>
                {proposal.discount_percentage && proposal.discount_percentage > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Discount ({proposal.discount_percentage}%):</span>
                    <span className="text-sm text-red-600">-${Math.round(proposal.total_cost * (proposal.discount_percentage / 100)).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Deposit ({proposal.payment_terms?.advance_percentage || 50}%):</span>
                  <span className="text-sm text-gray-900">${proposal.deposit_amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Final Payment:</span>
                  <span className="text-sm text-gray-900">${(proposal.final_cost || proposal.total_cost - proposal.deposit_amount).toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total Cost:</span>
                    <span className="font-semibold text-green-600 text-lg">${(proposal.final_cost || proposal.total_cost).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Information */}
            {proposal.team_info && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <UserGroupIcon className="w-5 h-5 mr-2" />
                  Team & Quality Assurance
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-700">Skilled Technical Writers</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-700">Experienced SEO Specialists</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-700">Dedicated Consultant</span>
                  </div>
                </div>
              </div>
            )}

            {/* Proposal Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Proposal Details</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Proposal ID</div>
                  <div className="text-sm text-gray-900 font-mono">{proposal.proposal_id}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500">Status</div>
                  <div className="mt-1">{getStatusBadge(proposal.status)}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500">Created Date</div>
                  <div className="text-sm text-gray-900">{formatDate(proposal.created_date)}</div>
                </div>
                
                {proposal.sent_date && (
                  <div>
                    <div className="text-sm font-medium text-gray-500">Sent Date</div>
                    <div className="text-sm text-gray-900">{formatDate(proposal.sent_date)}</div>
                  </div>
                )}
                
                <div>
                  <div className="text-sm font-medium text-gray-500">Valid Until</div>
                  <div className="text-sm text-gray-900">{formatDate(proposal.valid_until)}</div>
                  {isExpiringSoon && (
                    <div className="text-xs text-orange-600 mt-1">
                      Expires in {daysUntilExpiry} days
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {proposal.status === 'draft' && (
                  <button
                    onClick={handleSend}
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <PaperAirplaneIcon className="w-4 h-4 mr-2" />
                    Send Proposal
                  </button>
                )}
                
                {proposal.status === 'accepted' && (
                  <button
                    onClick={handleCreateAgreement}
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Create Agreement
                  </button>
                )}
                
                <button
                  onClick={handleEdit}
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <PencilIcon className="w-4 h-4 mr-2" />
                  Edit Proposal
                </button>
                
                <button
                  onClick={handleBack}
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Back to Proposals
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
