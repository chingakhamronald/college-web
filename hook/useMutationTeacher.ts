import { ITeacherProps } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useMutationTeacher = (userId: string) => {
  const { mutate: mutateTeacher, isPending: isLoadingTeacher } = useMutation({
    mutationKey: ['Teacher'],
    mutationFn: async (data: ITeacherProps) => {
      const res = await axios.post(`/api/teacher/create/${userId}`, data);
      return res.data;
    },
  });
  return { mutateTeacher, isLoadingTeacher };
}