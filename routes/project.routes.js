import express from "express";
import * as controller from "../controllers/project.controller.js";
import validate from "../middlewares/validate.middleware.js";
import authenticate from "../middlewares/auth.middleware.js";
import { createProjectSchema } from "../validators/project.validator.js";

const router = express.Router();

router.post("/", authenticate, validate(createProjectSchema), controller.create);

router.get("/", controller.getAll);

router.get("/:id", controller.getOne);

router.put("/:id", authenticate, validate(createProjectSchema), controller.update);

router.delete("/:id", authenticate, controller.deleteProject);

export default router;