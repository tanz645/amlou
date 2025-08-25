"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeftIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  TagIcon,
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
  DocumentTextIcon,
  FolderIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

interface GoalAssessment {
  id: string;
  goalId: string;
  assessment: string;
  progress: number;
  status: 'on-track' | 'at-risk' | 'behind' | 'completed';
  date: string;
  assessedBy: string;
  comments: string;
}

interface ProjectNote {
  id: string;
  content: string;
  author: string;
  date: string;
}

interface ProjectFile {
  id: string;
  name: string;
  size: string;
  uploadedBy: string;
  date: string;
}

interface Task {
  id: string;
  name: string;
  description: string;
  type: 'repetitive' | 'one-time';
  goalIds: string[];
  assignedTo: string;
  value?: number;
  estimatedHours?: number;
  hourlyRate?: number;
  startDate: string;
  endDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  location: string;
  dependencies?: string[];
  completionNotes?: string;
}

interface Goal {
  id: string;
  name: string;
  description: string;
  targetValue?: number;
  targetDate?: string;
  status: 'active' | 'completed' | 'paused';
  currentValue?: number;
  assessments: GoalAssessment[];
}

interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  goals: Goal[];
  tasks: Task[];
}

interface Project {
  id: string;
  name: string;
  clientId: string;
  clientName: string;
  clientCompany: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'active' | 'completed' | 'on-hold' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  projectManager: string;
  totalValue: number;
  services: Service[];
  budget: number;
  actualSpent: number;
  progress: number;
  projectSource: {
    type: 'partner' | 'online-platform';
    name: string;
  };
  growthMetrics: {
    currentGrowth: number;
    targetGrowth: number;
    growthRate: number;
    isOnTrack: boolean;
  };
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  riskFactors: string[];
}

// Mock data
const projectsData: Project[] = [
  {
    id: "1",
    name: "TechStart Inc - Digital Marketing Campaign",
    clientId: "1",
    clientName: "Sarah Johnson",
    clientCompany: "TechStart Inc",
    description: "Comprehensive digital marketing campaign including SEO, PPC, and content marketing",
    startDate: "2024-01-15",
    endDate: "2024-06-15",
    status: "active",
    priority: "high",
    projectManager: "John Smith",
    totalValue: 15000,
    budget: 12000,
    actualSpent: 8500,
    progress: 65,
    projectSource: {
      type: 'partner',
      name: 'TechStart Partners'
    },
    growthMetrics: {
      currentGrowth: 45,
      targetGrowth: 50,
      growthRate: 2.5,
      isOnTrack: true
    },
    riskLevel: 'medium',
    riskFactors: ['Resource constraints', 'Timeline pressure'],
    services: [
      {
        id: "1",
        name: "SEO Optimization",
        description: "Search engine optimization for better organic rankings",
        basePrice: 5000,
        goals: [
          {
            id: "1",
            name: "Increase Organic Traffic",
            description: "Achieve 50% increase in organic website traffic",
            targetValue: 50,
            currentValue: 35,
            targetDate: "2024-06-15",
            status: "active",
            assessments: [
              {
                id: "1",
                goalId: "1",
                assessment: "Good progress on keyword optimization, but content creation is behind schedule",
                progress: 70,
                status: 'at-risk',
                date: "2024-01-25",
                assessedBy: "John Smith",
                comments: "Need to accelerate content creation to meet traffic targets. Current growth rate is 2.1% vs target of 3.2%"
              },
              {
                id: "2",
                goalId: "1",
                assessment: "Backlink building campaign showing positive results",
                progress: 75,
                status: 'on-track',
                date: "2024-02-01",
                assessedBy: "Jane Doe",
                comments: "Successfully secured 15 high-quality backlinks. Traffic increased by 25% this month."
              }
            ]
          },
          {
            id: "2",
            name: "Improve Keyword Rankings",
            description: "Rank in top 3 for 10 target keywords",
            targetValue: 10,
            currentValue: 6,
            targetDate: "2024-06-15",
            status: "active",
            assessments: [
              {
                id: "3",
                goalId: "2",
                assessment: "Keyword research completed, on-page optimization in progress",
                progress: 60,
                status: 'on-track',
                date: "2024-01-30",
                assessedBy: "Mike Johnson",
                comments: "6 keywords already in top 10, 4 more need optimization. Technical SEO improvements showing results."
              }
            ]
          }
        ],
        tasks: [
          {
            id: "1",
            name: "Keyword Research",
            description: "Research and identify target keywords",
            type: "one-time",
            goalIds: ["1", "2"],
            assignedTo: "Jane Doe",
            value: 500,
            estimatedHours: 8,
            hourlyRate: 75,
            startDate: "2024-01-15",
            endDate: "2024-01-20",
            status: "completed",
            priority: "high",
            location: "Remote",
            completionNotes: "Identified 15 high-potential keywords with good search volume and low competition"
          },
          {
            id: "2",
            name: "On-Page SEO Audit",
            description: "Audit and optimize website pages",
            type: "one-time",
            goalIds: ["1", "2"],
            assignedTo: "Mike Johnson",
            value: 800,
            estimatedHours: 12,
            hourlyRate: 75,
            startDate: "2024-01-22",
            endDate: "2024-01-30",
            status: "in-progress",
            priority: "high",
            location: "Remote"
          },
          {
            id: "3",
            name: "Monthly SEO Report",
            description: "Generate monthly SEO performance report",
            type: "repetitive",
            goalIds: ["1", "2"],
            assignedTo: "Jane Doe",
            value: 200,
            estimatedHours: 4,
            hourlyRate: 75,
            startDate: "2024-02-01",
            endDate: "2024-06-15",
            status: "pending",
            priority: "medium",
            location: "Remote"
          }
        ]
      },
      {
        id: "2",
        name: "PPC Campaign Management",
        description: "Google Ads and social media advertising",
        basePrice: 7000,
        goals: [
          {
            id: "3",
            name: "Increase Lead Generation",
            description: "Generate 100 qualified leads per month",
            targetValue: 100,
            currentValue: 65,
            targetDate: "2024-06-15",
            status: "active",
            assessments: [
              {
                id: "4",
                goalId: "3",
                assessment: "Campaign performance below target, need optimization",
                progress: 65,
                status: 'at-risk',
                date: "2024-02-05",
                assessedBy: "Alex Chen",
                comments: "CTR is good but conversion rate is low. Need to improve landing page optimization and ad targeting."
              }
            ]
          },
          {
            id: "4",
            name: "Reduce Cost Per Acquisition",
            description: "Lower CPA from $150 to $100",
            targetValue: 100,
            currentValue: 135,
            targetDate: "2024-05-15",
            status: "active",
            assessments: [
              {
                id: "5",
                goalId: "4",
                assessment: "CPA optimization showing positive trends",
                progress: 45,
                status: 'on-track',
                date: "2024-02-10",
                assessedBy: "Alex Chen",
                comments: "Bid adjustments and audience targeting improvements reducing costs gradually."
              }
            ]
          }
        ],
        tasks: [
          {
            id: "4",
            name: "Campaign Setup",
            description: "Set up Google Ads and Facebook campaigns",
            type: "one-time",
            goalIds: ["3", "4"],
            assignedTo: "Alex Chen",
            value: 1200,
            estimatedHours: 16,
            hourlyRate: 80,
            startDate: "2024-01-25",
            endDate: "2024-02-05",
            status: "in-progress",
            priority: "high",
            location: "Google Ads Platform"
          },
          {
            id: "5",
            name: "Weekly Campaign Optimization",
            description: "Optimize campaigns based on performance data",
            type: "repetitive",
            goalIds: ["3", "4"],
            assignedTo: "Alex Chen",
            value: 300,
            estimatedHours: 6,
            hourlyRate: 80,
            startDate: "2024-02-05",
            endDate: "2024-06-15",
            status: "pending",
            priority: "medium",
            location: "Facebook Ads Manager"
          },
          {
            id: "6",
            name: "Landing Page A/B Testing",
            description: "Test different landing page variations",
            type: "one-time",
            goalIds: ["3"],
            assignedTo: "Sarah Wilson",
            value: 600,
            estimatedHours: 8,
            hourlyRate: 70,
            startDate: "2024-02-15",
            endDate: "2024-03-01",
            status: "pending",
            priority: "high",
            location: "Website"
          }
        ]
      },
      {
        id: "3",
        name: "Content Marketing",
        description: "Blog content creation and content strategy",
        basePrice: 3000,
        goals: [
          {
            id: "5",
            name: "Increase Content Engagement",
            description: "Achieve 10,000 monthly blog page views",
            targetValue: 10000,
            currentValue: 7200,
            targetDate: "2024-06-15",
            status: "active",
            assessments: [
              {
                id: "6",
                goalId: "5",
                assessment: "Content performance exceeding expectations",
                progress: 72,
                status: 'on-track',
                date: "2024-02-10",
                assessedBy: "Lisa Wang",
                comments: "Blog traffic growing steadily. Social sharing and email newsletter driving significant traffic."
              }
            ]
          },
          {
            id: "6",
            name: "Improve Social Media Presence",
            description: "Grow social media followers by 200%",
            targetValue: 200,
            currentValue: 120,
            targetDate: "2024-06-15",
            status: "active",
            assessments: [
              {
                id: "7",
                goalId: "6",
                assessment: "Social media growth on track",
                progress: 60,
                status: 'on-track',
                date: "2024-02-12",
                assessedBy: "Lisa Wang",
                comments: "Instagram and LinkedIn showing strong growth. Twitter needs more engagement."
              }
            ]
          }
        ],
        tasks: [
          {
            id: "7",
            name: "Content Calendar Creation",
            description: "Create monthly content calendar",
            type: "repetitive",
            goalIds: ["5", "6"],
            assignedTo: "Lisa Wang",
            value: 150,
            estimatedHours: 3,
            hourlyRate: 60,
            startDate: "2024-01-15",
            endDate: "2024-06-15",
            status: "completed",
            priority: "medium",
            location: "Remote"
          },
          {
            id: "8",
            name: "Blog Post Writing",
            description: "Write 2 blog posts per week",
            type: "repetitive",
            goalIds: ["5"],
            assignedTo: "Lisa Wang",
            value: 400,
            estimatedHours: 8,
            hourlyRate: 60,
            startDate: "2024-01-20",
            endDate: "2024-06-15",
            status: "in-progress",
            priority: "high",
            location: "Remote"
          },
          {
            id: "9",
            name: "Social Media Management",
            description: "Manage daily social media posts",
            type: "repetitive",
            goalIds: ["6"],
            assignedTo: "Lisa Wang",
            value: 300,
            estimatedHours: 5,
            hourlyRate: 60,
            startDate: "2024-01-20",
            endDate: "2024-06-15",
            status: "in-progress",
            priority: "medium",
            location: "Instagram, LinkedIn, Twitter"
          }
        ]
      },
      {
        id: "4",
        name: "Email Marketing",
        description: "Email campaign management and automation",
        basePrice: 2000,
        goals: [
          {
            id: "7",
            name: "Increase Email Open Rate",
            description: "Improve open rate from 15% to 25%",
            targetValue: 25,
            currentValue: 18,
            targetDate: "2024-05-15",
            status: "active",
            assessments: [
              {
                id: "8",
                goalId: "7",
                assessment: "Subject line testing showing improvements",
                progress: 72,
                status: 'on-track',
                date: "2024-02-08",
                assessedBy: "David Brown",
                comments: "A/B testing different subject lines. Personalization helping with open rates."
              }
            ]
          },
          {
            id: "8",
            name: "Grow Email List",
            description: "Increase email subscribers by 500",
            targetValue: 500,
            currentValue: 320,
            targetDate: "2024-06-15",
            status: "active",
            assessments: [
              {
                id: "9",
                goalId: "8",
                assessment: "Lead magnet performance strong",
                progress: 64,
                status: 'on-track',
                date: "2024-02-14",
                assessedBy: "David Brown",
                comments: "New lead magnet converting at 35%. Website popup working well."
              }
            ]
          }
        ],
        tasks: [
          {
            id: "10",
            name: "Email Campaign Setup",
            description: "Set up automated email sequences",
            type: "one-time",
            goalIds: ["7", "8"],
            assignedTo: "David Brown",
            value: 400,
            estimatedHours: 6,
            hourlyRate: 65,
            startDate: "2024-01-30",
            endDate: "2024-02-10",
            status: "completed",
            priority: "high",
            location: "Mailchimp Platform"
          },
          {
            id: "11",
            name: "Weekly Email Newsletter",
            description: "Send weekly newsletter to subscribers",
            type: "repetitive",
            goalIds: ["7"],
            assignedTo: "David Brown",
            value: 150,
            estimatedHours: 3,
            hourlyRate: 65,
            startDate: "2024-02-10",
            endDate: "2024-06-15",
            status: "in-progress",
            priority: "medium",
            location: "Mailchimp Platform"
          },
          {
            id: "12",
            name: "Lead Magnet Creation",
            description: "Create new lead magnets for list growth",
            type: "one-time",
            goalIds: ["8"],
            assignedTo: "David Brown",
            value: 300,
            estimatedHours: 5,
            hourlyRate: 65,
            startDate: "2024-02-15",
            endDate: "2024-02-25",
            status: "pending",
            priority: "medium",
            location: "Remote"
          }
        ]
      },
      {
        id: "5",
        name: "Analytics & Reporting",
        description: "Data analysis and performance reporting",
        basePrice: 1500,
        goals: [
          {
            id: "9",
            name: "Improve Data Accuracy",
            description: "Achieve 95% data accuracy across all platforms",
            targetValue: 95,
            currentValue: 87,
            targetDate: "2024-04-15",
            status: "active",
            assessments: [
              {
                id: "10",
                goalId: "9",
                assessment: "Data tracking implementation in progress",
                progress: 87,
                status: 'on-track',
                date: "2024-02-15",
                assessedBy: "Emma Davis",
                comments: "Google Analytics 4 setup complete. Facebook Pixel tracking improved. Need to implement conversion tracking."
              }
            ]
          },
          {
            id: "10",
            name: "Monthly Performance Reports",
            description: "Deliver comprehensive monthly reports",
            targetValue: 6,
            currentValue: 2,
            targetDate: "2024-06-15",
            status: "active",
            assessments: [
              {
                id: "11",
                goalId: "10",
                assessment: "Report template finalized, automation in progress",
                progress: 33,
                status: 'on-track',
                date: "2024-02-16",
                assessedBy: "Emma Davis",
                comments: "Report structure approved by client. Automated data collection working well."
              }
            ]
          }
        ],
        tasks: [
          {
            id: "13",
            name: "Analytics Setup",
            description: "Set up tracking across all platforms",
            type: "one-time",
            goalIds: ["9"],
            assignedTo: "Emma Davis",
            value: 600,
            estimatedHours: 8,
            hourlyRate: 70,
            startDate: "2024-01-20",
            endDate: "2024-02-10",
            status: "completed",
            priority: "high",
            location: "Google Analytics, Facebook, Website"
          },
          {
            id: "14",
            name: "Monthly Report Generation",
            description: "Create and deliver monthly performance reports",
            type: "repetitive",
            goalIds: ["9", "10"],
            assignedTo: "Emma Davis",
            value: 200,
            estimatedHours: 4,
            hourlyRate: 70,
            startDate: "2024-02-01",
            endDate: "2024-06-15",
            status: "in-progress",
            priority: "medium",
            location: "Remote"
          },
          {
            id: "15",
            name: "Data Quality Audit",
            description: "Audit and fix data quality issues",
            type: "one-time",
            goalIds: ["9"],
            assignedTo: "Emma Davis",
            value: 400,
            estimatedHours: 6,
            hourlyRate: 70,
            startDate: "2024-02-20",
            endDate: "2024-03-05",
            status: "pending",
            priority: "medium",
            location: "Remote"
          },
          {
            id: "16",
            name: "Social Media Content Creation",
            description: "Create engaging social media posts",
            type: "repetitive",
            goalIds: ["6"],
            assignedTo: "Lisa Wang",
            startDate: "2024-03-01",
            endDate: "2024-06-15",
            status: "pending",
            priority: "medium",
            location: "Instagram"
          },
          {
            id: "17",
            name: "Email Newsletter Setup",
            description: "Set up automated email newsletter system",
            type: "one-time",
            goalIds: ["5"],
            assignedTo: "Mike Johnson",
            startDate: "2024-02-20",
            endDate: "2024-03-05",
            status: "pending",
            priority: "low",
            location: "Mailchimp Platform"
          }
        ]
      }
    ]
  }
];

const statusColors = {
  planning: 'bg-gray-100 text-gray-800',
  active: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800',
  'on-hold': 'bg-yellow-100 text-yellow-800',
  cancelled: 'bg-red-100 text-red-800'
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-blue-100 text-blue-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800'
};

const taskStatusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  overdue: 'bg-red-100 text-red-800'
};

const assessmentStatusColors = {
  'on-track': 'bg-green-100 text-green-800',
  'at-risk': 'bg-orange-100 text-orange-800',
  'behind': 'bg-red-100 text-red-800',
  'completed': 'bg-blue-100 text-blue-800'
};

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params?.id as string;
  
  const [expandedProjectOverview, setExpandedProjectOverview] = useState(true);
  const [expandedGoals, setExpandedGoals] = useState(true);
  const [showProjectInfo, setShowProjectInfo] = useState(false);
  const [expandedServices, setExpandedServices] = useState<{ [key: string]: boolean }>({});
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [showFileUploadModal, setShowFileUploadModal] = useState(false);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [projectNotes, setProjectNotes] = useState<ProjectNote[]>([
    { id: "1", content: "Initial project setup completed successfully", author: "John Smith", date: "2024-01-15" },
    { id: "2", content: "Client approved the project timeline and budget", author: "Sarah Johnson", date: "2024-01-20" }
  ]);
  const [projectFiles, setProjectFiles] = useState<ProjectFile[]>([
    { id: "1", name: "Project Brief.pdf", size: "2.5 MB", uploadedBy: "John Smith", date: "2024-01-15" },
    { id: "2", name: "Design Guidelines.docx", size: "1.8 MB", uploadedBy: "Sarah Johnson", date: "2024-01-18" }
  ]);
  const [goalForm, setGoalForm] = useState({ name: '', description: '', targetValue: '', targetDate: '' });
  const [noteForm, setNoteForm] = useState({ content: '' });
  const [fileForm, setFileForm] = useState({ name: '', file: null as File | null });
  const [assessmentForm, setAssessmentForm] = useState({ assessment: '', progress: '', status: 'on-track' });
  const [taskForm, setTaskForm] = useState({ 
    name: '', 
    description: '', 
    type: 'one-time' as 'repetitive' | 'one-time',
    assignedTo: '',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    status: 'pending' as 'pending' | 'in-progress' | 'completed' | 'overdue',
    location: '',
    startDate: '',
    endDate: '',
    goalIds: [] as string[]
  });
  
  // Task search and filter states
  const [taskSearchTerm, setTaskSearchTerm] = useState('');
  const [taskStatusFilter, setTaskStatusFilter] = useState<string>('all');
  const [taskPriorityFilter, setTaskPriorityFilter] = useState<string>('all');
  const [taskTypeFilter, setTaskTypeFilter] = useState<string>('all');
  const [taskAssigneeFilter, setTaskAssigneeFilter] = useState<string>('all');
  const [taskStartDateFilter, setTaskStartDateFilter] = useState<string>('');
  const [taskEndDateFilter, setTaskEndDateFilter] = useState<string>('');
  const [taskTimelineFilter, setTaskTimelineFilter] = useState<string>('all');

  const project = projectsData.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Project Not Found</h1>
          <p className="text-gray-600 mb-4">The project you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/business/projects')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const getGoalProgress = (goal: Goal) => {
    if (goal.targetValue && goal.currentValue) {
      return Math.round((goal.currentValue / goal.targetValue) * 100);
    }
    return 0;
  };

  // Task filtering logic
  const filteredTasks = project.services.flatMap(service => service.tasks).filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(taskSearchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(taskSearchTerm.toLowerCase()) ||
                         task.assignedTo.toLowerCase().includes(taskSearchTerm.toLowerCase()) ||
                         task.location.toLowerCase().includes(taskSearchTerm.toLowerCase());
    
    const matchesStatus = taskStatusFilter === 'all' || task.status === taskStatusFilter;
    const matchesPriority = taskPriorityFilter === 'all' || task.priority === taskPriorityFilter;
    const matchesType = taskTypeFilter === 'all' || task.type === taskTypeFilter;
    const matchesAssignee = taskAssigneeFilter === 'all' || task.assignedTo === taskAssigneeFilter;
    
    // Date filtering
    const taskStartDate = new Date(task.startDate);
    const taskEndDate = new Date(task.endDate);
    const filterStartDate = taskStartDateFilter ? new Date(taskStartDateFilter) : null;
    const filterEndDate = taskEndDateFilter ? new Date(taskEndDateFilter) : null;
    
    const matchesStartDate = !filterStartDate || taskStartDate >= filterStartDate;
    const matchesEndDate = !filterEndDate || taskEndDate <= filterEndDate;
    
    // Timeline filtering
    const currentDate = new Date();
    const currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    
    let matchesTimeline = true;
    if (taskTimelineFilter !== 'all') {
      switch (taskTimelineFilter) {
        case 'overdue':
          matchesTimeline = taskEndDate < currentDateOnly && task.status !== 'completed';
          break;
        case 'due-today':
          matchesTimeline = taskEndDate.getTime() === currentDateOnly.getTime();
          break;
        case 'due-this-week':
          const weekFromNow = new Date(currentDateOnly);
          weekFromNow.setDate(weekFromNow.getDate() + 7);
          matchesTimeline = taskEndDate >= currentDateOnly && taskEndDate <= weekFromNow;
          break;
        case 'upcoming':
          matchesTimeline = taskStartDate > currentDateOnly;
          break;
        case 'in-progress-timeline':
          matchesTimeline = taskStartDate <= currentDateOnly && taskEndDate >= currentDateOnly;
          break;
        case 'completed-timeline':
          matchesTimeline = task.status === 'completed';
          break;
      }
    }
    
    return matchesSearch && matchesStatus && matchesPriority && matchesType && matchesAssignee && matchesStartDate && matchesEndDate && matchesTimeline;
  });

  // Get unique assignees for filter dropdown
  const uniqueAssignees = Array.from(new Set(project.services.flatMap(service => service.tasks).map(task => task.assignedTo)));

  const getGoalStatus = (goal: Goal) => {
    const progress = getGoalProgress(goal);
    if (progress >= 100) return 'completed';
    if (progress >= 80) return 'on-track';
    if (progress >= 60) return 'at-risk';
    return 'behind';
  };

  const calculateOverallProgress = () => {
    if (project.services.length === 0) return 0;
    const totalValue = project.services.reduce((sum, service) => sum + service.basePrice, 0);
    const completedValue = project.services.reduce((sum, service) => {
      const serviceCompletedValue = service.goals.reduce((sum, goal) => {
        const goalProgress = getGoalProgress(goal);
        return sum + (goalProgress >= 100 ? goal.basePrice : 0);
      }, 0);
      return sum + serviceCompletedValue;
    }, 0);
    return Math.round((completedValue / totalValue) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/business/projects')}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <FolderIcon className="w-6 h-6 text-blue-600" />
                  {project.name}
                  <button
                    onClick={() => setShowProjectInfo(!showProjectInfo)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    title="Show project information"
                  >
                    <InformationCircleIcon className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </button>
                </h1>
                <p className="text-gray-600">{project.clientName} - {project.clientCompany}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                <PencilIcon className="w-4 h-4" />
              </button>
              <button className="p-2 text-red-400 hover:text-red-600 hover:bg-red-100 rounded-lg">
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Overview */}
        {showProjectInfo && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <FolderIcon className="w-5 h-5 text-blue-600" />
                Project Overview
              </h2>
              <button
                onClick={() => setExpandedProjectOverview(!expandedProjectOverview)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <ChevronDownIcon className={`w-5 h-5 transition-transform ${expandedProjectOverview ? 'rotate-180' : ''}`} />
              </button>
            </div>
            {expandedProjectOverview && (
              <div className="space-y-6">
                {/* Project Description */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900 flex items-center gap-2">
                    <DocumentTextIcon className="w-4 h-4 text-blue-600" />
                    Project Description
                  </h3>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {project.description || "This project focuses on comprehensive digital marketing and business growth strategies. It includes multiple services such as social media management, content creation, SEO optimization, and performance analytics. The project aims to increase brand visibility, drive customer engagement, and achieve measurable business outcomes through data-driven marketing approaches."}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Project Notes & Files */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900 flex items-center gap-2">
                      <DocumentTextIcon className="w-4 h-4 text-blue-600" />
                      Project Notes
                    </h3>
                    <div className="space-y-2">
                      {projectNotes.map((note, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">{note.content}</p>
                          <p className="text-xs text-gray-500 mt-1">{note.date}</p>
                        </div>
                      ))}
                      <button
                        onClick={() => setShowAddNoteModal(true)}
                        className="w-full p-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg border border-dashed border-blue-200"
                      >
                        <PlusIcon className="w-4 h-4 inline mr-1" />
                        Add Note
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900 flex items-center gap-2">
                      <FolderIcon className="w-4 h-4 text-blue-600" />
                      Project Files
                    </h3>
                    <div className="space-y-2">
                      {projectFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-700">{file.name}</span>
                          <button className="text-blue-600 hover:text-blue-800">
                            <PencilIcon className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => setShowFileUploadModal(true)}
                        className="w-full p-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg border border-dashed border-blue-200"
                      >
                        <PlusIcon className="w-4 h-4 inline mr-1" />
                        Upload File
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">Project Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{project.services.length}</div>
                        <div className="text-xs text-gray-600">Services</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {project.services.flatMap(service => service.goals).length}
                        </div>
                        <div className="text-xs text-gray-600">Goals</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          {project.services.flatMap(service => service.goals.flatMap(goal => goal.tasks)).length}
                        </div>
                        <div className="text-xs text-gray-600">Tasks</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">
                          {Math.round(calculateOverallProgress())}%
                        </div>
                        <div className="text-xs text-gray-600">Progress</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Goals Overview */}
        {showProjectInfo && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <TagIcon className="w-5 h-5 text-green-600" />
                Goals Overview
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddGoalModal(true)}
                  className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-1"
                >
                  <PlusIcon className="w-4 h-4" />
                  Add Goal
                </button>
                <button
                  onClick={() => setExpandedGoals(!expandedGoals)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronDownIcon className={`w-5 h-5 transition-transform ${expandedGoals ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
            {expandedGoals && (
              <div className="space-y-6">
                {project.services.flatMap(service => service.goals).map((goal) => {
                  const assessments = goal.assessments || [];
                  return (
                    <div key={goal.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{goal.name}</h3>
                          <p className="text-sm text-gray-600">{goal.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-gray-500">Service: {project.services.find(s => s.goals.some(g => g.id === goal.id))?.name}</span>
                            <span className="text-xs text-gray-500">Progress: {getGoalProgress(goal)}%</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setShowAssessmentModal(true)}
                          className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Add Assessment
                        </button>
                      </div>
                      
                      {/* Goal Assessments */}
                      {assessments.length > 0 && (
                        <div className="mt-4 space-y-2">
                          <h4 className="text-sm font-medium text-gray-700">Assessments:</h4>
                          {assessments.map((assessment, index) => (
                            <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                              <p className="text-gray-700">{assessment.assessment}</p>
                              <p className="text-xs text-gray-500 mt-1">{new Date(assessment.date).toLocaleDateString()}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tasks Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Tasks Management</h2>
              <button
                onClick={() => setShowTaskModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <PlusIcon className="w-4 h-4" />
                Add Task
              </button>
            </div>
            
            {/* Search and Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-9 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={taskSearchTerm}
                    onChange={(e) => setTaskSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>
              
              {/* Status Filter */}
              <div>
                <select
                  value={taskStatusFilter}
                  onChange={(e) => setTaskStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
              
              {/* Priority Filter */}
              <div>
                <select
                  value={taskPriorityFilter}
                  onChange={(e) => setTaskPriorityFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">All Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              
              {/* Type Filter */}
              <div>
                <select
                  value={taskTypeFilter}
                  onChange={(e) => setTaskTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="repetitive">Repetitive</option>
                  <option value="one-time">One-time</option>
                </select>
              </div>
              
              {/* Assignee Filter */}
              <div>
                <select
                  value={taskAssigneeFilter}
                  onChange={(e) => setTaskAssigneeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">All Assignees</option>
                  {uniqueAssignees.map(assignee => (
                    <option key={assignee} value={assignee}>{assignee}</option>
                  ))}
                </select>
              </div>
              
              {/* Timeline Filter */}
              <div>
                <select
                  value={taskTimelineFilter}
                  onChange={(e) => setTaskTimelineFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">All Timeline</option>
                  <option value="overdue">Overdue</option>
                  <option value="due-today">Due Today</option>
                  <option value="due-this-week">Due This Week</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="in-progress-timeline">Currently Active</option>
                  <option value="completed-timeline">Completed</option>
                </select>
              </div>
              
              {/* Start Date Filter */}
              <div>
                <input
                  type="date"
                  value={taskStartDateFilter}
                  onChange={(e) => setTaskStartDateFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Start Date"
                />
              </div>
              
              {/* End Date Filter */}
              <div>
                <input
                  type="date"
                  value={taskEndDateFilter}
                  onChange={(e) => setTaskEndDateFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="End Date"
                />
              </div>
            </div>
            
            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredTasks.length} of {project.services.flatMap(service => service.tasks).length} tasks
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Goals</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied On</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timeline</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTasks.map((task) => {
                  const taskGoals = project.services.flatMap(s => s.goals).filter(goal => task.goalIds.includes(goal.id));
                  
                  return (
                    <tr key={task.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{task.name}</div>
                          <div className="text-sm text-gray-500">{task.description}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            {task.type === 'repetitive' ? '🔄 Repetitive' : '⚡ One-time'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          {taskGoals.map(goal => (
                            <div key={goal.id} className="flex items-center gap-2">
                              <TagIcon className="w-3 h-3 text-blue-500" />
                              <span className="text-xs text-gray-700">{goal.name}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                            <img 
                              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(task.assignedTo)}&background=8B5CF6&color=fff&size=24`}
                              alt={task.assignedTo}
                              className="w-6 h-6 rounded-full"
                            />
                          </div>
                          <span className="text-sm text-gray-900">{task.assignedTo}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${taskStatusColors[task.status]}`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${priorityColors[task.priority]}`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {task.type === 'repetitive' ? '🔄 Repetitive' : '⚡ One-time'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {task.value ? `$${task.value.toLocaleString()}` : 'Not set'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {task.estimatedHours && task.hourlyRate 
                            ? `${task.estimatedHours}h @ $${task.hourlyRate}/h`
                            : 'Time not estimated'
                          }
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{task.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(task.startDate).toLocaleDateString()} - {new Date(task.endDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button className="text-blue-600 hover:text-blue-900">Edit</button>
                          <button className="text-red-600 hover:text-red-900">Delete</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modals will be added here */}
      </div>
    </div>
  );
}
