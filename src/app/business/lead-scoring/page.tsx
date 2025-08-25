"use client";

import React, { useState } from "react";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  StarIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

// Mock data for lead scoring
const leadScoringData = [
  {
    id: 1,
    name: "Company Size",
    type: "Demographic",
    description: "Score based on company employee count",
    criteria: [
      { value: "1-10 employees", score: 10, color: "red" },
      { value: "11-50 employees", score: 25, color: "orange" },
      { value: "51-200 employees", score: 50, color: "yellow" },
      { value: "201-1000 employees", score: 75, color: "green" },
      { value: "1000+ employees", score: 100, color: "blue" },
    ],
    weight: 20,
    status: "Active",
    totalLeads: 45,
    avgScore: 65,
  },
  {
    id: 2,
    name: "Budget Range",
    type: "Financial",
    description: "Score based on stated budget for services",
    criteria: [
      { value: "Under $1K", score: 10, color: "red" },
      { value: "$1K - $5K", score: 30, color: "orange" },
      { value: "$5K - $10K", score: 60, color: "yellow" },
      { value: "$10K - $25K", score: 80, color: "green" },
      { value: "$25K+", score: 100, color: "blue" },
    ],
    weight: 30,
    status: "Active",
    totalLeads: 38,
    avgScore: 72,
  },
  {
    id: 3,
    name: "Decision Timeline",
    type: "Behavioral",
    description: "Score based on urgency of decision making",
    criteria: [
      { value: "6+ months", score: 10, color: "red" },
      { value: "3-6 months", score: 30, color: "orange" },
      { value: "1-3 months", score: 60, color: "yellow" },
      { value: "1-4 weeks", score: 85, color: "green" },
      { value: "Immediate", score: 100, color: "blue" },
    ],
    weight: 25,
    status: "Active",
    totalLeads: 42,
    avgScore: 58,
  },
  {
    id: 4,
    name: "Industry Type",
    type: "Demographic",
    description: "Score based on industry vertical",
    criteria: [
      { value: "Retail", score: 40, color: "orange" },
      { value: "Healthcare", score: 70, color: "green" },
      { value: "Technology", score: 90, color: "blue" },
      { value: "Finance", score: 85, color: "green" },
      { value: "Education", score: 60, color: "yellow" },
    ],
    weight: 15,
    status: "Active",
    totalLeads: 35,
    avgScore: 69,
  },
  {
    id: 5,
    name: "Lead Source",
    type: "Source",
    description: "Score based on lead generation source",
    criteria: [
      { value: "Cold Call", score: 20, color: "red" },
      { value: "Website", score: 50, color: "yellow" },
      { value: "Referral", score: 80, color: "green" },
      { value: "LinkedIn", score: 70, color: "green" },
      { value: "Google Ads", score: 60, color: "yellow" },
    ],
    weight: 10,
    status: "Active",
    totalLeads: 52,
    avgScore: 56,
  },
];

const scoringTypes = ["All", "Demographic", "Financial", "Behavioral", "Source", "Engagement"];
const statusOptions = ["All", "Active", "Inactive"];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800 border-green-200";
    case "Inactive":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-green-600 bg-green-100";
  if (score >= 60) return "text-yellow-600 bg-yellow-100";
  if (score >= 40) return "text-orange-600 bg-orange-100";
  return "text-red-600 bg-red-100";
};

const getCriteriaColor = (color: string) => {
  switch (color) {
    case "red":
      return "bg-red-100 text-red-800 border-red-200";
    case "orange":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "yellow":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "green":
      return "bg-green-100 text-green-800 border-green-200";
    case "blue":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function LeadScoringPage() {
  const [scoringCriteria, setScoringCriteria] = useState(leadScoringData);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedCriteria, setSelectedCriteria] = useState<typeof leadScoringData[0] | null>(null);
  const [showCriteriaModal, setShowCriteriaModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCriteria, setEditedCriteria] = useState<typeof leadScoringData[0] | null>(null);

  // Filter scoring criteria based on search and filters
  const filteredCriteria = scoringCriteria.filter((criteria) => {
    const matchesSearch = 
      criteria.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      criteria.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === "All" || criteria.type === typeFilter;
    const matchesStatus = statusFilter === "All" || criteria.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  // Calculate totals
  const totalCriteria = filteredCriteria.length;
  const totalWeight = filteredCriteria.reduce((sum, criteria) => sum + criteria.weight, 0);
  const avgScore = filteredCriteria.length > 0 
    ? filteredCriteria.reduce((sum, criteria) => sum + criteria.avgScore, 0) / filteredCriteria.length 
    : 0;
  const activeCriteria = filteredCriteria.filter(criteria => criteria.status === "Active").length;

  const handleCriteriaClick = (criteria: typeof leadScoringData[0]) => {
    setSelectedCriteria(criteria);
    setShowCriteriaModal(true);
  };

  const handleStatusChange = (criteriaId: number, newStatus: string) => {
    setScoringCriteria(scoringCriteria.map(criteria => 
      criteria.id === criteriaId ? { ...criteria, status: newStatus } : criteria
    ));
  };

  const handleEditCriteria = (criteria: typeof leadScoringData[0]) => {
    setSelectedCriteria(criteria);
    setEditedCriteria(criteria);
    setIsEditing(true);
    setShowCriteriaModal(true);
  };

  const handleSaveCriteria = () => {
    if (editedCriteria) {
      // Calculate new average score based on edited criteria
      const newAvgScore = editedCriteria.criteria.reduce((sum, item) => sum + item.score, 0) / editedCriteria.criteria.length;
      const updatedCriteria = {
        ...editedCriteria,
        avgScore: Math.round(newAvgScore)
      };
      
      setScoringCriteria(scoringCriteria.map(criteria => 
        criteria.id === editedCriteria.id ? updatedCriteria : criteria
      ));
      setSelectedCriteria(updatedCriteria);
      setIsEditing(false);
      setEditedCriteria(null);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedCriteria(null);
  };

  const handleAddCriteria = (newCriteria: any) => {
    const newId = Math.max(...scoringCriteria.map(c => c.id)) + 1;
    const criteriaWithId = { ...newCriteria, id: newId };
    setScoringCriteria([...scoringCriteria, criteriaWithId]);
  };

  const handleDeleteCriteria = (criteriaId: number) => {
    if (confirm('Are you sure you want to delete this scoring criteria?')) {
      setScoringCriteria(scoringCriteria.filter(criteria => criteria.id !== criteriaId));
      setShowCriteriaModal(false);
      setSelectedCriteria(null);
      setIsEditing(false);
      setEditedCriteria(null);
    }
  };

  const handleAddCriterion = () => {
    if (editedCriteria) {
      const newCriterion = {
        value: "",
        score: 0,
        color: "gray"
      };
      setEditedCriteria({
        ...editedCriteria,
        criteria: [...editedCriteria.criteria, newCriterion]
      });
    }
  };

  const handleUpdateCriterion = (index: number, field: string, value: any) => {
    if (editedCriteria) {
      const updatedCriteria = [...editedCriteria.criteria];
      updatedCriteria[index] = { ...updatedCriteria[index], [field]: value };
      setEditedCriteria({
        ...editedCriteria,
        criteria: updatedCriteria
      });
    }
  };

  const handleRemoveCriterion = (index: number) => {
    if (editedCriteria) {
      const updatedCriteria = editedCriteria.criteria.filter((_, i) => i !== index);
      setEditedCriteria({
        ...editedCriteria,
        criteria: updatedCriteria
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Lead Scoring</h1>
            <p className="text-gray-600 mt-2">Manage and track lead scoring criteria and performance</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <PlusIcon className="h-5 w-5" />
            Add Scoring Criteria
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Criteria</p>
              <p className="text-2xl font-bold text-gray-900">{totalCriteria}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <StarIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Weight</p>
              <p className="text-2xl font-bold text-gray-900">{totalWeight}%</p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Score</p>
              <p className="text-2xl font-bold text-gray-900">{avgScore.toFixed(1)}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100">
              <ArrowTrendingUpIcon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Criteria</p>
              <p className="text-2xl font-bold text-gray-900">{activeCriteria}</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-100">
              <CheckCircleIcon className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search scoring criteria..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Type Filter */}
          <div className="lg:w-48">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {scoringTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="lg:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Scoring Criteria Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCriteria.map((criteria) => (
          <div 
            key={criteria.id} 
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleCriteriaClick(criteria)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <StarIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{criteria.name}</h3>
                  <p className="text-sm text-gray-500">{criteria.type}</p>
                </div>
              </div>
              <select
                value={criteria.status}
                onChange={(e) => handleStatusChange(criteria.id, e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(criteria.status)}`}
              >
                {statusOptions.slice(1).map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{criteria.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs font-medium text-gray-500">Weight</p>
                <p className="text-lg font-semibold text-gray-900">{criteria.weight}%</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Avg Score</p>
                <p className={`text-lg font-semibold ${getScoreColor(criteria.avgScore)} px-2 py-1 rounded`}>
                  {criteria.avgScore}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Total Leads</p>
                <p className="text-lg font-semibold text-gray-900">{criteria.totalLeads}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Criteria</p>
                <p className="text-lg font-semibold text-gray-900">{criteria.criteria.length}</p>
              </div>
            </div>

            {/* Sample Criteria */}
            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 mb-2">Sample Criteria:</p>
              <div className="space-y-1">
                {criteria.criteria.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">{item.value}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCriteriaColor(item.color)}`}>
                      {item.score}
                    </span>
                  </div>
                ))}
                {criteria.criteria.length > 3 && (
                  <div className="text-xs text-gray-400">
                    +{criteria.criteria.length - 3} more...
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Last updated: {new Date().toLocaleDateString()}</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCriteriaClick(criteria);
                  }}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <EyeIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditCriteria(criteria);
                  }}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle delete
                  }}
                  className="text-red-600 hover:text-red-900"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scoring Criteria Detail Modal */}
      {showCriteriaModal && selectedCriteria && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {isEditing ? "Edit Scoring Criteria" : "Scoring Criteria Details"}
              </h2>
              <button
                onClick={() => {
                  setShowCriteriaModal(false);
                  setIsEditing(false);
                  setEditedCriteria(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                  <StarIcon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  {isEditing && editedCriteria ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editedCriteria.name}
                        onChange={(e) => setEditedCriteria({...editedCriteria, name: e.target.value})}
                        className="text-xl font-semibold text-gray-900 bg-gray-50 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <select
                        value={editedCriteria.type}
                        onChange={(e) => setEditedCriteria({...editedCriteria, type: e.target.value})}
                        className="text-gray-500 bg-gray-50 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {scoringTypes.slice(1).map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <select
                        value={editedCriteria.status}
                        onChange={(e) => setEditedCriteria({...editedCriteria, status: e.target.value})}
                        className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(editedCriteria.status)}`}
                      >
                        {statusOptions.slice(1).map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{selectedCriteria.name}</h3>
                      <p className="text-gray-500">{selectedCriteria.type}</p>
                      <select
                        value={selectedCriteria.status}
                        onChange={(e) => handleStatusChange(selectedCriteria.id, e.target.value)}
                        className={`mt-2 inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(selectedCriteria.status)}`}
                      >
                        {statusOptions.slice(1).map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Description</label>
                {isEditing && editedCriteria ? (
                  <textarea
                    value={editedCriteria.description}
                    onChange={(e) => setEditedCriteria({...editedCriteria, description: e.target.value})}
                    rows={3}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-sm text-gray-900 mt-1">{selectedCriteria.description}</p>
                )}
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs font-medium text-gray-500">Weight</p>
                  {isEditing && editedCriteria ? (
                    <input
                      type="number"
                      value={editedCriteria.weight}
                      onChange={(e) => setEditedCriteria({...editedCriteria, weight: parseInt(e.target.value)})}
                      className="text-2xl font-bold text-gray-900 bg-white px-2 py-1 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-2xl font-bold text-gray-900">{selectedCriteria.weight}%</p>
                  )}
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs font-medium text-gray-500">Average Score</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {isEditing && editedCriteria 
                      ? (editedCriteria.criteria.reduce((sum, item) => sum + item.score, 0) / editedCriteria.criteria.length).toFixed(1)
                      : selectedCriteria.avgScore
                    }
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs font-medium text-gray-500">Total Leads</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedCriteria.totalLeads}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs font-medium text-gray-500">Criteria Count</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {isEditing && editedCriteria ? editedCriteria.criteria.length : selectedCriteria.criteria.length}
                  </p>
                </div>
              </div>

              {/* Scoring Criteria Table */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Scoring Criteria</h3>
                  {isEditing && (
                    <button
                      onClick={handleAddCriterion}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <PlusIcon className="w-4 h-4" />
                      Add Criterion
                    </button>
                  )}
                </div>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Value
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Score
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Color
                        </th>
                        {isEditing && (
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {(isEditing && editedCriteria ? editedCriteria.criteria : selectedCriteria.criteria).map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {isEditing && editedCriteria ? (
                              <input
                                type="text"
                                value={item.value}
                                onChange={(e) => handleUpdateCriterion(index, 'value', e.target.value)}
                                className="text-sm text-gray-900 bg-white px-2 py-1 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            ) : (
                              <span className="text-sm text-gray-900">{item.value}</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {isEditing && editedCriteria ? (
                              <input
                                type="number"
                                value={item.score}
                                onChange={(e) => handleUpdateCriterion(index, 'score', parseInt(e.target.value))}
                                className="text-sm font-medium text-gray-900 bg-white px-2 py-1 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            ) : (
                              <span className="text-sm font-medium text-gray-900">{item.score}</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {isEditing && editedCriteria ? (
                              <select
                                value={item.color}
                                onChange={(e) => handleUpdateCriterion(index, 'color', e.target.value)}
                                className="text-xs font-medium rounded-full border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="red">Red</option>
                                <option value="orange">Orange</option>
                                <option value="yellow">Yellow</option>
                                <option value="green">Green</option>
                                <option value="blue">Blue</option>
                                <option value="gray">Gray</option>
                              </select>
                            ) : (
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getCriteriaColor(item.color)}`}>
                                {item.color}
                              </span>
                            )}
                          </td>
                          {isEditing && (
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                onClick={() => handleRemoveCriterion(index)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div>
                  {isEditing && (
                    <button
                      onClick={() => handleDeleteCriteria(selectedCriteria.id)}
                      className="px-4 py-2 text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      Delete Criteria
                    </button>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveCriteria}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Save Changes
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setShowCriteriaModal(false)}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Close
                      </button>
                      <button
                        onClick={() => handleEditCriteria(selectedCriteria)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Edit Criteria
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 