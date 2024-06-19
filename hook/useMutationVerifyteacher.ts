import { IQuestionProps } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

export const useMutationVerifyTeacher = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['VerifyTeacher'],
    mutationFn: async (userId: string) => {
      const res = await axios.put(`/api/user/verification/${userId}`);

      return res.data;
    },
    onSuccess: data => {
      toast.success('Verified');

      if (data) {
        queryClient.invalidateQueries({ queryKey: ['TeacherById'] });
      }
    },
    onError: error => {
      console.log({ error });
      toast.error(error.message);
    }
  });
  return { mutate, isPending };
};
