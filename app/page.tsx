'use client';

import { useState } from 'react';
import PriceComparisonTable from '@/components/PriceComparisonTable';
import ProductSearch from '@/components/ProductSearch';
import comparisonData from '@/data/sunglasses-prices.json';
import { ComparisonData, ProductWithPrices } from '@/lib/types';

export default function Home() {
  const initialData = comparisonData as ComparisonData;
  const [searchResults, setSearchResults] = useState<ProductWithPrices[]>([]);

  const handleSearchComplete = (result: ProductWithPrices) => {
    // Add the search result to the beginning of the list
    setSearchResults(prev => [result, ...prev]);
  };

  const handleClearResults = () => {
    setSearchResults([]);
  };

  // Combine search results with initial data
  const displayData: ComparisonData = {
    ...initialData,
    products: [...searchResults, ...initialData.products],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Sunglasses Price Comparison
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Search and compare prices across Australia&apos;s top 10 eyewear retailers
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductSearch onSearchComplete={handleSearchComplete} />

        {searchResults.length > 0 && (
          <div className="mb-6 flex justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing {searchResults.length} search result{searchResults.length !== 1 ? 's' : ''}
            </p>
            <button
              onClick={handleClearResults}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear search results
            </button>
          </div>
        )}

        <PriceComparisonTable data={displayData} />
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p className="mb-2">
              This tool compares sunglasses prices across multiple Australian retailers to help you find the best deals.
            </p>
            <p>
              Prices and availability are updated regularly. Always verify current pricing on the retailer&apos;s website before purchasing.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
