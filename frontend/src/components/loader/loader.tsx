import React from 'react';

import styles from './styles.module.scss';

type LoaderProps = {
  message: string;
};

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className={styles['loading-container']}>
      <div className={styles['loading-spinners']}>
        <div className={styles['loading-spinner']}></div>
        <div className={styles['loading-spinner']}></div>
        <div className={styles['loading-spinner']}></div>
      </div>
      <h6 className={styles['loading-message']}>{message}</h6>
    </div>
  );
};

export default Loader;
