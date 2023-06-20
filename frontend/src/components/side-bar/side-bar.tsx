import React from 'react';
import styles from './styles.module.scss';
import { filters, colors } from '~/constants';

interface SideBarProps {
  onPressFilter: (type: string) => void;
}

interface FilterProps {
  onPressFilter?: (type: string) => void;
  filter: string;
  customStyle?: React.CSSProperties;
  isHoverable?: boolean;
}

type Letter = {
  letter: string;
  color: string;
};

const letters: Letter[] = [
  { letter: 'T', color: colors[filters.personal] },
  { letter: 'O', color: colors[filters.urgent] },
  { letter: 'D', color: colors[filters.work] },
  { letter: 'O', color: colors[filters.personal] },
  { letter: 'L', color: colors[filters.urgent] },
  { letter: 'I', color: colors[filters.work] },
  { letter: 'S', color: colors[filters.personal] },
  { letter: 'T', color: colors[filters.urgent] },
];

export const Filter: React.FC<FilterProps> = ({ onPressFilter, filter, customStyle, isHoverable = true }) => {
  return (
    <div
      className={styles['filter']}
      onClick={() => (onPressFilter ? onPressFilter(filter) : null)}
      style={{ backgroundColor: colors[filter], ...customStyle }}
    >
      {isHoverable && (
        <div className={styles['tooltip']} style={{ backgroundColor: colors[filter.toLowerCase()] }}>
          {filter}
        </div>
      )}
    </div>
  );
};

const SideBar: React.FC<SideBarProps> = ({ onPressFilter }) => {
  return (
    <div className={styles['container']}>
      <Filter onPressFilter={onPressFilter} filter={filters.personal} />
      <Filter onPressFilter={onPressFilter} filter={filters.urgent} />
      <Filter onPressFilter={onPressFilter} filter={filters.work} />
      <div className={styles['divider']}></div>
      <div className={styles['title-container']}>
        {letters.map((letter: Letter, index: number) => (
          <h6 key={index} className={styles['title-letter']} style={{ color: letter.color }}>
            {letter.letter}
          </h6>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
