import React, { useState, useEffect } from "react";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import SearchButton from "../../components/SearchButton/SearchButton";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

const ListingPage = () => {
  const token = Cookies.get("authToken");
  const API_URL = import.meta.env.BACKEND_URL || "http://localhost:5000";
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    address: "",
    zipCode: "",
    rent: "",
  });
  const [filteredProperties, setFilteredProperties] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchProperties = async () => {
      if (token) {
        try {
          const response = await axios.get(`${API_URL}/property`, {
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

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get("search") || "";

    const filtered = properties.filter((property) => {
      const fullDetails = `${property.property_address} ${property.property_zip_code} ${property.rent} ${property.house_owner.house_owner_firstName} ${property.house_owner.house_owner_middleName} ${property.house_owner.house_owner_lastName} ${property.property_features}`;
      return fullDetails.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilteredProperties(filtered);
  }, [location.search, properties]);

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });

    const filtered = properties.filter((property) => {
      const fullAddress = `${property.property_address} ${property.property_zip_code}`;
      return (
        (name === "address"
          ? fullAddress.toLowerCase().includes(value.toLowerCase())
          : true) &&
        (name === "zipCode"
          ? property.property_zip_code.toString().includes(value)
          : true) &&
        (name === "rent" ? property.rent.toString().includes(value) : true)
      );
    });

    setFilteredProperties(filtered);
  };

  const handleClear = () => {
    setFilters({
      address: "",
      zipCode: "",
      rent: "",
    });
    setFilteredProperties(properties);
  };

  return (
    <div className="min-h-screen bg-white-background dark:bg-black-background text-black-foreground dark:text-white-foreground p-4">
      {/* Filters */}
      <div className="bg-white-fill dark:bg-black-fill p-4 rounded-lg shadow mb-6">
        <SearchButton onClear={handleClear} />
        <h4 className="text-lg font-semibold mb-4">Filters</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="address"
            placeholder="Filter by Address"
            value={filters.address}
            onChange={(e) => handleFilterChange("address", e.target.value)}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white-background dark:bg-black-background text-black-foreground dark:text-white-foreground"
          />
          <input
            type="text"
            name="zipCode"
            placeholder="Filter by Zip Code"
            value={filters.zipCode}
            onChange={(e) => handleFilterChange("zipCode", e.target.value)}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white-background dark:bg-black-background text-black-foreground dark:text-white-foreground"
          />
          <input
            type="text"
            name="rent"
            placeholder="Filter by Rent"
            value={filters.rent}
            onChange={(e) => handleFilterChange("rent", e.target.value)}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white-background dark:bg-black-background text-black-foreground dark:text-white-foreground"
          />
        </div>
      </div>
      {/* Space for Property Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-6">
        {filteredProperties.map((property) => (
          <PropertyCard
            key={property.property_id}
            propertyId={property.property_id}
            zipCode={property.property_zip_code}
            address={property.property_address}
            houseOwnerUserId={property.house_owner_userID}
            features={property.property_features}
            rent={property.rent}
            isVacant={property.is_vacant}
            houseOwner={property.house_owner}
          />
        ))}
      </div>
    </div>
  );
};

export default ListingPage;
