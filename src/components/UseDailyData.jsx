import { useState, useEffect } from 'react';

const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

const UseDailyData = () => {
  const [selectedDate, setSelectedDate] = useState(getTodayDateString());
  const [dailyData, setDailyData] = useState(() => {
    const savedData = localStorage.getItem('dailyData');
    return savedData
      ? JSON.parse(savedData)
      : {
          [selectedDate]: {
            diet: {
              아침: 0,
              점심: 0,
              저녁: 0,
            },
            exercise: '50분 달리기',
            weight: '70kg',
            photos: {
              morning: '/path/to/morning/photo.jpg',
              lunch: '/path/to/lunch/photo.jpg',
              dinner: '/path/to/dinner/photo.jpg',
            },
          },
        };
  });

  useEffect(() => {
    localStorage.setItem('dailyData', JSON.stringify(dailyData));
  }, [dailyData]);

  const checkKcal = (date) => {
    const mealKcal = dailyData[date]?.diet;
    return mealKcal && mealKcal.아침 && mealKcal.점심 && mealKcal.저녁;
  };

  const checkExercise = (date) => {
    return !!dailyData[date]?.exercise;
  };

  const updateDietInfo = (meal, calories) => {
    setDailyData((prevData) => {
      const currentDateData = prevData[selectedDate] || {
        diet: { 아침: 0, 점심: 0, 저녁: 0 },
        exercise: '',
        weight: '',
        photos: {},
      };

      const updatedData = {
        ...prevData,
        [selectedDate]: {
          ...currentDateData,
          diet: {
            ...currentDateData.diet,
            [meal]: calories,
          },
        },
      };

      console.log('Updated data:', updatedData);
      return updatedData;
    });
  };

  return {
    selectedDate,
    dailyData,
    checkKcal,
    checkExercise,
    setSelectedDate,
    updateDietInfo,
  };
};

export default UseDailyData;
