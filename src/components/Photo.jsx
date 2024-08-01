// Photo.jsx
import React from 'react';
import './styles/Photo.scss';

const Photo = ({ meal, imageSrc }) => {
  return (
    <div className={meal}>
      {imageSrc ? (
        <img src={imageSrc} alt={`${meal} preview`} />
      ) : (
        'No image available'
      )}
    </div>
  );
};

export default Photo;
