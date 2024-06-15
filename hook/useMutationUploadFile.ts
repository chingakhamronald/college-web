
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

export const useMutationUploadFile = (studentId: string, projectId: string) => {
  const queryClient = useQueryClient()

  console.log({ 'studentId...': studentId, 'project...': projectId });


  const { mutate: mutateUploadFile, isPending: isLoadingUploadFile } = useMutation({
    mutationKey: ['UploadFile'],
    mutationFn: async (postdata: any) => {
      const res = await axios.post(`/api/docs/${projectId}/${studentId}`, postdata)

      console.log({ 'res...': res.data });

      return res.data
    },
    // onSuccess: (data) => {
    //   console.log({ 'data': data });

    //   if (data) {
    //     queryClient.invalidateQueries({ queryKey: ['ProjectByTeacher'] })
    //     queryClient.invalidateQueries({ queryKey: ['ProjectByStudent'] })
    //   }
    // }
  },)
  return {
    mutateUploadFile, isLoadingUploadFile
  }
}