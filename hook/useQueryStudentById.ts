import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useQueryStudentById = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['StudentById'],
    queryFn: async () => {
      const res = await axios.get(`/api/student/${id}`);
      return res.data;
    }
  });
  return { data, isLoading };
};
