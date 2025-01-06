import supabase from '../config/supabaseClient.js';

export const addProperty = async (req, res) => {
  const { property_zip_code, property_address, house_owner_userID, property_features, property_rent, description } = req.body;

  console.log("Adding property:", req.body);

  const { data: property, error: propertyError } = await supabase
    .from('property')
    .insert([{ property_zip_code, property_address, house_owner_userID }])
    .single();

  if (propertyError) {
    console.error("Error adding property:", propertyError);
    return res.status(400).send(propertyError.message);
  }

  console.log("Property added:", property);

  const { data: propertyDetails, error: propertyDetailsError } = await supabase
    .from('property_details')
    .insert([{ property_id: property.property_id, property_features, property_rent, description }])
    .single();

  if (propertyDetailsError) {
    console.error("Error adding property details:", propertyDetailsError);
    return res.status(400).send(propertyDetailsError.message);
  }

  console.log("Property details added:", propertyDetails);

  res.send("Property added");
};

export const removeProperty = async (req, res) => {
  const { id } = req.params;

  console.log("Removing property with id:", id);

  const { error: propertyDetailsError } = await supabase
    .from('property_details')
    .delete()
    .eq('property_id', id);

  if (propertyDetailsError) {
    console.error("Error removing property details:", propertyDetailsError);
    return res.status(400).send(propertyDetailsError.message);
  }

  const { error: propertyError } = await supabase
    .from('property')
    .delete()
    .eq('property_id', id);

  if (propertyError) {
    console.error("Error removing property:", propertyError);
    return res.status(400).send(propertyError.message);
  }

  console.log("Property removed with id:", id);

  res.send(`Property with id ${id} removed`);
};

export const updateProperty = async (req, res) => {
  const { id } = req.params;
  const { property_zip_code, property_address, property_features, property_rent, is_vacant, description } = req.body;

  console.log("Updating property with id:", id);

  const { error: propertyError } = await supabase
    .from('property')
    .update({ property_zip_code, property_address })
    .eq('property_id', id);

  if (propertyError) {
    console.error("Error updating property:", propertyError);
    return res.status(400).send(propertyError.message);
  }

  const { error: propertyDetailsError } = await supabase
    .from('property_details')
    .update({ property_features, property_rent, is_vacant, description })
    .eq('property_id', id);

  if (propertyDetailsError) {
    console.error("Error updating property details:", propertyDetailsError);
    return res.status(400).send(propertyDetailsError.message);
  }

  console.log("Property updated with id:", id);

  res.send(`Property with id ${id} updated`);
};

export const getProperties = async (req, res) => {
  console.log("Fetching properties");

  const { data: properties, error } = await supabase
    .from('property')
    .select(`
      property_id,
      property_zip_code,
      property_address,
      house_owner_userID,
      property_details (
        property_features,
        property_rent,
        is_vacant,
        description
      )
    `);

  if (error) {
    console.error("Error fetching properties:", error);
    return res.status(400).send(error.message);
  }

  console.log("Properties fetched:", properties);

  res.send(properties);
};
