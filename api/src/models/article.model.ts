import { model, Schema } from "mongoose";
import { IArticle } from "../types/article";

const articleSchema: Schema<IArticle> = new Schema(
  {
    articleId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    categoryId: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    upVotes: {
      type: [String],
      default: [],
    },
    downVotes: {
      type: [String],
      default: [],
    },
    blockedBy: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const ArticleModel = model<IArticle>("Article", articleSchema);
