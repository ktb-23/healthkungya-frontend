//매 페이지마다 픽스되는 페이지 (캘린더, 프로필, 네브바)

import React from 'react';
import Calendar from '../components/Calendar';
import Navbar from '../components/Navbar';

const FixForm = () => {
  return (
    <>
      <Navbar />
      <Calendar />
    </>
  );
};

export default FixForm;
