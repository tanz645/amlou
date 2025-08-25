"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeftIcon,
  UserIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  TagIcon,
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  DocumentTextIcon,

} from "@heroicons/react/24/outline";
import StatusNotes from "../../../../components/StatusNotes";
import QuickActions from "../../../../components/QuickActions";

// Mock data for lead sources
const leadSourcesData = [
  {
    id: 1,
    name: "Website",
    type: "Digital",
    description: "Leads from company website contact forms and landing pages",
    status: "Active",
    leadsCount: 45,
    conversionRate: 12.5,
    totalValue: 125000,
    cost: 2500,
    roi: 4900,
    lastLead: "2024-01-19",
    icon: "🌐",
    color: "blue",
  },
  {
    id: 2,
    name: "LinkedIn",
    type: "Social Media",
    description: "Leads generated through LinkedIn networking and outreach",
    status: "Active",
    leadsCount: 32,
    conversionRate: 18.7,
    totalValue: 89000,
    cost: 1200,
    roi: 741.7,
    lastLead: "2024-01-18",
    icon: "💼",
    color: "indigo",
  },
  {
    id: 3,
    name: "Google Ads",
    type: "Paid Advertising",
    description: "Leads from Google Ads campaigns and search advertising",
    status: "Active",
    leadsCount: 28,
    conversionRate: 8.9,
    totalValue: 67000,
    cost: 4500,
    roi: 148.9,
    lastLead: "2024-01-17",
    icon: "🔍",
    color: "green",
  },
  {
    id: 4,
    name: "Referrals",
    type: "Word of Mouth",
    description: "Leads from client referrals and word of mouth",
    status: "Active",
    leadsCount: 15,
    conversionRate: 33.3,
    totalValue: 95000,
    cost: 0,
    roi: 0,
    lastLead: "2024-01-16",
    icon: "🤝",
    color: "purple",
  },
  {
    id: 5,
    name: "Facebook",
    type: "Social Media",
    description: "Leads from Facebook ads and organic social media",
    status: "Active",
    leadsCount: 22,
    conversionRate: 9.1,
    totalValue: 42000,
    cost: 1800,
    roi: 233.3,
    lastLead: "2024-01-15",
    icon: "📘",
    color: "blue",
  },
  {
    id: 6,
    name: "Instagram",
    type: "Social Media",
    description: "Leads from Instagram marketing and influencer partnerships",
    status: "Inactive",
    leadsCount: 8,
    conversionRate: 12.5,
    totalValue: 18000,
    cost: 800,
    roi: 225,
    lastLead: "2024-01-10",
    icon: "📷",
    color: "pink",
  },
  {
    id: 7,
    name: "Cold Calling",
    type: "Outbound",
    description: "Leads from cold calling campaigns and prospecting",
    status: "Active",
    leadsCount: 12,
    conversionRate: 16.7,
    totalValue: 35000,
    cost: 500,
    roi: 700,
    lastLead: "2024-01-14",
    icon: "📞",
    color: "orange",
  },
  {
    id: 8,
    name: "Email Marketing",
    type: "Digital",
    description: "Leads from email campaigns and newsletter subscriptions",
    status: "Active",
    leadsCount: 18,
    conversionRate: 11.1,
    totalValue: 28000,
    cost: 300,
    roi: 933.3,
    lastLead: "2024-01-13",
    icon: "📧",
    color: "gray",
  },
];

// Mock status notes data
const statusNotesData = [
  {
    id: "1",
    status: "New",
    content: "Initial lead received from website contact form. Interested in SEO services for their SaaS platform.",
    timestamp: "2024-01-15T10:30:00Z",
    author: "John Smith",
  },
  {
    id: "2",
    status: "Contacted",
    content: "Sent initial email introducing our services. Received positive response within 2 hours.",
    timestamp: "2024-01-16T14:20:00Z",
    author: "John Smith",
  },
  {
    id: "3",
    status: "Qualified",
    content: "Had discovery call. Budget confirmed at $15K, decision maker identified. Timeline: 3 months.",
    timestamp: "2024-01-17T11:00:00Z",
    author: "John Smith",
  },
];

// Mock data for leads (in a real app, this would come from an API)
const leadsData = [
  {
    id: "1",
    name: "Sarah Johnson",
    company: "TechStart Inc",
    email: "sarah@techstart.com",
    phone: "+1 (555) 123-4567",
    status: "New",
    source: "Website",
    assignedTo: "John Smith",
    value: 15000,
    date: "2024-01-15",
    lastContact: "2024-01-15",
    notes: "Interested in SEO and PPC services for their new SaaS platform.",
    jobTitle: "Marketing Director",
    website: "https://techstart.com",
    address: "123 Tech Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    country: "USA",
    industry: "Technology",
    companySize: "51-200",
    expectedCloseDate: "2024-03-15",
    serviceInterests: ["SEO", "PPC", "Content Marketing"],
    tags: ["priority", "demo"],
  },
  {
    id: "2",
    name: "Mike Chen",
    company: "Digital Solutions",
    email: "mike@digitalsolutions.com",
    phone: "+1 (555) 987-6543",
    status: "Contacted",
    source: "LinkedIn",
    assignedTo: "Jane Doe",
    value: 25000,
    date: "2024-01-14",
    lastContact: "2024-01-16",
    notes: "Looking for comprehensive digital marketing strategy.",
    jobTitle: "CEO",
    website: "https://digitalsolutions.com",
    address: "456 Digital Ave",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "USA",
    industry: "Digital Marketing",
    companySize: "11-50",
    expectedCloseDate: "2024-02-28",
    serviceInterests: ["Digital Marketing", "Branding", "Analytics"],
    tags: ["linkedin"],
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    company: "Creative Agency",
    email: "emily@creativeagency.com",
    phone: "+1 (555) 456-7890",
    status: "Qualified",
    source: "Referral",
    assignedTo: "John Smith",
    value: 35000,
    date: "2024-01-13",
    lastContact: "2024-01-17",
    notes: "Ready to move forward with social media marketing campaign.",
    jobTitle: "Creative Director",
    website: "https://creativeagency.com",
    address: "789 Creative Blvd",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90210",
    country: "USA",
    industry: "Creative Services",
    companySize: "11-50",
    expectedCloseDate: "2024-02-15",
    serviceInterests: ["Social Media Marketing", "Content Marketing", "Branding"],
    tags: ["referral", "qualified"],
  },
  {
    id: "4",
    name: "David Wilson",
    company: "E-commerce Store",
    email: "david@ecommercestore.com",
    phone: "+1 (555) 321-6540",
    status: "Proposal",
    source: "Google Ads",
    assignedTo: "Jane Doe",
    value: 20000,
    date: "2024-01-12",
    lastContact: "2024-01-18",
    notes: "Interested in PPC and conversion optimization.",
    jobTitle: "E-commerce Manager",
    website: "https://ecommercestore.com",
    address: "321 E-commerce Way",
    city: "Chicago",
    state: "IL",
    zipCode: "60601",
    country: "USA",
    industry: "E-commerce",
    companySize: "51-200",
    expectedCloseDate: "2024-02-10",
    serviceInterests: ["PPC", "Conversion Optimization", "Analytics"],
    tags: ["google-ads", "proposal"],
  },
  {
    id: "5",
    name: "Lisa Thompson",
    company: "Local Restaurant",
    email: "lisa@localrestaurant.com",
    phone: "+1 (555) 789-0123",
    status: "Negotiation",
    source: "Facebook",
    assignedTo: "John Smith",
    value: 12000,
    date: "2024-01-11",
    lastContact: "2024-01-19",
    notes: "Looking for local SEO and social media management.",
    jobTitle: "Owner",
    website: "https://localrestaurant.com",
    address: "654 Restaurant Row",
    city: "Miami",
    state: "FL",
    zipCode: "33101",
    country: "USA",
    industry: "Restaurant",
    companySize: "1-10",
    expectedCloseDate: "2024-01-31",
    serviceInterests: ["Local SEO", "Social Media Management", "PPC"],
    tags: ["facebook", "local"],
  },
];

const statusColors = {
  "New": "bg-blue-100 text-blue-800 border-blue-200",
  "Contacted": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Qualified": "bg-green-100 text-green-800 border-green-200",
  "Proposal": "bg-purple-100 text-purple-800 border-purple-200",
  "Negotiation": "bg-orange-100 text-orange-800 border-orange-200",
  "Won": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Lost": "bg-red-100 text-red-800 border-red-200",
};

// Get source options from lead sources data
const sourceOptions = leadSourcesData.map(source => source.name);

export default function LeadDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const leadId = params.id as string;
  
  const [lead, setLead] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedLead, setEditedLead] = useState<any>(null);
  const [statusNotes, setStatusNotes] = useState(statusNotesData);
  
  // Quick action modals state
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  
  // Form states for quick actions
  const [emailForm, setEmailForm] = useState({
    subject: '',
    message: '',
    template: 'general'
  });
  
  const [callForm, setCallForm] = useState({
    date: '',
    time: '',
    duration: '30',
    notes: '',
    reminder: '15'
  });
  
  const [meetingForm, setMeetingForm] = useState({
    title: '',
    date: '',
    time: '',
    duration: '60',
    location: '',
    type: 'in-person',
    notes: '',
    attendees: ''
  });

  useEffect(() => {
    // Find the lead by ID
    const foundLead = leadsData.find(l => l.id === leadId);
    if (foundLead) {
      setLead(foundLead);
      setEditedLead(foundLead);
    } else {
      // Handle lead not found
      router.push('/business/leads');
    }
  }, [leadId, router]);

  const handleSave = () => {
    setLead(editedLead);
    setIsEditing(false);
    // In a real app, you would save to an API here
  };

  const handleCancel = () => {
    setEditedLead(lead);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this lead?')) {
      // In a real app, you would delete from an API here
      router.push('/business/leads');
    }
  };

  const handleStatusChange = (newStatus: string, note: string) => {
    const newNote = {
      id: Date.now().toString(),
      status: newStatus,
      content: note,
      timestamp: new Date().toISOString(),
      author: "John Smith", // In a real app, this would be the current user
    };
    
    setStatusNotes(prev => [...prev, newNote]);
    setEditedLead(prev => ({ ...prev, status: newStatus }));
    setLead(prev => ({ ...prev, status: newStatus }));
  };

  const handleNoteUpdate = (status: string, note: string) => {
    const newNote = {
      id: Date.now().toString(),
      status: status,
      content: note,
      timestamp: new Date().toISOString(),
      author: "John Smith", // In a real app, this would be the current user
    };
    
    setStatusNotes(prev => [...prev, newNote]);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "email":
        setShowEmailModal(true);
        break;
      case "call":
        setShowCallModal(true);
        break;
      case "meeting":
        setShowMeetingModal(true);
        break;
      default:
        break;
    }
  };

  const handleSendEmail = () => {
    // In a real app, this would integrate with email service
    console.log("Sending email to:", lead?.email);
    console.log("Subject:", emailForm.subject);
    console.log("Message:", emailForm.message);
    
    // Add to activity timeline (in a real app, this would be saved to database)
    console.log("Activity logged: Email sent to", lead?.name);
    
    setShowEmailModal(false);
    setEmailForm({ subject: '', message: '', template: 'general' });
    
    // Show success message (you could add a toast notification here)
    alert('Email sent successfully!');
  };

  const handleScheduleCall = () => {
    // In a real app, this would integrate with calendar service
    console.log("Scheduling call with:", lead?.name);
    console.log("Call details:", callForm);
    
    // Add to activity timeline (in a real app, this would be saved to database)
    console.log("Activity logged: Call scheduled with", lead?.name);
    
    setShowCallModal(false);
    setCallForm({ date: '', time: '', duration: '30', notes: '', reminder: '15' });
    
    alert('Call scheduled successfully!');
  };

  const handleScheduleMeeting = () => {
    // In a real app, this would integrate with calendar service
    console.log("Scheduling meeting with:", lead?.name);
    console.log("Meeting details:", meetingForm);
    
    // Add to activity timeline (in a real app, this would be saved to database)
    console.log("Activity logged: Meeting scheduled with", lead?.name);
    
    setShowMeetingModal(false);
    setMeetingForm({
      title: '',
      date: '',
      time: '',
      duration: '60',
      location: '',
      type: 'in-person',
      notes: '',
      attendees: ''
    });
    
    alert('Meeting scheduled successfully!');
  };

  if (!lead) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading lead details...</p>
        </div>
      </div>
    );
  }

  const currentLead = isEditing ? editedLead : lead;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Back to Leads
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{currentLead.name}</h1>
              <p className="text-gray-600 mt-2">{currentLead.company}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <XMarkIcon className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <CheckIcon className="w-4 h-4" />
                  Save Changes
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <PencilIcon className="w-4 h-4" />
                  Edit Lead
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 px-4 py-2 text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <TrashIcon className="w-4 h-4" />
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Lead Status Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Lead Status</h2>
              {isEditing ? (
                <select
                  value={currentLead.status}
                  onChange={(e) => setEditedLead({...currentLead, status: e.target.value})}
                  className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.keys(statusColors).map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              ) : (
                <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${statusColors[currentLead.status]}`}>
                  {currentLead.status}
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <CurrencyDollarIcon className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Value</p>
                  <p className="font-semibold text-gray-900">${currentLead.value.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <CalendarIcon className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Expected Close</p>
                  <p className="font-semibold text-gray-900">
                    {currentLead.expectedCloseDate ? new Date(currentLead.expectedCloseDate).toLocaleDateString() : 'Not set'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <UserIcon className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-500">Assigned To</p>
                  <p className="font-semibold text-gray-900">{currentLead.assignedTo}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={currentLead.name}
                    onChange={(e) => setEditedLead({...currentLead, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{currentLead.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={currentLead.jobTitle || ''}
                    onChange={(e) => setEditedLead({...currentLead, jobTitle: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{currentLead.jobTitle || 'Not specified'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="flex items-center gap-2">
                  <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="email"
                      value={currentLead.email}
                      onChange={(e) => setEditedLead({...currentLead, email: e.target.value})}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <a href={`mailto:${currentLead.email}`} className="text-blue-600 hover:text-blue-800">
                      {currentLead.email}
                    </a>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="tel"
                      value={currentLead.phone}
                      onChange={(e) => setEditedLead({...currentLead, phone: e.target.value})}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <a href={`tel:${currentLead.phone}`} className="text-blue-600 hover:text-blue-800">
                      {currentLead.phone}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <BuildingOfficeIcon className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Company Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={currentLead.company}
                    onChange={(e) => setEditedLead({...currentLead, company: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{currentLead.company}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                <div className="flex items-center gap-2">
                  <GlobeAltIcon className="w-4 h-4 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="url"
                      value={currentLead.website || ''}
                      onChange={(e) => setEditedLead({...currentLead, website: e.target.value})}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    currentLead.website ? (
                      <a href={currentLead.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                        {currentLead.website}
                      </a>
                    ) : (
                      <span className="text-gray-500">Not specified</span>
                    )
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={currentLead.industry || ''}
                    onChange={(e) => setEditedLead({...currentLead, industry: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{currentLead.industry || 'Not specified'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                {isEditing ? (
                  <select
                    value={currentLead.companySize || ''}
                    onChange={(e) => setEditedLead({...currentLead, companySize: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select company size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-1000">201-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                ) : (
                  <p className="text-gray-900">{currentLead.companySize || 'Not specified'}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4 text-gray-400" />
                  {isEditing ? (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 flex-1">
                      <input
                        type="text"
                        placeholder="Street"
                        value={currentLead.address || ''}
                        onChange={(e) => setEditedLead({...currentLead, address: e.target.value})}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="City"
                        value={currentLead.city || ''}
                        onChange={(e) => setEditedLead({...currentLead, city: e.target.value})}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={currentLead.state || ''}
                        onChange={(e) => setEditedLead({...currentLead, state: e.target.value})}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="ZIP"
                        value={currentLead.zipCode || ''}
                        onChange={(e) => setEditedLead({...currentLead, zipCode: e.target.value})}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ) : (
                    <span className="text-gray-900">
                      {[currentLead.address, currentLead.city, currentLead.state, currentLead.zipCode].filter(Boolean).join(', ') || 'Not specified'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Lead Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TagIcon className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Lead Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lead Source</label>
                {isEditing ? (
                  <select
                    value={currentLead.source}
                    onChange={(e) => setEditedLead({...currentLead, source: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {sourceOptions.map((source) => (
                      <option key={source} value={source}>{source}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-gray-900">{currentLead.source}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {currentLead.tags && currentLead.tags.length > 0 ? (
                    currentLead.tags.map((tag: string, index: number) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">No tags</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Interests</label>
                <div className="flex flex-wrap gap-2">
                  {currentLead.serviceInterests && currentLead.serviceInterests.length > 0 ? (
                    currentLead.serviceInterests.map((service: string, index: number) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {service}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">No interests specified</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Created Date</label>
                <p className="text-gray-900">{new Date(currentLead.date).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Notes</h2>
            {isEditing ? (
              <textarea
                value={currentLead.notes}
                onChange={(e) => setEditedLead({...currentLead, notes: e.target.value})}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add notes about this lead..."
              />
            ) : (
              <p className="text-gray-900 whitespace-pre-wrap">{currentLead.notes || 'No notes available'}</p>
            )}
          </div>

          {/* Status Notes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <DocumentTextIcon className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Status Notes & Progress</h2>
            </div>
            
            <StatusNotes
              currentStatus={currentLead.status}
              notes={statusNotes}
              onStatusChange={handleStatusChange}
              onNoteUpdate={handleNoteUpdate}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <QuickActions type="lead" onAction={(action, data) => {
            console.log('Quick action performed:', action, data);
          }} />

          {/* Activity Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Lead created</p>
                  <p className="text-xs text-gray-500">{new Date(currentLead.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Status updated to {currentLead.status}</p>
                  <p className="text-xs text-gray-500">{new Date(currentLead.lastContact).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lead Score */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Score</h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">85</div>
              <p className="text-sm text-gray-600 mt-1">High Priority</p>
            </div>
          </div>
        </div>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Send Email</h2>
              <button
                onClick={() => setShowEmailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <input
                  type="email"
                  value={lead?.email || ''}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={emailForm.subject}
                  onChange={(e) => setEmailForm({...emailForm, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email subject..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={emailForm.message}
                  onChange={(e) => setEmailForm({...emailForm, message: e.target.value})}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your message..."
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowEmailModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendEmail}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Call Modal */}
      {showCallModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Schedule Call</h2>
              <button
                onClick={() => setShowCallModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                <input
                  type="text"
                  value={`${lead?.name} (${lead?.phone})`}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={callForm.date}
                    onChange={(e) => setCallForm({...callForm, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={callForm.time}
                    onChange={(e) => setCallForm({...callForm, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <select
                  value={callForm.duration}
                  onChange={(e) => setCallForm({...callForm, duration: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">1 hour</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={callForm.notes}
                  onChange={(e) => setCallForm({...callForm, notes: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Call agenda or notes..."
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCallModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleCall}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Schedule Call
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Meeting Modal */}
      {showMeetingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Schedule Meeting</h2>
              <button
                onClick={() => setShowMeetingModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Title</label>
                <input
                  type="text"
                  value={meetingForm.title}
                  onChange={(e) => setMeetingForm({...meetingForm, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter meeting title..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={meetingForm.date}
                    onChange={(e) => setMeetingForm({...meetingForm, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={meetingForm.time}
                    onChange={(e) => setMeetingForm({...meetingForm, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <select
                    value={meetingForm.duration}
                    onChange={(e) => setMeetingForm({...meetingForm, duration: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="90">1.5 hours</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={meetingForm.type}
                    onChange={(e) => setMeetingForm({...meetingForm, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="in-person">In Person</option>
                    <option value="video">Video Call</option>
                    <option value="phone">Phone Call</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={meetingForm.location}
                  onChange={(e) => setMeetingForm({...meetingForm, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Meeting location or video link..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Attendees</label>
                <input
                  type="text"
                  value={meetingForm.attendees}
                  onChange={(e) => setMeetingForm({...meetingForm, attendees: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Comma-separated list of attendees..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Notes</label>
                <textarea
                  value={meetingForm.notes}
                  onChange={(e) => setMeetingForm({...meetingForm, notes: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Meeting agenda or notes..."
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowMeetingModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleMeeting}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Schedule Meeting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 