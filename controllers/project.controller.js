import * as service from "../services/project.service.js";
export const create = async (req, res, next) => {
  try {
    const project = await service.create(req.body);
    res.status(201).json({ success: true, data: project, message: "Project created successfully" });
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const data = await service.findAll();
    res.json({ success: true, data: data, message: "Projects retrieved successfully" });
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const project = await service.findById(req.params.id);
    res.json({ success: true, data: project, message: "Project retrieved successfully" });
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const project = await service.update(req.params.id, req.body);
    res.json({ success: true, data: project, message: "Project updated successfully" });
  } catch (err) {
    next(err);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    await service.remove(req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    next(err);
  }
};