import React from 'react';
import './styles/IndexButton.scss';

const IndexButton = ({ indextype, className, isActive, onClick }) => {
  return (
    <button
      className={`${className} ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {indextype}
    </button>
  );
};

export default IndexButton;
