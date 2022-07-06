import express from "express";
import contactController from "../controllers/contact.controller.js";

const router = express.Router();

// GET routes
router.get("/", contactController.getAllContacts);
router.get("/:contactId", contactController.getContactById);

// POST routes
router.post("/", contactController.addContact);

export default router;
