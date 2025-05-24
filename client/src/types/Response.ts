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

export interface IUserResponse extends IAxiosResponse {
  data: { user: User };
}
