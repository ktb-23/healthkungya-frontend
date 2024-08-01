import React from 'react';
import Calendar from '../components/Calendar';
import Navbar from '../components/Navbar';
import Profile from '../components/Profile';

const FixForm = ({ checkKcal, selectDate, currentYearMonth }) => {
  return (
    <>
      <Navbar />
      <Profile />
      <Calendar
        checkKcal={checkKcal}
        selectDate={selectDate}
        currentYearMonth={currentYearMonth}
      />
    </>
  );
};

export default FixForm;
