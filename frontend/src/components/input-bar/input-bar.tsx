import React from 'react';

import styles from './styles.module.scss';
import { Filter } from '../side-bar/side-bar';

import { filters } from '~/constants';

import { ReactComponent as Icon } from '~/assets/icon.svg';

type InputBarProps = {
  task: string;
  setTask: (task: string) => void;
  onPressAdd: () => void;
  onPressAddFilter: (filter: string) => void;
};

const InputBar: React.FC<InputBarProps> = ({ task, setTask, onPressAdd, onPressAddFilter }) => {
  return (
    <div className={styles['container']}>
      <div className={styles['form-container']}>
        <div className={styles['filter-container']}>
          <Filter
            filter={filters.personal}
            onPressFilter={onPressAddFilter}
            customStyle={{
              width: '15px',
              height: '15px',
            }}
            isHoverable={false}
          />
          <Filter
            filter={filters.work}
            onPressFilter={onPressAddFilter}
            customStyle={{
              width: '15px',
              height: '15px',
            }}
            isHoverable={false}
          />
          <Filter
            filter={filters.urgent}
            onPressFilter={onPressAddFilter}
            customStyle={{
              width: '15px',
              height: '15px',
            }}
            isHoverable={false}
          />
        </div>
        <div className={styles['input-container']}>
          <input
            type="text"
            placeholder="What is your next task"
            className={styles['input']}
            value={task}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTask(event.target.value)}
          />
        </div>
      </div>

      <div className={styles['control-container']}>
        <button onClick={onPressAdd} className={styles['control']}>
          <Icon width={30} height={30} />
        </button>
      </div>
    </div>
  );
};

export default InputBar;
