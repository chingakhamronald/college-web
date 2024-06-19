import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useQueryStudentList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['StudentList'],
    queryFn: async () => {
      const res = await axios.get('/api/user/student');
      return res.data;
    }
  });
  return { data, isLoading };
};
