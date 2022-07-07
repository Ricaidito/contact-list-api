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
  const id = req.params.id;
  Contact.findById(id)
    .then(contact => {
      if (contact) res.status(200).json(contact);
      else res.status(404).json({ error: `Contact with id ${id} not found` });
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

// Update a contact
const updateContact = async (req, res) => {
  const id = req.params.id;
  const contactToUpdate = await Contact.findById(id);
  if (!contactToUpdate)
    return res.status(404).json({ error: `Contact with id ${id} not found` });
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
    .then(() => res.status(200).json({ message: `Updated contact ${id}` }))
    .catch(err => res.status(500).json({ error: err }));
};

// Delete a contact by id
const deleteContactById = async (req, res) => {
  const id = req.params.id;
  const contactToDelete = await Contact.findById(id);
  if (!contactToDelete)
    return res.status(404).json({ error: `Contact with id ${id} not found` });
  Contact.deleteOne({ _id: id })
    .then(() => res.status(200).json({ message: `Deleted contact ${id}` }))
    .catch(err => res.status(500).json({ error: err }));
};

// Delete all contacts
const deleteAllContactsForUser = (req, res) => {
  const id = req.params.userId;
  Contact.deleteMany({ userId: id })
    .then(() =>
      res.status(200).json({ message: `Deleted all contacts for user ${id}` })
    )
    .catch(err => res.status(500).json({ error: err }));
};

export default {
  getAllContacts,
  getContactById,
  addContact,
  getContactsForUser,
  updateContacts: updateContact,
  deleteContactById,
  deleteAllContactsForUser,
};
