// GraphForm.js
import React from 'react';
import FixForm from './FixForm';
import UseDailyData, { kcal } from '../components/UseDailyData';

const GraphForm = () => {
  const { selectedDate, checkKcal, checkExercise, setSelectedDate } =
    UseDailyData();

  return (
    <>
      <FixForm
        checkKcal={checkKcal}
        checkExercise={checkExercise}
        selectDate={setSelectedDate}
        selectedDate={selectedDate}
      />
    </>
  );
};

export default GraphForm;
