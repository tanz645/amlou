export type DeliveryType = 'single' | 'timebound';
export type ServiceType = 'single' | 'bundle';

export interface ServiceDeliverable {
  id: string;
  name: string;
  estimated_time: number; // in hours
  price: number;
  quantity: number;
  subtotal: number; // price * quantity
}

export interface SingleService {
  id: string;
  name: string;
  description: string;
  image?: string; // URL or base64 string for service image
  price: number;
  deliverables: ServiceDeliverable[]; // deliverables within the service
  delivery_type: DeliveryType;
  delivery_duration?: number; // in days, only for timebound services (optional)
  delivery_unit?: string; // 'days', 'weeks', 'months' (optional)
  category: string;
  tags: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BundleService {
  id: string;
  name: string;
  description: string;
  image?: string; // URL or base64 string for bundle image
  services: BundleServiceItem[];
  base_price: number; // sum of all service prices
  discount_percentage: number;
  final_price: number; // base_price - discount
  delivery_type: DeliveryType;
  delivery_duration?: number; // in days, only for timebound services (optional)
  delivery_unit?: string; // 'days', 'weeks', 'months' (optional)
  category: string;
  tags: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BundleServiceItem {
  service_id: string;
  service_name: string;
  service_price: number;
  quantity: number;
  subtotal: number;
}

export type Service = SingleService | BundleService;

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface ServiceFormData {
  name: string;
  description: string;
  image?: string; // URL or base64 string for service image
  price: number;
  deliverables: ServiceDeliverable[];
  delivery_type: DeliveryType;
  delivery_duration?: number;
  delivery_unit?: string;
  category: string;
  tags: string[];
  is_active: boolean;
}

export interface BundleFormData {
  name: string;
  description: string;
  image?: string; // URL or base64 string for bundle image
  services: BundleServiceItem[];
  discount_percentage: number;
  delivery_type: DeliveryType;
  delivery_duration?: number;
  delivery_unit?: string;
  category: string;
  tags: string[];
  is_active: boolean;
}
