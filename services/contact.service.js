import Contact from "../models/contact.model.js";

export const create = (data) => Contact.create(data);

export const findAll = () => Contact.find().sort({ createdAt: -1 });

export const findById = (id) => Contact.findById(id);

export const update = (id, data) =>
  Contact.findByIdAndUpdate(id, data, { new: true });

export const remove = (id) => Contact.findByIdAndDelete(id);
