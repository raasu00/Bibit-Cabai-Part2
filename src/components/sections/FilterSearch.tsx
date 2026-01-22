import React, { useState, useEffect } from 'react';
import { Search, Filter, X, ChevronDown, Star, Thermometer } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface FilterOption {
  id: string;
  label: string;
  value: string;
  count?: number;
}

interface FilterSearchProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: Record<string, string[]>) => void;
  onSortChange: (sortBy: string) => void;
  className?: string;
  placeholder?: string;
  filters?: {
    type: FilterOption[];
    spiciness: FilterOption[];
    harvestTime: FilterOption[];
  };
  sortOptions?: FilterOption[];
  debounceTime?: number;
}

const FilterSearch: React.FC<FilterSearchProps> = ({
  onSearch,
  onFilterChange,
  onSortChange,
  className = '',
  placeholder,
  filters,
  sortOptions,
  debounceTime = 300,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [sortBy, setSortBy] = useState('name');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { t } = useLanguage();

  const defaultFilters = {
    type: [
      { id: 'all', label: t('filter.all'), value: 'all' },
      { id: 'hybrid', label: t('filter.hybrid'), value: 'hybrid' },
      { id: 'local', label: t('filter.local'), value: 'local' },
    ],
    spiciness: [
      { id: 'all', label: t('filter.all'), value: 'all' },
      { id: 'hot', label: t('filter.hot'), value: 'hot' },
      { id: 'medium', label: t('filter.medium'), value: 'medium' },
      { id: 'mild', label: t('filter.mild'), value: 'mild' },
    ],
    harvestTime: [
      { id: 'fast', label: 'Fast (60-70 days)', value: 'fast' },
      { id: 'medium', label: 'Medium (70-80 days)', value: 'medium' },
      { id: 'slow', label: 'Slow (80-90 days)', value: 'slow' },
    ],
  };

  const defaultSortOptions = [
    { id: 'name', label: t('filter.sort.name'), value: 'name' },
    { id: 'price', label: t('filter.sort.price'), value: 'price' },
    { id: 'yield', label: t('filter.sort.yield'), value: 'yield' },
  ];

  const displayFilters = filters || defaultFilters;
  const displaySortOptions = sortOptions || defaultSortOptions;

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchQuery);
    }, debounceTime);

    return () => clearTimeout(timer);
  }, [searchQuery, debounceTime, onSearch]);

  // Update filters
  useEffect(() => {
    onFilterChange(activeFilters);
  }, [activeFilters, onFilterChange]);

  const handleFilterToggle = (category: string, value: string) => {
    setActiveFilters(prev => {
      const currentValues = prev[category] || [];
      
      if (value === 'all') {
        const newFilters = { ...prev };
        delete newFilters[category];
        return newFilters;
      }
      
      if (currentValues.includes(value)) {
        const newValues = currentValues.filter(v => v !== value);
        if (newValues.length === 0) {
          const newFilters = { ...prev };
          delete newFilters[category];
          return newFilters;
        }
        return { ...prev, [category]: newValues };
      }
      
      return { ...prev, [category]: [...currentValues, value] };
    });
  };

  const handleClearFilters = () => {
    setActiveFilters({});
    setSearchQuery('');
    setSortBy('name');
    onSortChange('name');
  };

  const getActiveFilterCount = () => {
    let count = 0;
    Object.values(activeFilters).forEach(values => {
      count += values.length;
    });
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder || t('common.search') + ' varietas cabai...'}
          className="block w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-chili-500 focus:border-transparent transition-all"
          aria-label={t('a11y.search')}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            aria-label="Clear search"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Filter Toggle Button */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          aria-expanded={isFilterOpen}
          aria-label={`${isFilterOpen ? 'Hide' : 'Show'} filters`}
        >
          <Filter className="w-5 h-5 mr-2" />
          {t('common.filter')}
          {activeFilterCount > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-chili-500 text-white rounded-full">
              {activeFilterCount}
            </span>
          )}
          <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              onSortChange(e.target.value);
            }}
            className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-10 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-chili-500 focus:border-transparent"
            aria-label={t('filter.sortBy')}
          >
            {displaySortOptions.map(option => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Filter Options
            </h3>
            {activeFilterCount > 0 && (
              <button
                onClick={handleClearFilters}
                className="text-sm text-chili-600 hover:text-chili-700 dark:text-chili-400 dark:hover:text-chili-300 flex items-center"
              >
                <X className="w-4 h-4 mr-1" />
                {t('common.clear')} ({activeFilterCount})
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Type Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Jenis Bibit
              </h4>
              <div className="space-y-2">
                {displayFilters.type.map(option => (
                  <button
                    key={option.id}
                    onClick={() => handleFilterToggle('type', option.value)}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded text-left transition-colors ${
                      activeFilters.type?.includes(option.value)
                        ? 'bg-chili-100 dark:bg-chili-900/30 text-chili-700 dark:text-chili-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span>{option.label}</span>
                    {option.count !== undefined && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {option.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Spiciness Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <Thermometer className="w-4 h-4 mr-2" />
                Tingkat Kepedasan
              </h4>
              <div className="space-y-2">
                {displayFilters.spiciness.map(option => (
                  <button
                    key={option.id}
                    onClick={() => handleFilterToggle('spiciness', option.value)}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded text-left transition-colors ${
                      activeFilters.spiciness?.includes(option.value)
                        ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span>{option.label}</span>
                    <div className="flex">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            option.value === 'hot' || 
                            (option.value === 'medium' && i < 2) ||
                            (option.value === 'mild' && i < 1)
                              ? 'fill-current text-orange-500'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Harvest Time Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Waktu Panen
              </h4>
              <div className="space-y-2">
                {displayFilters.harvestTime.map(option => (
                  <button
                    key={option.id}
                    onClick={() => handleFilterToggle('harvestTime', option.value)}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded text-left transition-colors ${
                      activeFilters.harvestTime?.includes(option.value)
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span>{option.label}</span>
                    <div className="w-8 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          option.value === 'fast'
                            ? 'w-full bg-green-500'
                            : option.value === 'medium'
                            ? 'w-2/3 bg-yellow-500'
                            : 'w-1/3 bg-red-500'
                        }`}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {activeFilterCount > 0 && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Active Filters:
              </h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(activeFilters).map(([category, values]) =>
                  values.map(value => (
                    <span
                      key={`${category}-${value}`}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-chili-100 dark:bg-chili-900/30 text-chili-700 dark:text-chili-300"
                    >
                      {value}
                      <button
                        onClick={() => handleFilterToggle(category, value)}
                        className="ml-2 hover:text-chili-900 dark:hover:text-chili-100"
                        aria-label={`Remove ${value} filter`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterSearch;
