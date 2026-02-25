import { AUDIT_FIELD_DEFINITIONS, AuditTypeDefinition } from '../utils/auditFieldDefinitions';

interface GenericAuditResultProps {
  data: Record<string, any>;
  auditTypeId?: string;
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
    return <span className="text-gray-400 italic">N/A</span>;
  }
  if (typeof value === 'boolean') {
    return <span className="text-gray-800">{value ? 'Yes' : 'No'}</span>;
  }
  if (typeof value === 'string' || typeof value === 'number') {
    return <span className="text-gray-800 break-words">{value.toString()}</span>;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return <span className="text-gray-400 italic">None</span>;
    return <span className="text-gray-800">{value.join(', ')}</span>;
  }
  return <span className="text-gray-400 italic">Unsupported format</span>;
};

const GenericAuditResult: React.FC<GenericAuditResultProps> = ({ data, auditTypeId }) => {
  const definition: AuditTypeDefinition | undefined = auditTypeId ? AUDIT_FIELD_DEFINITIONS[auditTypeId] : undefined;

  if (!definition) {
    if (!data || Object.keys(data).length === 0) {
      return <div className="text-gray-500 italic">No data provided for this audit type.</div>;
    }
    // Fallback to old dynamic behavior
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(data).map(([key, value]) => {
          if (key === 'selectedPlatforms') return null;
          return (
            <div key={key} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <span className="block text-sm font-semibold text-gray-600 mb-1">{prettifyLabel(key)}</span>
              <div className="text-base">{renderValue(value)}</div>
            </div>
          );
        })}
      </div>
    );
  }

  // Use definition for rendering
  const sectionsToRender = auditTypeId === 'social' && data.selectedPlatforms
    ? definition.sections?.filter(section => {
        const platformId = section.name.split(' ')[0].toLowerCase();
        return (data.selectedPlatforms as string[]).includes(platformId);
      })
    : definition.sections;

  return (
    <div className="space-y-8">
      {sectionsToRender ? (
        sectionsToRender.map((section, sIdx) => {
          // Special handling for social platform nesting
          const sectionData = auditTypeId === 'social' 
            ? data[section.name.split(' ')[0].toLowerCase()] || {} 
            : data;

          return (
            <div key={sIdx} className="border border-blue-100 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-blue-50/50 px-5 py-3 border-b border-blue-100">
                <h3 className="text-lg font-semibold text-blue-800">{section.name}</h3>
              </div>
              <div className="p-5 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.fields.map(field => (
                    <div key={field.id} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <span className="block text-sm font-semibold text-gray-600 mb-1">{field.label}</span>
                      <div className="text-base">{renderValue(sectionData[field.id])}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {definition.fields?.map(field => (
            <div key={field.id} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <span className="block text-sm font-semibold text-gray-600 mb-1">{field.label}</span>
              <div className="text-base">{renderValue(data[field.id])}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenericAuditResult;
