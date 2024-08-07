import React from 'react';
import './styles/IndexButton.scss';

const IndexButton = ({ indextype, className }) => {
  return <button className={className}>{indextype}</button>;
};

export default IndexButton;
