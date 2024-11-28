import React from "react";

const ListingItem = ({ listing }) => {
  return (
    <li className="flex flex-col bg-white p-4 m-2 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
      <img
        src={listing.image}
        alt={listing.title}
        className="w-full h-40 object-cover rounded-lg"
      />
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-900">{listing.title}</h3>
        <p className="text-lg text-gray-700 mt-2">{listing.price}</p>
        <p className="text-sm text-gray-500 mt-1">{listing.location}</p>
      </div>
      <button className="mt-4 bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition-all duration-200">
        View Details
      </button>
    </li>
  );
};

export default ListingItem;
