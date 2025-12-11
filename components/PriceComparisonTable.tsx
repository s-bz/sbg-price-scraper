'use client';

import { ComparisonData } from '@/lib/types';
import { useState, useMemo } from 'react';

interface PriceComparisonTableProps {
  data: ComparisonData;
}

type SortOption = 'brand' | 'price-low' | 'price-high';

export default function PriceComparisonTable({ data }: PriceComparisonTableProps) {
  const [sortBy, setSortBy] = useState<SortOption>('brand');

  // Calculate best price for each product
  const getLowestPrice = (prices: Record<string, any>) => {
    const availablePrices = Object.values(prices)
      .filter((p: any) => p.available && p.price !== null)
      .map((p: any) => p.price);
    return availablePrices.length > 0 ? Math.min(...availablePrices) : null;
  };

  // Sort products
  const sortedProducts = useMemo(() => {
    const products = [...data.products];

    switch (sortBy) {
      case 'brand':
        return products.sort((a, b) => {
          const brandCompare = a.product.brand.localeCompare(b.product.brand);
          if (brandCompare !== 0) return brandCompare;
          return a.product.model.localeCompare(b.product.model);
        });

      case 'price-low':
        return products.sort((a, b) => {
          const priceA = getLowestPrice(a.prices) || Infinity;
          const priceB = getLowestPrice(b.prices) || Infinity;
          return priceA - priceB;
        });

      case 'price-high':
        return products.sort((a, b) => {
          const priceA = getLowestPrice(a.prices) || 0;
          const priceB = getLowestPrice(b.prices) || 0;
          return priceB - priceA;
        });

      default:
        return products;
    }
  }, [data.products, sortBy]);

  const formatPrice = (price: number | null) => {
    if (price === null) return '-';
    return `$${price.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Last updated: {formatDate(data.lastUpdated)}
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm font-medium">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm"
          >
            <option value="brand">Brand</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="sticky left-0 z-10 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-left font-semibold border-r border-gray-200 dark:border-gray-700">
                Product
              </th>
              {data.retailers.map((retailer) => (
                <th
                  key={retailer.id}
                  className="px-4 py-3 text-center font-semibold min-w-[120px]"
                >
                  <a
                    href={retailer.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {retailer.name}
                  </a>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {sortedProducts.map((item) => {
              const lowestPrice = getLowestPrice(item.prices);

              return (
                <tr key={item.product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="sticky left-0 z-10 bg-white dark:bg-gray-900 px-4 py-3 border-r border-gray-200 dark:border-gray-700">
                    <div className="font-medium">{item.product.brand}</div>
                    <div className="text-gray-600 dark:text-gray-400 text-xs">
                      {item.product.model}
                    </div>
                  </td>

                  {data.retailers.map((retailer) => {
                    const priceData = item.prices[retailer.id];
                    const isLowestPrice = priceData?.available &&
                                        priceData.price === lowestPrice &&
                                        lowestPrice !== null;

                    return (
                      <td
                        key={retailer.id}
                        className={`px-4 py-3 text-center ${
                          isLowestPrice
                            ? 'bg-green-50 dark:bg-green-900/20 font-semibold'
                            : ''
                        }`}
                      >
                        {priceData?.available ? (
                          <div className="flex flex-col gap-1">
                            <div className={isLowestPrice ? 'text-green-700 dark:text-green-400' : ''}>
                              {formatPrice(priceData.price)}
                            </div>
                            {priceData.productUrl ? (
                              <a
                                href={priceData.productUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
                              >
                                View →
                              </a>
                            ) : (
                              <a
                                href={retailer.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-gray-500 dark:text-gray-400 hover:underline"
                              >
                                Visit site
                              </a>
                            )}
                          </div>
                        ) : (
                          <div className="text-gray-400 dark:text-gray-600 text-xs">
                            {priceData?.notes || 'Not available'}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer note */}
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        <p>Prices shown are sample data and may not reflect current retail prices. Click product links to verify current pricing and availability.</p>
      </div>
    </div>
  );
}
