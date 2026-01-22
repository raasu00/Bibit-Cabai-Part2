import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Eye, ShoppingCart, Filter } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useLazyLoad } from '../../hooks/useLazyLoad';

interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  itemsPerPage?: number;
  onView?: (item: T) => void;
  onSelect?: (item: T) => void;
  className?: string;
  striped?: boolean;
  hoverable?: boolean;
  selectable?: boolean;
  loading?: boolean;
  emptyMessage?: string;
}

const Table = <T extends Record<string, any>>({
  data,
  columns,
  itemsPerPage = 10,
  onView,
  onSelect,
  className = '',
  striped = true,
  hoverable = true,
  selectable = false,
  loading = false,
  emptyMessage = 'No data available',
}: TableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | string;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useLanguage();
  const { items: visibleItems, ref } = useLazyLoad<T>(data, itemsPerPage);

  const sortedData = useMemo(() => {
    if (!sortConfig) return visibleItems;

    return [...visibleItems].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [visibleItems, sortConfig]);

  const handleSort = (key: keyof T | string) => {
    setSortConfig(current => {
      if (current?.key === key) {
        if (current.direction === 'asc') {
          return { key, direction: 'desc' };
        }
        return null;
      }
      return { key, direction: 'asc' };
    });
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const getColumnStyle = (column: TableColumn<T>) => ({
    width: column.width || 'auto',
    textAlign: column.align || 'left',
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chili-500"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-300">{t('common.loading')}</span>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <Filter className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          {emptyMessage}
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          No data matches your current filters
        </p>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" role="grid">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {selectable && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-chili-600 focus:ring-chili-500 dark:border-gray-600"
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((column, index) => (
                <th
                  key={index}
                  style={getColumnStyle(column)}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.header}</span>
                    {column.sortable && (
                      <button
                        onClick={() => handleSort(column.key)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                        aria-label={`Sort by ${column.header}`}
                      >
                        {sortConfig?.key === column.key ? (
                          sortConfig.direction === 'asc' ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )
                        ) : (
                          <div className="flex flex-col">
                            <ChevronUp className="w-3 h-3 -mb-1" />
                            <ChevronDown className="w-3 h-3" />
                          </div>
                        )}
                      </button>
                    )}
                  </div>
                </th>
              ))}
              {(onView || onSelect) && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('table.actions')}
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
            {sortedData.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className={`
                  ${striped && rowIndex % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : ''}
                  ${hoverable ? 'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150' : ''}
                `}
                ref={rowIndex === sortedData.length - 1 ? ref : null}
              >
                {selectable && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-chili-600 focus:ring-chili-500 dark:border-gray-600"
                      aria-label={`Select row ${rowIndex + 1}`}
                    />
                  </td>
                )}
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    style={getColumnStyle(column)}
                    className="px-6 py-4 text-sm"
                  >
                    {column.render ? (
                      column.render(item)
                    ) : (
                      <span className={column.align === 'right' ? 'text-right block' : ''}>
                        {item[column.key as keyof T]}
                      </span>
                    )}
                  </td>
                ))}
                {(onView || onSelect) && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      {onView && (
                        <button
                          onClick={() => onView(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          aria-label={`View details for ${item.name}`}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                      {onSelect && (
                        <button
                          onClick={() => onSelect(item)}
                          className="p-2 text-chili-600 hover:bg-chili-50 dark:hover:bg-chili-900/20 rounded-lg transition-colors"
                          aria-label={`Select ${item.name}`}
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="bg-gray-50 dark:bg-gray-800 px-6 py-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing <span className="font-medium">{sortedData.length}</span> of{' '}
              <span className="font-medium">{data.length}</span> results
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                Previous
              </button>
              <span className="px-3 py-1 text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
