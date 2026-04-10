import express from "express";
import * as controller from "../controllers/contact.controller.js";
import validate from "../middlewares/validate.middleware.js";
import authenticate from "../middlewares/auth.middleware.js";
import { createContactSchema, updateContactSchema } from "../validators/contact.validator.js";

const router = express.Router();

// Public route - anyone can submit contact form
router.post("/", validate(createContactSchema), controller.create);

// Admin only routes - require authentication
router.get("/", authenticate, controller.getAll);
router.get("/:id", authenticate, controller.getOne);
router.put("/:id", authenticate, validate(updateContactSchema), controller.update);
router.delete("/:id", authenticate, controller.deleteContact);

export default router;
