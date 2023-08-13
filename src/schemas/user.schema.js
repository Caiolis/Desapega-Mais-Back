import joi from "joi";

export const signupSchema = joi.object({
  name: joi.string().required(),
  cpf: joi.string().max(11).required(),
  phone: joi.string().max(11).required(),
  email: joi.string().email().required(),
  password: joi.string().min(3).required()
});