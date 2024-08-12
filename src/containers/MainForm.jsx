import React from 'react';
import { useNavigate } from 'react-router-dom';
import FixForm from './FixForm.jsx';
import Index from '../components/Index.jsx';
import Foodindex from '../picture/foodindex.svg';
import Exindex from '../picture/exindex.svg';
import Weightindex from '../picture/weightindex.svg';
import './styles/MainForm.scss';
import Button from '../components/Button.jsx';
import Output from '../components/Output.jsx';
import Photo from '../components/Photo.jsx';
import UseDailyData from '../components/UseDailyData.jsx'; // useDailyData 훅 가져오기

const MainForm = () => {
  const navigate = useNavigate();
  const { selectedDate, dailyData, checkKcal, checkExercise, setSelectedDate } =
    UseDailyData();

  const selectedDayData = dailyData[selectedDate] || {
    diet: {},
    exercise: '',
    weight: '',
    photos: {},
  };

  const handleFoodChangeClick = () => {
    console.log('Navigating to /foodupdate'); // Debug log
    navigate('/foodupdate');
  };

  return (
    <>
      <FixForm
        checkKcal={checkKcal}
        checkExercise={checkExercise}
        selectDate={setSelectedDate}
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
        <Button variant={'foodchange'} onClick={handleFoodChangeClick}>
          수정하기
        </Button>
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
          아침: {selectedDayData.diet.아침 || 0} kcal
        </Output>
        <Output text="식단-점심">
          점심: {selectedDayData.diet.점심 || 0} kcal
        </Output>
        <Output text="식단-저녁">
          저녁: {selectedDayData.diet.저녁 || 0} kcal
        </Output>
        <Output text="운동">종목: {selectedDayData.exercise}</Output>
        <Output text="운동소모">소모칼로리: </Output>
        <Output text="체중">체중: {selectedDayData.weight}</Output>
      </div>
      <button className="graph-button" onClick={() => navigate('/graphpage')}>
        그래프 확인하기
      </button>
    </>
  );
};

export default MainForm;
