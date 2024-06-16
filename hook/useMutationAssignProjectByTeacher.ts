import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useMutationAssignProjectByTeacher = (projectId: string) => {
  const queryClient = useQueryClient();

  const { mutate: mutateAssignProjectByTeacher, isPending: isPendingAssignProjectByTeacher } = useMutation({
    mutationKey: ['AssignProjectByTeacher'],
    mutationFn: async () => {
      const res = await axios.post(`/api/assign-project/${projectId}`,)

      console.log({ 'res...': res.data });

      return res.data
    },
    onSuccess: (data) => {
      console.log({ 'data': data });

      if (data) {
        queryClient.invalidateQueries({ queryKey: ['ProjectById'] })
      }
    }
  },)
  return { mutateAssignProjectByTeacher, isPendingAssignProjectByTeacher }
}