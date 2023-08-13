import { Router } from "express";

// Routes
import userRouter from "./user.routes.js";

const router = Router();
router.use(userRouter);

export default router;