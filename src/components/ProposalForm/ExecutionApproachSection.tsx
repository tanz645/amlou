'use client';

import { UserGroupIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { StrategicPillar } from '../../types/proposal';

interface ExecutionItem {
  id: string;
  title: string;
  description: string;
  subItems: string[];
  relatedPillars: string[];
}

interface ExecutionApproachSectionProps {
  executionDescription: string;
  executionItems: ExecutionItem[];
  strategicPillars: StrategicPillar[];
  onUpdateExecutionDescription: (value: string) => void;
  onAddExecutionItem: () => void;
  onUpdateExecutionItem: (index: number, field: string, value: string) => void;
  onUpdateExecutionSubItem: (itemIndex: number, subItemIndex: number, value: string) => void;
  onAddExecutionSubItem: (itemIndex: number) => void;
  onRemoveExecutionSubItem: (itemIndex: number, subItemIndex: number) => void;
  onUpdateExecutionPillars: (itemIndex: number, pillarIds: string[]) => void;
  onRemoveExecutionItem: (index: number) => void;
}

export default function ExecutionApproachSection({
  executionDescription,
  executionItems,
  strategicPillars,
  onUpdateExecutionDescription,
  onAddExecutionItem,
  onUpdateExecutionItem,
  onUpdateExecutionSubItem,
  onAddExecutionSubItem,
  onRemoveExecutionSubItem,
  onUpdateExecutionPillars,
  onRemoveExecutionItem
}: ExecutionApproachSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <UserGroupIcon className="w-5 h-5 mr-2" />
        Execution Approach
      </h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Execution Description</label>
          <textarea
            value={executionDescription}
            onChange={(e) => onUpdateExecutionDescription(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe the overall execution approach..."
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Execution Items</h3>
            <button
              type="button"
              onClick={onAddExecutionItem}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Item
            </button>
          </div>

          {executionItems.map((item, index) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-md font-medium text-gray-900">Item {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => onRemoveExecutionItem(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => onUpdateExecutionItem(index, 'title', e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Technical Foundation"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => onUpdateExecutionItem(index, 'description', e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Brief description of the item"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Related Strategic Pillars</label>
                  <div className="mt-2 space-y-2">
                    {strategicPillars.map((pillar) => (
                      <label key={pillar.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={item.relatedPillars?.includes(pillar.id) || false}
                          onChange={(e) => {
                            const currentPillars = item.relatedPillars || [];
                            const newPillars = e.target.checked
                              ? [...currentPillars, pillar.id]
                              : currentPillars.filter(id => id !== pillar.id);
                            onUpdateExecutionPillars(index, newPillars);
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{pillar.title}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Sub-items</label>
                    <button
                      type="button"
                      onClick={() => onAddExecutionSubItem(index)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      + Add Sub-item
                    </button>
                  </div>
                  {item.subItems.map((subItem, subItemIndex) => (
                    <div key={subItemIndex} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={subItem}
                        onChange={(e) => onUpdateExecutionSubItem(index, subItemIndex, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter sub-item"
                      />
                      <button
                        type="button"
                        onClick={() => onRemoveExecutionSubItem(index, subItemIndex)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
