import * as service from "../services/media.service.js";

export const create = async (req, res, next) => {
  try {
    const media = await service.create(req.body);
    res.status(201).json({ success: true, data: media, message: "Media item created successfully" });
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const data = await service.findAll();
    res.json({ success: true, data: data, message: "Media items retrieved successfully" });
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const media = await service.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ message: "Media item not found" });
    }
    res.json({ success: true, data: media, message: "Media item retrieved successfully" });
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const media = await service.update(req.params.id, req.body);
    if (!media) {
      return res.status(404).json({ message: "Media item not found" });
    }
    res.json({ success: true, data: media, message: "Media item updated successfully" });
  } catch (err) {
    next(err);
  }
};

export const deleteMedia = async (req, res, next) => {
  try {
    const media = await service.remove(req.params.id);
    if (!media) {
      return res.status(404).json({ message: "Media item not found" });
    }
    res.json({ message: "Media item deleted successfully" });
  } catch (err) {
    next(err);
  }
};
