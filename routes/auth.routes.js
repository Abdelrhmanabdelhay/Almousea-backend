import express from "express";
import * as controller from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { loginSchema, forgotPasswordSchema, resetPasswordSchema } from "../validators/auth.validator.js";

const router = express.Router();

router.post("/login", validate(loginSchema), controller.login);

router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  controller.forgotPassword
);

router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  controller.resetPassword
);

export default router;