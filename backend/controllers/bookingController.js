import { supabase } from "../config/supabase.js";

export const getAllBookings = async (req, res) => {
  try {
    const { data: bookings, error } = await supabase
      .from("booking")
      .select("*");

    if (error) throw error;

    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(400).json({ error: error.message });
  }
};
