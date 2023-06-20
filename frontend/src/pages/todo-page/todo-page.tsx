import React, { useEffect } from 'react';

import styles from './styles.module.scss';
// dummy data
import { dummyTodos } from '~/data/todos.json';
import { ITodo } from '~/types/todo.types';
import InputBar from '~/components/input-bar/input-bar';
import TodoCard from '~/components/todo-card/todo-card';
import { ADD_TODO, DELETE_TODO, GET_ALL_TODOS, UPDATE_TODO } from '~/graphql';
import { useMutation, useQuery } from '@apollo/client';

const TodoPage = () => {
  const { loading, error, data } = useQuery(GET_ALL_TODOS, {
    variables: { filters: [] },
  });

  const [addTodo] = useMutation(ADD_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);

  const [todos, setTodos] = React.useState<any>([]);
  const [task, setTask] = React.useState<string>('');
  const [filters, setFilters] = React.useState<string[]>([]);

  const handlePressAdd = async () => {
    await addTodo({
      variables: {
        task: task,
        completed: false,
        completedTime: null,
        createdAt: new Date(),
        filters: filters,
      },
      refetchQueries: [
        {
          query: GET_ALL_TODOS,
        },
      ],
    });
  };

  const handlePressComplete = async (todo: ITodo) => {
    const completed = !todo.completed;
    const { _id } = todo;

    await updateTodo({
      variables: {
        _id: _id,
        completed: completed,
        completedTime: completed ? new Date() : null,
      },
      refetchQueries: [
        {
          query: GET_ALL_TODOS,
        },
      ],
    });
  };

  const handlePressFilter = (filter: string) => {
    if (filters.includes(filter)) {
      setFilters(filters.filter((f: string) => f !== filter));
    } else {
      setFilters([...filters, filter]);
    }
  };

  React.useEffect(() => {
    setTodos(dummyTodos);
  }, []);

  return (
    <div className={styles['container']}>
      <div className={styles['input-container']}>
        <InputBar task={task} setTask={setTask} onPressAdd={handlePressAdd} onPressAddFilter={handlePressFilter} />
      </div>

      <div className={styles['todos-container']}>
        {todos.map((todo: ITodo, index: number) => (
          <div key={index} className={styles['todo-container']}>
            <TodoCard todo={todo} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoPage;
