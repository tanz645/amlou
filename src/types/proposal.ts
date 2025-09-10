export interface Service {
  service_id: string;
  name: string;
  quantity: number;
  unit_price: number;
  description: string;
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
  services: Service[];
  total_cost: number;
  deposit_amount: number;
  timeline_days: number;
  created_date: string;
  sent_date: string | null;
  status: string;
  valid_until: string;
  notes: string;
  terms_and_conditions: string[];
}

export interface LeadData {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
}
