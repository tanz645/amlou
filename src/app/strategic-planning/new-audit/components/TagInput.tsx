import React, { useRef, useState } from 'react';

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

const TagInput: React.FC<TagInputProps> = ({ value, onChange, placeholder }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (input.trim()) {
        addTag(input);
        setInput('');
      }
    } else if (e.key === 'Backspace' && !input && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const removeTag = (idx: number) => {
    onChange(value.filter((_, i) => i !== idx));
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-wrap items-center border rounded-lg px-2 py-1 min-h-[42px] bg-white focus-within:ring-2 focus-within:ring-blue-500">
      {value.map((tag, idx) => (
        <span key={idx} className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-xs font-medium mr-2 mb-1 flex items-center">
          {tag}
          <button type="button" className="ml-1 text-blue-500 hover:text-blue-700" onClick={() => removeTag(idx)}>&times;</button>
        </span>
      ))}
      <input
        ref={inputRef}
        className="flex-1 min-w-[120px] border-none outline-none py-1 px-2 text-sm bg-transparent"
        value={input}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TagInput; 