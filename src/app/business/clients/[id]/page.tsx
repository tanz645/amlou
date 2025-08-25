"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeftIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  MapPinIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  FolderIcon,
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  CheckCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import QuickActions from "../../../../components/QuickActions";

ChartJS.register(ArcElement, Tooltip, Legend);



// Mock data for clients with multiple projects
const clientsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "TechStart Inc",
    email: "sarah@techstart.com",
    phone: "+1 (555) 123-4567",
    status: "Active",
    type: "Enterprise",
    assignedTo: "John Smith",
    website: "https://techstart.com",
    address: "123 Tech Street, San Francisco, CA 94105",
    notes: "High-value client interested in expanding services. Very responsive to communication.",
    image: "/api/placeholder/150/150",
    importantDates: [
      {
        id: 1,
        title: "Contract Renewal",
        date: "2024-06-30",
        type: "contract",
        description: "Website redesign contract expires",
        priority: "high"
      },
      {
        id: 2,
        title: "Annual Review",
        date: "2024-03-15",
        type: "meeting",
        description: "Annual client performance review",
        priority: "medium"
      },
      {
        id: 3,
        title: "Payment Due",
        date: "2024-02-01",
        type: "payment",
        description: "Monthly PPC campaign payment",
        priority: "high"
      }
    ],
    urgentIssues: [
      {
        id: 1,
        title: "Website Performance Issues",
        description: "Client reported slow loading times on mobile devices",
        priority: "high",
        status: "open",
        createdAt: "2024-01-20T10:30:00Z",
        assignedTo: "John Smith"
      },
      {
        id: 2,
        title: "Payment Overdue",
        description: "PPC campaign payment is 5 days overdue",
        priority: "critical",
        status: "open",
        createdAt: "2024-01-18T14:15:00Z",
        assignedTo: "Jane Doe"
      }
    ],
    meetings: [
      {
        id: 1,
        title: "Monthly Review Meeting",
        date: "2024-02-05T10:00:00Z",
        duration: "60",
        type: "video",
        status: "scheduled",
        attendees: ["Sarah Johnson", "John Smith", "Jane Doe"],
        agenda: "Review Q1 performance and discuss Q2 strategy"
      },
      {
        id: 2,
        title: "Website Launch Planning",
        date: "2024-01-30T14:00:00Z",
        duration: "90",
        type: "in-person",
        status: "completed",
        attendees: ["Sarah Johnson", "John Smith"],
        agenda: "Finalize website launch timeline and deliverables"
      }
    ],
    projects: [
      {
        id: 1,
        name: "Website Redesign & SEO",
        description: "Complete website redesign with SEO optimization",
        status: 'active',
        progress: 85,
        startDate: "2024-01-01",
        endDate: "2024-06-30",
        monthlyRevenue: 5000,
        totalRevenue: 25000,
        paymentDue: 5000,
        nextPaymentDate: "2024-02-01",
        paymentStatus: 'paid',
        services: ["Web Design", "SEO"],
        assignedTo: "John Smith",
        notes: "Phase 1 completed, moving to SEO optimization"
      },
      {
        id: 2,
        name: "PPC Campaign Management",
        description: "Google Ads and Facebook Ads campaign management",
        status: 'active',
        progress: 60,
        startDate: "2024-02-01",
        endDate: "2024-12-31",
        monthlyRevenue: 3500,
        totalRevenue: 35000,
        paymentDue: 3500,
        nextPaymentDate: "2024-02-01",
        paymentStatus: 'pending',
        services: ["PPC", "Social Media Ads"],
        assignedTo: "Jane Doe",
        notes: "Campaigns performing well, scaling up budget"
      }
    ]
  },
  {
    id: 2,
    name: "Mike Chen",
    company: "Digital Solutions",
    email: "mike@digitalsolutions.com",
    phone: "+1 (555) 987-6543",
    status: "Active",
    type: "Mid-Market",
    assignedTo: "Jane Doe",
    website: "https://digitalsolutions.com",
    address: "456 Digital Ave, New York, NY 10001",
    notes: "Growing company with potential for additional services. Good relationship.",
    projects: [
      {
        id: 3,
        name: "Email Marketing Automation",
        description: "Set up email marketing automation and campaigns",
        status: 'active',
        progress: 90,
        startDate: "2024-01-01",
        endDate: "2024-03-31",
        monthlyRevenue: 3200,
        totalRevenue: 9600,
        paymentDue: 3200,
        nextPaymentDate: "2024-02-01",
        paymentStatus: 'paid',
        services: ["Email Marketing", "Automation"],
        assignedTo: "Jane Doe",
        notes: "Automation flows set up, monitoring performance"
      },
      {
        id: 4,
        name: "PPC Optimization",
        description: "Optimize existing PPC campaigns for better ROI",
        status: 'completed',
        progress: 100,
        startDate: "2023-10-01",
        endDate: "2024-01-31",
        monthlyRevenue: 2000,
        totalRevenue: 8000,
        paymentDue: 0,
        nextPaymentDate: null,
        paymentStatus: 'paid',
        services: ["PPC", "Conversion Optimization"],
        assignedTo: "Mike Johnson",
        notes: "Project completed successfully, client satisfied"
      }
    ]
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    company: "Creative Agency",
    email: "emily@creativeagency.com",
    phone: "+1 (555) 456-7890",
    status: "Active",
    type: "Small Business",
    assignedTo: "John Smith",
    website: "https://creativeagency.com",
    address: "789 Creative Blvd, Los Angeles, CA 90210",
    notes: "Creative agency with unique needs. Requires personalized approach.",
    projects: [
      {
        id: 5,
        name: "Social Media Management",
        description: "Complete social media management and content creation",
        status: 'active',
        progress: 45,
        startDate: "2024-01-01",
        endDate: "2024-03-31",
        monthlyRevenue: 3200,
        totalRevenue: 9600,
        paymentDue: 3200,
        nextPaymentDate: "2024-02-01",
        paymentStatus: 'overdue',
        services: ["Social Media", "Content Creation"],
        assignedTo: "John Smith",
        notes: "Content calendar created, posting regularly"
      }
    ]
  },
  {
    id: 4,
    name: "David Wilson",
    company: "E-commerce Store",
    email: "david@ecommercestore.com",
    phone: "+1 (555) 321-6540",
    status: "Inactive",
    type: "Small Business",
    assignedTo: "Jane Doe",
    website: "https://ecommercestore.com",
    address: "321 Commerce St, Chicago, IL 60601",
    notes: "Contract ended. Follow up needed for renewal discussions.",
    projects: [
      {
        id: 6,
        name: "E-commerce Optimization",
        description: "Optimize e-commerce store for better conversions",
        status: 'completed',
        progress: 100,
        startDate: "2023-01-15",
        endDate: "2024-01-15",
        monthlyRevenue: 0,
        totalRevenue: 28000,
        paymentDue: 0,
        nextPaymentDate: null,
        paymentStatus: 'terminated',
        services: ["E-commerce", "Conversion Optimization"],
        assignedTo: "Jane Doe",
        notes: "Project completed, contract expired"
      }
    ]
  },
  {
    id: 5,
    name: "Lisa Thompson",
    company: "Local Restaurant",
    email: "lisa@localrestaurant.com",
    phone: "+1 (555) 789-0123",
    status: "Active",
    type: "Small Business",
    assignedTo: "Mike Johnson",
    website: "https://localrestaurant.com",
    address: "654 Local Rd, Miami, FL 33101",
    notes: "Local business with seasonal fluctuations. Good for referrals.",
    projects: [
      {
        id: 7,
        name: "Local SEO & Social Media",
        description: "Local SEO optimization and social media management",
        status: 'active',
        progress: 60,
        startDate: "2023-09-01",
        endDate: "2024-08-31",
        monthlyRevenue: 1800,
        totalRevenue: 19800,
        paymentDue: 1800,
        nextPaymentDate: "2024-02-01",
        paymentStatus: 'pending',
        services: ["Local SEO", "Social Media"],
        assignedTo: "Mike Johnson",
        notes: "Local rankings improving, social engagement growing"
      }
    ]
  },
  {
    id: 6,
    name: "Robert Kim",
    company: "Healthcare Solutions",
    email: "robert@healthcaresolutions.com",
    phone: "+1 (555) 147-2580",
    status: "Prospect",
    type: "Enterprise",
    assignedTo: "Sarah Wilson",
    website: "https://healthcaresolutions.com",
    address: "987 Health Way, Boston, MA 02101",
    notes: "Prospective client in final negotiation phase. High potential value.",
    projects: []
  },
];

// Progress Pie Chart Component
const ProgressPieChart = ({ progress }: { progress: number }) => {
  const data = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [progress, 100 - progress],
        backgroundColor: [
          progress >= 80 ? '#10B981' : progress >= 60 ? '#F59E0B' : '#EF4444',
          '#F3F4F6'
        ],
        borderColor: [
          progress >= 80 ? '#059669' : progress >= 60 ? '#D97706' : '#DC2626',
          '#E5E7EB'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    cutout: '70%',
  };

  return (
    <div className="relative w-16 h-16">
      <Pie data={data} options={options} />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-semibold text-gray-700">{progress}%</span>
      </div>
    </div>
  );
};

// Helper functions
const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800 border-green-200";
    case "Inactive":
      return "bg-red-100 text-red-800 border-red-200";
    case "Prospect":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "Enterprise":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "Mid-Market":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Small Business":
      return "bg-orange-100 text-orange-800 border-orange-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getProjectStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "completed":
      return "bg-blue-100 text-blue-800";
    case "on-hold":
      return "bg-yellow-100 text-yellow-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-800";
    case "overdue":
      return "bg-red-100 text-red-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "terminated":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getDaysUntilDue = (nextPaymentDate: string | null) => {
  if (!nextPaymentDate) return null;
  const today = new Date();
  const dueDate = new Date(nextPaymentDate);
  const diffTime = dueDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};



// Mock communication history
const communicationHistory = [
  {
    id: 1,
    type: "email",
    subject: "Project Update - Website Redesign",
    content: "Hi Sarah, here's the latest update on your website redesign project...",
    timestamp: "2024-01-20T10:30:00Z",
    direction: "outbound",
  },
  {
    id: 2,
    type: "call",
    subject: "PPC Campaign Discussion",
    content: "Discussed PPC campaign performance and budget optimization...",
    timestamp: "2024-01-18T14:15:00Z",
    direction: "inbound",
  },
  {
    id: 3,
    type: "meeting",
    subject: "Monthly Review Meeting",
    content: "Monthly review meeting to discuss project progress and next steps...",
    timestamp: "2024-01-15T09:00:00Z",
    direction: "outbound",
  },
  {
    id: 4,
    type: "email",
    subject: "Invoice #2024-001",
    content: "Invoice for January services has been sent...",
    timestamp: "2024-01-10T16:45:00Z",
    direction: "outbound",
  },
];

const getCommunicationIcon = (type: string) => {
  switch (type) {
    case "email":
      return EnvelopeIcon;
    case "call":
      return PhoneIcon;
    case "meeting":
      return CalendarIcon;
    default:
      return ChatBubbleLeftRightIcon;
  }
};

const getCommunicationColor = (type: string) => {
  switch (type) {
    case "email":
      return "bg-blue-100 text-blue-800";
    case "call":
      return "bg-green-100 text-green-800";
    case "meeting":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const formatTimestamp = (timestamp: string) => {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function ClientDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params?.id ? parseInt(params.id as string) : null;

  const client = clientId ? clientsData.find(c => c.id === clientId) : null;

  // Invoice modal state
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoiceForm, setInvoiceForm] = useState({
    projectId: '',
    amount: '',
    description: '',
    dueDate: '',
    items: [{ description: '', quantity: '1', rate: '', amount: '' }]
  });

  if (!client) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Client Not Found</h1>
          <p className="text-gray-600 mb-4">The client you&apos;re looking for doesn&apos;t exist.</p>
          <button
            onClick={() => router.push("/business/clients")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Clients
          </button>
        </div>
      </div>
    );
  }

  // Calculate client-level totals from projects
  let totalMonthlyRevenue = 0;
  let totalRevenue = 0;
  let totalPaymentDue = 0;
  
  client.projects.forEach(project => {
    totalMonthlyRevenue += project.monthlyRevenue || 0;
    totalRevenue += project.totalRevenue || 0;
    totalPaymentDue += project.paymentDue || 0;
  });
  
  const activeProjects = client.projects.filter(project => project.status === 'active');
  const completedProjects = client.projects.filter(project => project.status === 'completed');
  
  // Calculate overall progress (average of active projects)
  let overallProgress = 0;
  if (activeProjects.length > 0) {
    const totalProgress = activeProjects.reduce((sum, project) => sum + (project.progress || 0), 0);
    overallProgress = Math.round(totalProgress / activeProjects.length);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/business/clients")}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                Back to Clients
              </button>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <img 
                    src={client.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(client.name)}&background=3B82F6&color=fff&size=48`}
                    alt={client.name}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(client.name)}&background=3B82F6&color=fff&size=48`;
                    }}
                  />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">{client.name}</h1>
                  <p className="text-sm text-gray-600">{client.company}</p>
                </div>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(client.status)}`}>
                {client.status}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                <PencilIcon className="w-4 h-4" />
                Edit
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-900 transition-colors">
                <TrashIcon className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Client Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Client Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Basic Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <UserIcon className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{client.name}</p>
                        <p className="text-sm text-gray-500">{client.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                      <a href={`mailto:${client.email}`} className="text-sm text-blue-600 hover:text-blue-800">
                        {client.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <PhoneIcon className="w-5 h-5 text-gray-400" />
                      <a href={`tel:${client.phone}`} className="text-sm text-blue-600 hover:text-blue-800">
                        {client.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <GlobeAltIcon className="w-5 h-5 text-gray-400" />
                      <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800">
                        {client.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPinIcon className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">{client.address}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Business Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Type:</span>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getTypeColor(client.type)}`}>
                        {client.type}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Assigned To:</span>
                      <span className="text-sm font-medium text-gray-900">{client.assignedTo}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Projects:</span>
                      <span className="text-sm font-medium text-gray-900">{client.projects.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Active Projects:</span>
                      <span className="text-sm font-medium text-gray-900">{activeProjects.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Completed Projects:</span>
                      <span className="text-sm font-medium text-gray-900">{completedProjects.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Urgent Issues Section */}
            {client.urgentIssues && client.urgentIssues.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                    Urgent Issues ({client.urgentIssues.length})
                  </h2>
                  <button className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    <PlusIcon className="w-4 h-4" />
                    Add Issue
                  </button>
                </div>
                <div className="space-y-4">
                  {client.urgentIssues.map((issue) => (
                    <div key={issue.id} className="border border-red-200 rounded-lg p-4 bg-red-50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-sm font-semibold text-gray-900">{issue.title}</h3>
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              issue.priority === 'critical' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                            }`}>
                              {issue.priority}
                            </span>
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              issue.status === 'open' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {issue.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{issue.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>Assigned to: {issue.assignedTo}</span>
                            <span>Created: {new Date(issue.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="text-gray-600 hover:text-gray-900">
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                          Take Action
                        </button>
                        <button className="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors">
                          Mark Resolved
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Meetings Section */}
            {client.meetings && client.meetings.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5" />
                    Meetings ({client.meetings.length})
                  </h2>
                  <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <PlusIcon className="w-4 h-4" />
                    Schedule Meeting
                  </button>
                </div>
                <div className="space-y-4">
                  {client.meetings.map((meeting) => (
                    <div key={meeting.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-sm font-semibold text-gray-900">{meeting.title}</h3>
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              meeting.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {meeting.status}
                            </span>
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              meeting.type === 'video' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {meeting.type}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{meeting.agenda}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <ClockIcon className="w-3 h-3" />
                              {new Date(meeting.date).toLocaleDateString()} at {new Date(meeting.date).toLocaleTimeString()}
                            </span>
                            <span>{meeting.duration} min</span>
                            <span>{meeting.attendees.length} attendees</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="text-gray-600 hover:text-gray-900">
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                          Join Meeting
                        </button>
                        <button className="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors">
                          Reschedule
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FolderIcon className="w-5 h-5" />
                  Projects ({client.projects.length})
                </h2>
                <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <PlusIcon className="w-4 h-4" />
                  Add Project
                </button>
              </div>

              {client.projects.length === 0 ? (
                <div className="text-center py-8">
                  <FolderIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                     <h3 className="text-lg font-medium text-gray-900 mb-2">No Projects Yet</h3>
                   <p className="text-gray-600 mb-4">This client doesn&apos;t have any projects yet.</p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Create First Project
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {client.projects.map((project) => (
                    <div key={project.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getProjectStatusColor(project.status)}`}>
                              {project.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                          <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                              <CalendarIcon className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">
                                {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <UserIcon className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">{project.assignedTo}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="text-gray-600 hover:text-gray-900">
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center gap-3">
                            <ProgressPieChart progress={project.progress} />
                            <div>
                              <p className="text-sm font-medium text-gray-900">Progress</p>
                              <p className="text-xs text-gray-500">{project.progress}% completed</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <CurrencyDollarIcon className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900">Monthly Revenue</span>
                          </div>
                          <p className="text-lg font-bold text-gray-900">${project.monthlyRevenue.toLocaleString()}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <CurrencyDollarIcon className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900">Total Revenue</span>
                          </div>
                          <p className="text-lg font-bold text-gray-900">${project.totalRevenue.toLocaleString()}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <CurrencyDollarIcon className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900">Payment Due</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-lg font-bold text-gray-900">${project.paymentDue.toLocaleString()}</p>
                            <span className={`inline-flex px-1 py-0.5 text-xs font-medium rounded ${getPaymentStatusColor(project.paymentStatus)}`}>
                              {project.paymentStatus}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Services</h4>
                          <div className="flex flex-wrap gap-1">
                            {project.services.map((service, index) => (
                              <span key={index} className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Notes</h4>
                          <p className="text-sm text-gray-600">{project.notes}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Communication History */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ChatBubbleLeftRightIcon className="w-5 h-5" />
                Communication History
              </h2>
              <div className="space-y-4">
                {communicationHistory.map((communication) => {
                  const IconComponent = getCommunicationIcon(communication.type);
                  return (
                    <div key={communication.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className={`p-2 rounded-lg ${getCommunicationColor(communication.type)}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-sm font-medium text-gray-900">{communication.subject}</h3>
                          <span className="text-xs text-gray-500">{formatTimestamp(communication.timestamp)}</span>
                        </div>
                        <p className="text-sm text-gray-600">{communication.content}</p>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full mt-2 ${
                          communication.direction === 'outbound' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {communication.direction === 'outbound' ? 'Sent' : 'Received'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Overall Progress</span>
                  <div className="flex items-center gap-2">
                    <ProgressPieChart progress={overallProgress} />
                    <span className="text-sm font-medium text-gray-900">{overallProgress}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Monthly Revenue</span>
                  <span className="text-sm font-medium text-gray-900">${totalMonthlyRevenue.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Revenue</span>
                  <span className="text-sm font-medium text-gray-900">${totalRevenue.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Payment Due</span>
                  <span className="text-sm font-medium text-gray-900">${totalPaymentDue.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Important Dates */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Dates</h3>
              <div className="space-y-3">
                {client.projects
                  .filter(project => project.nextPaymentDate)
                  .map((project) => {
                    const daysUntilDue = getDaysUntilDue(project.nextPaymentDate);
                    return (
                      <div key={project.id} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{project.name}</p>
                          <p className="text-xs text-gray-500">Next Payment</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {new Date(project.nextPaymentDate!).toLocaleDateString()}
                          </p>
                          {daysUntilDue !== null && (
                            <span className={`text-xs px-1 py-0.5 rounded ${
                              daysUntilDue < 0 ? 'bg-red-100 text-red-800' :
                              daysUntilDue <= 7 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {daysUntilDue < 0 ? `${Math.abs(daysUntilDue)}d overdue` :
                               daysUntilDue === 0 ? 'Due today' :
                               `${daysUntilDue}d`}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Important Dates */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Important Dates
                </h3>
                <button className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                  <PlusIcon className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-3">
                {client.importantDates && client.importantDates.map((date) => {
                  const daysUntil = Math.ceil((new Date(date.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  return (
                    <div key={date.id} className={`p-3 rounded-lg border ${
                      date.priority === 'high' ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-900">{date.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          date.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {date.priority}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{date.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {new Date(date.date).toLocaleDateString()}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          daysUntil < 0 ? 'bg-red-100 text-red-800' :
                          daysUntil <= 7 ? 'bg-orange-100 text-orange-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {daysUntil < 0 ? `${Math.abs(daysUntil)}d ago` :
                           daysUntil === 0 ? 'Today' :
                           daysUntil === 1 ? 'Tomorrow' :
                           `${daysUntil}d`}
                        </span>
                      </div>
                    </div>
                  );
                })}
                <button className="w-full px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Add Important Date
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <QuickActions type="client" onAction={(action, data) => {
              console.log('Quick action performed:', action, data);
            }} />

            {/* Delivery Failures */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ExclamationTriangleIcon className="w-4 h-4 text-red-500" />
                Delivery Failures
              </h3>
              <div className="space-y-3">
                <div className="text-center py-4">
                  <ExclamationTriangleIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">No delivery failures</p>
                </div>
                <button className="w-full px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Report Failure
                </button>
              </div>
            </div>

            {/* Projects Nearing Termination */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ClockIcon className="w-4 h-4 text-orange-500" />
                Projects Ending Soon
              </h3>
              <div className="space-y-3">
                {client.projects
                  .filter(project => {
                    const endDate = new Date(project.endDate);
                    const today = new Date();
                    const diffTime = endDate.getTime() - today.getTime();
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    return diffDays <= 60 && diffDays > 0;
                  })
                  .map((project) => {
                    const endDate = new Date(project.endDate);
                    const today = new Date();
                    const diffTime = endDate.getTime() - today.getTime();
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    return (
                      <div key={project.id} className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium text-gray-900">{project.name}</h4>
                          <span className="text-xs text-orange-600 font-medium">{diffDays}d left</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">Ends: {endDate.toLocaleDateString()}</p>
                        <div className="flex gap-2">
                          <button className="px-2 py-1 text-xs bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors">
                            Extend
                          </button>
                          <button className="px-2 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors">
                            Renew
                          </button>
                        </div>
                      </div>
                    );
                  })}
                {client.projects.filter(project => {
                  const endDate = new Date(project.endDate);
                  const today = new Date();
                  const diffTime = endDate.getTime() - today.getTime();
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  return diffDays <= 60 && diffDays > 0;
                }).length === 0 && (
                  <div className="text-center py-4">
                    <CheckCircleIcon className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">No projects ending soon</p>
                  </div>
                )}
              </div>
            </div>

            {/* Invoices */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <CurrencyDollarIcon className="w-4 h-4" />
                  Invoices
                </h3>
                <button className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                  <PlusIcon className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">INV-2024-001</p>
                    <p className="text-xs text-gray-600">Website Redesign</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">$5,000</p>
                    <span className="text-xs text-green-600 font-medium">Paid</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">INV-2024-002</p>
                    <p className="text-xs text-gray-600">PPC Campaign</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">$3,500</p>
                    <span className="text-xs text-yellow-600 font-medium">Pending</span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowInvoiceModal(true)}
                  className="w-full px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create New Invoice
                </button>
              </div>
            </div>

            {/* Slow Tasks */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ClockIcon className="w-4 h-4 text-yellow-500" />
                Slow Tasks
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900">SEO Content Creation</h4>
                    <span className="text-xs text-yellow-600 font-medium">5 days overdue</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">Project: Website Redesign</p>
                  <div className="flex gap-2">
                    <button className="px-2 py-1 text-xs bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors">
                      Follow Up
                    </button>
                    <button className="px-2 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors">
                      Update
                    </button>
                  </div>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900">PPC Campaign Setup</h4>
                    <span className="text-xs text-yellow-600 font-medium">2 days overdue</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">Project: PPC Campaign Management</p>
                  <div className="flex gap-2">
                    <button className="px-2 py-1 text-xs bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors">
                      Follow Up
                    </button>
                    <button className="px-2 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Communication Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Communication Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Interactions</span>
                  <span className="text-sm font-medium text-gray-900">{communicationHistory.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Emails</span>
                  <span className="text-sm font-medium text-gray-900">
                    {communicationHistory.filter(c => c.type === 'email').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Calls</span>
                  <span className="text-sm font-medium text-gray-900">
                    {communicationHistory.filter(c => c.type === 'call').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Meetings</span>
                  <span className="text-sm font-medium text-gray-900">
                    {communicationHistory.filter(c => c.type === 'meeting').length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Modal */}
      {showInvoiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Create New Invoice</h2>
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                  <select
                    value={invoiceForm.projectId}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, projectId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Project</option>
                    {client?.projects.map((project) => (
                      <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={invoiceForm.dueDate}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, dueDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={invoiceForm.description}
                  onChange={(e) => setInvoiceForm({ ...invoiceForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Invoice description"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Items</label>
                <div className="space-y-3">
                  {invoiceForm.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-4 gap-3">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => {
                          const newItems = [...invoiceForm.items];
                          newItems[index].description = e.target.value;
                          setInvoiceForm({ ...invoiceForm, items: newItems });
                        }}
                        className="col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Item description"
                      />
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const newItems = [...invoiceForm.items];
                          newItems[index].quantity = e.target.value;
                          setInvoiceForm({ ...invoiceForm, items: newItems });
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Qty"
                      />
                      <input
                        type="number"
                        value={item.rate}
                        onChange={(e) => {
                          const newItems = [...invoiceForm.items];
                          newItems[index].rate = e.target.value;
                          setInvoiceForm({ ...invoiceForm, items: newItems });
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Rate"
                      />
                    </div>
                  ))}
                  <button
                    onClick={() => setInvoiceForm({
                      ...invoiceForm,
                      items: [...invoiceForm.items, { description: '', quantity: '1', rate: '', amount: '' }]
                    })}
                    className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                  >
                    Add Item
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log('Creating invoice:', invoiceForm);
                  alert(`Invoice created!\nProject: ${client?.projects.find(p => p.id === parseInt(invoiceForm.projectId))?.name}\nAmount: $${invoiceForm.amount}`);
                  setShowInvoiceModal(false);
                  setInvoiceForm({
                    projectId: '', amount: '', description: '', dueDate: '',
                    items: [{ description: '', quantity: '1', rate: '', amount: '' }]
                  });
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
