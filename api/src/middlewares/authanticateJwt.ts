import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log("Token received:", token);

    try {
      const user = verifyToken(token);
      console.log("Token verified, user:", user);
      req.user = user; // Assign the user to req.user
      next();
    } catch (err) {
      console.error("Token verification error:", err);
      return res.status(403).json({ error: "Forbidden" });
    }
  } else {
    console.error("Authorization header missing");
    return res.status(401).json({ error: "Unauthorized" });
  }
};
