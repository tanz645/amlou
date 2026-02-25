import React from 'react';

interface GenericAuditResultProps {
  data: Record<string, any>;
}

// Helper to format camelCase or snake_case to Title Case
const prettifyLabel = (label: string) => {
  return label
    .replace(/([A-Z])/g, ' $1') // Insert space before uppercase letters
    .replace(/_/g, ' ') // Replace underscores with spaces
    .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
    .trim();
};

const renderValue = (value: any): React.ReactNode => {
  if (value === null || value === undefined || value === '') {
    return <span className="text-gray-400 italic">Not provided</span>;
  }
  if (typeof value === 'boolean') {
    return <span className="text-gray-800">{value ? 'Yes' : 'No'}</span>;
  }
  if (typeof value === 'string' || typeof value === 'number') {
    // Check if it's an array represented as a CSV string (sometimes happens with multi-selects)
    return <span className="text-gray-800 break-words">{value.toString()}</span>;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return <span className="text-gray-400 italic">None</span>;
    return <span className="text-gray-800">{value.join(', ')}</span>;
  }
  if (typeof value === 'object') {
    // Nested object
    return (
      <div className="mt-2 space-y-3 pl-4 border-l-2 border-blue-100">
        {Object.entries(value).map(([subKey, subVal]) => (
          <div key={subKey} className="text-sm">
            <span className="font-medium text-gray-700 block mb-1">{prettifyLabel(subKey)}</span>
            {renderValue(subVal)}
          </div>
        ))}
      </div>
    );
  }
  return <span className="text-gray-400 italic">Unsupported format</span>;
};

const GenericAuditResult: React.FC<GenericAuditResultProps> = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return <div className="text-gray-500 italic">No data provided for this audit type.</div>;
  }

  // Separate top-level primitives from top-level objects (subsections)
  const primitives: Record<string, any> = {};
  const subsections: Record<string, any> = {};

  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      subsections[key] = value;
    } else {
      primitives[key] = value;
    }
  });

  return (
    <div className="space-y-6">
      {/* Render top-level primitive fields */}
      {Object.keys(primitives).length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(primitives).map(([key, value]) => (
            <div key={key} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <span className="block text-sm font-semibold text-gray-600 mb-1">{prettifyLabel(key)}</span>
              <div className="text-base">{renderValue(value)}</div>
            </div>
          ))}
        </div>
      )}

      {/* Render subsections (nested objects, like 'facebook' or 'general' in Social) */}
      {Object.keys(subsections).length > 0 && (
        <div className="space-y-6 mt-6">
          {Object.entries(subsections).map(([sectionKey, sectionData]) => (
            <div key={sectionKey} className="border border-blue-100 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-blue-50/50 px-5 py-3 border-b border-blue-100">
                <h3 className="text-lg font-semibold text-blue-800">{prettifyLabel(sectionKey)}</h3>
              </div>
              <div className="p-5 bg-white">
                {Object.keys(sectionData || {}).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {Object.entries(sectionData).map(([key, value]) => (
                      <div key={key}>
                        <span className="block text-sm font-medium text-gray-500 mb-1">{prettifyLabel(key)}</span>
                        <div className="text-sm">{renderValue(value)}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-400 italic text-sm">No data provided.</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenericAuditResult;
