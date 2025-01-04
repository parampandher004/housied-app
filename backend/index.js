import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import cors from "cors";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { error, profile } from "console";

// Load environment variables
config();

const saltRounds = 10;
const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Your React app origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// Supabase Client Initialization
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const jwtSecret = process.env.SUPABASE_JWT_SECRET;

// Middleware to authenticate JWT and attach user info to request
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from headers
  if (!token) return res.status(401).send("Token missing");

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) return res.status(401).send("Invalid token");
    req.user = decoded; // Attach decoded user info to request
    next();
  });
};

// API Route for User Registration
app.post("/register", async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    phoneNumber,
    email,
    password,
    accountType,
  } = req.body;

  const userId = crypto.randomUUID(); // Generate UUID for the user

  try {
    // Insert into `users` table
    const { data: user, error: userError } = await supabase
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
      return res.status(400).send({ error: userError.message });
    }

    let specificData;
    if (accountType === "tenant") {
      const { data: tenantData, error: tenantError } = await supabase
        .from("tenant")
        .insert([
          {
            tenant_phone: phoneNumber,
            user_id: userId,
            first_name: firstName,
            middle_name: middleName || null,
            last_name: lastName,
          },
        ])
        .select();

      if (tenantError) {
        return res.status(400).send({ error: tenantError.message });
      }

      specificData = tenantData;
    } else if (accountType === "house_owner") {
      const { data: houseOwnerData, error: houseOwnerError } = await supabase
        .from("house_owner")
        .insert([
          {
            house_owner_phone: phoneNumber,
            house_owner_id: userId,
            first_name: firstName,
            middle_name: middleName || null,
            last_name: lastName,
          },
        ])
        .select();

      if (houseOwnerError) {
        return res.status(400).send({ error: houseOwnerError.message });
      }

      specificData = houseOwnerData;
    } else if (accountType === "admin") {
      const { data: adminData, error: adminError } = await supabase
        .from("admin")
        .insert([
          {
            user_id: userId,
            first_name: firstName,
            middle_name: middleName || null,
            last_name: lastName,
          },
        ])
        .select();

      if (adminError) {
        return res.status(400).send({ error: adminError.message });
      }
      specificData = adminData;
    } else {
      return res.status(400).send({ error: "Invalid account type" });
    }

    if (specificData) {
      res
        .status(201)
        .send({ message: "User registered successfully", data: specificData });
    } else {
      res.status(401).send({ error: "User registration failed" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// API Route for User Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id, email, password, account_type")
      .eq("email", email)
      .single();

    if (userError) {
      throw userError;
    }

    if (!(await comparePasswords(user.password, password))) {
      return res.status(401).send({ error: "Invalid credentials" });
    }

    const { data: accountData, error: accountError } = await supabase
      .from(`${user.account_type}`)
      .select("*")
      .eq(`${user.account_type}_id`, user.id)
      .single();

    if (accountError) {
      throw accountError;
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, accountType: user.account_type },
      jwtSecret,
      { expiresIn: "3h" }
    );

    res.status(200).send({
      message: "Login successful",
      token,
      userType: user.account_type,
      userDetails: {
        userId: user.id,
        username: accountData.first_name,
        email: user.email,
        profilePicture: "",
      },
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// API Route for Updating Data with JWT Auth and RLS
app.put("/update-data", authenticate, async (req, res) => {
  const { userId } = req.user; // Get userId from decoded token
  const { dataToUpdate } = req.body;

  try {
    const { error } = await supabase
      .from("your_table_name") // Replace with actual table name
      .update(dataToUpdate)
      .eq("id", userId); // Ensure only the user's data is updated

    if (error) {
      throw error;
    }

    res.status(200).send({ message: "Data updated successfully" });
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});

app.get("/user-info", authenticate, async (req, res) => {
  try {
    const { userId, accountType } = req.user;

    let selectFields = "first_name, middle_name, last_name";
    if (accountType !== "admin") {
      selectFields += `${accountType}_phone, ${accountType}_address`;
    }

    const { data: userInfo, error } = await supabase
      .from(accountType)
      .select(selectFields)
      .eq(`${accountType}_id`, userId)
      .single();

    if (error) {
      throw error;
    }
    res.status(200).send({
      message: "User info retrieved successfully",
      userInfo,
    });
  } catch (error) {
    console.error("Error retrieving user info:", error);
    res.status(400).send({ error: error.message });
  }
});

app.put("/user-info", authenticate, async (req, res) => {
  try {
    const { userId, accountType } = req.user;
    const { firstName, middleName, lastName, phoneNumber, address } = req.body;

    const updateData = {
      first_name: firstName,
      middle_name: middleName || null,
      last_name: lastName,
    };

    if (accountType !== "admin") {
      updateData[`${accountType}_phone`] = phoneNumber;
      updateData[`${accountType}_address`] = address;
    }

    const { data: updatedUserInfo, error } = await supabase
      .from(accountType)
      .update(updateData)
      .eq(`${accountType}_id`, userId)
      .single();

    if (error) {
      throw error;
    }

    res.status(200).send({
      message: "User info updated successfully",
      updatedUserInfo,
    });
  } catch (error) {
    console.error("Error updating user info:", error);
    res.status(400).send({ error: error.message });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
