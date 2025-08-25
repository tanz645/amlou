"use client";

import React, { useState } from "react";
import {
  ChartBarIcon,
  DocumentTextIcon,
  EyeIcon,
  PlusIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  InformationCircleIcon,
  CalendarIcon,
  UserGroupIcon,
  GlobeAltIcon,
  ComputerDesktopIcon,
  FunnelIcon,
  DocumentMagnifyingGlassIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import clientsData from "@/data/clients.json";
import projectsData from "@/data/projects.json";

// Add types for Client and Project
interface Client {
  id: string;
  client_name: string;
  company_names: string[];
  status: string;
  email: string;
  address?: string;
  phone: {
    country_code: string;
    number: string;
    whatsapp: boolean;
  };
  preferred_contact_method: string;
  alternate_contacts: Array<{
    name: string;
    relation: string;
    email: string;
    phone: {
      country_code: string;
      number: string;
      whatsapp: boolean;
    };
  }>;
  social_media: Record<string, string | null>;
  country: {
    name: string;
    iso_code: string;
    currency: string;
    timezone: string;
    language: string;
    continent: string;
    phone_code: string;
    flag: string;
  };
  projects: Array<{ id: string; name: string }>;
  notes?: string;
  last_payment?: string | null;
  dues?: number | null;
  created?: string;
  avatar?: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  client_id: string;
  project_master: string;
  project_type: string;
  start_date: string;
  end_date: string;
  status: string;
  key_deliverables: string[];
  services: Array<{ id: string; discount: number }>;
  packages: Array<{ id: string; discount: number }>;
  payment_methods: string[];
  payment_security: string;
  agreement_number: string;
  project_value: number;
  milestones: Array<{ name: string; release_amount: number }>;
}

// Mock audit data
const auditReports = [
  {
    id: "audit_001",
    title: "Q4 2024 Marketing Performance Audit",
    date: "2024-12-15",
    status: "completed",
    score: 85,
    type: "comprehensive",
    summary: "Overall strong performance with room for improvement in social media engagement",
    keyFindings: [
      "SEO performance improved by 23%",
      "Social media engagement declined by 8%",
      "Website conversion rate increased by 15%",
      "Email marketing open rates stable at 28%"
    ],
    recommendations: [
      "Implement social media automation tools",
      "Optimize content for mobile devices",
      "Enhance email segmentation strategy",
      "Increase video content production"
    ]
  },
  {
    id: "audit_002",
    title: "Website Performance & SEO Audit",
    date: "2024-11-30",
    status: "in_progress",
    score: 72,
    type: "technical",
    summary: "Technical SEO issues identified, mobile optimization needs improvement",
    keyFindings: [
      "Page load speed below industry average",
      "Mobile responsiveness issues detected",
      "Missing meta descriptions on 15% of pages",
      "Broken links found on 8 pages"
    ],
    recommendations: [
      "Optimize image sizes and compression",
      "Implement lazy loading for images",
      "Fix mobile navigation issues",
      "Add missing meta descriptions"
    ]
  },
  {
    id: "audit_003",
    title: "Social Media Performance Audit",
    date: "2024-11-15",
    status: "completed",
    score: 78,
    type: "social",
    summary: "Good content quality but engagement rates need improvement",
    keyFindings: [
      "Content quality score: 8.5/10",
      "Engagement rate: 2.1% (industry avg: 3.2%)",
      "Best performing platform: LinkedIn",
      "Optimal posting time: 9-11 AM"
    ],
    recommendations: [
      "Increase interactive content (polls, Q&A)",
      "Optimize posting schedule",
      "Enhance visual content strategy",
      "Implement influencer partnerships"
    ]
  }
];

const performanceMetrics = {
  seo: {
    organicTraffic: { current: 15420, previous: 12540, change: 23 },
    keywordRankings: { current: 45, previous: 30, change: 50 },
    backlinks: { current: 1250, previous: 1150, change: 8.7 },
    pageSpeed: { current: 2.8, previous: 3.2, change: -12.5 }
  },
  social: {
    engagementRate: { current: 2.1, previous: 2.3, change: -8.7 },
    followerGrowth: { current: 1250, previous: 1100, change: 13.6 },
    reach: { current: 45000, previous: 38000, change: 18.4 },
    impressions: { current: 89000, previous: 75000, change: 18.7 }
  },
  website: {
    conversionRate: { current: 3.2, previous: 2.8, change: 14.3 },
    bounceRate: { current: 42, previous: 48, change: -12.5 },
    avgSessionDuration: { current: 185, previous: 165, change: 12.1 },
    pagesPerSession: { current: 3.2, previous: 2.9, change: 10.3 }
  },
  email: {
    openRate: { current: 28.5, previous: 27.8, change: 2.5 },
    clickRate: { current: 4.2, previous: 3.9, change: 7.7 },
    unsubscribeRate: { current: 0.8, previous: 1.1, change: -27.3 },
    conversionRate: { current: 2.1, previous: 1.8, change: 16.7 }
  }
};

const competitorAnalysis = [
  {
    name: "Competitor A",
    domain: "competitora.com",
    traffic: 25000,
    keywords: 120,
    backlinks: 2100,
    socialFollowers: 15000,
    strengths: ["Strong content strategy", "High engagement rates"],
    weaknesses: ["Slow website speed", "Limited mobile optimization"]
  },
  {
    name: "Competitor B",
    domain: "competitorb.com",
    traffic: 18000,
    keywords: 85,
    backlinks: 1600,
    socialFollowers: 12000,
    strengths: ["Excellent SEO", "Fast website"],
    weaknesses: ["Low social engagement", "Poor content quality"]
  },
  {
    name: "Competitor C",
    domain: "competitorc.com",
    traffic: 22000,
    keywords: 95,
    backlinks: 1800,
    socialFollowers: 18000,
    strengths: ["Strong brand presence", "High conversion rates"],
    weaknesses: ["Limited content", "Poor mobile experience"]
  }
];

// Mock content quality data
const contentQualityData = {
  overallScore: 8.2,
  totalContent: 156,
  analyzedContent: 142,
  contentTypes: {
    blog: { count: 45, avgScore: 8.5, issues: 3 },
    social: { count: 67, avgScore: 7.8, issues: 8 },
    email: { count: 23, avgScore: 8.9, issues: 1 },
    landing: { count: 7, avgScore: 9.1, issues: 0 },
    video: { count: 14, avgScore: 7.2, issues: 5 }
  },
  qualityMetrics: {
    readability: { score: 8.7, status: "excellent" },
    grammar: { score: 9.1, status: "excellent" },
    originality: { score: 8.3, status: "good" },
    engagement: { score: 7.8, status: "good" },
    seoOptimization: { score: 8.5, status: "excellent" },
    brandConsistency: { score: 9.0, status: "excellent" }
  },
  recentIssues: [
    { id: 1, type: "grammar", content: "Q4 Marketing Campaign Email", severity: "low", status: "fixed" },
    { id: 2, type: "readability", content: "Product Launch Blog Post", severity: "medium", status: "in_progress" },
    { id: 3, type: "branding", content: "Social Media Post #156", severity: "high", status: "pending" },
    { id: 4, type: "seo", content: "Service Page Content", severity: "medium", status: "fixed" }
  ]
};

// Mock strategic relevance data
const strategicRelevanceData = {
  overallAlignment: 7.8,
  strategicGoals: [
    { id: 1, name: "Increase Market Share", alignment: 8.5, contentCount: 23, priority: "high" },
    { id: 2, name: "Improve Customer Retention", alignment: 7.2, contentCount: 18, priority: "high" },
    { id: 3, name: "Expand to New Markets", alignment: 6.8, contentCount: 12, priority: "medium" },
    { id: 4, name: "Enhance Brand Awareness", alignment: 8.9, contentCount: 31, priority: "high" },
    { id: 5, name: "Drive Product Innovation", alignment: 7.5, contentCount: 15, priority: "medium" }
  ],
  contentAlignment: {
    highlyRelevant: { count: 45, percentage: 32 },
    moderatelyRelevant: { count: 67, percentage: 47 },
    lowRelevance: { count: 30, percentage: 21 }
  },
  gaps: [
    { goal: "Expand to New Markets", gap: "Limited content targeting new geographic regions", impact: "medium" },
    { goal: "Drive Product Innovation", gap: "Missing thought leadership content on industry trends", impact: "high" },
    { goal: "Improve Customer Retention", gap: "Insufficient educational content for existing customers", impact: "medium" }
  ],
  recommendations: [
    "Create region-specific content for target markets",
    "Develop thought leadership series on industry innovation",
    "Increase customer education and support content",
    "Align content calendar with strategic milestones"
  ]
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "in_progress":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-yellow-600";
  return "text-red-600";
};

const getChangeColor = (change: number) => {
  if (change > 0) return "text-green-600";
  if (change < 0) return "text-red-600";
  return "text-gray-600";
};

const getChangeIcon = (change: number) => {
  if (change > 0) return <ArrowUpIcon className="h-4 w-4" />;
  if (change < 0) return <ArrowDownIcon className="h-4 w-4" />;
  return null;
};

export default function PerformanceAuditsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");

  const clients: Client[] = clientsData;
  const allProjects: Project[] = projectsData.projects;
  const selectedClient = clients.find((c) => c.id === selectedClientId);
  const clientProjects = selectedClient ? allProjects.filter((p) => p.client_id === selectedClient.id) : allProjects;

  // Modern filter UI in header
  const renderHeaderWithFilters = () => (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Performance Audits</h1>
        <p className="text-gray-600 mt-1">Comprehensive analysis of your marketing performance and competitive landscape</p>
      </div>
      <div className="flex gap-2 items-center bg-white rounded-lg shadow-sm px-4 py-2 border border-gray-200">
        <FunnelIcon className="h-4 w-4 text-gray-400" />
        <select
          className="block w-44 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 transition"
          value={selectedClientId}
          onChange={e => {
            setSelectedClientId(e.target.value);
            setSelectedProjectId("");
          }}
        >
          <option value="">All Clients</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>{client.client_name}</option>
          ))}
        </select>
        <select
          className="block w-44 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 transition"
          value={selectedProjectId}
          onChange={e => setSelectedProjectId(e.target.value)}
          disabled={clientProjects.length === 0}
        >
          <option value="">All Projects</option>
          {clientProjects.map((project) => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>
        {(selectedClientId || selectedProjectId) && (
          <button
            className="ml-2 px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200 text-gray-600 border border-gray-200 transition"
            onClick={() => { setSelectedClientId(""); setSelectedProjectId(""); }}
            title="Clear filters"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );

  const tabs = [
    { id: "overview", name: "Overview", icon: ChartBarIcon },
    { id: "reports", name: "Audit Reports", icon: DocumentTextIcon },
    { id: "competitors", name: "Competitor Analysis", icon: EyeIcon },
    { id: "content-quality", name: "Content Quality", icon: DocumentMagnifyingGlassIcon },
    { id: "strategic-relevance", name: "Strategic Relevance", icon: TagIcon },
    { id: "recommendations", name: "Recommendations", icon: InformationCircleIcon },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Performance Scorecards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overall Score</p>
              <p className="text-2xl font-bold text-gray-900">78/100</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+5 points from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Audits Completed</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+3 this quarter</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Issues Found</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowDownIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">-2 from last audit</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Next Audit</p>
              <p className="text-2xl font-bold text-gray-900">Jan 15</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <CalendarIcon className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ClockIcon className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-gray-600">15 days remaining</span>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SEO Performance */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <GlobeAltIcon className="h-5 w-5 mr-2 text-blue-600" />
            SEO Performance
          </h3>
          <div className="space-y-4">
            {Object.entries(performanceMetrics.seo).map(([key, data]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-sm text-gray-600 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">
                    {typeof data.current === 'number' && data.current > 1000 
                      ? data.current.toLocaleString() 
                      : data.current}
                    {key === 'pageSpeed' && 's'}
                  </span>
                  <div className={`flex items-center text-xs ${getChangeColor(data.change)}`}>
                    {getChangeIcon(data.change)}
                    <span className="ml-1">{Math.abs(data.change)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media Performance */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <UserGroupIcon className="h-5 w-5 mr-2 text-purple-600" />
            Social Media Performance
          </h3>
          <div className="space-y-4">
            {Object.entries(performanceMetrics.social).map(([key, data]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-sm text-gray-600 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">
                    {typeof data.current === 'number' && data.current > 1000 
                      ? data.current.toLocaleString() 
                      : data.current}
                    {key === 'engagementRate' && '%'}
                  </span>
                  <div className={`flex items-center text-xs ${getChangeColor(data.change)}`}>
                    {getChangeIcon(data.change)}
                    <span className="ml-1">{Math.abs(data.change)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Website & Email Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ComputerDesktopIcon className="h-5 w-5 mr-2 text-green-600" />
            Website Performance
          </h3>
          <div className="space-y-4">
            {Object.entries(performanceMetrics.website).map(([key, data]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-sm text-gray-600 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">
                    {data.current}
                    {key === 'avgSessionDuration' && 's'}
                    {key === 'conversionRate' && '%'}
                    {key === 'bounceRate' && '%'}
                  </span>
                  <div className={`flex items-center text-xs ${getChangeColor(data.change)}`}>
                    {getChangeIcon(data.change)}
                    <span className="ml-1">{Math.abs(data.change)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <DocumentTextIcon className="h-5 w-5 mr-2 text-orange-600" />
            Email Marketing Performance
          </h3>
          <div className="space-y-4">
            {Object.entries(performanceMetrics.email).map(([key, data]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-sm text-gray-600 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">
                    {data.current}%
                  </span>
                  <div className={`flex items-center text-xs ${getChangeColor(data.change)}`}>
                    {getChangeIcon(data.change)}
                    <span className="ml-1">{Math.abs(data.change)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAuditReports = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Audit Reports</h2>
          <p className="text-gray-600 mt-1">Comprehensive performance analysis and insights</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {auditReports.map((audit) => (
          <div key={audit.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{audit.title}</h3>
                <p className="text-sm text-gray-600">{new Date(audit.date).toLocaleDateString()}</p>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(audit.status)}`}>
                {audit.status.toUpperCase()}
              </span>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Performance Score</span>
                <span className={`font-bold text-lg ${getScoreColor(audit.score)}`}>
                  {audit.score}/100
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    audit.score >= 80 ? 'bg-green-500' : 
                    audit.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`} 
                  style={{ width: `${audit.score}%` }}
                ></div>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{audit.summary}</p>
            
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Key Findings</h4>
                <ul className="space-y-1">
                  {audit.keyFindings.slice(0, 2).map((finding, index) => (
                    <li key={index} className="text-xs text-gray-600 flex items-start">
                      <CheckCircleIcon className="h-3 w-3 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                      {finding}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendations</h4>
                <ul className="space-y-1">
                  {audit.recommendations.slice(0, 2).map((rec, index) => (
                    <li key={index} className="text-xs text-gray-600 flex items-start">
                      <InformationCircleIcon className="h-3 w-3 text-blue-500 mr-1 mt-0.5 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-gray-500 capitalize">{audit.type} audit</span>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCompetitorAnalysis = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Competitor Analysis</h2>
          <p className="text-gray-600 mt-1">Compare your performance against key competitors</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <PlusIcon className="h-5 w-5" />
          Add Competitor
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {competitorAnalysis.map((competitor, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{competitor.name}</h3>
              <span className="text-xs text-gray-500">{competitor.domain}</span>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Monthly Traffic</span>
                <span className="font-medium">{competitor.traffic.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Ranking Keywords</span>
                <span className="font-medium">{competitor.keywords}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Backlinks</span>
                <span className="font-medium">{competitor.backlinks.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Social Followers</span>
                <span className="font-medium">{competitor.socialFollowers.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <h4 className="text-sm font-medium text-green-700 mb-1">Strengths</h4>
                <ul className="space-y-1">
                  {competitor.strengths.map((strength, idx) => (
                    <li key={idx} className="text-xs text-gray-600 flex items-start">
                      <CheckCircleIcon className="h-3 w-3 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-red-700 mb-1">Weaknesses</h4>
                <ul className="space-y-1">
                  {competitor.weaknesses.map((weakness, idx) => (
                    <li key={idx} className="text-xs text-gray-600 flex items-start">
                      <XCircleIcon className="h-3 w-3 text-red-500 mr-1 mt-0.5 flex-shrink-0" />
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContentQualityReport = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Content Quality Report</h2>
          <p className="text-gray-600 mt-1">Comprehensive analysis of content quality across all channels</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <PlusIcon className="h-5 w-5" />
          New Quality Check
        </button>
      </div>

      {/* Quality Scorecards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overall Quality Score</p>
              <p className="text-2xl font-bold text-gray-900">{contentQualityData.overallScore}/10</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <DocumentMagnifyingGlassIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+0.3 from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Content Analyzed</p>
              <p className="text-2xl font-bold text-gray-900">{contentQualityData.analyzedContent}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">of {contentQualityData.totalContent} total pieces</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Issues Found</p>
              <p className="text-2xl font-bold text-gray-900">17</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowDownIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">-5 from last audit</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Next Review</p>
              <p className="text-2xl font-bold text-gray-900">Jan 20</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <CalendarIcon className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ClockIcon className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-gray-600">20 days remaining</span>
          </div>
        </div>
      </div>

      {/* Content Type Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Type Performance</h3>
          <div className="space-y-4">
            {Object.entries(contentQualityData.contentTypes).map(([type, data]) => (
              <div key={type} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium text-gray-900 capitalize">{type}</span>
                  <p className="text-sm text-gray-600">{data.count} pieces</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-900">{data.avgScore}/10</span>
                  <p className="text-sm text-gray-600">{data.issues} issues</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quality Metrics</h3>
          <div className="space-y-4">
            {Object.entries(contentQualityData.qualityMetrics).map(([metric, data]) => (
              <div key={metric} className="flex justify-between items-center">
                <span className="text-sm text-gray-600 capitalize">
                  {metric.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">{data.score}/10</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    data.status === 'excellent' ? 'bg-green-100 text-green-800' :
                    data.status === 'good' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {data.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Issues */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Quality Issues</h3>
        <div className="space-y-3">
          {contentQualityData.recentIssues.map((issue) => (
            <div key={issue.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  issue.severity === 'high' ? 'bg-red-500' :
                  issue.severity === 'medium' ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}></div>
                <div>
                  <p className="font-medium text-gray-900">{issue.content}</p>
                  <p className="text-sm text-gray-600 capitalize">{issue.type} issue</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                issue.status === 'fixed' ? 'bg-green-100 text-green-800' :
                issue.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {issue.status.replace('_', ' ')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStrategicRelevance = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Content Relevance to Strategic Plan</h2>
          <p className="text-gray-600 mt-1">Analysis of how well content aligns with strategic objectives</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <PlusIcon className="h-5 w-5" />
          Update Strategic Goals
        </button>
      </div>

      {/* Strategic Alignment Scorecard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overall Alignment</p>
              <p className="text-2xl font-bold text-gray-900">{strategicRelevanceData.overallAlignment}/10</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TagIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+0.5 from last quarter</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Highly Relevant</p>
              <p className="text-2xl font-bold text-gray-900">{strategicRelevanceData.contentAlignment.highlyRelevant.percentage}%</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">{strategicRelevanceData.contentAlignment.highlyRelevant.count} pieces</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Strategic Gaps</p>
              <p className="text-2xl font-bold text-gray-900">{strategicRelevanceData.gaps.length}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">Identified areas</span>
          </div>
        </div>
      </div>

      {/* Strategic Goals Alignment */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategic Goals Alignment</h3>
        <div className="space-y-4">
          {strategicRelevanceData.strategicGoals.map((goal) => (
            <div key={goal.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  goal.priority === 'high' ? 'bg-red-500' :
                  goal.priority === 'medium' ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}></div>
                <div>
                  <p className="font-medium text-gray-900">{goal.name}</p>
                  <p className="text-sm text-gray-600">{goal.contentCount} content pieces</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-bold text-gray-900">{goal.alignment}/10</span>
                <p className="text-sm text-gray-600 capitalize">{goal.priority} priority</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Relevance Distribution</h3>
          <div className="space-y-4">
            {Object.entries(strategicRelevanceData.contentAlignment).map(([level, data]) => (
              <div key={level} className="flex justify-between items-center">
                <span className="text-sm text-gray-600 capitalize">
                  {level.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${data.percentage}%` }}
                    ></div>
                  </div>
                  <span className="font-medium text-gray-900">{data.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategic Gaps</h3>
          <div className="space-y-3">
            {strategicRelevanceData.gaps.map((gap, index) => (
              <div key={index} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start space-x-2">
                  <ExclamationTriangleIcon className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">{gap.goal}</p>
                    <p className="text-sm text-gray-600">{gap.gap}</p>
                    <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${
                      gap.impact === 'high' ? 'bg-red-100 text-red-800' :
                      gap.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {gap.impact} impact
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strategic Recommendations */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategic Content Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {strategicRelevanceData.recommendations.map((rec, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <TagIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900">{rec}</p>
                <p className="text-xs text-gray-600 mt-1">Strategic alignment improvement</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRecommendations = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Actionable Recommendations</h2>
          <p className="text-gray-600 mt-1">Prioritized recommendations based on audit findings</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <PlusIcon className="h-5 w-5" />
          Add Recommendation
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ExclamationTriangleIcon className="h-5 w-5 mr-2 text-red-600" />
            High Priority
          </h3>
          <div className="space-y-4">
            {[
              "Optimize website loading speed for mobile devices",
              "Fix broken links and 404 errors",
              "Implement structured data markup",
              "Enhance social media engagement strategy"
            ].map((rec, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{rec}</p>
                  <p className="text-xs text-gray-600 mt-1">Estimated impact: High</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <InformationCircleIcon className="h-5 w-5 mr-2 text-yellow-600" />
            Medium Priority
          </h3>
          <div className="space-y-4">
            {[
              "Enhance email segmentation strategy",
              "Create more video content",
              "Improve internal linking structure",
              "Optimize meta descriptions"
            ].map((rec, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                <InformationCircleIcon className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{rec}</p>
                  <p className="text-xs text-gray-600 mt-1">Estimated impact: Medium</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <CheckCircleIcon className="h-5 w-5 mr-2 text-green-600" />
          Low Priority
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Update copyright year in footer",
            "Add more social sharing buttons",
            "Optimize images for web",
            "Create FAQ page",
            "Add breadcrumb navigation",
            "Implement schema markup for reviews"
          ].map((rec, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircleIcon className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900">{rec}</p>
                <p className="text-xs text-gray-600 mt-1">Estimated impact: Low</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8">
      {renderHeaderWithFilters()}
      
      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div>
        {activeTab === "overview" && renderOverview()}
        {activeTab === "reports" && renderAuditReports()}
        {activeTab === "competitors" && renderCompetitorAnalysis()}
        {activeTab === "content-quality" && renderContentQualityReport()}
        {activeTab === "strategic-relevance" && renderStrategicRelevance()}
        {activeTab === "recommendations" && renderRecommendations()}
      </div>
    </div>
  );
} 