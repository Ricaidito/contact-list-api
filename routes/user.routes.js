import express from "express";
import userController from "../controllers/users.controller.js";

const router = express.Router();

// POST routes
router.post("/", userController.addUser);
router.post("/login", userController.logUser);

export default router;
