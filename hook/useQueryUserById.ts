import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useQueryUserById = (userId: string) => {

  console.log({ 'userId': userId });


  const { data: userIdData, isLoading: isLoadingUserData } = useQuery({
    queryKey: ["UserById"],
    queryFn: async () => {
      const res = await axios.get(`/api/user/${userId}`);


      console.log({ 'res...': res.data });

      return res.data;
    },
  });
  return { userIdData, isLoadingUserData };
};
