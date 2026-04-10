import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
    resetToken: String,
    resetTokenExpire: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);