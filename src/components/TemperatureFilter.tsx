import React from 'react';
import { TemperatureFilterType } from '../types/weather';

interface TemperatureFilterProps {
  currentFilter: TemperatureFilter;
  onFilterChange: (filter: TemperatureFilterType) => void;
}

export function TemperatureFilter({ currentFilter, onFilterChange }: TemperatureFilterProps) {
  const filters: Array<{ value: TemperatureFilter; label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'cold', label: 'Cold (< 10°C)' },
    { value: 'moderate', label: 'Moderate (10-25°C)' },
    { value: 'hot', label: 'Hot (> 25°C)' },
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {filters.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onFilterChange(value)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentFilter === value
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}