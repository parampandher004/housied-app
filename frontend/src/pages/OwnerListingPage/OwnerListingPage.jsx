import React, { useState, useEffect } from "react";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import axiosInstance from "../../axiosConfig"; // Import the configured Axios instance
import Cookies from "js-cookie";
import { useGlobalState } from "../../hooks/useGlobalState";

const OwnerListingPage = () => {
  const { state } = useGlobalState();
  const { auth } = state;
  const { userDetails } = auth;
  const token = Cookies.get("authToken");
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    address: "",
    zipCode: "",
    rent: "",
  });
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({
    address: "",
    zipCode: "",
    rent: "",
  });

  useEffect(() => {
    const fetchProperties = async () => {
      if (token) {
        try {
          const response = await axiosInstance.get("/owner/properties", {
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
  }, [token]);

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
      const response = await axiosInstance.delete(`/owner/properties/${propertyId}`, {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProperty({ ...newProperty, [name]: value });
  };

  const handleAddProperty = async () => {
    try {
      const response = await axiosInstance.post("/owner/properties", newProperty, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        setProperties([...properties, response.data]);
        setFilteredProperties([...filteredProperties, response.data]);
        setNewProperty({ address: "", zipCode: "", rent: "" });
      }
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  const handleUpdateProperty = async (propertyId, updatedProperty) => {
    try {
      const response = await axiosInstance.put(`/owner/properties/${propertyId}`, updatedProperty, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const updatedProperties = properties.map((property) =>
          property.property_id === propertyId ? response.data : property
        );
        setProperties(updatedProperties);
        setFilteredProperties(updatedProperties);
      }
    } catch (error) {
      console.error("Error updating property:", error);
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
      {/* Add New Property */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h4 className="text-lg font-semibold mb-4">Add New Property</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={newProperty.address}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            value={newProperty.zipCode}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="rent"
            placeholder="Rent"
            value={newProperty.rent}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <button
            onClick={handleAddProperty}
            className="mt-2 p-2 bg-green-500 text-white rounded"
          >
            Add Property
          </button>
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
            <button
              onClick={() => handleUpdateProperty(property.property_id, property)}
              className="mt-2 p-2 bg-blue-500 text-white rounded"
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnerListingPage;
