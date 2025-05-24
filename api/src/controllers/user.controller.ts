import { Request, Response } from "express";
import { CustomRequest } from "../middlewares/auth.middleware";
import { UserModel } from "../models/user.model";
import { AppError } from "../utils/appError";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants/messages";
import { handleErrorResponse } from "../utils/helpers/handleError.helper";
import { STATUS_CODE } from "../constants/statusCodes";
import bcrypt from "bcrypt";

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const { id } = (req as CustomRequest).user;

    const user = await UserModel.findOne({ userId: id }).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new AppError(ERROR_MESSAGES.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    res.status(STATUS_CODE.OK).json({
      success: true,
      data: { user },
    });
  } catch (error) {
    handleErrorResponse(error);
  }
};

export const updateUserDetails = async (req: Request, res: Response) => {
  try {
    const { id } = (req as CustomRequest).user;
    const { firstName, lastName, email, phone, dob, preferences } = req.body;

    const user = await UserModel.findOne({ userId: id }).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new AppError(ERROR_MESSAGES.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    if (email) {
      const userByEmail = await UserModel.findOne({
        email,
        userId: { $ne: id },
      });
      if (userByEmail) {
        throw new AppError(
          ERROR_MESSAGES.EMAIL_EXISTS,
          STATUS_CODE.BAD_REQUEST
        );
      }
    }

    if (phone) {
      const userByPhone = await UserModel.findOne({
        phone,
        userId: { $ne: id },
      });
      if (userByPhone) {
        throw new AppError(
          ERROR_MESSAGES.PHONE_EXISTS,
          STATUS_CODE.BAD_REQUEST
        );
      }
    }

    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    if (email) {
      user.email = email;
    }
    if (phone) {
      user.phone = phone;
    }
    if (dob) {
      user.dob = dob;
    }
    if (preferences) {
      user.preferences = preferences;
    }

    await user.save();

    res.status(STATUS_CODE.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.UPDATED_SUCCESS,
      data: { user },
    });
  } catch (error) {
    handleErrorResponse(error);
  }
};

export const updateUserPassword = async (req: Request, res: Response) => {
  try {
    const { id } = (req as CustomRequest).user;
    const { currentPassword, newPassword } = req.body;

    const user = await UserModel.findOne({ userId: id }).select(
      "-refreshToken"
    );
    if (!user) {
      throw new AppError(ERROR_MESSAGES.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      throw new AppError(
        ERROR_MESSAGES.WRONG_PASSWORD,
        STATUS_CODE.UNAUTHORIZED
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(STATUS_CODE.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.UPDATED_SUCCESS,
    });
  } catch (error) {
    handleErrorResponse(error);
  }
};
