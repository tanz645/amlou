import React from 'react';
import AuditPlatformSelector from '../components/AuditPlatformSelector';
import { 
  ChatBubbleLeftRightIcon,
  GlobeAltIcon,
  PlayCircleIcon,
  MusicalNoteIcon,
  HashtagIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

const socialPlatforms = [
  { id: 'general', name: 'General Audit', icon: ChatBubbleLeftRightIcon },
  { id: 'facebook', name: 'Facebook', icon: GlobeAltIcon },
  { id: 'instagram', name: 'Instagram', icon: GlobeAltIcon },
  { id: 'youtube', name: 'YouTube', icon: PlayCircleIcon },
  { id: 'tiktok', name: 'TikTok', icon: MusicalNoteIcon },
  { id: 'twitter', name: 'Twitter', icon: HashtagIcon },
  { id: 'linkedin', name: 'LinkedIn', icon: BuildingOfficeIcon },
];

interface SocialTabProps {
  data: Record<string, Record<string, string>>;
  onDataUpdate: (data: Record<string, Record<string, string>>) => void;
}

export default function SocialTab({ data, onDataUpdate }: SocialTabProps) {
  const handleInputChange = (platform: string, field: string, value: string) => {
    onDataUpdate({
      ...data,
      [platform]: {
        ...data[platform],
        [field]: value
      }
    });
  };

  // ...render logic for each platform, using data[platform][field] and handleInputChange
  // For brevity, only show one field example:
  return (
    <div className="space-y-8">
      <AuditPlatformSelector platforms={socialPlatforms} onChange={() => {}} />
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">General Social Media Audit</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Followers Across All Platforms</label>
            <input
              type="number"
              className="w-full border rounded p-2"
              value={data.general?.totalFollowers || ''}
              onChange={e => handleInputChange('general', 'totalFollowers', e.target.value)}
            />
          </div>
          {/* ...repeat for all other fields and platforms... */}
        </div>
      </div>
    </div>
  );
} 