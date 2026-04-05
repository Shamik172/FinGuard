import express from "express";
import * as controller from "./record.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  authorize("ADMIN", "ANALYST"),
  controller.create
);

router.get("/", authMiddleware, controller.getAll);

router.put(
  "/:id",
  authMiddleware,
  authorize("ADMIN", "ANALYST"),
  controller.update
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("ADMIN"),
  controller.remove
);

export default router;