import mongoose from "mongoose";
import User from "../models/user.model.js";

// Add a user
const addUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(200)
      .json({ error: "An account already exists with that email" });
  const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    password: req.body.password,
  });
  newUser
    .save()
    .then(result => res.status(201).json(result))
    .catch(err => res.status(500).json({ error: err }));
};

// Do login
const logUser = async (req, res) => {
  const logIn = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (!logIn) return res.status(404).json({ error: "Incorrect credentials" });
  res.status(200).json(logIn);
};

export default { addUser, logUser };
