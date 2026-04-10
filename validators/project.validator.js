import Joi from 'joi';

export const createProjectSchema = Joi.object({
  title: Joi.string().min(3).required(),
  image: Joi.string().uri().required(),
  description: Joi.string().min(10).required(),
  location: Joi.string().required(),
  numberOfLocations: Joi.number().min(1).required(),
  area: Joi.string().required(),
  facilities: Joi.array().items(Joi.string()).optional(),
});