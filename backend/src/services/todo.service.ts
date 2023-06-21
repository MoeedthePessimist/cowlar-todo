import TodoModel from '~/models/todo.model';
import { ITodo } from '~/types';

export async function getTodos(filters: unknown): Promise<ITodo[]> {
  return await TodoModel.find(filters);
}

export async function addTodo(task: string, completed: boolean, filters: string[]): Promise<ITodo> {
  const newTodo = new TodoModel({
    task,
    completed,
    filters,
  });

  return await newTodo.save();
}

export async function updateTodo(_id: string, data: unknown): Promise<ITodo | null> {
  return await TodoModel.findByIdAndUpdate(_id, { $set: data }, { new: true });
}

export async function deleteTodo(_id: string): Promise<ITodo | null> {
  return await TodoModel.findByIdAndDelete(_id);
}

export async function filterTodos(filters: string[]): Promise<ITodo[]> {
  return await TodoModel.find({ filters: { $in: filters } });
}
