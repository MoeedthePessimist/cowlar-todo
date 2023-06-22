// use get data hook that should take the getter function as a parameter and return data, loading state and error state

import { useState } from 'react';
import { APIResponse, ITodo } from '~/types';

export const useGetData = () => {
  const [data, setData] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);

      if (err instanceof Error) {
        setError(err.message);
      }

      if (typeof err === 'string') {
        setError(err);
      }

      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, getData, setError };
};
