import { IStudentProps } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useMutationStudent = (userId: string) => {
  const router = useRouter()


  const { mutate: mutateStudent, isPending: isLoadingStudent } = useMutation({
    mutationKey: ['Teacher'],
    mutationFn: async (data: IStudentProps) => {
      const res = await axios.post(`/api/student/create/${userId}`, data);
      return res.data;
    },
    onSuccess: (data) => {
      console.log({ 'data': data });

      if (data) {
        toast.success('Student account created successfully')
        router.push("/")
      }
    },
    onError: (error) => {
      console.log({ 'error': error });
    }
  });
  return { mutateStudent, isLoadingStudent };
}