import MediaCenter from "../models/media.model.js";

export const create = (data) => MediaCenter.create(data);

export const findAll = () => MediaCenter.find().sort({ createdAt: -1 });

export const findById = (id) => MediaCenter.findById(id);

export const update = (id, data) =>
  MediaCenter.findByIdAndUpdate(id, data, { new: true });

export const remove = (id) => MediaCenter.findByIdAndDelete(id);
