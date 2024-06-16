import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useQueryUploadFileByTeacher = (projectId: string, studentId: string) => {
  const { data: viewFileByTeacher, isLoading: isLoadingViewFileByTeacher } = useQuery({


    queryKey: ['UploadFileByTeacher'],
    queryFn: async () => {
      console.log({ 'projectId...': projectId, 'studentId...': studentId });
      const res = await axios.get(`/api/docs/${projectId}/bystudentId/${studentId}`)
      console.log({ 'res...': res.data });
      return res.data
    }
  })

  return { viewFileByTeacher, isLoadingViewFileByTeacher };
}