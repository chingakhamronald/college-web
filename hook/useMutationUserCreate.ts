import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"

export const useMutationUserCreate = () => {

  const router = useRouter()

  const { mutate: mutateUserCreate, isPending: isPendingUserCreate, data: userData } = useMutation({
    mutationKey: ['UserCreate'],
    mutationFn: async (postdata: any) => {
      console.log({ 'postdata': postdata });

      const res = await axios.post(`/api/user`, postdata)


      return res.data
    },
    onSuccess: (data) => {
      console.log({ 'data': data });
      if (data.role === "student") {
        router.push(`/register/student/${data?.id}`);
      } else {
        router.push(`/register/teacher/${data?.id}`);
      }
    },
    onError: (error) => {
      console.log({ 'error': error });
    }
  },)
  return { mutateUserCreate, isPendingUserCreate, userData }
}