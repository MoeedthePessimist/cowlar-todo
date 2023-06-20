import TodoModel from '~/models/todo.model';

class TodoService {
  public async getTodos(filters: unknown): Promise<(typeof TodoModel)[]> {
    return await TodoModel.find(filters);
  }

  public async addTodo(
    task: string,
    completed: boolean,
    completedTime: Date,
    createdAt: Date,
    filters: string[],
  ): Promise<typeof TodoModel | unknown> {
    const newTodo = new TodoModel({
      task,
      completed,
      completedTime,
      createdAt,
      filters,
    });

    return await newTodo.save();
  }

  public async updateTodo(
    _id: string,
    task: string,
    completed: boolean,
    completedTime: Date,
    createdAt: Date,
    filters: string[],
  ): Promise<typeof TodoModel | null> {
    return await TodoModel.findByIdAndUpdate(
      _id,
      {
        task,
        completed,
        completedTime,
        createdAt,
        filters,
      },
      { new: true },
    );
  }

  public async deleteTodo(_id: string): Promise<typeof TodoModel | null> {
    return await TodoModel.findByIdAndDelete(_id);
  }
}

export default TodoService;
