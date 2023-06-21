import React from 'react';

import styles from './styles.module.scss';

import { Filter } from '~/components/side-bar/side-bar';

import { filters } from '~/constants';

import { ReactComponent as SendIcon } from '~/assets/icon.svg';
import { ReactComponent as CrossIcon } from '~/assets/cross_icon.svg';

type InputBarProps = {
  task: string;
  setTask: (task: string) => void;
  onPressAdd: () => void;
  onPressFilter: (filter: string) => void;
  addedFilters: string[];
  onPressEnter: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const InputBar: React.FC<InputBarProps> = ({
  task,
  setTask,
  onPressAdd,
  onPressFilter,
  addedFilters,
  onPressEnter,
}) => {
  return (
    <div className={styles['main']}>
      <div className={styles['container']}>
        <div className={styles['form-container']}>
          <div className={styles['filters-container']}>
            <Filter
              filter={filters.personal}
              onPressFilter={onPressFilter}
              customStyle={{
                width: '15px',
                height: '15px',
              }}
              isHoverable={false}
            />
            <Filter
              filter={filters.work}
              onPressFilter={onPressFilter}
              customStyle={{
                width: '15px',
                height: '15px',
              }}
              isHoverable={false}
            />
            <Filter
              filter={filters.urgent}
              onPressFilter={onPressFilter}
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
              data-testid="input"
              value={task}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTask(event.target.value)}
              onKeyPress={onPressEnter}
            />
          </div>
        </div>

        <div className={styles['control-container']}>
          <button onClick={onPressAdd} className={styles['control']} data-testid="add-button">
            <SendIcon width={30} height={30} />
          </button>
        </div>
      </div>
      {addedFilters.length > 0 && (
        <div className={styles['selected-filters-container']}>
          {addedFilters.map((filter: string, index: number) => (
            <div className={styles['filter']} key={index}>
              <p>{filter}</p>
              <CrossIcon width={20} height={20} className={styles['icon']} onClick={() => onPressFilter(filter)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputBar;
