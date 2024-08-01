//NOTE:사진 업로드 표시 컴포넌트
import React from 'react';
import './styles/Photo.scss';

const Photo = ({ meal }) => {
  return (
    <>
      <div className={meal}></div>
    </>
  );
};

export default Photo;
