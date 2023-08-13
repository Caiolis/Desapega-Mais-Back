import { Router } from "express";

// Schemas
import { signupSchema } from "../schemas/user.schema.js";

// Middlewares
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { signupValidation } from "../middlewares/user.middleware.js";

// Controllers
import { signup } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post('/signup', validateSchema(signupSchema), signupValidation, signup);

export default userRouter