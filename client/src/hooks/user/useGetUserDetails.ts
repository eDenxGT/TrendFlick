import { getUserDetails } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";
import type { ISingleUserResponse } from "@/types/Response";

export const useGetUserDetails = () => {
  return useQuery<ISingleUserResponse>({
    queryKey: ["user-details"],
    queryFn: () => getUserDetails(),
    refetchOnMount: true,
  });
};
