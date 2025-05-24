import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants/messages";
import { STATUS_CODE } from "../constants/statusCodes";
import { AppError } from "../utils/appError";
import { Request, Response } from "express";
import {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../services/jwt.service";
import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";
import { CustomJwtPayload } from "../types/auth";
import { setCookies } from "../utils/helpers/setCookie.helper";
import { generateUniqueId } from "../utils/helpers/generateUuid.helper";
import { IUser } from "../types/user";
import { handleErrorResponse } from "../utils/helpers/handleError.helper";

export const register = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      password,
      dob,
      preferences,
    }: IUser = req.body;

    const isExists = await UserModel.findOne({ $or: [{ email }, { phone }] });

    if (isExists) {
      throw new AppError(
        ERROR_MESSAGES.EMAIL_OR_PHONE_EXISTS,
        STATUS_CODE.CONFLICT
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      userId: generateUniqueId("user"),
      email,
      phone,
      firstName,
      lastName,
      password: hashedPassword,
      dob,
      preferences,
    });

    res.status(STATUS_CODE.CREATED).json({
      success: true,
      message: SUCCESS_MESSAGES.USER_CREATED,
    });
  } catch (error) {
    handleErrorResponse(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { identifier, password }: { identifier: string; password: string } =
      req.body;

    const user = await UserModel.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (!user) {
      throw new AppError(ERROR_MESSAGES.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new AppError(
        ERROR_MESSAGES.WRONG_PASSWORD,
        STATUS_CODE.UNAUTHORIZED
      );
    }

    const accessToken = createAccessToken({
      id: user.userId,
      email: user.email,
    });
    const refreshToken = createRefreshToken({
      id: user.userId,
      email: user.email,
    });

    user.refreshToken = refreshToken;

    await user.save();

    setCookies(res, accessToken, refreshToken);

    const {
      refreshToken: _,
      password: __,
      ...userWithoutSensitive
    } = user.toObject();

    res.status(STATUS_CODE.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
      data: { user: userWithoutSensitive },
    });
  } catch (error) {
    handleErrorResponse(error);
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const accessToken = req.cookies["x-access-token"];
  const refreshToken = req.cookies["x-refresh-token"];

  if (!refreshToken) {
    throw new AppError(ERROR_MESSAGES.TOKEN_MISSING, STATUS_CODE.UNAUTHORIZED);
  }

  let shouldRefresh = false;

  try {
    verifyAccessToken(accessToken);
    res.status(STATUS_CODE.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.TOKEN_VALID,
    });
    return;
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      shouldRefresh = true;
    } else {
      throw new AppError(
        ERROR_MESSAGES.TOKEN_INVALID,
        STATUS_CODE.UNAUTHORIZED
      );
    }
  }

  if (shouldRefresh) {
    try {
      const decoded: any = verifyRefreshToken(refreshToken);
      const user = await UserModel.findOne({ userId: decoded.id });

      if (!user || user.refreshToken !== refreshToken) {
        throw new AppError(
          ERROR_MESSAGES.TOKEN_INVALID_REUSED,
          STATUS_CODE.UNAUTHORIZED
        );
      }

      const payload: CustomJwtPayload = {
        id: user.userId,
        email: user.email,
      };

      const newAccessToken = createAccessToken(payload);

      const newRefreshToken = createRefreshToken(payload);

      user.refreshToken = newRefreshToken;

      await user.save();

      setCookies(res, newAccessToken, newRefreshToken);

      res.status(STATUS_CODE.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.SESSION_RENEWED,
      });
    } catch (err) {
      throw new AppError(
        ERROR_MESSAGES.REFRESH_TOKEN_INVALID,
        STATUS_CODE.UNAUTHORIZED
      );
    }
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("x-access-token");
  res.clearCookie("x-refresh-token");

  res
    .status(STATUS_CODE.OK)
    .json({ success: true, message: SUCCESS_MESSAGES.LOGOUT_SUCCESS });
};
