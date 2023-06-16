import React from 'react';
import { ITodo } from '~/types/todo.types';

import styles from './styles.module.scss';

interface TodoCardProps {
  todo: ITodo;
  isOptionsOpen: boolean;
  onOptionsOpen: () => void;
}

const TodoCard: React.FC<TodoCardProps> = () => {
  return <div className={styles['container']}>TodoCard</div>;
};

export default TodoCard;
