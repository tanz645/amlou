import React from 'react';
import { ChartBarIcon, MegaphoneIcon, TagIcon, EyeIcon, ExclamationTriangleIcon, UserGroupIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

interface CampaignsTabProps {
  data: Record<string, string>;
  onDataUpdate: (data: Record<string, string>) => void;
}

export default function CampaignsTab({ data, onDataUpdate }: CampaignsTabProps) {
  const handleInputChange = (field: string, value: string) => {
    onDataUpdate({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="space-y-8">
      {/* Example field */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaigns Audit</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Campaigns</label>
            <input type="number" value={data.totalCampaigns || ''} onChange={e => handleInputChange('totalCampaigns', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0" />
          </div>
          {/* Repeat for all other fields, using data[field] and handleInputChange */}
        </div>
      </div>
    </div>
  );
} 