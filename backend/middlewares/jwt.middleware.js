import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Access denied" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
