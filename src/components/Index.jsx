//NOTE:식사, 운동, 체중 등 표시 인덱스 컴포넌트
import React from 'react';

const Index = ({ output, indexicon }) => {
  return (
    <>
      <div className="index">
        <img src={indexicon} alt="indexicon" />
        <p className="indextxt">{output}</p>
      </div>
    </>
  );
};

export default Index;
