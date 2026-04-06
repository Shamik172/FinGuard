import express from "express";
import * as controller from "./record.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/role.middleware.js";

import validate from "../../middlewares/validate.middleware.js";
import { recordSchema } from "./record.validation.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  authorize("ADMIN", "ANALYST"),
  validate(recordSchema),
  controller.create
);

router.get("/", authMiddleware, controller.getAll);

router.put(
  "/:id",
  authMiddleware,
  authorize("ADMIN", "ANALYST"),
  validate(recordSchema),
  controller.update
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("ADMIN"),
  controller.remove
);

export default router;