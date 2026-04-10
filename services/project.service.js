import Project from "../models/project.model.js";
export const create = (data) => Project.create(data);

export const findAll = () => Project.find().sort({ createdAt: -1 });

export const findById = (id) => Project.findById(id);

export const update = (id, data) =>
  Project.findByIdAndUpdate(id, data, { new: true });

export const remove = (id) => Project.findByIdAndDelete(id);