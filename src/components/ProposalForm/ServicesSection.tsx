'use client';

import { CurrencyDollarIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Service } from '../../types/proposal';

interface ServicesSectionProps {
  selectedServices: Service[];
  availableServices: Service[];
  showServiceSelector: boolean;
  showCustomService: boolean;
  customService: {
    name: string;
    description: string;
    unit_price: number;
    category: string;
  };
  onAddService: (service: Service) => void;
  onUpdateServiceQuantity: (index: number, quantity: number) => void;
  onRemoveService: (index: number) => void;
  onSetShowServiceSelector: (show: boolean) => void;
  onSetShowCustomService: (show: boolean) => void;
  onUpdateCustomService: (field: string, value: any) => void;
  onAddCustomService: () => void;
  onCloseCustomService: () => void;
}

export default function ServicesSection({
  selectedServices,
  availableServices,
  showServiceSelector,
  showCustomService,
  customService,
  onAddService,
  onUpdateServiceQuantity,
  onRemoveService,
  onSetShowServiceSelector,
  onSetShowCustomService,
  onUpdateCustomService,
  onAddCustomService,
  onCloseCustomService
}: ServicesSectionProps) {
  const totalCost = selectedServices.reduce((sum, service) => sum + (service.unit_price * service.quantity), 0);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <CurrencyDollarIcon className="w-5 h-5 mr-2" />
        Services & Deliverables
      </h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Services</h3>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => onSetShowServiceSelector(true)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Service
            </button>
            <button
              type="button"
              onClick={() => onSetShowCustomService(true)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Custom Service
            </button>
          </div>
        </div>

        {selectedServices.length > 0 ? (
          <div className="space-y-3">
            {selectedServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{service.name}</h4>
                  <p className="text-sm text-gray-600">{service.description}</p>
                  {service.category && (
                    <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                      {service.category}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-700">Qty:</label>
                    <input
                      type="number"
                      min="1"
                      value={service.quantity}
                      onChange={(e) => onUpdateServiceQuantity(index, parseInt(e.target.value))}
                      className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">
                      ${(service.unit_price * service.quantity).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      ${service.unit_price} each
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveService(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No services selected</p>
        )}

        {/* Deliverables Preview */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Deliverables Preview</h3>
          <p className="text-gray-700 mb-4 text-sm">
            Your selected services will be delivered as follows:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* One Time Deliverables */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-md font-medium text-gray-900 mb-3">One Time</h4>
              {selectedServices.filter(service => service.category === 'One-time').length > 0 ? (
                <div className="space-y-2">
                  {selectedServices.filter(service => service.category === 'One-time').map((service, index) => (
                    <div key={index} className="text-sm">
                      <div className="font-medium text-gray-900">{service.name}</div>
                      <div className="text-gray-600">${service.unit_price}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No one-time services</p>
              )}
            </div>

            {/* Monthly Deliverables */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-md font-medium text-gray-900 mb-3">Monthly</h4>
              {selectedServices.filter(service => service.category === 'Monthly').length > 0 ? (
                <div className="space-y-2">
                  {selectedServices.filter(service => service.category === 'Monthly').map((service, index) => (
                    <div key={index} className="text-sm">
                      <div className="font-medium text-gray-900">{service.name}</div>
                      <div className="text-gray-600">${service.unit_price}/month</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No monthly services</p>
              )}
            </div>

            {/* Weekly Deliverables */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-md font-medium text-gray-900 mb-3">Weekly</h4>
              {selectedServices.filter(service => service.category === 'Weekly').length > 0 ? (
                <div className="space-y-2">
                  {selectedServices.filter(service => service.category === 'Weekly').map((service, index) => (
                    <div key={index} className="text-sm">
                      <div className="font-medium text-gray-900">{service.name}</div>
                      <div className="text-gray-600">${service.unit_price}/week</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No weekly services</p>
              )}
            </div>
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="border-t border-gray-200 pt-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">${totalCost.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Service Selector Modal */}
      {showServiceSelector && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Select Services</h3>
                <button
                  onClick={() => onSetShowServiceSelector(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableServices.map((service) => (
                    <div key={service.service_id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer" onClick={() => onAddService(service)}>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">{service.name}</h4>
                          <span className="text-sm font-medium text-blue-600">${service.unit_price}</span>
                        </div>
                        <p className="text-sm text-gray-600">{service.description}</p>
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                          {service.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Service Modal */}
      {showCustomService && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Add Custom Service</h3>
                <button
                  onClick={onCloseCustomService}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Service Name</label>
                    <input
                      type="text"
                      value={customService.name}
                      onChange={(e) => onUpdateCustomService('name', e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter service name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={customService.description}
                      onChange={(e) => onUpdateCustomService('description', e.target.value)}
                      rows={3}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter service description"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Unit Price</label>
                      <input
                        type="number"
                        value={customService.unit_price}
                        onChange={(e) => onUpdateCustomService('unit_price', parseFloat(e.target.value))}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <select
                        value={customService.category}
                        onChange={(e) => onUpdateCustomService('category', e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="One-time">One-time</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Weekly">Weekly</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={onCloseCustomService}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={onAddCustomService}
                      className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Add Service
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
