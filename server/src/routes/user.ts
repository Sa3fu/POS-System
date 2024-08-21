import { Router, Request, Response } from "express";
import { checkSchema } from "express-validator";
import { createUserValidation } from "../utils/validationSchema.js";
import { createUser } from "../controllers/user.js";
import "../strategies/local-strategy.js";
import passport from "passport";

const router = Router();

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    username: string;
    // Add any other properties your user object may have
    [key: string]: any;
  };
}

router.post("/createUser", checkSchema(createUserValidation), createUser);

router.post("/auth", (req, res, next) => {
  passport.authenticate("local", (err: any, user: Express.User, info: any) => {
    if (err) {
      return res.status(500).json({ error: "Authentication failed" });
    }
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ error: "Login failed" });
      }
      res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
});

router.get("/auth/status", (req: AuthenticatedRequest, res: Response) => {
  if (req.user) {
    const { password, ...safeUser } = req.user; // Remove password or other sensitive data
    return res.send(safeUser);
  }
  return res.sendStatus(401);
});

export default router;
