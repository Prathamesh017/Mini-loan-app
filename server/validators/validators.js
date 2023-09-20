import Joi from 'joi'
export const userRegisterValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})

export const loanValidation = Joi.object({
  employment: Joi.string().required(),
  salary: Joi.number().required(),
  terms: Joi.number().required(),
  amount: Joi.number().required().min(1000),
})
