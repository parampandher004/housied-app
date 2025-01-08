import { supabase } from '../config/supabase.js';

export const getMonthlyRevenue = async (req, res) => {
  const { month, year } = req.params;

  console.log(`Fetching monthly revenue for ${month}/${year}`);

  const { data: payments, error } = await supabase
    .from('payment')
    .select('amount')
    .gte('payment_date', `${year}-${month}-01`)
    .lte('payment_date', `${year}-${month}-31`);

  if (error) {
    console.error("Error fetching payments:", error);
    return res.status(400).send(error.message);
  }

  const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);

  console.log(`Total revenue for ${month}/${year}:`, totalRevenue);

  res.send({ month, year, totalRevenue });
};

export const getFundsByPropertyType = async (req, res) => {
  console.log("Fetching funds by property type");

  const { data: funds, error } = await supabase
    .from('payment')
    .select('property_id, amount')
    .eq('status', 'received');

  if (error) {
    console.error("Error fetching funds:", error);
    return res.status(400).send(error.message);
  }

  const propertyFunds = {};

  for (const fund of funds) {
    const { data: property, error: propertyError } = await supabase
      .from('property')
      .select('property_type')
      .eq('property_id', fund.property_id)
      .single();

    if (propertyError) {
      console.error("Error fetching property:", propertyError);
      return res.status(400).send(propertyError.message);
    }

    const propertyType = property.property_type;

    if (!propertyFunds[propertyType]) {
      propertyFunds[propertyType] = 0;
    }

    propertyFunds[propertyType] += fund.amount;
  }

  console.log("Funds by property type:", propertyFunds);

  res.send(propertyFunds);
};

export const getWeeklyRevenue = async (req, res) => {
  const { startDate, endDate } = req.params;

  console.log(`Fetching weekly revenue from ${startDate} to ${endDate}`);

  const { data: payments, error } = await supabase
    .from('payment')
    .select('amount')
    .gte('payment_date', startDate)
    .lte('payment_date', endDate);

  if (error) {
    console.error("Error fetching payments:", error);
    return res.status(400).send(error.message);
  }

  const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);

  console.log(`Total revenue from ${startDate} to ${endDate}:`, totalRevenue);

  res.send({ startDate, endDate, totalRevenue });
};

export const getTopRatedProperties = async (req, res) => {
  console.log("Fetching top-rated properties");

  const { data: feedbacks, error } = await supabase
    .from('feedback')
    .select('property_id, frating');

  if (error) {
    console.error("Error fetching feedbacks:", error);
    return res.status(400).send(error.message);
  }

  const propertyRatings = {};

  for (const feedback of feedbacks) {
    if (!propertyRatings[feedback.property_id]) {
      propertyRatings[feedback.property_id] = { totalRating: 0, count: 0 };
    }

    propertyRatings[feedback.property_id].totalRating += feedback.frating;
    propertyRatings[feedback.property_id].count += 1;
  }

  const averageRatings = Object.keys(propertyRatings).map(property_id => ({
    property_id,
    averageRating: propertyRatings[property_id].totalRating / propertyRatings[property_id].count
  }));

  averageRatings.sort((a, b) => b.averageRating - a.averageRating);

  const topRatedProperties = averageRatings.slice(0, 10);

  console.log("Top-rated properties:", topRatedProperties);

  res.send(topRatedProperties);
};

export const getRatedPropertiesByType = async (req, res) => {
  console.log("Fetching rated properties by type");

  const { data: feedbacks, error } = await supabase
    .from('feedback')
    .select('property_id, frating');

  if (error) {
    console.error("Error fetching feedbacks:", error);
    return res.status(400).send(error.message);
  }

  const propertyRatings = {};

  for (const feedback of feedbacks) {
    const { data: property, error: propertyError } = await supabase
      .from('property')
      .select('property_type')
      .eq('property_id', feedback.property_id)
      .single();

    if (propertyError) {
      console.error("Error fetching property:", propertyError);
      return res.status(400).send(propertyError.message);
    }

    const propertyType = property.property_type;

    if (!propertyRatings[propertyType]) {
      propertyRatings[propertyType] = { totalRating: 0, count: 0 };
    }

    propertyRatings[propertyType].totalRating += feedback.frating;
    propertyRatings[propertyType].count += 1;
  }

  const averageRatings = Object.keys(propertyRatings).map(propertyType => ({
    propertyType,
    averageRating: propertyRatings[propertyType].totalRating / propertyRatings[propertyType].count
  }));

  averageRatings.sort((a, b) => b.averageRating - a.averageRating);

  console.log("Rated properties by type:", averageRatings);

  res.send(averageRatings);
};
