import { supabase } from "../config/supabase.js";

export const addProperty = async (req, res) => {
  const {
    property_zip_code,
    property_address,
    house_owner_userID,
    property_features,
    rent,
    is_vacant,
  } = req.body;

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
      },
    ])
    .single();

  if (propertyError) {
    console.error("Error adding property:", propertyError);
    return res.status(400).send(propertyError.message);
  }

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
    })
    .eq("property_id", id);

  if (propertyError) {
    console.error("Error updating property:", propertyError);
    return res.status(400).send(propertyError.message);
  }

  res.send(`Property with id ${id} updated`);
};

export const getProperties = async (req, res) => {
  const { data: properties, error } = await supabase.from("property").select(`
      property_id,
      property_zip_code,
      property_address,
      house_owner_userID,
      property_features,
      rent,
      is_vacant,
      house_owner:house_owner_userID(
        house_owner_firstName,
        house_owner_middleName,
        house_owner_lastName,
        house_owner_phoneNumber)
    `);

  if (error) {
    console.error("Error fetching properties:", error);
    return res.status(400).send(error.message);
  }

  res.send(properties);
};

export const getPropertiesByHouseOwner = async (req, res) => {
  try {
    const { house_owner_userID } = req.params;

    const { data: properties, error: propertyError } = await supabase
      .from("property")
      .select("*")
      .eq("house_owner_userID", house_owner_userID);

    if (propertyError) throw propertyError;
    res.status(200).json({
      message: "Properties retrieved successfully",
      properties,
    });
  } catch (error) {
    console.error("Error retrieving properties:", error);
    res.status(400).json({ error: error.message });
  }
};
