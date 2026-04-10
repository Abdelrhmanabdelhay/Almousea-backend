import * as service from "../services/contact.service.js";

export const create = async (req, res, next) => {
  try {
    const contact = await service.create(req.body);
    res.status(201).json({
      success: true,
      data: contact,
      message: "Contact message sent successfully"
    });
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const data = await service.findAll();
    res.json({
      success: true,
      data: data,
      message: "Contacts retrieved successfully"
    });
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const contact = await service.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json({
      success: true,
      data: contact,
      message: "Contact retrieved successfully"
    });
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const contact = await service.update(req.params.id, req.body);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json({
      success: true,
      data: contact,
      message: "Contact updated successfully"
    });
  } catch (err) {
    next(err);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const contact = await service.remove(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json({ message: "Contact deleted successfully" });
  } catch (err) {
    next(err);
  }
};
