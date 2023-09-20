import Joi from 'joi';
export const userRegisterValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});