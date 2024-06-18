import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useMutationUserCreate = () => {

  const { mutate: mutateUserCreate, isPending: isPendingUserCreate } = useMutation({
    mutationKey: ['UserCreate'],
    mutationFn: async (postdata: any) => {
      console.log({ 'postdata': postdata });

      const res = await axios.post(`/api/user`, postdata)

      console.log({ 'res...': res.data });

      return res.data
    },
  },)
  return { mutateUserCreate, isPendingUserCreate }
}