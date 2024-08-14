// useDailyData.js
import { useState } from 'react';

export const kcal = {
  breakfast: 400,
  lunch: 600,
  dinner: 700,
};

const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

const UseDailyData = () => {
  const [selectedDate, setSelectedDate] = useState(getTodayDateString());
  const [dailyData, setDailyData] = useState({
    [selectedDate]: {
      diet: kcal,
      exercise: '50분 달리기',
      weight: '70kg',
      photos: {
        morning: '/path/to/morning/photo.jpg',
        lunch: '/path/to/lunch/photo.jpg',
        dinner: '/path/to/dinner/photo.jpg',
      },
    },
  });

  const checkKcal = (date) => {
    const mealKcal = dailyData[date]?.diet;
    return mealKcal && mealKcal.breakfast && mealKcal.lunch && mealKcal.dinner;
  };

  const checkExercise = (date) => {
    return !!dailyData[date]?.exercise;
  };

  return {
    selectedDate,
    dailyData,
    checkKcal,
    checkExercise,
    setSelectedDate,
  };
};

export default UseDailyData;
