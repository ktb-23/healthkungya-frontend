import React from 'react';
import styles from './styles/Index.module.scss';

const Index = ({ output, indexicon }) => {
  const getBoxClass = () => {
    switch (output) {
      case '식단':
        return styles.food;
      case '운동':
        return styles.exercise;
      case '체중':
        return styles.weight;
      default:
        return '';
    }
  };

  return (
    <div className={`${styles.index} ${getBoxClass()}`}>
      <img src={indexicon} alt="indexicon" />
      <div className={styles.indextxt}>{output}</div>
    </div>
  );
};

export default Index;
