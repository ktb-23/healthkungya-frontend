//NOTE:그래프 페이지 폼
import React, { useState } from 'react';
import FixForm from './FixForm';

export const kcal = {
  breakfast: 400,
  lunch: 600,
  dinner: 700,
};

const GraphForm = () => {
  // 상태 관리: 선택된 날짜 및 데이터
  const [selectedDate, setSelectedDate] = useState(getTodayDateString());
  const [dailyData, setDailyData] = useState({
    [selectedDate]: {
      diet: kcal, // 사용할 kcal 데이터를 여기에 설정
      exercise: '',
      weight: '',
      photos: {},
    },
  });

  // 날짜 확인 함수
  const checkKcal = (date) => {
    const mealKcal = dailyData[date]?.diet;
    return mealKcal && mealKcal.breakfast && mealKcal.lunch && mealKcal.dinner;
  };

  const checkExercise = (date) => {
    return !!dailyData[date]?.exercise;
  };

  const selectDate = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <FixForm
        checkKcal={checkKcal}
        checkExercise={checkExercise}
        selectDate={selectDate}
        currentYearMonth={{
          year: parseInt(selectedDate.slice(0, 4)),
          month: parseInt(selectedDate.slice(5, 7)),
        }}
      />
    </>
  );
};

// 오늘 날짜를 YYYY-MM-DD 형식으로 반환하는 함수
const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

export default GraphForm;
