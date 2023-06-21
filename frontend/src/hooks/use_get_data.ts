// use get data hook that should take the getter function as a parameter and return data, loading state and error state

import { useState } from 'react';
import { APIResponse, ITodo } from '~/types';

export const useGetData = () => {
  const [ data, setData ] = useState<ITodo[]>([]);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<string>('');

  const getData = async (responseData: Promise<APIResponse<ITodo[]>>) => {
    setLoading(true);
    try {
      const {
        data: todos,
        error: e,
        success,
      }: { data: ITodo[]; error: string | null; success: boolean } = await responseData;
      if (!success) {
        throw e;
      }
      setData(todos);
      setError('');
    } catch (err) {
      console.error(err);
      setError("Couldn't fetch todos");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, getData };
};
