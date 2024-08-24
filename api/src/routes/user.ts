import { Router, Request, Response } from "express";
import { checkSchema } from "express-validator";
import { createUserValidation } from "../utils/validationSchema.js";
import { createUser } from "../controllers/user.js";
import "../strategies/local-strategy.js";
import { authenticateUser, checkAuthStatus } from "../controllers/auth.js";
import { authenticateJWT } from "../middlewares/authanticateJwt.js";

const router = Router();

router.post("/createUser", checkSchema(createUserValidation), createUser);

router.post("/auth", authenticateUser);

router.get("/auth/status", authenticateJWT, checkAuthStatus);

export default router;
