import { supabase } from "../config/supabase.js";

export const addProperty = async (req, res) => {
  const {
    property_zip_code,
    property_address,
    house_owner_userID,
    property_features,
    rent,
    is_vacant,
    description,
  } = req.body;

  console.log("Adding property:", req.body);

  const { data: property, error: propertyError } = await supabase
    .from("property")
    .insert([
      {
        property_zip_code,
        property_address,
        house_owner_userID,
        property_features,
        rent,
        is_vacant,
        description,
      },
    ])
    .single();

  if (propertyError) {
    console.error("Error adding property:", propertyError);
    return res.status(400).send(propertyError.message);
  }

  console.log("Property added:", property);

  res.send("Property added");
};

export const removeProperty = async (req, res) => {
  const { id } = req.params;

  console.log("Removing property with id:", id);

  const { error: propertyError } = await supabase
    .from("property")
    .delete()
    .eq("property_id", id);

  if (propertyError) {
    console.error("Error removing property:", propertyError);
    return res.status(400).send(propertyError.message);
  }

  console.log("Property removed with id:", id);

  res.send(`Property with id ${id} removed`);
};

export const updateProperty = async (req, res) => {
  const { id } = req.params;
  const {
    property_zip_code,
    property_address,
    property_features,
    rent,
    is_vacant,
    description,
  } = req.body;

  console.log("Updating property with id:", id);

  const { error: propertyError } = await supabase
    .from("property")
    .update({
      property_zip_code,
      property_address,
      property_features,
      rent,
      is_vacant,
      description,
    })
    .eq("property_id", id);

  if (propertyError) {
    console.error("Error updating property:", propertyError);
    return res.status(400).send(propertyError.message);
  }

  console.log("Property updated with id:", id);

  res.send(`Property with id ${id} updated`);
};

export const getProperties = async (req, res) => {
  console.log("Fetching properties");

  const { data: properties, error } = await supabase.from("property").select(`
      property_id,
      property_zip_code,
      property_address,
      house_owner_userID,
      property_features,
      rent,
      is_vacant
    `);

  if (error) {
    console.error("Error fetching properties:", error);
    return res.status(400).send(error.message);
  }

  console.log("Properties fetched:", properties);

  res.send(properties);
};
