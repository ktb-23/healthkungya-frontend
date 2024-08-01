import React from 'react';
import Calendar from '../components/Calendar';
import Navbar from '../components/Navbar';
import Profile from '../components/Profile';

const FixForm = ({
  checkKcal,
  checkExercise,
  selectDate,
  currentYearMonth,
}) => {
  return (
    <>
      <Navbar />
      <Profile />
      <Calendar
        checkKcal={checkKcal}
        checkExercise={checkExercise}
        selectDate={selectDate}
        currentYearMonth={currentYearMonth}
      />
    </>
  );
};

export default FixForm;
