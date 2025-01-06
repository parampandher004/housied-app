import React, { useState, useEffect } from "react";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import axios from "axios";
import Cookies from "js-cookie";
import { useGlobalState } from "../../hooks/useGlobalState";

const OwnerListingPage = () => {
  const { state } = useGlobalState();
  const { auth } = state;
  const { userDetails } = auth;
  const token = Cookies.get("authToken");
  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    address: "",
    zipCode: "",
    rent: "",
  });
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      if (token) {
        try {
          const response = await axios.get(`${API_URL}/owner/properties`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            setProperties(response.data);
            setFilteredProperties(response.data);
          }
        } catch (error) {
          console.error("Error fetching properties:", error);
        }
      }
    };
    fetchProperties();
  }, [token, API_URL]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });

    const filtered = properties.filter((property) => {
      return (
        (name === "address"
          ? property.property_address.toLowerCase().includes(value.toLowerCase())
          : true) &&
        (name === "zipCode"
          ? property.property_zip_code.toString().includes(value)
          : true) &&
        (name === "rent"
          ? property.property_rent.toString().includes(value)
          : true)
      );
    });

    setFilteredProperties(filtered);
  };

  const handleDelete = async (propertyId) => {
    try {
      const response = await axios.delete(`${API_URL}/owner/properties/${propertyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setProperties(properties.filter((property) => property.property_id !== propertyId));
        setFilteredProperties(filteredProperties.filter((property) => property.property_id !== propertyId));
      }
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1>Owner Listings</h1>
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h4 className="text-lg font-semibold mb-4">Filters</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="address"
            placeholder="Filter by Address"
            value={filters.address}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="zipCode"
            placeholder="Filter by Zip Code"
            value={filters.zipCode}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="rent"
            placeholder="Filter by Rent"
            value={filters.rent}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          />
        </div>
      </div>
      {/* Space for Property Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-6">
        {filteredProperties.map((property) => (
          <div key={property.property_id}>
            <PropertyCard property={property} />
            <button
              onClick={() => handleDelete(property.property_id)}
              className="mt-2 p-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnerListingPage;
