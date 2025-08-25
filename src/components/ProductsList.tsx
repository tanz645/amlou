import Link from 'next/link';
import Image from 'next/image';

interface Service {
  id: string;
  name: string;
  serviceShortName: string;
  serviceCategory: string;
  serviceTasks: string[];
  shortDescription: string;
  serviceMaster: string;
  description: string;
  image: string;
  features: string[];
  pricing: {
    unit_price: number;
    max_discount: number;
  };
  minimum_time_required: number;
  minimum_order_unit: number;
  service_type: string;
}

interface ProductsListProps {
  services: Service[];
  onProductClick?: (id: string) => void;
}

export default function ProductsList({ services, onProductClick }: ProductsListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {services.map((service) => {
        const card = (
          <div
            className="block bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden group cursor-pointer border border-gray-200"
            onClick={() => onProductClick?.(service.id)}
          >
            {service.image && (
              <div className="relative">
              <Image
                src={service.image}
                alt={service.name}
                width={400}
                height={192}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
              />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    service.service_type === 'repeatable' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {service.service_type}
                  </span>
                </div>
              </div>
            )}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">{service.name}</h2>
                  <p className="text-xs text-gray-500 mb-2">{service.serviceShortName}</p>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{service.shortDescription}</p>
              
              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Service Master:</span>
                  <span className="font-medium text-gray-900">{service.serviceMaster}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Category:</span>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                    {service.serviceCategory.replace('_', ' ')}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Production Time:</span>
                  <span className="font-medium text-gray-900">{service.minimum_time_required} days</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Action Items:</span>
                  <span className="font-medium text-gray-900">{service.serviceTasks.length} tasks</span>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold text-green-600">
                  ${service.pricing.unit_price.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      Max discount: ${service.pricing.max_discount}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Min. Order</div>
                    <div className="font-medium text-gray-900">{service.minimum_order_unit}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        return onProductClick ? (
          <div key={service.id}>{card}</div>
        ) : (
                          <Link key={service.id} href={`/business/services/${service.id}`}>{card}</Link>
        );
      })}
    </div>
  );
} 