import joi from "joi";

export const addProductSchema = joi.object({
  product_name: joi.string().required(),
  description: joi.string(),
  price: joi.number().required(),
  photo_url: joi.string().required().uri()
});