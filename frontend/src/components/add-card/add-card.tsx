import React from 'react';
import styles from './styles.module.scss';

interface AddCardProps {
  onPressAdd: () => void;
}

const AddCard: React.FC<AddCardProps> = () => {
  return <div className={styles['container']}>AddCard</div>;
};

export default AddCard;
