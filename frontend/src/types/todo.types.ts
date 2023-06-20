export type ITodo = {
  _id?: string | number;
  task: string;
  completed: boolean;
  completedTime: Date | null;
  createdAt: Date;
  filters?: string[];
};
