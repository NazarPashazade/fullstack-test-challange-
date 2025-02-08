import { Joi } from "@koa-better-modules/joi-router";

export const userTokenValidator = Joi.object({
  token: Joi.string().required(),
});

export const loginValidator = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

export const headerValidator = Joi.object({
  authorization: Joi.string().min(9).required(),
}).options({
  allowUnknown: true,
});
