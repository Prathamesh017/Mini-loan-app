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

export const paymentValidation = Joi.object({
  loanId: Joi.string().required(),
  userId: Joi.string().required(),
  payment_terms: Joi.number().required(),
  payment_amount: Joi.number().required(),
})
