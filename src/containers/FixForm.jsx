import React from 'react';
import Calendar from '../components/Calendar';
import Navbar from '../components/Navbar';
import Profile from '../components/Profile';
import './styles/FixForm.scss';

const FixForm = ({
  checkKcal,
  checkExercise,
  selectDate,
  currentYearMonth,
}) => {
  return (
    <div className="fixformcontainer">
      <Navbar />
      <Profile />
      <Calendar
        checkKcal={checkKcal}
        checkExercise={checkExercise}
        selectDate={selectDate}
        currentYearMonth={currentYearMonth}
      />
    </div>
  );
};

export default FixForm;
