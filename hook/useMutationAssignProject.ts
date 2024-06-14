import { IQuestionProps } from "@/types"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useMutationAssignProject = (teacherId: string) => {
  const { mutate: mutateAssignProject, isPending: isPendingAssignProject } = useMutation({
    mutationKey: ['AssignProject'],
    mutationFn: async (postdata: IQuestionProps) => {
      const res = await axios.post(`/api/project/byTeacherId/${teacherId}`, postdata)

      console.log({ 'res...': res.data });

      return res.data
    }
  })
  return { mutateAssignProject, isPendingAssignProject }
}