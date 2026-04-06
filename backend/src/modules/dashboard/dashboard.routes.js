import express from "express";
import * as controller from "./dashboard.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/summary", authMiddleware, controller.summary);
router.get("/categories", authMiddleware, controller.category);
router.get("/trends", authMiddleware, controller.trends);

export default router;