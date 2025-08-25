import React from 'react';
import TableBuilder from '@/components/TableBuilder';

const competitors = [
  {
    id: 1,
    name: 'Your Company',
    brandAwareness: 'High',
    socialFollowers: '25,000',
    engagementRate: '4.2%',
    productQuality: 'Excellent',
    pricing: '$$',
    strengths: 'Brand loyalty, innovation',
    weaknesses: 'Higher price',
    notes: 'Strong in digital marketing',
  },
  {
    id: 2,
    name: 'Competitor A',
    brandAwareness: 'Medium',
    socialFollowers: '40,000',
    engagementRate: '3.1%',
    productQuality: 'Good',
    pricing: '$',
    strengths: 'Low price, wide reach',
    weaknesses: 'Lower engagement',
    notes: 'Aggressive promotions',
  },
  {
    id: 3,
    name: 'Competitor B',
    brandAwareness: 'High',
    socialFollowers: '18,000',
    engagementRate: '5.0%',
    productQuality: 'Excellent',
    pricing: '$$',
    strengths: 'High engagement, niche focus',
    weaknesses: 'Small audience',
    notes: 'Viral campaigns',
  },
  {
    id: 4,
    name: 'Competitor C',
    brandAwareness: 'Low',
    socialFollowers: '12,000',
    engagementRate: '2.7%',
    productQuality: 'Average',
    pricing: '$$$',
    strengths: 'Premium image',
    weaknesses: 'Expensive, less accessible',
    notes: 'Luxury positioning',
  },
];

const columns = [
  { key: 'name', label: 'Competitor' },
  { key: 'brandAwareness', label: 'Brand Awareness' },
  { key: 'socialFollowers', label: 'Social Followers' },
  { key: 'engagementRate', label: 'Engagement Rate' },
  { key: 'productQuality', label: 'Product Quality' },
  { key: 'pricing', label: 'Pricing' },
  { key: 'strengths', label: 'Strengths' },
  { key: 'weaknesses', label: 'Weaknesses' },
  { key: 'notes', label: 'Notes' },
];

export default function CompetitorAnalysisPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Competitor Analysis Report</h1>
      <p className="text-gray-600 mb-8">A side-by-side comparison of your company and key competitors across important metrics.</p>
      <TableBuilder
        columns={columns}
        data={competitors}
        itemsPerPage={competitors.length}
        searchable={false}
        selectable={false}
      />
    </div>
  );
} 