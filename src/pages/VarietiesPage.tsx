import React, { useState, useMemo } from 'react';
import { FilterSearch } from '../components/sections/FilterSearch';
import Table from '../components/ui/Table';
import { varieties } from '../data/varieties';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const VarietiesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [sortBy, setSortBy] = useState('name');
  const { t } = useLanguage();
  const { theme } = useTheme();

  // Filter and sort varieties
  const filteredVarieties = useMemo(() => {
    let result = [...varieties];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(variety =>
        variety.name.toLowerCase().includes(query) ||
        variety.description.toLowerCase().includes(query) ||
        variety.type.toLowerCase().includes(query)
      );
    }

    // Apply category filters
    Object.entries(activeFilters).forEach(([category, values]) => {
      if (values.length > 0) {
        result = result.filter(variety => {
          if (category === 'type') {
            return values.includes(variety.type);
          }
          if (category === 'spiciness') {
            return values.includes(variety.spiciness);
          }
          if (category === 'harvestTime') {
            if (variety.harvestDays <= 70) return values.includes('fast');
            if (variety.harvestDays <= 80) return values.includes('medium');
            return values.includes('slow');
          }
          return true;
        });
      }
    });

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'yield':
          return b.yieldPerHectare - a.yieldPerHectare;
        case 'harvestTime':
          return a.harvestDays - b.harvestDays;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return result;
  }, [searchQuery, activeFilters, sortBy]);

  // Table columns
  const columns = [
    {
      key: 'name',
      header: t('table.name'),
      sortable: true,
      render: (item: typeof varieties[0]) => (
        <div className="flex items-center">
          <img
            src={item.image}
            alt={item.name}
            className="w-12 h-12 rounded-lg object-cover mr-4"
            loading="lazy"
          />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{item.type}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'spiciness',
      header: 'Spiciness',
      render: (item: typeof varieties[0]) => (
        <div className="flex items-center">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full mx-0.5 ${
                i < (item.spiciness === 'hot' ? 3 : item.spiciness === 'medium' ? 2 : 1)
                  ? 'bg-red-500'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
          <span className="ml-2 text-sm capitalize">{item.spiciness}</span>
        </div>
      ),
    },
    {
      key: 'harvestDays',
      header: t('table.harvestTime'),
      sortable: true,
      render: (item: typeof varieties[0]) => (
        <div>
          <div className="font-medium">{item.harvestDays} days</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {item.harvestDays <= 70 ? 'Fast' : item.harvestDays <= 80 ? 'Medium' : 'Slow'}
          </div>
        </div>
      ),
    },
    {
      key: 'yieldPerHectare',
      header: t('table.yield'),
      sortable: true,
      align: 'right' as const,
      render: (item: typeof varieties[0]) => (
        <div className="text-right">
          <div className="font-medium">{item.yieldPerHectare.toLocaleString()} kg</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">per hectare</div>
        </div>
      ),
    },
    {
      key: 'price',
      header: t('table.price'),
      sortable: true,
      align: 'right' as const,
      render: (item: typeof varieties[0]) => (
        <div className="text-right">
          <div className="font-medium text-green-600 dark:text-green-400">
            Rp {item.price.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">per 100 seeds</div>
        </div>
      ),
    },
  ];

  const handleViewDetails = (item: typeof varieties[0]) => {
    // Navigate to detail page or show modal
    console.log('View details:', item);
  };

  const handleSelectVariety = (item: typeof varieties[0]) => {
    // Add to cart or selection
    console.log('Select variety:', item);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeInUp">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Chili Varieties
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore our collection of premium chili seeds. Filter by type, spiciness, or harvest time to find the perfect variety for your farm.
          </p>
        </div>

        {/* Filter & Search */}
        <div className="mb-8 animate-fadeIn">
          <FilterSearch
            onSearch={setSearchQuery}
            onFilterChange={setActiveFilters}
            onSortChange={setSortBy}
            placeholder="Search chili varieties..."
            className="glass rounded-2xl p-6"
          />
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <div className="text-gray-700 dark:text-gray-300">
            Showing <span className="font-semibold">{filteredVarieties.length}</span> varieties
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Sorted by: {sortBy === 'price' ? 'Price' : sortBy === 'yield' ? 'Yield' : 'Name'}
          </div>
        </div>

        {/* Table */}
        <div className="animate-fadeIn">
          <Table
            data={filteredVarieties}
            columns={columns}
            onView={handleViewDetails}
            onSelect={handleSelectVariety}
            striped
            hoverable
            selectable
            className="shadow-lg rounded-xl overflow-hidden"
          />
        </div>

        {/* No Results */}
        {filteredVarieties.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">🌶️</div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No varieties found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filters
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {varieties.length}
            </div>
            <div className="text-gray-700 dark:text-gray-300">Total Varieties</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              {Math.min(...varieties.map(v => v.harvestDays))} days
            </div>
            <div className="text-gray-700 dark:text-gray-300">Fastest Harvest</div>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
              {Math.max(...varieties.map(v => v.yieldPerHectare)).toLocaleString()} kg
            </div>
            <div className="text-gray-700 dark:text-gray-300">Highest Yield</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VarietiesPage;
