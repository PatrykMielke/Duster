import { useState } from 'react';
import BaseLayout from './Layout'; // Adjust the import path as necessary

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Add search handling logic here
    console.log('Search query:', searchQuery);
  };

  return (
    <BaseLayout title="Welcome to My App">
      <div className="flex flex-col items-center justify-center h-[80vh]">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Find what you're looking for</h1>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="w-full max-w-xl">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for something..."
              className="w-full rounded-full border border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 flex items-center rounded-full bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </BaseLayout>
  );
}