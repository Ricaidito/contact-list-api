import mongoose from "mongoose";

const usersSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

export default mongoose.model("users", usersSchema);
