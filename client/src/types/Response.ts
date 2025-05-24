import type { Article } from "./Article";
import type { Category } from "./Category";
import type { User } from "./User";

export interface IAxiosResponse {
  success: boolean;
  message: string;
}

export interface ILoginResponse extends IAxiosResponse {
  data: { user: User };
}

export interface ICategoryResponse extends IAxiosResponse {
  data: { categories: Category[] };
}

export interface ISingleUserResponse extends IAxiosResponse {
  data: { user: User };
}

export interface IUserDetailsResponse extends IAxiosResponse {
  data: { users: User[] };
}

export interface IArticlesResponse extends IAxiosResponse {
  data: { articles: Article[] };
}

export interface ISingleArticleResponse extends IAxiosResponse {
  data: { article: Article };
}
