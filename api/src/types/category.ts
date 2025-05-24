import { Document } from "mongoose";

export interface ICategory {
  categoryId: string;
  name: string;
  slug: string;
  createdBy: string;
  createdAt: Date;
}

export interface CategoryDocument extends Document, ICategory {}
