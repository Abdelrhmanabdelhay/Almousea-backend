import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import mediaRoutes from "./routes/media.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/media", mediaRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Error handler (last middleware)
app.use(errorHandler);
export default app;