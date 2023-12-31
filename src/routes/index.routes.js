import { Router } from "express";

// Routes
import userRouter from "./user.routes.js";
import productsRouter from "./products.routes.js";

const router = Router();
router.use(userRouter);
router.use(productsRouter);

export default router;