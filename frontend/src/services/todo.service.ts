import { APIResponse, ITodo } from '~/types';
import api from '~/utils/api';

export const getTodos = async (filters: string[] | null): Promise<APIResponse<ITodo[]>> => {
  const { data }: { data: APIResponse<ITodo[]> } = await api.get('/api/todos', {
    params: {
      filters,
    },
  });

  return data;
};

export const createTodo = async (todo: ITodo) => {
  const { data } = await api.post('/api/todos', todo);
  return data;
};

export const updateTodo = async (updateData: {
  _id: string | undefined | number;
  completed: boolean;
  completedTime: Date | null;
}) => {
  const { data } = await api.patch(`/api/todos/${updateData._id}`, updateData);
  return data;
};

export const deleteTodo = async (id: string | null | undefined) => {
  const { data } = await api.delete(`/api/todos/${id}`);

  return data;
};
