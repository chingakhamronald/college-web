import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useQueryTeacherById = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['TeacherById'],
    queryFn: async () => {
      const res = await axios.get(`/api/teacher/${id}`);
      return res.data;
    }
  });
  return { data, isLoading };
};
