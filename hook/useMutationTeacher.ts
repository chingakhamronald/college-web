import { ITeacherProps } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useMutationTeacher = (userId: string) => {
  const router = useRouter()

  const { mutate: mutateTeacher, isPending: isLoadingTeacher } = useMutation({
    mutationKey: ['Teacher'],
    mutationFn: async (data: ITeacherProps) => {
      const res = await axios.post(`/api/teacher/create/${userId}`, data);
      return res.data;
    },
    onSuccess: (data) => {
      console.log({ 'data': data });

      if (data) {
        toast.success('Teacher account created successfully')
        router.push("/")
      }
    },
    onError: (error) => {
      console.log({ 'error': error });
    }
  });
  return { mutateTeacher, isLoadingTeacher };
}