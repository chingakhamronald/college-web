
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "react-toastify"


export const useMutationUploadFile = (studentId: string, projectId: string) => {
  const queryClient = useQueryClient()

  const { mutate: mutateUploadFile, isPending: isLoadingUploadFile } = useMutation({
    mutationKey: ['UploadFile'],
    mutationFn: async (postdata: any) => {
      const res = await axios.post(`/api/docs/${projectId}/${studentId}`, postdata)
      return res.data
    },
    onSuccess: (data) => {
      console.log({ 'data.....': data });

      if (data) {
        queryClient.invalidateQueries({ queryKey: ['ProjectById'] })
        toast.success('File uploaded successfully')
      }
    }
  },)
  return {
    mutateUploadFile, isLoadingUploadFile
  }
}