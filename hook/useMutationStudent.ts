import { IStudentProps } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useMutationStudent = (userId: string) => {
  const { mutate: mutateStudent, isPending: isLoadingStudent } = useMutation({
    mutationKey: ['Teacher'],
    mutationFn: async (data: IStudentProps) => {
      const res = await axios.post(`/api/student/create/${userId}`, data);
      return res.data;
    },
  });
  return { mutateStudent, isLoadingStudent };
}