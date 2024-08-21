import { Router, Request, Response } from "express";
import { checkSchema } from "express-validator";
import { createUserValidation } from "../utils/validationSchema.js";
import { createUser } from "../controllers/user.js";
import "../strategies/local-strategy.js";
import { authenticateUser, checkAuthStatus } from "../controllers/auth.js";

const router = Router();

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    username: string;
    password: string;
    [key: string]: any;
  };
}

router.post("/createUser", checkSchema(createUserValidation), createUser);

router.post("/auth", authenticateUser);

router.get("/auth/status", checkAuthStatus);

export default router;
