'use client';

import { useState, useEffect } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { TrashIcon, FunnelIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: unknown, item: T) => React.ReactNode;
}

// Refactor dynamic access and ensure ReactNode compatibility
interface TableBuilderProps<T extends { id: string | number; [key: string]: unknown }> {
  columns: Column<T>[];
  data: T[];
  itemsPerPage?: number;
  onRowClick?: (item: T) => void;
  searchable?: boolean;
  selectable?: boolean;
  onSelectionChange?: (selectedItems: T[]) => void;
  onExport?: () => void;
}

export default function TableBuilder<T extends { id: string | number; [key: string]: unknown }>({
  columns,
  data,
  itemsPerPage = 10,
  onRowClick,
  searchable = true,
  selectable = false,
  onSelectionChange,
  onExport,
}: TableBuilderProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  const [filters, setFilters] = useState<Record<string, string | number>>({});
  const [showFilters, setShowFilters] = useState(false);

  // Add state to track the currently open filter dropdown
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  // Filter data based on search term and filters
  const filteredData = data.filter((item) => {
    const matchesSearch = Object.values(item).some((value) =>
      String(value || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const matchesFilters = Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      // Ensure value is converted to a string before calling toLowerCase
      return String(item[key] || '').toLowerCase().includes(String(value).toLowerCase());
    });

    return matchesSearch && matchesFilters;
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;

    const { key, direction } = sortConfig;
    const aValue = a[key] ?? '';
    const bValue = b[key] ?? '';

    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  // Handle sort
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Handle selection
  const handleSelectAll = (checked: boolean) => {
    const newSelection = checked ? paginatedData : [];
    setSelectedItems(newSelection);
    onSelectionChange?.(newSelection);
  };

  const handleSelectItem = (item: T, checked: boolean) => {
    setSelectedItems((prev) =>
      checked ? [...prev, item] : prev.filter((i) => i.id !== item.id)
    );
    onSelectionChange?.(selectedItems);
  };

  // Handle filter change
  const handleFilterChange = (key: keyof T, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  // Ensure ReactNode compatibility in render logic
  const renderCellContent = (value: unknown): React.ReactNode => {
    if (typeof value === 'string' || typeof value === 'number') {
      return value;
    }
    return null; // Fallback for unsupported types
  };

  // Update the renderFilterDropdown function to handle single tag selection and reset functionality
  const renderFilterDropdown = (columnKey: string) => {
    const uniqueValues = Array.from(new Set(data.map((item) => {
      const value = item[columnKey];
      if (typeof value === 'string' || typeof value === 'number') {
        return String(value);
      }
      return '';
    }))).filter(Boolean);

    return (
      <div className="relative">
        <button
          className="filter-icon-button text-gray-500 hover:text-gray-700"
          onClick={(e) => {
            e.stopPropagation();
            setOpenFilter((prev) => (prev === columnKey ? null : columnKey));
          }}
        >
          <FunnelIcon className="w-4 h-4" />
        </button>
        {openFilter === columnKey && (
          <div
            className="absolute z-10 bg-white border rounded shadow-md mt-2 w-48"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500"
              onClick={() => {
                handleFilterChange(columnKey as keyof T, '');
                setOpenFilter(null);
              }}
            >
              Reset Filter
            </button>
            {uniqueValues.map((value, index) => (
              <button
                key={index}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                  filters[columnKey] === value ? 'bg-gray-200' : ''
                }`}
                onClick={() => {
                  handleFilterChange(columnKey as keyof T, value);
                  setOpenFilter(null);
                }}
              >
                {value}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Ensure the useEffect properly handles outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.relative')) {
        setOpenFilter(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="table-builder">
      <div className="table-controls flex items-center justify-between mb-4">
        <div className="left-controls flex items-center gap-2">
          {searchable && (
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          )}
        </div>
        <div className="right-controls flex items-center gap-2">
          {onExport && (
            <button
              className="export-button"
              onClick={onExport}
            >
              <ArrowDownTrayIcon className="w-5 h-5" />
            </button>
          )}
          {selectable && selectedItems.length > 0 && (
            <button
              className="trash-icon-button text-red-500 hover:text-red-700"
              onClick={() => setSelectedItems([])}
            >
              <TrashIcon className="w-6 h-6" />
            </button>
          )}
          <button
            className="filter-button"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FunnelIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns
            .filter((col) => col.filterable)
            .map((column) => (
              <div key={column.key}>
                <input
                  type="text"
                  placeholder={`Filter ${column.label}...`}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  value={filters[column.key] || ''}
                  onChange={(e) => handleFilterChange(column.key, e.target.value)}
                />
              </div>
            ))}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              {selectable && (
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === paginatedData.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600  focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {column.sortable && (
                      <button
                        onClick={() => handleSort(String(column.key))}
                        className="focus:outline-none"
                      >
                        {sortConfig?.key === String(column.key) ? (
                          sortConfig.direction === 'asc' ? (
                            <ChevronUpIcon className="w-4 h-4" />
                          ) : (
                            <ChevronDownIcon className="w-4 h-4" />
                          )
                        ) : (
                          <ChevronUpIcon className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    )}
                    {column.filterable && renderFilterDropdown(String(column.key))}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr
                key={item.id}
                onClick={() => onRowClick?.(item)}
                className="cursor-pointer hover:bg-gray-100"
              >
                {selectable && (
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    <input
                      type="checkbox"
                      checked={selectedItems.some((i) => i.id === item.id)}
                      onChange={(e) => handleSelectItem(item, e.target.checked)}
                      className="rounded border-gray-300 text-blue-600  focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td key={column.key as string} className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    {column.render ? column.render(item[column.key], item) : renderCellContent(item[column.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of{' '}
              {sortedData.length} results
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}