import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useQueryProjectById = (projectId: string) => {
  const { data: dataProjectById, isLoading: isLoadingProjectById } = useQuery({
    queryKey: ['ProjectById'],
    queryFn: async () => {
      const res = await axios.get(`/api/project/${projectId}`)
      console.log({ 'res...': res.data });
      return res.data
    }
  })
  return { dataProjectById, isLoadingProjectById }
}