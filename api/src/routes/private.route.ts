import { Router } from "express";
// import { verifyAuth } from "../middlewares/auth.middleware";
import asyncHandler from "express-async-handler";
import { createCategory } from "../controllers/category.controller";
import { verifyAuth } from "../middlewares/auth.middleware";
import {
  getUserDetails,
  updateUserDetails,
  updateUserPassword,
} from "../controllers/user.controller";

const router = Router();

router.post("/category", verifyAuth, asyncHandler(createCategory));

router
  .route("/user/details")
  .get(verifyAuth, asyncHandler(getUserDetails))
  .put(verifyAuth, asyncHandler(updateUserDetails))
  .patch(verifyAuth, asyncHandler(updateUserPassword));

export default router;
