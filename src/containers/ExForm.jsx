import { useState } from 'react';
import FixForm from './FixForm';
import { kcal as foodKcal } from './FoodForm.jsx';
import styles from './styles/ExForm.module.scss';
import Button from '../components/Button.jsx';
//NOTE:운동입력 폼

// NOTE: 오늘 날짜를 YYYY-MM-DD 형식으로 반환하는 함수
const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};
const ExForm = () => {
  const todayDateString = getTodayDateString();
  const [selectedDate, setSelectedDate] = useState(todayDateString);

  // NOTE:날짜별로 정보를 저장합니다.
  const [dailyData, setDailyData] = useState({
    [todayDateString]: {
      diet: {
        breakfast: foodKcal.breakfast,
        lunch: foodKcal.lunch,
        dinner: foodKcal.dinner,
      },
      exercise: '50분 달리기',
      weight: '70kg',
      photos: {
        morning: '/path/to/morning/photo.jpg',
        lunch: '/path/to/lunch/photo.jpg',
        dinner: '/path/to/dinner/photo.jpg',
      },
    },
    // NOTE: 필요한 많은 날짜 데이터 추가
  });

  // NOTE:주어진 날짜의 식단 데이터를 확인하여 배경색 적용 결정하는 함수
  const checkKcal = (date) => {
    const mealKcal = dailyData[date]?.diet;
    return mealKcal && mealKcal.breakfast && mealKcal.lunch && mealKcal.dinner;
  };

  // NOTE:주어진 날짜에 운동 여부를 확인하여 배경색 적용 결정하는 함수
  const checkExercise = (date) => {
    return !!dailyData[date]?.exercise;
  };

  // NOTE:현재 날짜를 선택하는 함수
  const selectDate = (date) => {
    setSelectedDate(date);
  };

  // NOTE:현재 선택된 날짜에 대한 데이터를 가져옴
  const selectedDayData = dailyData[selectedDate] || {
    diet: {},
    exercise: '',
    weight: '',
    photos: {},
  };
  return (
    <div className={styles.container}>
      <FixForm
        checkKcal={checkKcal}
        checkExercise={checkExercise}
        selectDate={selectDate}
        currentYearMonth={{
          year: parseInt(selectedDate.slice(0, 4)),
          month: parseInt(selectedDate.slice(5, 7)),
        }}
      />
      <div className={styles.ExFormWrapper}>
        <div className={styles.ExFormContainer}>
          <header className={styles.header}>
            <Button variant={'backBtn'}></Button>
            <div className={styles.category}>운동</div>
            <Button variant={'exupload'}>업로드</Button>
          </header>
        </div>
      </div>
    </div>
  );
};
export default ExForm;
