import { IQuestionProps } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

export const useMutationAssignProject = (teacherId: string) => {
  const queryClient = useQueryClient()

  const { mutate: mutateAssignProject, isPending: isPendingAssignProject } = useMutation({
    mutationKey: ['AssignProject'],
    mutationFn: async (postdata: IQuestionProps) => {
      const res = await axios.post(`/api/project/byTeacherId/${teacherId}`, postdata)

      console.log({ 'res...': res.data });

      return res.data
    },
    onSuccess: (data) => {
      console.log({ 'data': data });

      if (data) {
        queryClient.invalidateQueries({ queryKey: ['ProjectByTeacher'] })
        queryClient.invalidateQueries({ queryKey: ['ProjectByStudent'] })
      }
    }
  },)
  return { mutateAssignProject, isPendingAssignProject }
}