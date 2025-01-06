import crypto from "crypto";
import jwt from "jsonwebtoken";
import { supabase } from "../config/supabase.js";
import { hashPassword, comparePasswords } from "../utils/auth.js";

export const register = async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      phoneNumber,
      email,
      password,
      accountType,
      dob,
    } = req.body;

    const userId = crypto.randomUUID();

    // Create base user
    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert([
        {
          id: userId,
          email: email,
          password: await hashPassword(password),
          account_type: accountType,
        },
      ])
      .select();

    if (userError) {
      throw userError;
    }

    // Create specific account type
    const tableData = {
      [`${accountType}_phoneNumber`]: phoneNumber ? Number(phoneNumber) : null,
      [`${accountType}_userID`]: userId,
      [`${accountType}_firstName`]: firstName,
      [`${accountType}_middleName`]: middleName || null,
      [`${accountType}_lastName`]: lastName,
      [`${accountType}_dob`]: dob || null,
    };

    const { data: specificData, error: specificError } = await supabase
      .from(accountType)
      .insert([tableData])
      .select()
      .single();

    if (specificError) {
      throw specificError;
    }

    const token = jwt.sign(
      { userId, accountType },
      process.env.SUPABASE_JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Registration successful",
      token,
      userType: accountType,
      userDetails: {
        userID: userId,
        email: email,
        firstName: specificData[`${accountType}_firstName`],
        middleName: specificData[`${accountType}_middleName`],
        lastName: specificData[`${accountType}_lastName`],
        phoneNumber: specificData[`${accountType}_phoneNumber`],
        dob: specificData[`${accountType}_dob`],
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (userError || !user) {
      throw new Error("Invalid credentials");
    }

    const isValidPassword = await comparePasswords(user.password, password);
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    const { data: specificData, error: specificError } = await supabase
      .from(user.account_type)
      .select("*")
      .eq(`${user.account_type}_userID`, user.id)
      .single();

    if (specificError) throw specificError;

    const token = jwt.sign(
      { userId: user.id, accountType: user.account_type },
      process.env.SUPABASE_JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      userType: user.account_type,
      userDetails: {
        userID: user.id,
        email: user.email,
        firstName: specificData[`${user.account_type}_firstName`],
        middleName: specificData[`${user.account_type}_middleName`],
        lastName: specificData[`${user.account_type}_lastName`],
        phoneNumber: specificData[`${user.account_type}_phoneNumber`],
        dob: specificData[`${user.account_type}_dob`],
      },
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
