import React from 'react';

interface Platform {
  id: string;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface AuditPlatformSelectorProps {
  platforms: Platform[];
  onChange: (selectedPlatforms: string[]) => void;
}

export default function AuditPlatformSelector({ platforms, onChange }: AuditPlatformSelectorProps) {
  const [selectedPlatforms, setSelectedPlatforms] = React.useState<string[]>([]);

  const handlePlatformToggle = (platformId: string) => {
    const newSelected = selectedPlatforms.includes(platformId)
      ? selectedPlatforms.filter(id => id !== platformId)
      : [...selectedPlatforms, platformId];
    
    setSelectedPlatforms(newSelected);
    onChange(newSelected);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Select the platforms:</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          const isSelected = selectedPlatforms.includes(platform.id);
          
          return (
            <button
              key={platform.id}
              onClick={() => handlePlatformToggle(platform.id)}
              className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                isSelected 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Icon className={`h-5 w-5 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} />
                <span className="font-medium text-sm">{platform.name}</span>
                {isSelected && (
                  <div className="ml-auto">
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {selectedPlatforms.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            Selected platforms: <span className="font-medium">{selectedPlatforms.length}</span>
          </p>
        </div>
      )}
    </div>
  );
} 