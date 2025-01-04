import crypto from "crypto";
import { SupabaseClient } from "@supabase/supabase-js";
import { hashPassword, comparePasswords } from "../utils/auth";

const validateRegistrationInput = (Input) => {
  const { email, password, accountType, phoneNumber, firstName, lastName } =
    Input;
  if (
    !email ||
    !password ||
    !accountType ||
    !phoneNumber ||
    !firstName ||
    !lastName
  ) {
    throw new Error("Please provide all required fields");
  }
  if (!["tenant", "house_owner", "admin"].includes(accountType)) {
    throw new Error("Invalid account type");
  }
};

const createUserInDb = async (userID, email, password, accountType) => {
  const { data: user, error: userError } = await supabase
    .from("users")
    .insert([
      {
        id: userID,
        email: email,
        password: await hashPassword(password),
        account_type: accountType,
      },
    ])
    .select();

  if (userError) {
    throw new Error(userError.message);
  }
  return user;
};

const createSpecificAccountType = async (accountType, userData) => {
  const { userId, firstName, middleName, lastName, phoneNumber } = userData;
  const tableMap = {
    table: `${accountType}`,
    data: {
      [`${accountType}_phoneNumber`]: phoneNumber ? Number(phoneNumber) : null,
      [`${accountType}_userID`]: userId,
      [`${accountType}_firstName`]: firstName,
      [`${accountType}_middleName`]: middleName || null,
      [`${accountType}_lastName`]: lastName,
      [`${accountType}_dob`]: dob || null,
    },
  };
  const { data: specificData, error } = await supabase
    .from(tableMap.table)
    .insert(tableMap.data)
    .select();

  if (error) {
    throw new Error(error.message);
  }
  return specificData;
};

export const register = async (req, res) => {
  try {
    validateRegistrationInput(req.body);

    const userID = crypto.randomUUID();
    const { email, password, accountType, ...userData } = req.body;

    const user = await createUserInDb(userID, email, password, accountType);
    const specificData = await createSpecificAccountType(accountType, userData);
    res.status(201).send({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
