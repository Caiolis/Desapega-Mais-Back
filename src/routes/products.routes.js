import { Router } from "express";

// Schemas
import { addProductSchema } from "../schemas/products.schemas.js";

// Middlewares
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { validateAdmin, validateToken } from "../middlewares/session.middleware.js";

// Controllers
import { addProduct, getAllProducts, getProductById, markAsSelled } from "../controllers/product.controller.js";

const productsRouter = Router();

productsRouter.post('/product/add', validateSchema(addProductSchema), validateToken, addProduct);
productsRouter.post('/product/selled/:id', validateToken, validateAdmin, markAsSelled);
productsRouter.get('/product/getall', getAllProducts);
productsRouter.get('/product/:id', getProductById);

export default productsRouter;