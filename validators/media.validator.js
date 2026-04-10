import Joi from "joi";

const mediaItemSchema = Joi.object({
  url: Joi.string().uri().required(),
  caption: Joi.string().allow("").optional(),
});

export const createMediaSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
  photos: Joi.array().items(mediaItemSchema).optional(),
  videos: Joi.array().items(mediaItemSchema).optional(),
}).or("photos", "videos");
