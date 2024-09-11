import { useState, useEffect } from 'react';

const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

const UseDailyData = (userId) => {
  const [selectedDate, setSelectedDate] = useState(getTodayDateString());
  const [dailyData, setDailyData] = useState(() => {
    const savedData = localStorage.getItem('dailyData');
    return savedData ? JSON.parse(savedData) : {};
  });

  useEffect(() => {
    localStorage.setItem('dailyData', JSON.stringify(dailyData));
  }, [dailyData]);

  const checkKcal = (date) => {
    const dayData = dailyData[date];
    if (dayData && dayData.diet) {
      const { 아침, 점심, 저녁 } = dayData.diet;
      return 아침 && 아침 > 0 && 점심 && 점심 > 0 && 저녁 && 저녁 > 0;
    }
    return false;
  };

  const checkExercise = (date) => {
    return !!dailyData[date]?.exercise;
  };

  const getDietInfo = (date) => {
    return dailyData[date]?.diet || { 아침: 0, 점심: 0, 저녁: 0 };
  };

  const updateDietInfo = (date, meal, calories, imageUrl) => {
    setDailyData((prevData) => ({
      ...prevData,
      [date]: {
        ...prevData[date],
        diet: {
          ...(prevData[date]?.diet || {}),
          [meal]: calories,
        },
        photos: {
          ...(prevData[date]?.photos || {}),
          [meal]: imageUrl,
        },
      },
    }));
  };

  const updateExerciseInfo = (date, exercise) => {
    setDailyData((prevData) => ({
      ...prevData,
      [date]: {
        ...prevData[date],
        exercise,
      },
    }));
  };

  const updateWeightInfo = (date, weight) => {
    setDailyData((prevData) => ({
      ...prevData,
      [date]: {
        ...prevData[date],
        weight,
      },
    }));
  };

  const updatePhotoInfo = (date, mealTime, photoPath) => {
    setDailyData((prevData) => ({
      ...prevData,
      [date]: {
        ...prevData[date],
        photos: {
          ...prevData[date]?.photos,
          [mealTime]: photoPath,
        },
      },
    }));
  };

  const getDateData = (date) => {
    return (
      dailyData[date] || {
        diet: { 아침: 0, 점심: 0, 저녁: 0 },
        exercise: '',
        weight: '',
        photos: {},
      }
    );
  };

  return {
    selectedDate,
    setSelectedDate,
    dailyData,
    getDietInfo,
    checkKcal,
    checkExercise,
    updateDietInfo,
    updateExerciseInfo,
    updateWeightInfo,
    updatePhotoInfo,
    getDateData,
  };
};

export default UseDailyData;
