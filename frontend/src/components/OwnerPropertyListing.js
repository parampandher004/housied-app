import React, { useState } from "react";
import { supabase } from "../../backend/supabase";
// ...existing code...

const OwnerPropertyListing = () => {
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
          <li key={listing.id}>{listing.property_name}</li>
        ))}
      </ul>
      {/* ...existing code... */}
    </div>
  );
};

export default OwnerPropertyListing;
