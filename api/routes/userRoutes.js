import express from "express";
const router = express.Router();

import { register, authUser, getUsers, getCurrentUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/register").post(register);
router.post("/login", authUser);
router.route("/").get(protect, getUsers);
router.route("/current").get(protect, getCurrentUser);

export default router;