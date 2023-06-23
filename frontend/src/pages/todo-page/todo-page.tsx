/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import styles from './styles.module.scss';
// dummy data
import { ITodo } from '~/types';
import InputBar from '~/components/input-bar/input-bar';
import TodoCard from '~/components/todo-card/todo-card';
import { createTodo, deleteTodo, getTodos, updateTodo } from '~/services/todo.service';
import { useGetData } from '~/hooks/use_get_data';
import { Filter } from '~/components/side-bar/side-bar';

import { ReactComponent as CrossIcon } from '~/assets/cross_icon.svg';
import Loader from '~/components/loader/loader';
import Error from '~/components/error/error';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type TodoPageProps = {
  searchFilters: string[];
  onPressSearchFilters: (searchFilter: string) => void;
};

const TodoPage: React.FC<TodoPageProps> = ({ searchFilters, onPressSearchFilters }) => {
  const [ task, setTask ] = useState<string>('');
  const [ filters, setFilters ] = useState<string[]>([]);
  const [ formError, setFormError ] = useState<boolean>(false);

  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  const { data: todos, loading, error, getData, setError } = useGetData();

  const populateData = () => {
    getData(getTodos(searchFilters));
  };

  useEffect(() => {
    populateData();
  }, [ searchFilters ]);

  const showToast = (type: 'success' | 'error' | 'warning' | 'info' | 'dark', message: string) => {
    toast[type](message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  useEffect(() => {
    if (error) {
      showToast('error', error);
    }
  }, [ error ]);

  useEffect(() => {
    if (isLoading) {
      showToast('info', 'Loading ....');
    }
  }, [ isLoading ]);

  const handlePressAdd = async () => {
    if (task === '' || filters.length === 0) {
      setFormError(true);
      return;
    }

    setFormError(false);

    const todo: ITodo = {
      completed: false,
      task: task,
      filters: filters,
    };

    try {
      setIsLoading(true);
      await createTodo(todo);

      setTask('');
      setFilters([]);

      showToast('success', 'Todo added successfully');

      populateData();
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePressComplete = async (todo: ITodo) => {
    const data = {
      _id: todo._id,
      completed: !todo.completed,
      completedTime: todo.completed ? null : new Date(),
    };

    try {
      setIsLoading(true);
      await updateTodo(data);

      showToast('success', 'Todo updated successfully');

      populateData();
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePressDelete = async (_id: string | null | undefined) => {
    try {
      setIsLoading(true);
      await deleteTodo(_id);

      showToast('success', 'Todo deleted successfully');

      populateData();
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePressFilter = (filter: string) => {
    if (filters.includes(filter)) {
      setFilters(filters.filter((f: string) => f !== filter));
    } else {
      setFilters([ ...filters, filter ]);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handlePressAdd();
    }
  };

  return (
    <div className={styles['container']}>
      <ToastContainer />
      <div className={styles['input-container']}>
        <InputBar
          task={task}
          setTask={setTask}
          onPressAdd={handlePressAdd}
          onPressFilter={handlePressFilter}
          addedFilters={filters}
          onPressEnter={handleKeyPress}
        />
        {formError && <div className={styles['form-error']}>Please add a task and select filters</div>}
      </div>

      {searchFilters.length > 0 && (
        <div className={styles['filters-container']}>
          <div className={styles['filters-content']}>
            <h2>Filters</h2>
            {searchFilters.map((filter: string, index: number) => {
              return (
                <div key={index} className={styles['filter-preview']}>
                  <div className={styles['filter-preview-content']}>
                    <Filter
                      filter={filter}
                      customStyle={{
                        height: '20px',
                        width: '20px',
                      }}
                      isHoverable={false}
                    />
                    <div className={styles['filter-text']}>{filter}</div>
                  </div>
                  {/* cross icon */}
                  <CrossIcon
                    className={styles['cross-icon']}
                    width={30}
                    height={30}
                    onClick={() => onPressSearchFilters(filter)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {loading && <Loader message="Loading Todos...." />}

      {error && <Error message={error} />}

      <div className={styles['todos-container']}>
        {todos.map((todo: ITodo, index: number) => (
          <div key={index} className={styles['todo-container']}>
            <TodoCard todo={todo} onPressComplete={handlePressComplete} onPressDelete={handlePressDelete} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoPage;
