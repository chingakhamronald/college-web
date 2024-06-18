import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useQueryUserList = () => {
  const { data: userDataList, isLoading } = useQuery({
    queryKey: ['UserList'],
    queryFn: async () => {
      const res = await axios.get('/api/user');
      return res.data;
    }
  });
  return { userDataList, isLoading };
};
