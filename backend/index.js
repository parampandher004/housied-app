import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

config();

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
