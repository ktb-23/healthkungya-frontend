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
      photos: {
        morning: '/path/to/morning/photo.jpg',
        lunch: '/path/to/lunch/photo.jpg',
        dinner: '/path/to/dinner/photo.jpg',
      },
    },
    // 필요한 많은 날짜 데이터 추가
  });

  // 주어진 날짜의 식단 데이터를 확인하여 배경색 적용 결정하는 함수
  const checkKcal = (date) => {
    const mealKcal = dailyData[date]?.diet;
    return mealKcal && mealKcal.breakfast && mealKcal.lunch && mealKcal.dinner;
  };

  // 주어진 날짜에 운동 여부를 확인하여 배경색 적용 결정하는 함수
  const checkExercise = (date) => {
    return !!dailyData[date]?.exercise;
  };

  // 현재 날짜를 선택하는 함수
  const selectDate = (date) => {
    setSelectedDate(date);
  };

  // 현재 선택된 날짜에 대한 데이터를 가져옴
  const selectedDayData = dailyData[selectedDate] || {
    diet: {},
    exercise: '',
    weight: '',
    photos: {},
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
        <Photo meal="morning" imageSrc={selectedDayData.photos.morning} />
        <Photo meal="lunch" imageSrc={selectedDayData.photos.lunch} />
        <Photo meal="dinner" imageSrc={selectedDayData.photos.dinner} />
      </div>
      <div className="mainoutput-container">
        <Output text="식단-아침">
          아침: {selectedDayData.diet.breakfast} kcal
        </Output>
        <Output text="식단-점심">
          점심: {selectedDayData.diet.lunch} kcal
        </Output>
        <Output text="식단-저녁">
          저녁: {selectedDayData.diet.dinner} kcal
        </Output>
        <Output text="운동">종목: {selectedDayData.exercise}</Output>
        <Output text="운동소모">소모칼로리: </Output>
        <Output text="체중">체중: {selectedDayData.weight}</Output>
      </div>
      <button className="graph-button">그래프 확인하기</button>
    </>
  );
};

export default MainForm;
