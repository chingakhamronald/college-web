import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useQueryTeacherList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['TeacherList'],
    queryFn: async () => {
      const res = await axios.get('/api/user/teacher');
      return res.data;
    }
  });
  return { data, isLoading };
};
