import React from 'react';

interface StepProgressBarProps {
  currentStep: number;
}

export default function StepProgressBar({ currentStep }: StepProgressBarProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center space-x-2">
        {[1, 2, 3].map((stepNumber) => (
          <div key={stepNumber} className="flex items-center">
            <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-medium ${
              stepNumber <= currentStep 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {stepNumber}
            </div>
            {stepNumber < 3 && (
              <div className={`w-8 md:w-16 h-1 mx-1 md:mx-2 ${
                stepNumber < currentStep ? 'bg-blue-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 