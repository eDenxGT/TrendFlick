import { authAxiosInstance } from "@/api/authAxios.instance";
import type {
  IAxiosResponse,
  ICategoryResponse,
  ILoginResponse,
} from "@/types/Response";
import type { User } from "@/types/User";

export const getCategories = async (): Promise<ICategoryResponse> => {
  const response = await authAxiosInstance.get<ICategoryResponse>(
    "/categories"
  );
  return response.data;
};

export const registerUser = async (
  user: Partial<User>
): Promise<IAxiosResponse> => {
  const response = await authAxiosInstance.post<IAxiosResponse>(
    "/register",
    user
  );
  return response.data;
};

export const loginUser = async (userData: {
  identifier: string;
  password: string;
  loginMethod: "email" | "phone";
}): Promise<ILoginResponse> => {
  const response = await authAxiosInstance.post<ILoginResponse>(
    "/login",
    userData
  );
  return response.data;
};

export const logoutUser = async () => {
  const response = await authAxiosInstance.post("/logout");

  return response.data;
};
