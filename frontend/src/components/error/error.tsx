import React from 'react';

import styles from './styles.module.scss';

import ErrorIllustration from '~/assets/error_illustration.png';

type ErrorProps = {
  message: string;
};

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className={styles['error-container']}>
      <img src={ErrorIllustration} alt="Error Illustration" className={styles['error-illustration']} />
      <h6 className={styles['error-message']}>{`${message} :<`} </h6>
    </div>
  );
};

export default Error;
