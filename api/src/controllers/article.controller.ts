import { Request, Response } from "express";
import { ArticleModel } from "../models/article.model";
import { IArticle } from "../types/article";
import { handleErrorResponse } from "../utils/helpers/handleError.helper";
import { CustomRequest } from "../middlewares/auth.middleware";
import { generateUniqueId } from "../utils/helpers/generateUuid.helper";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants/messages";
import { AppError } from "../utils/appError";
import { STATUS_CODE } from "../constants/statusCodes";
import { UserModel } from "../models/user.model";

export const createArticle = async (req: Request, res: Response) => {
  try {
    const article = req.body;
    const { id } = (req as CustomRequest).user;

    await ArticleModel.create({
      ...article,
      createdBy: id,
      articleId: generateUniqueId("article"),
    });

    res.status(201).json({
      success: true,
      message: SUCCESS_MESSAGES.CREATED_SUCCESS,
    });
  } catch (error) {
    handleErrorResponse(error);
  }
};

export const getArticlesByUser = async (req: Request, res: Response) => {
  try {
    const { id } = (req as CustomRequest).user;

    const articles = await ArticleModel.aggregate([
      {
        $match: { createdBy: id },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "categoryId",
          as: "categoryData",
        },
      },
      {
        $unwind: {
          path: "$categoryData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "userId",
          as: "creatorData",
        },
      },
      {
        $unwind: {
          path: "$creatorData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          articleId: 1,
          title: 1,
          description: 1,
          image: "$image",
          categoryId: "$categoryId",
          category: "$categoryData.name",
          createdBy: 1,
          creatorName: {
            $concat: ["$creatorData.firstName", " ", "$creatorData.lastName"],
          },
          upVotes: 1,
          downVotes: 1,
          blockedBy: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: { articles },
    });
  } catch (error) {
    handleErrorResponse(error);
  }
};

export const getArticlesByUserPreferences = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = (req as CustomRequest).user;

    const user = await UserModel.findOne({ userId: id }).lean();

    if (!user || !user.preferences || user.preferences.length === 0) {
      res.status(200).json({
        success: true,
        data: { articles: [] },
      });
      return;
    }

    const articles = await ArticleModel.aggregate([
      {
        $match: {
          categoryId: { $in: user.preferences },
          createdBy: { $ne: id },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "categoryId",
          as: "categoryData",
        },
      },
      {
        $unwind: {
          path: "$categoryData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "userId",
          as: "creatorData",
        },
      },
      {
        $unwind: {
          path: "$creatorData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          articleId: 1,
          title: 1,
          description: 1,
          image: "$image",
          categoryId: 1,
          category: "$categoryData.name",
          createdBy: 1,
          creatorName: {
            $concat: ["$creatorData.firstName", " ", "$creatorData.lastName"],
          },
          upVotes: 1,
          downVotes: 1,
          blockedBy: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: { articles },
    });
  } catch (error) {
    handleErrorResponse(error);
  }
};

export const getArticleById = async (req: Request, res: Response) => {
  try {
    const { articleId } = req.params;
    const article = await ArticleModel.findOne({ articleId });
    if (!article) {
      throw new AppError(
        ERROR_MESSAGES.ARTICLE_NOT_FOUND,
        STATUS_CODE.NOT_FOUND
      );
    }
    res.status(200).json({
      success: true,
      data: { article },
    });
  } catch (error) {
    handleErrorResponse(error);
  }
};

export const updateArticle = async (req: Request, res: Response) => {
  try {
    const { articleId } = req.params;
    const article = req.body;
    const updatedArticle = await ArticleModel.findOneAndUpdate(
      { articleId },
      article,
      { new: true }
    );
    if (!updatedArticle) {
      throw new AppError(
        ERROR_MESSAGES.ARTICLE_NOT_FOUND,
        STATUS_CODE.NOT_FOUND
      );
    }
    res.status(200).json({
      success: true,
      message: SUCCESS_MESSAGES.UPDATED_SUCCESS,
    });
  } catch (error) {
    handleErrorResponse(error);
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  try {
    const { articleId } = req.params;
    const deletedArticle = await ArticleModel.findOneAndDelete({ articleId });
    if (!deletedArticle) {
      throw new AppError(
        ERROR_MESSAGES.ARTICLE_NOT_FOUND,
        STATUS_CODE.NOT_FOUND
      );
    }
    res.status(200).json({
      success: true,
      message: SUCCESS_MESSAGES.DELETED_SUCCESS,
    });
  } catch (error) {
    handleErrorResponse(error);
  }
};

export const voteArticle = async (req: Request, res: Response) => {
  try {
    const { id: userId } = (req as CustomRequest).user;
    const { articleId } = req.params;
    const { voteType } = req.body; 

    if (!["upvote", "downvote"].includes(voteType)) {
      throw new AppError(ERROR_MESSAGES.INVALID_VOTE_TYPE, STATUS_CODE.BAD_REQUEST);
    }

    const article = await ArticleModel.findOne({ articleId });
    if (!article) {
      throw new AppError(ERROR_MESSAGES.ARTICLE_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const hasUpvoted = article.upVotes.includes(userId);
    const hasDownvoted = article.downVotes.includes(userId);

    article.upVotes = article.upVotes.filter((id) => id !== userId);
    article.downVotes = article.downVotes.filter((id) => id !== userId);

    if (voteType === "upvote" && !hasUpvoted) {
      article.upVotes.push(userId);
    }

    if (voteType === "downvote" && !hasDownvoted) {
      article.downVotes.push(userId);
    }

    await article.save();

    res.status(STATUS_CODE.OK).json({
      success: true,
    });
  } catch (error) {
    handleErrorResponse(error);
  }
};

export const blockArticle = async (req: Request, res: Response) => {
  try {
    const { id: userId } = (req as CustomRequest).user;
    const { articleId } = req.params;

    const article = await ArticleModel.findOne({ articleId });
    
    if (!article) {
      throw new AppError(ERROR_MESSAGES.ARTICLE_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    if (!article.blockedBy.includes(userId)) {
      article.blockedBy.push(userId);
      await article.save();
    }

    res.status(STATUS_CODE.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.BLOCKED_SUCCESS,
    });
  } catch (error) {
    handleErrorResponse(error);
  }
};
