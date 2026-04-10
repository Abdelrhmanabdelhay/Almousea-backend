import express from "express";
import * as controller from "../controllers/media.controller.js";
import validate from "../middlewares/validate.middleware.js";
import authenticate from "../middlewares/auth.middleware.js";
import { createMediaSchema } from "../validators/media.validator.js";

const router = express.Router();

router.post("/", authenticate, validate(createMediaSchema), controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.put("/:id", authenticate, validate(createMediaSchema), controller.update);
router.delete("/:id", authenticate, controller.deleteMedia);

export default router;
