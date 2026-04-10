import mongoose from "mongoose";

const mediaItemSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    caption: { type: String, trim: true },
  },
  { _id: false }
);

const mediaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    photos: { type: [mediaItemSchema], default: [] },
    videos: { type: [mediaItemSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("MediaCenter", mediaSchema);
