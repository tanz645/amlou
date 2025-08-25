import { ReactNode } from "react";

export type Column<T> = {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  editable?: boolean;
  filterable?: boolean;
  options?: { id: string; name: string }[];
  render?: (value: unknown, item: T) => ReactNode;
}; 