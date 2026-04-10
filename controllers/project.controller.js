import * as service from "../services/project.service.js";
export const create = async (req, res, next) => {
  try {
    const project = await service.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const data = await service.findAll();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const project = await service.findById(req.params.id);
    res.json(project);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const project = await service.update(req.params.id, req.body);
    res.json(project);
  } catch (err) {
    next(err);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    await service.remove(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};