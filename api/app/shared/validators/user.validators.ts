import { Joi } from "@koa-better-modules/joi-router";
import { idRequired, allowEmptyNullableString } from "./shared.validators";

export const userValidator = Joi.object({
  id: idRequired,
  email: Joi.string().email().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  phone: allowEmptyNullableString,
  is_active: Joi.boolean().required(),
});
