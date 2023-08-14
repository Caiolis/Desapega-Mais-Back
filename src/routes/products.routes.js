import { Router } from "express";

// Schemas
import { addProductSchema } from "../schemas/products.schemas.js";

// Middlewares
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { validateToken } from "../middlewares/session.middleware.js";
import { addProduct } from "../controllers/product.controller.js";

const productsRouter = Router();

productsRouter.post('/addproduct', validateSchema(addProductSchema), validateToken, addProduct);

export default productsRouter;