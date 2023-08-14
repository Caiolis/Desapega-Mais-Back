import { Router } from "express";

// Schemas
import { signinSchema, signupSchema } from "../schemas/user.schema.js";

// Middlewares
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { signinValidation, signupValidation } from "../middlewares/user.middleware.js";
import { validateToken } from "../middlewares/session.middleware.js";

// Controllers
import { myInfo, signin, signup } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post('/signup', validateSchema(signupSchema), signupValidation, signup);
userRouter.post('/signin', validateSchema(signinSchema), signinValidation, signin);
userRouter.get('/me', validateToken, myInfo)

export default userRouter