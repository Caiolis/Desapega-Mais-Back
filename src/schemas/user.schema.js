import joi from "joi";

export const signupSchema = joi.object({
  name: joi.string().required(),
  cpf: joi.string().max(11).required(),
  phone: joi.string().max(11).required(),
  email: joi.string().email().required(),
  password: joi.string().min(3).required()
});

export const signinSchema = joi.object({
  email: joi.string().required().email(),
  password: joi.string().required().min(3)
});