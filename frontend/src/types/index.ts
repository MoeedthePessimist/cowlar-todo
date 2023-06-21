export type ITodo = {
  _id?: string;
  task: string;
  completed: boolean;
  completedTime?: Date | null;
  createdAt?: Date;
  filters?: string[];
};

export type APIResponse<Data> = {
  error: string | null;
  data: Data;
  success: boolean;
};
