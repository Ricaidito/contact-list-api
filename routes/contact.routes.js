import express from "express";
import contactsController from "../controllers/contact.controller.js";

const router = express.Router();

// GET routes
router.get("/", contactsController.getAllContacts);
router.get("/:contactId", contactsController.getContactById);
router.get("/get-contacts/:userId", contactsController.getContactForUser);

// POST routes
router.post("/", contactsController.addContact);

// PUT routes
router.put("/:contactId", contactsController.updateContacts);

//DELETE routes
router.delete("/:contactId", contactsController.deleteContactById);
router.delete("/delete-contacts/:userId", contactsController.deleteAllContacts);

export default router;
