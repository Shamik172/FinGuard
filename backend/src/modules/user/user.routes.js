import express from "express";
import { getUsers } from "./user.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/role.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, authorize("ADMIN"), getUsers);

export default router;