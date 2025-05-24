import { getUserDetails } from "@/services/userService";
import type { IUserResponse } from "@/types/Response";
import { useQuery } from "@tanstack/react-query";

export const useGetUserDetails = () => {
  return useQuery<IUserResponse>({
    queryKey: ["user-details"],
    queryFn: () => getUserDetails(),
    refetchOnMount: true,
  });
};
