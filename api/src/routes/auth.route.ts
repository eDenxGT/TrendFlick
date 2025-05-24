import { Router } from "express";
import { validate } from "../middlewares/validator.middleware";
import asyncHandler from "express-async-handler";
import { userRegisterSchema, userLoginSchema } from "../utils/validators/userAuth.validator";
import { login, logout, refreshToken, register } from "../controllers/auth.controller";
import { getCategories } from "../controllers/category.controller";

const router = Router();

router.post("/register", validate(userRegisterSchema), asyncHandler(register));

router.post("/login", validate(userLoginSchema), asyncHandler(login));

router.get("/categories", asyncHandler(getCategories));

router.post("/refresh-token", asyncHandler(refreshToken));

router.post("/logout", asyncHandler(logout));

export default router;
