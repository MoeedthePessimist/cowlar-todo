import { Request, Response } from 'express';

import { APIResponse, ITodo } from '~/types';

import { addTodo, deleteTodo, filterTodos, getTodos, updateTodo } from '~/services/todo.service';

class TodoController {
  public async getTodos(req: Request, res: Response<APIResponse<ITodo[]>>): Promise<Response<APIResponse<ITodo[]>>> {
    try {
      const filters = req.query.filters;

      if (filters) {
        const todos: ITodo[] = await filterTodos(filters as string[]);
        return res.status(200).json({
          success: true,
          data: todos,
          error: null,
        });
      }

      const todos: ITodo[] = await getTodos(req.query);

      if (todos.length === 0) {
        return res.status(404).json({
          success: false,
          data: null,
          error: 'No todos found',
        });
      }

      return res.status(200).json({
        success: true,
        data: todos,
        error: null,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        data: null,
        error: 'Error fetching todos',
      });
    }
  }

  public async addTodo(req: Request, res: Response<APIResponse<ITodo>>): Promise<Response<APIResponse<ITodo>>> {
    try {
      const { task, completed, filters } = req.body;
      const newTodo: ITodo = await addTodo(task, completed, filters);
      return res.status(201).json({
        success: true,
        data: newTodo,
        error: null,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        data: null,
        error: 'Error adding todo',
      });
    }
  }

  public async updateTodo(req: Request, res: Response<APIResponse<ITodo>>): Promise<Response<APIResponse<ITodo>>> {
    try {
      const _id = req.params.id;
      const data = req.body;
      const updatedTodo: ITodo | null = await updateTodo(_id, data);

      if (!updatedTodo) {
        return res.status(404).json({
          success: false,
          data: null,
          error: 'No todo found',
        });
      }

      return res.status(200).json({
        success: true,
        data: updatedTodo,
        error: null,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        data: null,
        error: 'Error updating todo',
      });
    }
  }

  public async deleteTodo(req: Request, res: Response<APIResponse<unknown>>): Promise<Response<APIResponse<unknown>>> {
    try {
      const _id = req.params.id;
      const deletedTodo: ITodo | null = await deleteTodo(_id);

      if (!deletedTodo) {
        return res.status(404).json({
          success: false,
          data: null,
          error: 'No todo found',
        });
      }

      return res.status(200).json({
        success: true,
        data: deletedTodo,
        error: null,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        data: null,
        error: 'Error deleting todo',
      });
    }
  }
}

export default TodoController;
