export type EmploymentStatus = "Active" | "On leave" | "Terminated";
export type PayBasis = "Salary" | "Hourly";
export type PayFrequency = "Bi-weekly" | "Semi-monthly" | "Monthly";

export type HREmployee = {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  jobTitle: string;
  manager: string;
  startDate: string;
  status: EmploymentStatus;
  payBasis: PayBasis;
  payFrequency: PayFrequency;
  /** Annual cash compensation (salary, or hourly × 2080 for FT equivalent). */
  annualCompensation: number;
  hourlyRate?: number;
};

export const HOURS_PER_YEAR_FT = 2080;

export function estimatedGrossPerPay(emp: HREmployee): number {
  switch (emp.payFrequency) {
    case "Bi-weekly":
      return emp.annualCompensation / 26;
    case "Semi-monthly":
      return emp.annualCompensation / 24;
    case "Monthly":
      return emp.annualCompensation / 12;
    default:
      return emp.annualCompensation / 26;
  }
}

export const hrEmployees: HREmployee[] = [
  {
    id: "e1",
    employeeId: "EMP-001",
    name: "Alex Rivera",
    email: "alex.rivera@company.com",
    phone: "+1 (555) 201-4401",
    department: "Client Services",
    jobTitle: "Account Director",
    manager: "Jordan Lee",
    startDate: "2021-04-12",
    status: "Active",
    payBasis: "Salary",
    payFrequency: "Bi-weekly",
    annualCompensation: 118_000,
  },
  {
    id: "e2",
    employeeId: "EMP-002",
    name: "Jordan Lee",
    email: "jordan.lee@company.com",
    phone: "+1 (555) 201-4402",
    department: "Sales",
    jobTitle: "Head of Sales",
    manager: "—",
    startDate: "2019-08-01",
    status: "Active",
    payBasis: "Salary",
    payFrequency: "Bi-weekly",
    annualCompensation: 168_000,
  },
  {
    id: "e3",
    employeeId: "EMP-003",
    name: "Sam Okonkwo",
    email: "sam.okonkwo@company.com",
    phone: "+1 (555) 201-4403",
    department: "Operations",
    jobTitle: "Operations Lead",
    manager: "Jordan Lee",
    startDate: "2022-01-17",
    status: "Active",
    payBasis: "Salary",
    payFrequency: "Bi-weekly",
    annualCompensation: 96_000,
  },
  {
    id: "e4",
    employeeId: "EMP-004",
    name: "Priya Nair",
    email: "priya.nair@company.com",
    phone: "+1 (555) 201-4404",
    department: "Marketing",
    jobTitle: "Marketing Manager",
    manager: "Jordan Lee",
    startDate: "2020-11-09",
    status: "On leave",
    payBasis: "Salary",
    payFrequency: "Semi-monthly",
    annualCompensation: 104_000,
  },
  {
    id: "e5",
    employeeId: "EMP-005",
    name: "Chris Park",
    email: "chris.park@company.com",
    phone: "+1 (555) 201-4405",
    department: "Finance",
    jobTitle: "Payroll Specialist",
    manager: "Jordan Lee",
    startDate: "2024-03-04",
    status: "Active",
    payBasis: "Hourly",
    payFrequency: "Bi-weekly",
    hourlyRate: 38,
    annualCompensation: 38 * HOURS_PER_YEAR_FT,
  },
];
