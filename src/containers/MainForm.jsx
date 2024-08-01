import React, { useState } from 'react';
import FixForm from './FixForm.jsx';
import Index from '../components/Index.jsx';
import Foodindex from '../picture/foodindex.svg';
import Exindex from '../picture/exindex.svg';
import Weightindex from '../picture/weightindex.svg';
import './styles/MainForm.scss';
import Button from '../components/Button.jsx';
import Output from '../components/Output.jsx';
import Photo from '../components/Photo.jsx';
import { kcal as foodKcal } from './FoodForm.jsx';

// 오늘 날짜를 YYYY-MM-DD 형식으로 반환하는 함수
const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

const MainForm = () => {
  const todayDateString = getTodayDateString();
  const [selectedDate, setSelectedDate] = useState(todayDateString);

  // 날짜별로 정보를 저장합니다.
  const [dailyData, setDailyData] = useState({
    [todayDateString]: {
      diet: {
        breakfast: foodKcal.breakfast,
        lunch: foodKcal.lunch,
        dinner: foodKcal.dinner,
      },
      exercise: '50분 달리기',
      weight: '70kg',
    },
    // 필요한 많은 날짜 데이터 추가
  });

  // 주어진 날짜의 식단 데이터 확인하여 배경색 적용 결정하는 함수
  const checkKcal = (date) => {
    const mealKcal = dailyData[date]?.diet;
    return mealKcal && mealKcal.breakfast && mealKcal.lunch && mealKcal.dinner;
  };

  // 주어진 날짜로 선택할 수 있는 함수
  const selectDate = (date) => {
    setSelectedDate(date);
  };

  // 현재 선택된 날짜에 대한 데이터를 가져옴
  const selectedDayData = dailyData[selectedDate] || {
    diet: {},
    exercise: '',
    weight: '',
  };

  return (
    <>
      <FixForm
        checkKcal={checkKcal}
        selectDate={selectDate}
        currentYearMonth={{
          year: parseInt(selectedDate.slice(0, 4)),
          month: parseInt(selectedDate.slice(5, 7)),
        }}
      />
      <div className="index-container">
        <Index indexicon={Foodindex} output="식단" />
        <Index indexicon={Exindex} output="운동" />
        <Index indexicon={Weightindex} output="체중" />
      </div>
      <div className="change">
        <Button variant={'foodchange'}>수정하기</Button>
        <Button variant={'exchange'}>수정하기</Button>
        <Button variant={'weightchange'}>수정하기</Button>
      </div>
      <div className="photo-container">
        <Photo meal="morning" />
        <Photo meal="lunch" />
        <Photo meal="dinner" />
      </div>
      <div className="mainoutput-container">
        <Output text="식단-아침" kcal={selectedDayData.diet.breakfast}>
          아침
        </Output>
        <Output text="식단-점심" kcal={selectedDayData.diet.lunch}>
          점심
        </Output>
        <Output text="식단-저녁" kcal={selectedDayData.diet.dinner}>
          저녁
        </Output>
        <Output text="운동">{selectedDayData.exercise}</Output>
        <Output text="운동소모">소모칼로리</Output>
        <Output text="체중">{selectedDayData.weight}</Output>
      </div>
    </>
  );
};

export default MainForm;
