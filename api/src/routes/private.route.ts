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
import {
  createArticle,
  deleteArticle,
  getArticleById,
  getArticlesByUser,
  getArticlesByUserPreferences,
  updateArticle,
} from "../controllers/article.controller";
import { getUsersByTypeAndArticleId } from "../controllers/user.controller";

const router = Router();

router.post("/category", verifyAuth, asyncHandler(createCategory));

router
  .route("/user/details")
  .get(verifyAuth, asyncHandler(getUserDetails))
  .put(verifyAuth, asyncHandler(updateUserDetails))
  .patch(verifyAuth, asyncHandler(updateUserPassword));

router.post("/article", verifyAuth, asyncHandler(createArticle));

router.get("/my-articles", verifyAuth, asyncHandler(getArticlesByUser));

router
  .route("/article/:articleId")
  .get(verifyAuth, asyncHandler(getArticleById))
  .put(verifyAuth, asyncHandler(updateArticle))
  .delete(verifyAuth, asyncHandler(deleteArticle));

router.get("/articles", verifyAuth, asyncHandler(getArticlesByUserPreferences));

router.get(
  "/articles/:articleId/users/:type",
  verifyAuth,
  asyncHandler(getUsersByTypeAndArticleId)
);
export default router;
