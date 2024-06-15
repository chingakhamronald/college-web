import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useQueryUserById = (userId: string) => {
  const { data: userIdData, isLoading: isLoadingUserData } = useQuery({
    queryKey: ["UserById"],
    queryFn: async () => {
      const res = await axios.get(`/api/user/${userId}`);
      return res.data;
    },
  });
  return { userIdData, isLoadingUserData };
};
