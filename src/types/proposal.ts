export interface Service {
  service_id: string;
  name: string;
  quantity: number;
  unit_price: number;
  description: string;
  category?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  points: string[];
}

export interface StrategicPillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  activities: string[];
  relatedChallenges: string[];
}

export interface Phase {
  id: string;
  title: string;
  duration: string;
  goals: string[];
  actions: string[];
}

export interface Deliverable {
  category: string;
  description: string;
  frequency: string;
  quantity?: number;
}

export interface ProposalData {
  proposal_id: string;
  lead_id: number | null;
  client_id: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  project_title: string;
  description: string;
  
  // Enhanced proposal structure
  challenges: Challenge[];
  strategic_pillars: StrategicPillar[];
  phases: Phase[];
  deliverables: Deliverable[];
  
  // Services and pricing
  services: Service[];
  total_cost: number;
  deposit_amount: number;
  discount_percentage?: number;
  final_cost: number;
  
  // Timeline
  timeline_days: number;
  created_date: string;
  sent_date: string | null;
  status: string;
  valid_until: string;
  
  // Additional information
  notes: string;
  terms_and_conditions: string[];
  
  // Team and quality assurance
  team_info?: {
    technical_writers: boolean;
    seo_specialists: boolean;
    dedicated_consultant: boolean;
  };
  
  // Payment terms
  payment_terms: {
    advance_percentage: number;
    payment_schedule: string;
    refund_policy: string;
  };
}

export interface LeadData {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
}
