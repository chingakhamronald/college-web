import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useQueryProjectByStudent = (studentId: string) => {
  const { data: dataProjectByStudent, isLoading: isLoadingProjectByStudent } = useQuery({
    queryKey: ['ProjectByStudent'],
    queryFn: async () => {
      const res = await axios.get(`/api/project/byStudentId/${studentId}`)
      console.log({ 'res...': res.data });
      return res.data
    }
  })
  return { dataProjectByStudent, isLoadingProjectByStudent }
}