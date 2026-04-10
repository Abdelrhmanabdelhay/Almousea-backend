import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";
import dotenv from "dotenv";
dotenv.config();

// ================= LOGIN =================
export const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return generateToken(user._id);
};


// ================= FORGOT PASSWORD =================
export const forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) return "email not found";

  const resetToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetToken = hashedToken;
  user.resetTokenExpire = Date.now() + 10 * 60 * 1000; // 10 min

  await user.save();

  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

  await sendEmail({
    to: user.email,
    subject: "Reset Your Password",
    html: `
      <h2>Password Reset Request</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link expires in 10 minutes.</p>
    `,
  });

  return true;
};


// ================= RESET PASSWORD =================
export const resetPassword = async ({ token, password }) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetToken: hashedToken,
    resetTokenExpire: { $gt: Date.now() },
  });

  if (!user) throw new Error("Invalid or expired token");

  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;
  user.resetToken = undefined;
  user.resetTokenExpire = undefined;

  await user.save();

  return true;
};