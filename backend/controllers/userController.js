import { supabase } from "../config/supabase.js";

export const getUserInfo = async (req, res) => {
  try {
    const { userId, accountType } = req.user;

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("email")
      .eq("id", userId)
      .single();

    if (userError) throw userError;

    const { data: userInfo, error } = await supabase
      .from(accountType)
      .select(
        `
        ${accountType}_firstName,
        ${accountType}_middleName,
        ${accountType}_lastName,
        ${accountType}_phoneNumber,
        ${accountType}_dob,
        ${accountType}_address
      `
      )
      .eq(`${accountType}_userID`, userId)
      .single();

    if (error) throw error;

    // Format response to match frontend expectations
    const formattedUserInfo = {
      firstName: userInfo[`${accountType}_firstName`],
      middleName: userInfo[`${accountType}_middleName`],
      lastName: userInfo[`${accountType}_lastName`],
      email: userData.email,
      phoneNumber: userInfo[`${accountType}_phoneNumber`],
      dob: userInfo[`${accountType}_dob`],
      address: userInfo[`${accountType}_address`],
    };

    res.status(200).json({
      message: "User info retrieved successfully",
      userInfo: formattedUserInfo,
    });
  } catch (error) {
    console.error("Error retrieving user info:", error);
    res.status(400).json({ error: error.message });
  }
};

export const updateUserInfo = async (req, res) => {
  try {
    const { userId, accountType } = req.user;
    const updates = req.body;

    if (updates.email) {
      const { error: emailError } = await supabase
        .from("users")
        .update({ email: updates.email })
        .eq("id", userId);

      if (emailError) throw emailError;
    }

    const { email, ...otherUpdates } = updates;
    // Convert frontend field names to database column names
    const updateData = {};
    Object.entries(updates).forEach(([key, value]) => {
      updateData[`${accountType}_${key}`] = value;
    });

    const { data: updatedUserInfo, error } = await supabase
      .from(accountType)
      .update(updateData)
      .eq(`${accountType}_userID`, userId)
      .select()
      .single();

    if (error) throw error;

    // Format response
    const formattedUserInfo = {
      firstName: updatedUserInfo[`${accountType}_firstName`],
      middleName: updatedUserInfo[`${accountType}_middleName`],
      lastName: updatedUserInfo[`${accountType}_lastName`],
      email: updatedUserInfo[`${accountType}_email`],
      phoneNumber: updatedUserInfo[`${accountType}_phoneNumber`],
      dob: updatedUserInfo[`${accountType}_dob`],
      address: updatedUserInfo[`${accountType}_address`],
    };

    res.status(200).json({
      message: "User info updated successfully",
      userInfo: formattedUserInfo,
    });
  } catch (error) {
    console.error("Error updating user info:", error);
    res.status(400).json({ error: error.message });
  }
};
