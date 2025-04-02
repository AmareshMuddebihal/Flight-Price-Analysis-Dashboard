import React from 'react';
import { FilterState } from '../types';

interface FilterSectionProps {
  filters: FilterState;
  options: Record<keyof FilterState, Set<string>>;
  onFilterChange: (key: keyof FilterState, value: string) => void;
}

export function FilterSection({ filters, options, onFilterChange }: FilterSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-white rounded-lg shadow-sm">
      {(Object.keys(filters) as Array<keyof FilterState>).map((key) => (
        <div key={key} className="flex flex-col">
          <label htmlFor={key} className="text-sm font-medium text-gray-700 mb-1 capitalize">
            {key.replace('_', ' ')}:
          </label>
          <select
            id={key}
            value={filters[key]}
            onChange={(e) => onFilterChange(key, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {Array.from(options[key]).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}