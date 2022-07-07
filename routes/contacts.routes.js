import express from "express";
import contactsController from "../controllers/contacts.controller.js";

const router = express.Router();

// GET routes
router.get("/", contactsController.getAllContacts);
router.get("/:id", contactsController.getContactById);
router.get("/get-contacts/:userId", contactsController.getContactsForUser);

// POST routes
router.post("/", contactsController.addContact);

// PUT routes
router.put("/:id", contactsController.updateContacts);

// DELETE routes
router.delete("/:id", contactsController.deleteContactById);
router.delete(
  "/delete-contacts/:userId",
  contactsController.deleteAllContactsForUser
);

export default router;
