import React from 'react';
import { ITodo } from '~/types';

import { ReactComponent as CheckIcon } from '~/assets/check_icon.svg';
import { ReactComponent as UncheckIcon } from '~/assets/uncheck_icon.svg';
import { ReactComponent as BinIcon } from '~/assets/bin_icon.svg';

import styles from './styles.module.scss';
import { Filter } from '../side-bar/side-bar';
import { getTimeElapsed } from '~/utils/time-ago';

interface TodoCardProps {
  todo: ITodo;
  onPressComplete: (todo: ITodo) => void;
  onPressDelete: (_id: string | null | undefined) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onPressComplete, onPressDelete }) => {
  return (
    <div className={styles['container']}>
      <div className={styles['content-container']}>
        <div className={styles['filters-container']}>
          {todo.filters &&
            todo.filters.length > 0 &&
            todo.filters.map((filter: string, index: number) => (
              <Filter
                filter={filter}
                key={index}
                customStyle={{
                  height: '12px',
                  width: '12px',
                }}
                isHoverable={false}
              />
            ))}
        </div>
        <div className={styles['task-container']}>
          <h6 className={styles['task']}>{todo.task}</h6>
        </div>
        {todo.completed && todo.completedTime && (
          <div className={styles['completion-container']}>
            <p className={styles['completion']}>({getTimeElapsed(todo.completedTime)})</p>
          </div>
        )}
      </div>

      <div className={styles['icons-container']}>
        <div className={styles['icon-container']}>
          {todo.completed ? (
            <CheckIcon className={styles['icon']} width={20} height={20} onClick={() => onPressComplete(todo)} />
          ) : (
            <UncheckIcon className={styles['icon']} width={20} height={20} onClick={() => onPressComplete(todo)} />
          )}
        </div>
        <div className={styles['icon-container']}>
          <BinIcon className={styles['icon']} width={20} height={20} onClick={() => onPressDelete(todo._id)} />
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
