import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

export default mongoose.model("contact", contactSchema);
