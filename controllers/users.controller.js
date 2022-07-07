import mongoose from "mongoose";
import User from "../models/user.model.js";

// Add a user
const addUser = async (req, res) => {
  const emailTrue = req.body.email;
  const emailCheck = await User.findOne({ email: emailTrue });
  if (emailCheck)
    return res
      .status(200)
      .json({ message: "An account already exists with that email" });

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    password: req.body.password,
  });
  user
    .save()
    .then(result => res.status(201).json(result))
    .catch(err => res.status(500).json({ error: err }));
};

// Get the credentials

const logUser = async (req, res) => {
  const validEmail = req.body.email;
  const validPass = req.body.password;

  const credentialCheck = await User.findOne({
    email: validEmail,
    password: validPass,
  });
  if (!credentialCheck) {
    return res
      .status(404)
      .json({ message: "The user or password are not correct" });
  }
  res.status(200).json(credentialCheck);
};

export default { addUser, logUser };
