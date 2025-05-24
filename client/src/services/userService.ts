import { privateAxiosInstance } from "@/api/privateAxios.instance";
import type { IAxiosResponse, IUserResponse } from "@/types/Response";
import type { User } from "@/types/User";

export const getUserDetails = async (): Promise<IUserResponse> => {
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
