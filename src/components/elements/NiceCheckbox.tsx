import React from 'react';

interface NiceCheckboxProps {
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  className?: string;
}

const NiceCheckbox: React.FC<NiceCheckboxProps> = ({ id, checked, onChange, label, className }) => {
  return (
    <label
      htmlFor={id}
      className={`inline-flex items-center cursor-pointer select-none transition-transform duration-150 ${className || ''}`.trim()}
    >
      <span className="relative flex items-center justify-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className={`peer appearance-none w-5 h-5 border border-gray-300 rounded-md bg-white 
            checked:bg-green-600 checked:border-green-600 
            focus:ring-2 focus:ring-green-400 focus:border-green-600
            transition-all duration-200 outline-none shadow-sm
            dark:bg-gray-800 dark:border-gray-600 dark:checked:bg-green-500 dark:checked:border-green-500`}
        />
        <span className="pointer-events-none absolute left-0 top-0 w-5 h-5 flex items-center justify-center">
          <svg
            className={`w-4 h-4 text-white transition-all duration-200 ${checked ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 10.5l3.5 3.5 6-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </span>
      <span className="ml-2 text-[15px] font-semibold text-gray-900 dark:text-gray-100 leading-tight">
        {label}
      </span>
    </label>
  );
};

export default NiceCheckbox; 