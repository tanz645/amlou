export type Planning = {
  id: string;
  title: string;
  description: string;
  operation_master: string;
  planners: string[];
  tasks: string[];
  status: string;
  type: string;
  start_date: string;
  end_date: string;
  cost: number;
  project_id: string;
}; 