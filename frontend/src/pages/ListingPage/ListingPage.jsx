import React, { useState } from "react";
import PropertyCard from "../../components/PropertyCard/PropertyCard";

const ListingPage = () => {
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  const toggleFilterModal = () => {
    setFilterModalOpen(!filterModalOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search properties..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Sort and Filter */}
      <div className="flex justify-between items-center mb-6">
        {/* Sort By Dropdown */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Sort By</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="newest">Newest Listings</option>
          <option value="oldest">Oldest Listings</option>
        </select>

        {/* Filter Modal Button */}
        <button
          onClick={toggleFilterModal}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
        >
          Filter
        </button>
      </div>

      {/* Filter Modal */}
      {filterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 sm:w-1/2">
            <h2 className="text-lg font-semibold mb-4">Filter Options</h2>
            {/* Add your filter options here */}
            <button
              onClick={toggleFilterModal}
              className="px-4 py-2 mt-4 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Space for Property Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-6">
        <div className="span-cols-1">
          <PropertyCard />
        </div>
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
      </div>
    </div>
  );
};

export default ListingPage;
