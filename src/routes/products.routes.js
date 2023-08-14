import { Router } from "express";

// Schemas
import { addProductSchema } from "../schemas/products.schemas.js";

// Middlewares
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { validateToken } from "../middlewares/session.middleware.js";

// Controllers
import { addProduct, getAllProducts } from "../controllers/product.controller.js";

const productsRouter = Router();

productsRouter.post('/product/add', validateSchema(addProductSchema), validateToken, addProduct);
productsRouter.get('/product/getall', getAllProducts)

export default productsRouter;

