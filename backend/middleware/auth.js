import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }

    jwt.verify(token, process.env.SUPABASE_JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(401).json({ error: "Authentication failed" });
  }
};
