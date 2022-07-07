import express from "express";
import usersController from "../controllers/users.controller.js";

const router = express.Router();

// POST routes
router.post("/", usersController.addUser);
router.post("/login", usersController.logUser);

export default router;
