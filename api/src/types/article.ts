import { Document } from "mongoose";

export interface IArticle {
  articleId: string;
  title: string;
  description: string;
  image: string;
  categoryId: string;
  createdBy: string;
  upVotes: string[];
  downVotes: string[];
  blockedBy: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IArticleDocument extends IArticle, Document {}
