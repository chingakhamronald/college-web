import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useQueryUploadFileByStudent = (projectId: string, studentId: string) => {
  const { data: viewFileByStudent, isLoading: isLoadingViewFileByStudent } = useQuery({
    queryKey: ['UploadFileByStudent'],
    queryFn: async () => {
      const res = await axios.get(`/api/docs/${projectId}/${studentId}`)
      console.log({ 'res...': res.data });
      return res.data
    }
  })

  return { viewFileByStudent, isLoadingViewFileByStudent };
}
