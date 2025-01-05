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
export const getAllUsers = async (req, res) => {
  try {
    // Fetch all users
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("id, email, account_type, created_at");

    if (usersError) throw usersError;
    // Fetch corresponding names from respective tables
    const userDetailsPromises = users.map(async (user) => {
      const { data: userInfo, error: userInfoError } = await supabase
        .from(user.account_type)
        .select(
          `
          ${user.account_type}_firstName,
          ${user.account_type}_middleName,
          ${user.account_type}_lastName
        `
        )
        .eq(`${user.account_type}_userID`, user.id)
        .maybeSingle();

      if (userInfoError) throw userInfoError;
      return {
        userID: user.id,
        email: user.email || null,
        accountType: user.account_type,
        firstName: userInfo[`${user.account_type}_firstName`],
        middleName: userInfo[`${user.account_type}_middleName`] || null,
        lastName: userInfo[`${user.account_type}_lastName`],
        createdAt: user.created_at,
      };
    });

    const userDetails = await Promise.all(userDetailsPromises);

    res.status(200).json({
      message: "Users retrieved successfully",
      users: userDetails,
    });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Delete user from users table
    const { error: userError } = await supabase
      .from("users")
      .delete()
      .eq("id", userId);

    if (userError) throw userError;

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(400).json({ error: error.message });
  }
};
