import React from 'react';
import styles from './styles/Output.module.scss'; // CSS 모듈을 임포트합니다.

const Output = ({ text, children }) => {
  // text에 따라서 동적으로 클래스 네임을 획득
  const getOutputClass = () => {
    switch (text) {
      case '식단-아침':
        return styles.breakfastoutput;
      case '식단-점심':
        return styles.lunchoutput;
      case '식단-저녁':
        return styles.dinneroutput;
      case '운동':
        return styles.exoutput;
      case '운동소모':
        return styles.exkcaloutput;
      case '체중':
        return styles.weightoutput;
      default:
        return styles.defaultoutput;
    }
  };

  return (
    <div className={`${styles.outputbox} ${getOutputClass()}`}>{children}</div>
  );
};

export default Output;
