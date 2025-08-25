"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import servicesData from "../../../data/services.json";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  PencilIcon,
  TrashIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  FolderIcon,
  TagIcon,
  ListBulletIcon,
  ExclamationTriangleIcon,
  UserIcon,
  UserGroupIcon,
  ClockIcon,
  FireIcon,
  ArrowUpIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";

interface Task {
  id: string;
  name: string;
  description: string;
  type: 'repetitive' | 'one-time';
  goalId: string;
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
}

interface Goal {
  id: string;
  name: string;
  description: string;
  targetValue?: number;
  targetDate?: string;
  status: 'active' | 'completed' | 'paused';
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
            targetDate: "2024-06-15",
            status: "active"
          },
          {
            id: "2",
            name: "Improve Keyword Rankings",
            description: "Rank in top 3 for 10 target keywords",
            targetValue: 10,
            targetDate: "2024-06-15",
            status: "active"
          }
        ],
        tasks: [
          {
            id: "1",
            name: "Keyword Research",
            description: "Research and identify target keywords",
            type: "one-time",
            goalId: "2",
            assignedTo: "Mike Johnson",
            value: 600,
            estimatedHours: 8,
            hourlyRate: 75,
            startDate: "2024-01-15",
            endDate: "2024-01-20",
            status: "completed",
            priority: "high",
            location: "Google Keyword Planner"
          },
          {
            id: "2",
            name: "On-Page SEO Audit",
            description: "Audit and optimize website pages",
            type: "one-time",
            goalId: "1",
            assignedTo: "Mike Johnson",
            value: 800,
            estimatedHours: 12,
            hourlyRate: 75,
            startDate: "2024-01-22",
            endDate: "2024-01-30",
            status: "in-progress",
            priority: "high",
            location: "Website CMS"
          },
          {
            id: "3",
            name: "Monthly SEO Report",
            description: "Generate monthly SEO performance report",
            type: "repetitive",
            goalId: "1",
            assignedTo: "Jane Doe",
            value: 200,
            estimatedHours: 4,
            hourlyRate: 75,
            startDate: "2024-02-01",
            endDate: "2024-06-15",
            status: "pending",
            priority: "medium",
            location: "Google Analytics"
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
            targetDate: "2024-06-15",
            status: "active"
          }
        ],
        tasks: [
          {
            id: "4",
            name: "Campaign Setup",
            description: "Set up Google Ads and Facebook campaigns",
            type: "one-time",
            goalId: "3",
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
            goalId: "3",
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
            goalId: "3",
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
        description: "Blog posts, articles, and social media content",
        basePrice: 3000,
        goals: [
          {
            id: "4",
            name: "Content Engagement",
            description: "Achieve 25% engagement rate on social media",
            targetValue: 25,
            targetDate: "2024-06-15",
            status: "active"
          }
        ],
        tasks: [
          {
            id: "6",
            name: "Content Calendar Creation",
            description: "Create 6-month content calendar",
            type: "one-time",
            goalId: "4",
            assignedTo: "Lisa Wang",
            value: 400,
            estimatedHours: 8,
            hourlyRate: 60,
            startDate: "2024-01-20",
            endDate: "2024-01-25",
            status: "completed",
            priority: "medium",
            location: "Remote"
          },
          {
            id: "7",
            name: "Weekly Content Creation",
            description: "Create blog posts and social media content",
            type: "repetitive",
            goalId: "4",
            assignedTo: "Lisa Wang",
            value: 150,
            estimatedHours: 4,
            hourlyRate: 60,
            startDate: "2024-01-25",
            endDate: "2024-06-15",
            status: "in-progress",
            priority: "medium",
            location: "Remote"
          }
        ]
      }
    ]
  },
  {
    id: "2",
    name: "Digital Solutions - Website Redesign",
    clientId: "2",
    clientName: "Mike Chen",
    clientCompany: "Digital Solutions",
    description: "Complete website redesign with modern UI/UX and improved functionality",
    startDate: "2024-02-01",
    endDate: "2024-04-30",
    status: "active",
    priority: "medium",
    projectManager: "Sarah Wilson",
    totalValue: 25000,
    budget: 22000,
    actualSpent: 12000,
    progress: 45,
    projectSource: {
      type: 'online-platform',
      name: 'Upwork'
    },
    growthMetrics: {
      currentGrowth: 35,
      targetGrowth: 60,
      growthRate: 1.2,
      isOnTrack: false
    },
    riskLevel: 'high',
    riskFactors: ['Slow progress', 'Budget overrun risk', 'Delayed milestones'],
    services: [
      {
        id: "4",
        name: "UI/UX Design",
        description: "Modern and user-friendly interface design",
        basePrice: 8000,
        goals: [
          {
            id: "5",
            name: "Improve User Experience",
            description: "Reduce bounce rate by 30%",
            targetValue: 30,
            targetDate: "2024-04-30",
            status: "active"
          }
        ],
        tasks: [
          {
            id: "8",
            name: "Wireframe Creation",
            description: "Create detailed wireframes for all pages",
            type: "one-time",
            goalId: "5",
            assignedTo: "David Kim",
            value: 1500,
            estimatedHours: 20,
            hourlyRate: 85,
            startDate: "2024-02-01",
            endDate: "2024-02-15",
            status: "completed",
            priority: "high",
            location: "Figma Design Tool"
          },
          {
            id: "9",
            name: "Design System Creation",
            description: "Create comprehensive design system",
            type: "one-time",
            goalId: "5",
            assignedTo: "David Kim",
            value: 2000,
            estimatedHours: 24,
            hourlyRate: 85,
            startDate: "2024-02-15",
            endDate: "2024-03-01",
            status: "in-progress",
            priority: "high",
            location: "Figma Design Tool"
          }
        ]
      },
      {
        id: "5",
        name: "Frontend Development",
        description: "React-based frontend development",
        basePrice: 12000,
        goals: [
          {
            id: "6",
            name: "Performance Optimization",
            description: "Achieve 90+ PageSpeed score",
            targetValue: 90,
            targetDate: "2024-04-30",
            status: "active"
          }
        ],
        tasks: [
          {
            id: "10",
            name: "Component Development",
            description: "Develop reusable React components",
            type: "one-time",
            goalId: "6",
            assignedTo: "Tom Rodriguez",
            value: 3000,
            estimatedHours: 40,
            hourlyRate: 90,
            startDate: "2024-03-01",
            endDate: "2024-03-20",
            status: "pending",
            priority: "high",
            location: "React Development Environment"
          },
          {
            id: "11",
            name: "Performance Testing",
            description: "Test and optimize website performance",
            type: "one-time",
            goalId: "6",
            assignedTo: "Tom Rodriguez",
            value: 800,
            estimatedHours: 10,
            hourlyRate: 90,
            startDate: "2024-04-15",
            endDate: "2024-04-25",
            status: "pending",
            priority: "medium",
            location: "Lighthouse & PageSpeed Insights"
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

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedClient, setSelectedClient] = useState<string>('all');
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
  const [expandedServices, setExpandedServices] = useState<Set<string>>(new Set());
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedTaskForStatus, setSelectedTaskForStatus] = useState<{projectId: string, serviceId: string, taskId: string} | null>(null);
  const [statusForm, setStatusForm] = useState({
    newStatus: 'pending' as 'pending' | 'in-progress' | 'completed' | 'overdue',
    notes: ''
  });
  const [openPriorityDropdown, setOpenPriorityDropdown] = useState<string | null>(null);
  const [openTypeDropdown, setOpenTypeDropdown] = useState<string | null>(null);

  const [serviceForm, setServiceForm] = useState({
    selectedServiceId: '',
    description: '',
    basePrice: 0
  });
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [goalForm, setGoalForm] = useState({
    name: '',
    description: '',
    targetValue: 0,
    targetDate: ''
  });
  const [taskForm, setTaskForm] = useState({
    name: '',
    description: '',
    type: 'one-time' as 'repetitive' | 'one-time',
    goalId: '',
    assignedTo: '',
    value: 0,
    estimatedHours: 0,
    hourlyRate: 0,
    startDate: '',
    endDate: '',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    location: ''
  });

  const toggleProjectExpansion = (projectId: string) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedProjects(newExpanded);
  };

  const toggleServiceExpansion = (serviceId: string) => {
    const newExpanded = new Set(expandedServices);
    if (newExpanded.has(serviceId)) {
      newExpanded.delete(serviceId);
    } else {
      newExpanded.add(serviceId);
    }
    setExpandedServices(newExpanded);
  };

  const toggleTaskExpansion = (taskId: string) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId);
    } else {
      newExpanded.add(taskId);
    }
    setExpandedTasks(newExpanded);
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.clientCompany.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    const matchesClient = selectedClient === 'all' || project.clientId === selectedClient;
    return matchesSearch && matchesStatus && matchesClient;
  });

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const calculateProjectMetrics = (project: Project) => {
    const totalTasks = project.services.reduce((sum, service) => sum + service.tasks.length, 0);
    const completedTasks = project.services.reduce((sum, service) => 
      sum + service.tasks.filter(task => task.status === 'completed').length, 0);
    const totalHours = project.services.reduce((sum, service) => 
      sum + service.tasks.reduce((taskSum, task) => taskSum + (task.estimatedHours || 0), 0), 0);
    const totalValue = project.services.reduce((sum, service) => 
      sum + service.tasks.reduce((taskSum, task) => taskSum + (task.value || 0), 0), 0);
    
    return { totalTasks, completedTasks, totalHours, totalValue };
  };

  const handleAddService = (projectId: string) => {
    setSelectedProjectId(projectId);
    setServiceForm({ selectedServiceId: '', description: '', basePrice: 0 });
    setShowAddServiceModal(true);
  };

  const handleServiceSubmit = () => {
    if (!serviceForm.selectedServiceId) {
      alert('Please select a service');
      return;
    }

    const selectedService = servicesData.services.find(service => service.id === serviceForm.selectedServiceId);
    if (!selectedService) {
      alert('Please select a valid service');
      return;
    }

    const newService: Service = {
      id: Date.now().toString(),
      name: selectedService.name,
      description: serviceForm.description || selectedService.description,
      basePrice: serviceForm.basePrice || selectedService.pricing.unit_price,
      goals: [],
      tasks: []
    };

    setProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === selectedProjectId 
          ? { ...project, services: [...project.services, newService] }
          : project
      )
    );

    setShowAddServiceModal(false);
    setServiceForm({ selectedServiceId: '', description: '', basePrice: 0 });
  };

  const handleAddGoal = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setGoalForm({
      name: '',
      description: '',
      targetValue: 0,
      targetDate: ''
    });
    setShowAddGoalModal(true);
  };

  const handleAddTask = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    // Get available goals for this service
    const project = projects.find(p => p.services.some(s => s.id === serviceId));
    const service = project?.services.find(s => s.id === serviceId);
    
    setTaskForm({
      name: '',
      description: '',
      type: 'one-time',
      goalId: service?.goals[0]?.id || '',
      assignedTo: '',
      value: 0,
      estimatedHours: 0,
      hourlyRate: 0,
      startDate: '',
      endDate: '',
      priority: 'medium',
      location: ''
    });
    setShowAddTaskModal(true);
  };

  const handleGoalSubmit = () => {
    if (!goalForm.name || !goalForm.description) {
      alert('Please fill in all required fields');
      return;
    }

    const newGoal: Goal = {
      id: Date.now().toString(),
      name: goalForm.name,
      description: goalForm.description,
      targetValue: goalForm.targetValue || undefined,
      targetDate: goalForm.targetDate || undefined,
      status: 'active'
    };

    setProjects(prevProjects => 
      prevProjects.map(project => ({
        ...project,
        services: project.services.map(service => 
          service.id === selectedServiceId 
            ? { ...service, goals: [...service.goals, newGoal] }
            : service
        )
      }))
    );

    setShowAddGoalModal(false);
    setGoalForm({ name: '', description: '', targetValue: 0, targetDate: '' });
  };

  const handleTaskSubmit = () => {
    if (!taskForm.name || !taskForm.description || !taskForm.goalId || !taskForm.assignedTo) {
      alert('Please fill in all required fields');
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      name: taskForm.name,
      description: taskForm.description,
      type: taskForm.type,
      goalId: taskForm.goalId,
      assignedTo: taskForm.assignedTo,
      value: taskForm.value || undefined,
      estimatedHours: taskForm.estimatedHours || undefined,
      hourlyRate: taskForm.hourlyRate || undefined,
      startDate: taskForm.startDate,
      endDate: taskForm.endDate,
      status: 'pending',
      priority: taskForm.priority,
      location: taskForm.location
    };

    setProjects(prevProjects => 
      prevProjects.map(project => ({
        ...project,
        services: project.services.map(service => 
          service.id === selectedServiceId 
            ? { ...service, tasks: [...service.tasks, newTask] }
            : service
        )
      }))
    );

    setShowAddTaskModal(false);
    setTaskForm({
      name: '',
      description: '',
      type: 'one-time',
      goalId: '',
      assignedTo: '',
      value: 0,
      estimatedHours: 0,
      hourlyRate: 0,
      startDate: '',
      endDate: '',
      priority: 'medium',
      location: ''
    });
  };

  const handleRemoveGoal = (projectId: string, serviceId: string, goalId: string) => {
    if (confirm('Are you sure you want to remove this goal? This will also remove all associated tasks.')) {
      setProjects(prevProjects => 
        prevProjects.map(project => 
          project.id === projectId 
            ? {
                ...project,
                services: project.services.map(service => 
                  service.id === serviceId 
                    ? {
                        ...service,
                        goals: service.goals.filter(goal => goal.id !== goalId),
                        tasks: service.tasks.filter(task => task.goalId !== goalId)
                      }
                    : service
                )
              }
            : project
        )
      );
    }
  };

  const handleRemoveTask = (projectId: string, serviceId: string, taskId: string) => {
    if (confirm('Are you sure you want to remove this task?')) {
      setProjects(prevProjects => 
        prevProjects.map(project => 
          project.id === projectId 
            ? {
                ...project,
                services: project.services.map(service => 
                  service.id === serviceId 
                    ? {
                        ...service,
                        tasks: service.tasks.filter(task => task.id !== taskId)
                      }
                    : service
                )
              }
            : project
        )
      );
    }
  };



  const handleStatusChangeClick = (projectId: string, serviceId: string, taskId: string, currentStatus: string) => {
    setSelectedTaskForStatus({ projectId, serviceId, taskId });
    setStatusForm({ newStatus: currentStatus as 'pending' | 'in-progress' | 'completed' | 'overdue', notes: '' });
    setShowStatusModal(true);
  };

  const handleStatusSubmit = () => {
    if (!selectedTaskForStatus) return;
    
    const { projectId, serviceId, taskId } = selectedTaskForStatus;
    
    // Update task status
    setProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === projectId 
          ? {
              ...project,
              services: project.services.map(service => 
                service.id === serviceId 
                  ? {
                      ...service,
                      tasks: service.tasks.map(task => 
                        task.id === taskId 
                          ? { ...task, status: statusForm.newStatus }
                          : task
                      )
                    }
                  : service
              )
            }
          : project
      )
    );

    // Log the status change with notes (in a real app, this would be saved to database)
    console.log(`Task ${taskId} status changed to ${statusForm.newStatus} with notes: ${statusForm.notes}`);
    
    setShowStatusModal(false);
    setSelectedTaskForStatus(null);
    setStatusForm({ newStatus: 'pending', notes: '' });
  };

  const handlePriorityChange = (projectId: string, serviceId: string, taskId: string, newPriority: 'low' | 'medium' | 'high' | 'urgent') => {
    setProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === projectId 
          ? {
              ...project,
              services: project.services.map(service => 
                service.id === serviceId 
                  ? {
                      ...service,
                      tasks: service.tasks.map(task => 
                        task.id === taskId 
                          ? { ...task, priority: newPriority }
                          : task
                      )
                    }
                  : service
              )
            }
          : project
      )
    );
    console.log(`Task ${taskId} priority changed to ${newPriority}`);
  };

  const handleTypeChange = (projectId: string, serviceId: string, taskId: string, newType: 'one-time' | 'repetitive') => {
    setProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === projectId 
          ? {
              ...project,
              services: project.services.map(service => 
                service.id === serviceId 
                  ? {
                      ...service,
                      tasks: service.tasks.map(task => 
                        task.id === taskId 
                          ? { ...task, type: newType }
                          : task
                      )
                    }
                  : service
              )
            }
          : project
      )
    );
    console.log(`Task ${taskId} type changed to ${newType}`);
  };

  const togglePriorityDropdown = (taskId: string) => {
    setOpenPriorityDropdown(openPriorityDropdown === taskId ? null : taskId);
    setOpenTypeDropdown(null); // Close other dropdown
  };

  const toggleTypeDropdown = (taskId: string) => {
    setOpenTypeDropdown(openTypeDropdown === taskId ? null : taskId);
    setOpenPriorityDropdown(null); // Close other dropdown
  };

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.dropdown-container')) {
        setOpenPriorityDropdown(null);
        setOpenTypeDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
              <p className="text-gray-600 mt-1">Manage and track all client projects</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <PlusIcon className="w-4 h-4" />
              Add Project
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects, clients, or companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="lg:w-48">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="planning">Planning</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="lg:w-48">
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Clients</option>
                {Array.from(new Set(projects.map(p => p.clientId))).map(clientId => {
                  const project = projects.find(p => p.clientId === clientId);
                  return (
                    <option key={clientId} value={clientId}>
                      {project?.clientName} - {project?.clientCompany}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-6">
          {filteredProjects.map((project) => {
            const metrics = calculateProjectMetrics(project);
            const isExpanded = expandedProjects.has(project.id);
            
            return (
              <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Project Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <button
                          onClick={() => toggleProjectExpansion(project.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {isExpanded ? (
                            <ChevronDownIcon className="w-5 h-5" />
                          ) : (
                            <ChevronRightIcon className="w-5 h-5" />
                          )}
                        </button>
                        <button
                          onClick={() => router.push(`/business/projects/${project.id}`)}
                          className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors text-left"
                        >
                          {project.name}
                        </button>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[project.status]}`}>
                          {project.status}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${priorityColors[project.priority]}`}>
                          {project.priority}
                        </span>
                      </div>
                      
                      {/* Client and Project Manager Information */}
                      <div className="ml-8 mb-4">
                        <div className="flex flex-wrap items-center gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <UserIcon className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{project.clientName}</div>
                              <div className="text-gray-500">{project.clientCompany}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                              <UserGroupIcon className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{project.projectManager}</div>
                              <div className="text-gray-500">Project Manager</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-gray-400" />
                            <div>
                              <div className="font-medium text-gray-900">
                                {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                              </div>
                              <div className="text-gray-500">Project Timeline</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-8">
                        <p className="text-gray-600 mb-3">{project.description}</p>
                        
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              project.projectSource.type === 'partner' ? 'bg-blue-100' : 'bg-orange-100'
                            }`}>
                              <span className={`text-xs font-medium ${
                                project.projectSource.type === 'partner' ? 'text-blue-800' : 'text-orange-800'
                              }`}>
                                {project.projectSource.type === 'partner' ? 'P' : 'O'}
                              </span>
                            </div>
                            <span className="text-sm text-gray-600">Source:</span>
                            <span className="text-sm font-medium">{project.projectSource.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              project.growthMetrics.isOnTrack ? 'bg-green-100' : 'bg-red-100'
                            }`}>
                              <span className={`text-xs font-medium ${
                                project.growthMetrics.isOnTrack ? 'text-green-800' : 'text-red-800'
                              }`}>
                                {project.growthMetrics.isOnTrack ? '✓' : '⚠'}
                              </span>
                            </div>
                            <span className="text-sm text-gray-600">Growth:</span>
                            <span className="text-sm font-medium">{project.growthMetrics.currentGrowth}% / {project.growthMetrics.targetGrowth}%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              project.riskLevel === 'low' ? 'bg-green-100' :
                              project.riskLevel === 'medium' ? 'bg-yellow-100' :
                              project.riskLevel === 'high' ? 'bg-orange-100' : 'bg-red-100'
                            }`}>
                              <span className={`text-xs font-medium ${
                                project.riskLevel === 'low' ? 'text-green-800' :
                                project.riskLevel === 'medium' ? 'text-yellow-800' :
                                project.riskLevel === 'high' ? 'text-orange-800' : 'text-red-800'
                              }`}>
                                {project.riskLevel === 'low' ? 'L' :
                                 project.riskLevel === 'medium' ? 'M' :
                                 project.riskLevel === 'high' ? 'H' : 'C'}
                              </span>
                            </div>
                            <span className="text-sm text-gray-600">Risk:</span>
                            <span className="text-sm font-medium capitalize">{project.riskLevel}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CurrencyDollarIcon className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">Value:</span>
                            <span className="text-sm font-medium">${project.totalValue.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Risk Alert */}
                        {project.riskLevel === 'high' || project.riskLevel === 'critical' && (
                          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <ExclamationTriangleIcon className="w-4 h-4 text-red-600" />
                              <span className="text-sm font-semibold text-red-800">Risk Alert</span>
                            </div>
                            <div className="text-xs text-red-700">
                              <p className="mb-1">This project may not be delivered on time due to:</p>
                              <ul className="list-disc list-inside space-y-1">
                                {project.riskFactors.map((factor, index) => (
                                  <li key={index}>{factor}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Progress</span>
                            <span className="text-sm text-gray-500">{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-lg font-semibold text-gray-900">{metrics.totalTasks}</div>
                            <div className="text-xs text-gray-500">Total Tasks</div>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <div className="text-lg font-semibold text-green-600">{metrics.completedTasks}</div>
                            <div className="text-xs text-gray-500">Completed</div>
                          </div>
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <div className="text-lg font-semibold text-blue-600">{metrics.totalHours}h</div>
                            <div className="text-xs text-gray-500">Total Hours</div>
                          </div>
                          <div className="text-center p-3 bg-purple-50 rounded-lg">
                            <div className="text-lg font-semibold text-purple-600">${metrics.totalValue.toLocaleString()}</div>
                            <div className="text-xs text-gray-500">Task Value</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleAddService(project.id)}
                        className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg"
                        title="Add New Service"
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-400 hover:text-red-600 hover:bg-red-100 rounded-lg">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="p-6 bg-gray-50">
                    <div className="space-y-6">
                      {project.services.map((service) => {
                        const isServiceExpanded = expandedServices.has(service.id);
                        
                        return (
                          <div key={service.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            {/* Service Header */}
                            <div className="p-4 border-b border-gray-200">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={() => toggleServiceExpansion(service.id)}
                                    className="text-gray-400 hover:text-gray-600"
                                  >
                                    {isServiceExpanded ? (
                                      <ChevronDownIcon className="w-4 h-4" />
                                    ) : (
                                      <ChevronRightIcon className="w-4 h-4" />
                                    )}
                                  </button>
                                  <FolderIcon className="w-5 h-5 text-blue-500" />
                                  <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                                    <p className="text-sm text-gray-600">{service.description}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-semibold text-gray-900">${service.basePrice.toLocaleString()}</div>
                                  <div className="text-sm text-gray-500">{service.tasks.length} tasks</div>
                                </div>
                              </div>
                            </div>

                            {/* Service Details */}
                            {isServiceExpanded && (
                              <div className="p-4">
                                {/* Goals */}
                                <div className="mb-6">
                                  <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-md font-semibold text-gray-900 flex items-center gap-2">
                                      <TagIcon className="w-4 h-4" />
                                      Goals
                                    </h4>
                                    <button
                                      onClick={() => handleAddGoal(service.id)}
                                      className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                    >
                                      <PlusIcon className="w-3 h-3" />
                                      Add Goal
                                    </button>
                                  </div>
                                  <div className="space-y-3">
                                    {service.goals.map((goal) => (
                                      <div key={goal.id} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                        <div className="flex items-start justify-between">
                                          <div>
                                            <h5 className="text-sm font-semibold text-gray-900">{goal.name}</h5>
                                            <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                                            {goal.targetValue && (
                                              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                                <span>Target: {goal.targetValue}</span>
                                                {goal.targetDate && (
                                                  <span>Due: {new Date(goal.targetDate).toLocaleDateString()}</span>
                                                )}
                                              </div>
                                            )}
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                              goal.status === 'active' ? 'bg-green-100 text-green-800' :
                                              goal.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                              'bg-yellow-100 text-yellow-800'
                                            }`}>
                                              {goal.status}
                                            </span>
                                            <button
                                              onClick={() => handleRemoveGoal(project.id, service.id, goal.id)}
                                              className="p-1 text-red-400 hover:text-red-600 hover:bg-red-100 rounded"
                                              title="Remove Goal"
                                            >
                                              <TrashIcon className="w-3 h-3" />
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Tasks */}
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-md font-semibold text-gray-900 flex items-center gap-2">
                                      <ListBulletIcon className="w-4 h-4" />
                                      Tasks
                                    </h4>
                                    <button
                                      onClick={() => handleAddTask(service.id)}
                                      className="flex items-center gap-1 px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                                    >
                                      <PlusIcon className="w-3 h-3" />
                                      Add Task
                                    </button>
                                  </div>
                                  <div className="space-y-3">
                                    {service.tasks.map((task) => {
                                      const goal = service.goals.find(g => g.id === task.goalId);
                                      return (
                                        <div key={task.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                          {/* Task Header */}
                                          <div className="p-4 border-b border-gray-100">
                                            <div className="flex items-start justify-between">
                                              <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                  {/* Expand Icon */}
                                                  <button
                                                    onClick={() => toggleTaskExpansion(task.id)}
                                                    className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                                                    title="Toggle Details"
                                                  >
                                                    {expandedTasks.has(task.id) ? (
                                                      <ChevronDownIcon className="w-4 h-4" />
                                                    ) : (
                                                      <ChevronRightIcon className="w-4 h-4" />
                                                    )}
                                                  </button>
                                                  
                                                  <h5 className="text-base font-semibold text-gray-900">{task.name}</h5>
                                                  
                                                  <div className="flex items-center gap-1">
                                                    {/* Status Button */}
                                                    <button
                                                      onClick={() => handleStatusChangeClick(project.id, service.id, task.id, task.status)}
                                                      className={`px-2 py-1 text-xs font-medium rounded-full hover:opacity-80 transition-opacity ${taskStatusColors[task.status]}`}
                                                      title="Change Status"
                                                    >
                                                      {task.status}
                                                    </button>
                                                    
                                                    {/* Priority Icon Dropdown */}
                                                    <div className="relative dropdown-container">
                                                      <button
                                                        onClick={() => togglePriorityDropdown(task.id)}
                                                        className={`w-6 h-6 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity ${
                                                          task.priority === 'low' ? 'bg-gray-100 hover:bg-gray-200' :
                                                          task.priority === 'medium' ? 'bg-blue-100 hover:bg-blue-200' :
                                                          task.priority === 'high' ? 'bg-orange-100 hover:bg-orange-200' : 'bg-red-100 hover:bg-red-200'
                                                        }`} 
                                                        title={`Priority: ${task.priority} (Click to change)`}
                                                      >
                                                        {task.priority === 'low' ? (
                                                          <MinusIcon className="w-3 h-3 text-gray-600" />
                                                        ) : task.priority === 'medium' ? (
                                                          <ArrowUpIcon className="w-3 h-3 text-blue-600" />
                                                        ) : task.priority === 'high' ? (
                                                          <ExclamationTriangleIcon className="w-3 h-3 text-orange-600" />
                                                        ) : (
                                                          <FireIcon className="w-3 h-3 text-red-600" />
                                                        )}
                                                      </button>
                                                      
                                                      {/* Priority Dropdown Menu */}
                                                      {openPriorityDropdown === task.id && (
                                                        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
                                                          <div className="py-1">
                                                            <button
                                                              onClick={() => handlePriorityChange(project.id, service.id, task.id, 'low')}
                                                              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                                                            >
                                                              <MinusIcon className="w-3 h-3 text-gray-600" />
                                                              Low
                                                            </button>
                                                            <button
                                                              onClick={() => handlePriorityChange(project.id, service.id, task.id, 'medium')}
                                                              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                                                            >
                                                              <ArrowUpIcon className="w-3 h-3 text-blue-600" />
                                                              Medium
                                                            </button>
                                                            <button
                                                              onClick={() => handlePriorityChange(project.id, service.id, task.id, 'high')}
                                                              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                                                            >
                                                              <ExclamationTriangleIcon className="w-3 h-3 text-orange-600" />
                                                              High
                                                            </button>
                                                            <button
                                                              onClick={() => handlePriorityChange(project.id, service.id, task.id, 'urgent')}
                                                              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                                                            >
                                                              <FireIcon className="w-3 h-3 text-red-600" />
                                                              Urgent
                                                            </button>
                                                          </div>
                                                        </div>
                                                      )}
                                                    </div>
                                                    
                                                    {/* Task Type Icon Dropdown */}
                                                    <div className="relative dropdown-container">
                                                      <button
                                                        onClick={() => toggleTypeDropdown(task.id)}
                                                        className={`w-6 h-6 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity ${
                                                          task.type === 'repetitive' ? 'bg-purple-100 hover:bg-purple-200' : 'bg-orange-100 hover:bg-orange-200'
                                                        }`} 
                                                        title={`Type: ${task.type} (Click to change)`}
                                                      >
                                                        {task.type === 'repetitive' ? (
                                                          <ClockIcon className="w-3 h-3 text-purple-600" />
                                                        ) : (
                                                          <TagIcon className="w-3 h-3 text-orange-600" />
                                                        )}
                                                      </button>
                                                      
                                                      {/* Type Dropdown Menu */}
                                                      {openTypeDropdown === task.id && (
                                                        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
                                                          <div className="py-1">
                                                            <button
                                                              onClick={() => handleTypeChange(project.id, service.id, task.id, 'one-time')}
                                                              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                                                            >
                                                              <TagIcon className="w-3 h-3 text-orange-600" />
                                                              One-time
                                                            </button>
                                                            <button
                                                              onClick={() => handleTypeChange(project.id, service.id, task.id, 'repetitive')}
                                                              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                                                            >
                                                              <ClockIcon className="w-3 h-3 text-purple-600" />
                                                              Repetitive
                                                            </button>
                                                          </div>
                                                        </div>
                                                      )}
                                                    </div>
                                                  </div>
                                                </div>
                                                
                                                <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                                                
                                                                                              {goal && (
                                                <div className="text-xs text-gray-500 flex items-center justify-between">
                                                  <span>
                                                    <span className="font-medium">Goal:</span> {goal.name}
                                                  </span>
                                                  <div className="flex items-center gap-2">
                                                    <span className="text-sm font-semibold text-gray-900">
                                                      {task.value ? `$${task.value.toLocaleString()}` : 'Not set'}
                                                    </span>
                                                    {task.hourlyRate && (
                                                      <span className="text-xs text-gray-500">
                                                        @ ${task.hourlyRate}/h
                                                      </span>
                                                    )}
                                                  </div>
                                                </div>
                                              )}
                                              </div>
                                              
                                              <div className="flex items-center gap-2 ml-4">
                                                <div className="text-right">
                                                  <div className="text-xs text-gray-500">
                                                    {task.estimatedHours && task.hourlyRate 
                                                      ? `${task.estimatedHours}h @ $${task.hourlyRate}/h`
                                                      : 'Time not estimated'
                                                    }
                                                  </div>
                                                </div>
                                                
                                                {/* Action Icons */}
                                                <div className="flex items-center gap-1">
                                                  <button className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded" title="Edit Task">
                                                    <PencilIcon className="w-4 h-4" />
                                                  </button>
                                                  <button 
                                                    onClick={() => handleRemoveTask(project.id, service.id, task.id)}
                                                    className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded"
                                                    title="Remove Task"
                                                  >
                                                    <TrashIcon className="w-4 h-4" />
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          
                                          {/* Expanded Task Details */}
                                          {expandedTasks.has(task.id) && (
                                            <div className="p-4 bg-gray-50 border-t border-gray-100">
                                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                <div className="flex items-center gap-2">
                                                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                                    <img 
                                                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(task.assignedTo)}&background=8B5CF6&color=fff&size=32`}
                                                      alt={task.assignedTo}
                                                      className="w-8 h-8 rounded-full object-cover"
                                                      onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(task.assignedTo)}&background=8B5CF6&color=fff&size=32`;
                                                      }}
                                                    />
                                                  </div>
                                                  <div>
                                                    <div className="text-xs text-gray-500">Assigned to</div>
                                                    <div className="text-sm font-medium text-gray-900">{task.assignedTo}</div>
                                                  </div>
                                                </div>
                                                
                                                <div className="flex items-center gap-2">
                                                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <CalendarIcon className="w-4 h-4 text-blue-600" />
                                                  </div>
                                                  <div>
                                                    <div className="text-xs text-gray-500">Timeline</div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                      {new Date(task.startDate).toLocaleDateString()} - {new Date(task.endDate).toLocaleDateString()}
                                                    </div>
                                                  </div>
                                                </div>
                                                
                                                <div className="flex items-center gap-2">
                                                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                    <FolderIcon className="w-4 h-4 text-green-600" />
                                                  </div>
                                                  <div>
                                                    <div className="text-xs text-gray-500">Platform</div>
                                                    <div className="text-sm font-medium text-gray-900">{task.location}</div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <FolderIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Add Service Modal */}
      {showAddServiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add New Service</h3>
              <button
                onClick={() => setShowAddServiceModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleServiceSubmit(); }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Service *
                  </label>
                  <select
                    value={serviceForm.selectedServiceId}
                    onChange={(e) => setServiceForm({ ...serviceForm, selectedServiceId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Choose a service...</option>
                    {servicesData.services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name} - ${service.pricing.unit_price}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description (Optional)
                  </label>
                  <textarea
                    value={serviceForm.description}
                    onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter custom description or leave blank to use service default"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave blank to use the default description from the selected service
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Base Price
                  </label>
                  <input
                    type="number"
                    value={serviceForm.basePrice}
                    onChange={(e) => setServiceForm({ ...serviceForm, basePrice: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={serviceForm.selectedServiceId ? 
                      servicesData.services.find(s => s.id === serviceForm.selectedServiceId)?.pricing.unit_price.toString() || "0" 
                      : "0"
                    }
                    min="0"
                    step="0.01"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave as 0 to use the default price from the selected service
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddServiceModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Goal Modal */}
      {showAddGoalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add New Goal</h3>
              <button
                onClick={() => setShowAddGoalModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleGoalSubmit(); }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Goal Name *
                  </label>
                  <input
                    type="text"
                    value={goalForm.name}
                    onChange={(e) => setGoalForm({ ...goalForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter goal name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    value={goalForm.description}
                    onChange={(e) => setGoalForm({ ...goalForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter goal description"
                    rows={3}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Target Value
                    </label>
                    <input
                      type="number"
                      value={goalForm.targetValue}
                      onChange={(e) => setGoalForm({ ...goalForm, targetValue: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Target Date
                    </label>
                    <input
                      type="date"
                      value={goalForm.targetDate}
                      onChange={(e) => setGoalForm({ ...goalForm, targetDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddGoalModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add New Task</h3>
              <button
                onClick={() => setShowAddTaskModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleTaskSubmit(); }}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Task Name *
                    </label>
                    <input
                      type="text"
                      value={taskForm.name}
                      onChange={(e) => setTaskForm({ ...taskForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter task name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Task Type *
                    </label>
                    <select
                      value={taskForm.type}
                      onChange={(e) => setTaskForm({ ...taskForm, type: e.target.value as 'repetitive' | 'one-time' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="one-time">One-time</option>
                      <option value="repetitive">Repetitive</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    value={taskForm.description}
                    onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter task description"
                    rows={3}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Assigned To *
                    </label>
                    <input
                      type="text"
                      value={taskForm.assignedTo}
                      onChange={(e) => setTaskForm({ ...taskForm, assignedTo: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter assignee name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority *
                    </label>
                    <select
                      value={taskForm.priority}
                      onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value as 'low' | 'medium' | 'high' | 'urgent' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Goal *
                    </label>
                    <select
                      value={taskForm.goalId}
                      onChange={(e) => setTaskForm({ ...taskForm, goalId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select a goal...</option>
                      {(() => {
                        const project = projects.find(p => p.services.some(s => s.id === selectedServiceId));
                        const service = project?.services.find(s => s.id === selectedServiceId);
                        return service?.goals.map((goal) => (
                          <option key={goal.id} value={goal.id}>
                            {goal.name}
                          </option>
                        )) || [];
                      })()}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={taskForm.location}
                      onChange={(e) => setTaskForm({ ...taskForm, location: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Facebook, Website, etc."
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Value
                    </label>
                    <input
                      type="number"
                      value={taskForm.value}
                      onChange={(e) => setTaskForm({ ...taskForm, value: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estimated Hours
                    </label>
                    <input
                      type="number"
                      value={taskForm.estimatedHours}
                      onChange={(e) => setTaskForm({ ...taskForm, estimatedHours: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                      min="0"
                      step="0.5"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hourly Rate
                    </label>
                    <input
                      type="number"
                      value={taskForm.hourlyRate}
                      onChange={(e) => setTaskForm({ ...taskForm, hourlyRate: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      value={taskForm.startDate}
                      onChange={(e) => setTaskForm({ ...taskForm, startDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date *
                    </label>
                    <input
                      type="date"
                      value={taskForm.endDate}
                      onChange={(e) => setTaskForm({ ...taskForm, endDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddTaskModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Status Change Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Change Task Status</h3>
              <button
                onClick={() => setShowStatusModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleStatusSubmit(); }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Status *
                  </label>
                  <select
                    value={statusForm.newStatus}
                    onChange={(e) => setStatusForm({ ...statusForm, newStatus: e.target.value as 'pending' | 'in-progress' | 'completed' | 'overdue' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="pending" className="bg-yellow-100 text-yellow-800">Pending</option>
                    <option value="in-progress" className="bg-blue-100 text-blue-800">In Progress</option>
                    <option value="completed" className="bg-green-100 text-green-800">Completed</option>
                    <option value="overdue" className="bg-red-100 text-red-800">Overdue</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={statusForm.notes}
                    onChange={(e) => setStatusForm({ ...statusForm, notes: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add notes about this status change..."
                    rows={3}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowStatusModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Update Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      
    </div>
  );
}
