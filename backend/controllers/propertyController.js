import {supabase} from '../config/supabase.js';

export const addProperty = async (req, res) => {
  const { property_zip_code, property_address, house_owner_userID, property_features, property_rent, description } = req.body;

  const { data: property, error: propertyError } = await supabase
    .from('property')
    .insert([{ property_zip_code, property_address, house_owner_userID }])
    .single();

  if (propertyError) return res.status(400).send(propertyError.message);

  const { data: propertyDetails, error: propertyDetailsError } = await supabase
    .from('property_details')
    .insert([{ property_id: property.property_id, property_features, property_rent, description }])
    .single();

  if (propertyDetailsError) return res.status(400).send(propertyDetailsError.message);

  res.send("Property added");
};

export const removeProperty = async (req, res) => {
  const { id } = req.params;

  const { error: propertyDetailsError } = await supabase
    .from('property_details')
    .delete()
    .eq('property_id', id);

  if (propertyDetailsError) return res.status(400).send(propertyDetailsError.message);

  const { error: propertyError } = await supabase
    .from('property')
    .delete()
    .eq('property_id', id);

  if (propertyError) return res.status(400).send(propertyError.message);

  res.send(`Property with id ${id} removed`);
};

export const updateProperty = async (req, res) => {
  const { id } = req.params;
  const { property_zip_code, property_address, property_features, property_rent, is_vacant, description } = req.body;

  const { error: propertyError } = await supabase
    .from('property')
    .update({ property_zip_code, property_address })
    .eq('property_id', id);

  if (propertyError) return res.status(400).send(propertyError.message);

  const { error: propertyDetailsError } = await supabase
    .from('property_details')
    .update({ property_features, property_rent, is_vacant, description })
    .eq('property_id', id);

  if (propertyDetailsError) return res.status(400).send(propertyDetailsError.message);

  res.send(`Property with id ${id} updated`);
};
