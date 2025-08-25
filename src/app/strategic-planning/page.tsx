"use client";

import React, { useState } from "react";
import {
  MagnifyingGlassCircleIcon,
  LightBulbIcon,
  PlusIcon,
  ChartBarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  RocketLaunchIcon,
  PresentationChartLineIcon,
  EyeIcon,
  PencilIcon,
  ArrowUpIcon,
  ClockIcon,
  FunnelIcon,
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

// Mock data for digital marketing planning
const marketingPlans = [
  {
    id: "1",
    title: "Q4 Social Media Campaign",
    description: "Comprehensive social media campaign across all platforms",
    status: "active",
    type: "campaign",
    startDate: "2024-10-01",
    endDate: "2024-12-31",
    budget: 25000,
    spent: 18500,
    progress: 74,
    platforms: ["Facebook", "Instagram", "LinkedIn", "TikTok"],
    team: ["John Smith", "Sarah Johnson", "Mike Chen"],
  },
  {
    id: "2",
    title: "Website SEO Optimization",
    description: "Improve search engine rankings and organic traffic",
    status: "planning",
    type: "seo",
    startDate: "2024-11-01",
    endDate: "2024-12-15",
    budget: 8000,
    spent: 0,
    progress: 15,
    platforms: ["Google", "Bing", "Organic Search"],
    team: ["Alex Rodriguez", "Lisa Wang"],
  },
  {
    id: "3",
    title: "Email Marketing Automation",
    description: "Set up automated email sequences for lead nurturing",
    status: "completed",
    type: "email",
    startDate: "2024-09-01",
    endDate: "2024-09-30",
    budget: 5000,
    spent: 4800,
    progress: 100,
    platforms: ["Mailchimp", "HubSpot"],
    team: ["Emma Davis", "David Wilson"],
  }
];

const tabs = [
  { id: "dashboard", name: "Dashboard", icon: PresentationChartLineIcon },
  { id: "audit", name: "Audit", icon: MagnifyingGlassCircleIcon },
  { id: "strategy", name: "Strategy", icon: LightBulbIcon },
  { id: "campaigns", name: "Campaigns", icon: RocketLaunchIcon },
  { id: "team", name: "Team", icon: UserGroupIcon },
  { id: "budget", name: "Budget", icon: CurrencyDollarIcon },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "active":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "planning":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "in_progress":
      return "bg-purple-100 text-purple-800 border-purple-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "campaign":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "seo":
      return "bg-green-50 text-green-700 border-green-200";
    case "email":
      return "bg-purple-50 text-purple-700 border-purple-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

export default function StrategicPlanningPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
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
        <h1 className="text-2xl font-bold text-gray-900">Strategic Planning</h1>
        <p className="text-gray-500 mt-1">Digital marketing strategy and campaign management</p>
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

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <RocketLaunchIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+8% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900">$125K</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+12% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Team Members</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <UserGroupIcon className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+2 new members</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Performance</p>
              <p className="text-2xl font-bold text-gray-900">8.7/10</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+0.3 from last month</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Campaigns</h3>
          <div className="space-y-4">
            {marketingPlans.slice(0, 3).map((plan) => (
              <div key={plan.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">{plan.title}</p>
                    <p className="text-sm text-gray-600">{plan.platforms.join(", ")}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{plan.progress}%</p>
                  <p className="text-sm text-gray-600">${plan.spent.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
          <div className="space-y-4">
            {marketingPlans.filter(plan => plan.status === "planning").map((plan) => (
              <div key={plan.id} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <ClockIcon className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-gray-900">{plan.title}</p>
                    <p className="text-sm text-gray-600">Starts {new Date(plan.startDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(plan.status)}`}>
                  {plan.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCampaigns = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Marketing Campaigns</h2>
          <p className="text-gray-600 mt-1">Manage and track your digital marketing campaigns</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <PlusIcon className="h-5 w-5" />
          New Campaign
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {marketingPlans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{plan.title}</h3>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(plan.type)}`}>
                  {plan.type.toUpperCase()}
                </span>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(plan.status)}`}>
                {plan.status.toUpperCase()}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium">{plan.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${plan.progress}%` }}></div>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Budget</span>
                <span className="font-medium">${plan.spent.toLocaleString()} / ${plan.budget.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Timeline</span>
                <span className="font-medium">{new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Platforms</span>
                <span className="text-xs text-gray-500">{plan.platforms.length} platforms</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {plan.platforms.slice(0, 3).map((platform, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700">
                    {platform}
                  </span>
                ))}
                {plan.platforms.length > 3 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700">
                    +{plan.platforms.length - 3} more
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div className="flex -space-x-2">
                {plan.team.slice(0, 3).map((member, index) => (
                  <div key={index} className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-700">{member.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                ))}
                {plan.team.length > 3 && (
                  <div className="w-8 h-8 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">+{plan.team.length - 3}</span>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <EyeIcon className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <PencilIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAudit = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Marketing Audit</h2>
          <p className="text-gray-600 mt-1">Comprehensive analysis of your marketing performance</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <PlusIcon className="h-5 w-5" />
          New Audit
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Performance</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Organic Traffic</span>
              <span className="font-medium text-green-600">+23%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Keyword Rankings</span>
              <span className="font-medium text-blue-600">+15</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Backlinks</span>
              <span className="font-medium text-purple-600">+8%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Engagement Rate</span>
              <span className="font-medium text-green-600">4.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Follower Growth</span>
              <span className="font-medium text-blue-600">+12%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Reach</span>
              <span className="font-medium text-purple-600">+18%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Audit Reports</h3>
        <div className="space-y-4">
          {[
            { title: "Q4 2024 Marketing Audit", date: "2024-12-15", status: "completed" },
            { title: "Website Performance Review", date: "2024-11-30", status: "in_progress" },
            { title: "Social Media Strategy Analysis", date: "2024-11-15", status: "completed" }
          ].map((audit, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{audit.title}</p>
                <p className="text-sm text-gray-600">{new Date(audit.date).toLocaleDateString()}</p>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(audit.status)}`}>
                {audit.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStrategy = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Strategic Planning</h2>
          <p className="text-gray-600 mt-1">Define and track your marketing strategy goals</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <PlusIcon className="h-5 w-5" />
          New Strategy
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Short-term Goals</h3>
          <div className="space-y-3">
            {[
              { goal: "Increase website traffic by 25%", progress: 60 },
              { goal: "Launch email automation", progress: 100 },
              { goal: "Optimize landing pages", progress: 80 }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">{item.goal}</span>
                  <span className="font-medium">{item.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${item.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Medium-term Goals</h3>
          <div className="space-y-3">
            {[
              { goal: "Build brand awareness", progress: 45 },
              { goal: "Increase conversion rate", progress: 30 },
              { goal: "Expand to new markets", progress: 20 }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">{item.goal}</span>
                  <span className="font-medium">{item.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${item.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Long-term Goals</h3>
          <div className="space-y-3">
            {[
              { goal: "Market leadership", progress: 15 },
              { goal: "Global expansion", progress: 10 },
              { goal: "Revenue growth 3x", progress: 25 }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">{item.goal}</span>
                  <span className="font-medium">{item.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${item.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategic Initiatives</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Content Marketing Strategy", description: "Develop comprehensive content plan", status: "active" },
            { title: "Social Media Expansion", description: "Launch on new platforms", status: "planning" },
            { title: "Influencer Partnerships", description: "Build relationships with key influencers", status: "active" },
            { title: "Data Analytics Implementation", description: "Set up advanced tracking", status: "completed" }
          ].map((initiative, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900">{initiative.title}</h4>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(initiative.status)}`}>
                  {initiative.status.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-gray-600">{initiative.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTeam = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Team Management</h2>
          <p className="text-gray-600 mt-1">Manage your marketing team and their responsibilities</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <PlusIcon className="h-5 w-5" />
          Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: "Sarah Johnson", role: "Marketing Manager", avatar: "SJ", status: "online" },
          { name: "Mike Chen", role: "SEO Specialist", avatar: "MC", status: "online" },
          { name: "Emma Davis", role: "Content Creator", avatar: "ED", status: "away" },
          { name: "Alex Rodriguez", role: "Social Media Manager", avatar: "AR", status: "offline" },
          { name: "Lisa Wang", role: "Analytics Specialist", avatar: "LW", status: "online" },
          { name: "David Wilson", role: "PPC Manager", avatar: "DW", status: "online" }
        ].map((member, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">{member.avatar}</span>
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                  member.status === 'online' ? 'bg-green-400' : 
                  member.status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'
                }`}></div>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
                <p className="text-xs text-gray-500 capitalize">{member.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">95%</p>
            <p className="text-sm text-gray-600">Task Completion</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">4.8/5</p>
            <p className="text-sm text-gray-600">Team Satisfaction</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">+15%</p>
            <p className="text-sm text-gray-600">Productivity</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">8</p>
            <p className="text-sm text-gray-600">Active Projects</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBudget = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Budget Management</h2>
          <p className="text-gray-600 mt-1">Track and manage your marketing budget</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <PlusIcon className="h-5 w-5" />
          Add Budget Item
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Budget</span>
              <span className="font-medium text-gray-900">$125,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Spent</span>
              <span className="font-medium text-red-600">$89,500</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Remaining</span>
              <span className="font-medium text-green-600">$35,500</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '71.6%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget by Category</h3>
          <div className="space-y-3">
            {[
              { category: "Paid Advertising", amount: 45000, percentage: 36 },
              { category: "Content Creation", amount: 25000, percentage: 20 },
              { category: "Tools & Software", amount: 15000, percentage: 12 },
              { category: "Events & PR", amount: 20000, percentage: 16 },
              { category: "Other", amount: 20000, percentage: 16 }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-700">{item.category}</span>
                <span className="font-medium">${item.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Spending</h3>
          <div className="space-y-3">
            {[
              { month: "Jan", spent: 8500 },
              { month: "Feb", spent: 9200 },
              { month: "Mar", spent: 7800 },
              { month: "Apr", spent: 10500 },
              { month: "May", spent: 8900 },
              { month: "Jun", spent: 9500 }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-700">{item.month}</span>
                <span className="font-medium">${item.spent.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
        <div className="space-y-4">
          {[
            { description: "Facebook Ads Campaign", amount: 2500, date: "2024-12-15", type: "expense" },
            { description: "Content Creation Services", amount: 1800, date: "2024-12-14", type: "expense" },
            { description: "SEO Tools Subscription", amount: 500, date: "2024-12-13", type: "expense" },
            { description: "Budget Allocation", amount: 10000, date: "2024-12-10", type: "income" }
          ].map((transaction, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{transaction.description}</p>
                <p className="text-sm text-gray-600">{new Date(transaction.date).toLocaleDateString()}</p>
              </div>
              <span className={`font-medium ${transaction.type === 'expense' ? 'text-red-600' : 'text-green-600'}`}>
                {transaction.type === 'expense' ? '-' : '+'}${transaction.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8">
      {renderHeaderWithFilters()}
      
      {/* Header */}
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
        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "campaigns" && renderCampaigns()}
        {activeTab === "audit" && renderAudit()}
        {activeTab === "strategy" && renderStrategy()}
        {activeTab === "team" && renderTeam()}
        {activeTab === "budget" && renderBudget()}
      </div>
    </div>
  );
}
