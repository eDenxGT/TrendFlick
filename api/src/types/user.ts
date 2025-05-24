import { Document } from "mongoose";

export interface IUser {
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  dob: Date;
  preferences: string[];
  refreshToken: string;
}

export interface UserDocument extends Document, IUser {}
