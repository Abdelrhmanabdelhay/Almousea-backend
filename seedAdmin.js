import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.model.js";
import { hashPassword } from "./utils/hash.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    if (process.env.NODE_ENV === "production") {
      console.log("❌ Seeding disabled in production");
      process.exit(1);
    }

    if (!process.argv.includes("--seed")) {
      console.log("❌ Unauthorized execution");
      process.exit(1);
    }

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      throw new Error("Missing admin credentials in .env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    const exists = await User.findOne({ email });

    if (exists) {
      console.log("⚠️ Admin already exists");
      process.exit();
    }

    const hashed = await hashPassword(password);

    await User.create({
      email,
      password: hashed,
      role: "admin",
    });

    console.log("✅ Admin created");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAdmin();