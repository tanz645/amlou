'use client';

import { DocumentTextIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface TermsSectionProps {
  terms: string[];
  onAddTerm: () => void;
  onUpdateTerm: (index: number, value: string) => void;
  onRemoveTerm: (index: number) => void;
}

export default function TermsSection({
  terms,
  onAddTerm,
  onUpdateTerm,
  onRemoveTerm
}: TermsSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <DocumentTextIcon className="w-5 h-5 mr-2" />
        Terms & Conditions
      </h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Terms and Conditions</h3>
          <button
            type="button"
            onClick={onAddTerm}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Term
          </button>
        </div>

        {terms.length > 0 ? (
          <div className="space-y-3">
            {terms.map((term, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={term}
                  onChange={(e) => onUpdateTerm(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter term or condition"
                />
                <button
                  type="button"
                  onClick={() => onRemoveTerm(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No terms and conditions added yet</p>
        )}

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Common Terms (Click to Add)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              'Payment terms: 50% upfront, 50% on completion',
              'Project timeline: 30 days from start date',
              'Revisions: 2 rounds of revisions included',
              'Intellectual property rights remain with client',
              'Confidentiality agreement applies',
              'Force majeure clause included',
              'Dispute resolution through arbitration',
              'Governing law: [Your State/Country]'
            ].map((suggestedTerm, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  if (!terms.includes(suggestedTerm)) {
                    onAddTerm();
                    // Update the last added term with the suggested text
                    setTimeout(() => {
                      onUpdateTerm(terms.length, suggestedTerm);
                    }, 0);
                  }
                }}
                className="text-left text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded border border-transparent hover:border-blue-200"
              >
                {suggestedTerm}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
