import mongoose from "mongoose";
import Contact from "../models/contact.model.js";

// Get all contacts
const getAllContacts = (req, res) => {
  Contact.find()
    .then(contacts => res.status(200).json(contacts))
    .catch(err => res.status(500).json({ error: err }));
};

// Get a contact by ID
const getContactById = (req, res) => {
  const id = req.params.contactId;
  Contact.findById(id)
    .then(contact => {
      if (contact) res.status(200).json(contact);
      else res.status(404).json({ message: "Not found!" });
    })
    .catch(err => res.status(500).json({ error: err }));
};

// Get all contact for user
const getContactsForUser = (req, res) => {
  const id = req.params.userId;
  Contact.find({ userId: id })
    .then(contacts => res.status(200).json(contacts))
    .catch(err => res.status(500).json({ error: err }));
};

// Add a contact
const addContact = (req, res) => {
  const contact = new Contact({
    _id: new mongoose.Types.ObjectId(),
    userId: req.body.userId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
  });
  contact
    .save()
    .then(result => res.status(201).json(result))
    .catch(err => res.status(500).json({ error: err }));
};

// Update a contacts
const updateContacts = (req, res) => {
  const id = req.params.contactId;
  Contact.updateOne(
    { _id: id },
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
      },
    }
  )
    .then(result => res.status(201).json(result))
    .catch(err => res.status(500).json({ error: err }));
};

// Delete a contact by id
const deleteContactById = (req, res) => {
  const id = req.params.contactId;
  Contact.deleteOne({ _id: id })
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: err }));
};

// Delete all contacts
const deleteAllContacts = (req, res) => {
  Contact.deleteMany({})
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: err }));
};

export default {
  getAllContacts,
  getContactById,
  addContact,
  getContactForUser: getContactsForUser,
  updateContacts,
  deleteContactById,
  deleteAllContacts,
};
