import React, { useRef } from 'react';

interface MultiSelectDropdownProps {
  value: string[];
  onChange: (tags: string[]) => void;
  options: string[];
  placeholder?: string;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ value, onChange, options, placeholder }) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const filteredOptions = options.filter(opt => !value.includes(opt));

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
  };

  const removeTag = (idx: number) => {
    onChange(value.filter((_, i) => i !== idx));
    selectRef.current?.focus();
  };

  return (
    <div className="flex flex-wrap items-center border rounded-lg px-2 py-1 min-h-[42px] bg-white focus-within:ring-2 focus-within:ring-blue-500">
      {value.map((tag, idx) => (
        <span key={idx} className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-xs font-medium mr-2 mb-1 flex items-center">
          {tag}
          <button type="button" className="ml-1 text-blue-500 hover:text-blue-700" onClick={() => removeTag(idx)}>&times;</button>
        </span>
      ))}
      <select
        ref={selectRef}
        className="flex-1 min-w-[180px] border-none outline-none py-1 px-2 text-sm bg-transparent"
        value=""
        onChange={e => {
          if (e.target.value) {
            addTag(e.target.value);
          }
        }}
        disabled={filteredOptions.length === 0}
      >
        <option value="" disabled>{placeholder || 'Select...'}</option>
        {filteredOptions.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
};

export default MultiSelectDropdown; 