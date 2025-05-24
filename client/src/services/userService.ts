import { privateAxiosInstance } from "@/api/privateAxios.instance";
import type { Article } from "@/types/Article";
import type {
  IArticlesResponse,
  IAxiosResponse,
  ISingleArticleResponse,
  ISingleUserResponse,
  IUserDetailsResponse,
} from "@/types/Response";
import type { User } from "@/types/User";

export const getUserDetails = async (): Promise<ISingleUserResponse> => {
  const response = await privateAxiosInstance.get("/user/details");
  return response.data;
};

export const updateUserDetails = async (
  user: Partial<User>
): Promise<IAxiosResponse> => {
  const response = await privateAxiosInstance.put("/user/details", user);
  return response.data;
};

export const updatePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<IAxiosResponse> => {
  const response = await privateAxiosInstance.patch("/user/details", {
    currentPassword,
    newPassword,
  });
  return response.data;
};

export const createArticle = async (
  article: Partial<Article>
): Promise<IAxiosResponse> => {
  const response = await privateAxiosInstance.post("/article", article);
  return response.data;
};

export const getArticlesByUser = async (): Promise<IArticlesResponse> => {
  const response = await privateAxiosInstance.get("/my-articles");
  return response.data;
};

export const getArticleById = async (
  articleId: string
): Promise<ISingleArticleResponse | null> => {
  const response = await privateAxiosInstance.get(`/article/${articleId}`);
  return response.data;
};

export const updateArticle = async (
  articleId: string,
  article: Partial<Article>
): Promise<IAxiosResponse> => {
  const response = await privateAxiosInstance.put(
    `/article/${articleId}`,
    article
  );
  return response.data;
};

export const deleteArticle = async (
  articleId: string
): Promise<IAxiosResponse> => {
  const response = await privateAxiosInstance.delete(`/article/${articleId}`);
  return response.data;
};

export const getUsersDetailsByTypeAndArticleId = async (
  type: string,
  articleId: string
): Promise<IUserDetailsResponse> => {
  if (!articleId) return {} as IUserDetailsResponse;
  const response = await privateAxiosInstance.get(
    `/articles/${articleId}/users/${type}`
  );
  return response.data;
};

export const getArticlesByPreferances =
  async (): Promise<IArticlesResponse> => {
    const response = await privateAxiosInstance.get("/articles");
    return response.data;
  };

export const voteArticle = async (
  articleId: string,
  voteType: "upvote" | "downvote"
): Promise<IAxiosResponse> => {
  const response = await privateAxiosInstance.patch(`/articles/${articleId}/vote`, {
    voteType,
  });
  return response.data;
};

export const blockArticle = async (articleId: string): Promise<IAxiosResponse> => {
  const response = await privateAxiosInstance.patch(`/articles/${articleId}/block`);
  return response.data;
};
