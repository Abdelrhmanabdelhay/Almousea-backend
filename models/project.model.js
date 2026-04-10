import mongoose from "mongoose";
const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    numberOfLocations: { type: Number, required: true },
    area: { type: String, required: true },
    facilities: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);