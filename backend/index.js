import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import propertyRoutes from "./routes/property.js";
import feedbackRoutes from "./routes/feedback.js";
import reportRoutes from "./routes/report.js";
import bookingRoutes from "./routes/booking.js";
config();

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [process.env.FRONTEND_URL, `http://localhost:${process.env.FRONTEND_PORT || 5173}`, "http://localhost:5180"];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

// Handle preflight requests
app.options('*', cors());

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/property", propertyRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/report", reportRoutes);
app.use("/booking", bookingRoutes);

const port = process.env.PORT || 5000;
const frontendPort = process.env.FRONTEND_PORT || 5173;

const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Frontend is expected to run on http://localhost:${frontendPort}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use. Trying another port...`);
      startServer(port + 1);
    } else {
      console.error(err);
    }
  });
};

startServer(port);
