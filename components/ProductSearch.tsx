'use client';

import { useState } from 'react';
import { ProductWithPrices } from '@/lib/types';

interface ProductSearchProps {
  onSearchComplete: (result: ProductWithPrices) => void;
}

export default function ProductSearch({ onSearchComplete }: ProductSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setError('Please enter a product name or reference');
      return;
    }

    setIsSearching(true);
    setError('');

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchQuery: searchQuery.trim() }),
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const result = await response.json();
      onSearchComplete(result);
      setSearchQuery('');
    } catch (err) {
      setError('Failed to search for product. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter product name or model (e.g., Ray-Ban Wayfarer RB2140)"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isSearching}
          />
        </div>
        <button
          type="submit"
          disabled={isSearching}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors whitespace-nowrap"
        >
          {isSearching ? 'Searching...' : 'Search Prices'}
        </button>
      </form>

      {error && (
        <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        <p>
          <strong>Note:</strong> Current version creates search links for each retailer.
          Real-time scraping requires additional setup to avoid being blocked by anti-bot systems.
        </p>
      </div>
    </div>
  );
}
