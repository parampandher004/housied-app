import React, { useState } from "react";
import { supabase } from "../../backend/supabase";
// ...existing code...

const AdminPropertyListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [listings, setListings] = useState([]);

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .ilike("property_name", `%${searchTerm}%`);
    if (error) {
      console.error(error);
    } else {
      setListings(data);
    }
  };

  const handleDelete = async (propertyId) => {
    const { data, error } = await supabase
      .from("properties")
      .delete()
      .eq("id", propertyId);
    if (error) {
      console.error(error);
    } else {
      setListings(listings.filter((listing) => listing.id !== propertyId));
    }
  };

  return (
    <div>
      {/* ...existing code... */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search properties"
      />
      <button onClick={handleSearch}>Search</button>
      {/* ...existing code... */}
      <ul>
        {listings.map((listing) => (
          <li key={listing.id}>
            {listing.property_name}
            <button onClick={() => handleDelete(listing.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {/* ...existing code... */}
    </div>
  );
};

export default AdminPropertyListing;
