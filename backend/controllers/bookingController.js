import { supabase } from "../config/supabase.js";

export const getAllBookings = async (req, res) => {
  try {
    const { data: bookings, error: bookingError } = await supabase.from(
      "booking"
    ).select(`
        booking_id,
        property_id,
        tenant_id,
        bstartdate,
        benddate,
        booking_time,
        property(property_id, house_owner_userID)`);

    if (bookingError) throw error;

    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(400).json({ error: error.message });
  }
};
export const getBookingsByHouseOwner = async (req, res) => {
  try {
    const { house_owner_userID } = req.params;

    // Get property IDs for the house owner
    const { data: properties, error: propertyError } = await supabase
      .from("property")
      .select("property_id")
      .eq("house_owner_userID", house_owner_userID);

    if (propertyError) throw propertyError;

    const propertyIds = properties.map((property) => property.property_id);

    // Get bookings for the properties
    const { data: bookings, error: bookingError } = await supabase
      .from("booking")
      .select("*")
      .in("property_id", propertyIds);

    if (bookingError) throw bookingError;

    res.status(200).json({
      message: "Bookings retrieved successfully",
      bookings,
    });
  } catch (error) {
    console.error("Error retrieving bookings:", error);
    res.status(400).json({ error: error.message });
  }
};
export const getBookingsByTenant = async (req, res) => {
  try {
    const { tenant_userID } = req.params;
    console.log("tenant_userID", tenant_userID);

    // Get bookings for the properties
    const { data: bookings, error: bookingError } = await supabase
      .from("booking")
      .select("*")
      .eq("tenant_id", tenant_userID);

    if (bookingError) throw bookingError;

    res.status(200).json({
      message: "Bookings retrieved successfully",
      bookings,
    });
  } catch (error) {
    console.error("Error retrieving bookings:", error);
    res.status(400).json({ error: error.message });
  }
};

export const addBooking = async (req, res) => {
  try {
    const { tenant_userId, property_id } = req.params;
    const { bstartdate, benddate } = req.body;
    console.log(tenant_userId, property_id, bstartdate, benddate);

    const { data: booking, error: bookingError } = await supabase.from("booking").insert([{property_id: property_id, tenant_id: tenant_userId, bstartdate: bstartdate, benddate: benddate}]);
    if (bookingError) throw bookingError;

    res.status(200).json({ message: "Booking added successfully", booking });
  } catch (error) {
    console.error("Error adding booking:", error);
    res.status(400).json({ error: error.message });
  }
};