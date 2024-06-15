import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useQueryProjectByTeacher = (teacherId: string) => {
  const { data: dataProjectByTeacher, isLoading: isLoadingProjectByTeacher } = useQuery({
    queryKey: ['ProjectByTeacher'],
    queryFn: async () => {
      const res = await axios.get(`/api/project/byTeacherId/${teacherId}`)

      console.log({ 'res...': res.data });
      return res.data
    }
  })
  return { dataProjectByTeacher, isLoadingProjectByTeacher }
}