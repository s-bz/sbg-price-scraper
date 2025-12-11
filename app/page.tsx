import PriceComparisonTable from '@/components/PriceComparisonTable';
import comparisonData from '@/data/sunglasses-prices.json';
import { ComparisonData } from '@/lib/types';

export default function Home() {
  const data = comparisonData as ComparisonData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Sunglasses Price Comparison
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Compare prices across Australia&apos;s top 10 eyewear retailers
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PriceComparisonTable data={data} />
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
