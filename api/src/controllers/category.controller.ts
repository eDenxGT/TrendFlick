import { Request, Response } from "express";
import { AppError } from "../utils/appError";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants/messages";
import { STATUS_CODE } from "../constants/statusCodes";
import { CategoryModel } from "../models/category.model";
import slugify from "slugify";
import { generateUniqueId } from "../utils/helpers/generateUuid.helper";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, createdBy } = req.body;

    const slug = slugify(name, { lower: true, strict: true });

    const existing = await CategoryModel.findOne({ slug });

    if (existing) {
      throw new AppError(ERROR_MESSAGES.CATEGORY_EXISTS, STATUS_CODE.CONFLICT);
    }

    const newCategory = await CategoryModel.create({
      name,
      slug,
      createdBy,
      categoryId: generateUniqueId("category"),
    });

    res.status(STATUS_CODE.CREATED).json({
      success: true,
      message: SUCCESS_MESSAGES.CATEGORY_CREATED,
      data: { category: newCategory },
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      ERROR_MESSAGES.SERVER_ERROR,
      STATUS_CODE.INTERNAL_SERVER_ERROR
    );
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryModel.find();
    res.status(STATUS_CODE.OK).json({
      success: true,
      data: { categories },
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      ERROR_MESSAGES.SERVER_ERROR,
      STATUS_CODE.INTERNAL_SERVER_ERROR
    );
  }
};
