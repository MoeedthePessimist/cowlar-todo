import React from 'react';
import styles from './styles.module.scss';
import { filters, colors } from '~/constants';

interface SideBarProps {
  onPressOption: (type: string) => void;
}

interface FilterProps {
  onPressOption: (type: string) => void;
  filter: string;
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

const Filter: React.FC<FilterProps> = ({ onPressOption, filter }) => {
  return (
    <div className={styles['filter']} onClick={() => onPressOption(filter)} style={{ backgroundColor: colors[filter] }}>
      <div className={styles['tooltip']} style={{ backgroundColor: colors[filter] }}>
        {filter}
      </div>
    </div>
  );
};

const SideBar: React.FC<SideBarProps> = ({ onPressOption }) => {
  return (
    <div className={styles['container']}>
      <Filter onPressOption={onPressOption} filter={filters.personal} />
      <Filter onPressOption={onPressOption} filter={filters.urgent} />
      <Filter onPressOption={onPressOption} filter={filters.work} />
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
