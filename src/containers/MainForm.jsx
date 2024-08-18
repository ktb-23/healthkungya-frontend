import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FixForm from './FixForm.jsx';
import Index from '../components/Index.jsx';
import Foodindex from '../picture/foodindex.svg';
import Exindex from '../picture/exindex.svg';
import Weightindex from '../picture/weightindex.svg';
import './styles/MainForm.scss';
import Button from '../components/Button.jsx';
import Output from '../components/Output.jsx';
import Photo from '../components/Photo.jsx';
import UseDailyData from '../components/UseDailyData.jsx';

const MainForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedDate, setSelectedDate, dailyData, checkKcal, checkExercise } =
    UseDailyData();

  useEffect(() => {
    if (location.state?.date) {
      setSelectedDate(location.state.date);
    }
  }, [location.state?.date, setSelectedDate]);

  const selectedDayData = dailyData[selectedDate] || {
    diet: {},
    exercise: '',
    weight: '',
    photos: {},
  };

  useEffect(() => {
    console.log('Rendering breakfast calories:', selectedDayData.diet['아침']);
  }, [selectedDayData]);

  const handleFoodChangeClick = () => {
    navigate('/pages/foodupdate', { state: { date: selectedDate } });
  };
  const handleExChangeClick = () => {
    console.log('Navigating to /foodupdate');
    navigate('/pages/exercise_log');
  };
  const handleWeightChangeClick = () => {
    console.log('Navigating to /foodupdate');
    navigate('/pages/foodupdate');
  };
  const getDietKcal = (meal) => {
    return selectedDayData.diet[meal] || 0;
  };

  return (
    <main className="main-container">
      <FixForm
        checkKcal={checkKcal}
        checkExercise={checkExercise}
        selectDate={setSelectedDate}
        selectedDate={selectedDate}
      />
      <section className="main-right">
        <div className="index-container">
          <Index indexicon={Foodindex} output="식단" />
          <Index indexicon={Exindex} output="운동" />
          <Index indexicon={Weightindex} output="체중" />
        </div>
        <div className="change">
          <Button variant={'foodchange'} onClick={handleFoodChangeClick}>
            수정하기
          </Button>
          <Button variant={'exchange'} onClick={handleExChangeClick}>
            수정하기
          </Button>
          <Button variant={'weightchange'} onClick={handleWeightChangeClick}>
            수정하기
          </Button>
        </div>
        <div className="photo-container">
          <Photo meal="morning" imageSrc={selectedDayData.photos?.morning} />
          <Photo meal="lunch" imageSrc={selectedDayData.photos?.lunch} />
          <Photo meal="dinner" imageSrc={selectedDayData.photos?.dinner} />
        </div>

        <div className="mainoutput-container">
          <Output text="식단-아침" kcal={getDietKcal('아침')}>
            아침
          </Output>
          <Output text="식단-점심" kcal={getDietKcal('점심')}>
            점심
          </Output>
          <Output text="식단-저녁" kcal={getDietKcal('저녁')}>
            저녁
          </Output>
          <Output text="운동">{selectedDayData.exercise || '없음'}</Output>
          <Output text="운동소모" kcal={selectedDayData.exerciseCalories || 0}>
            소모칼로리
          </Output>
          <Output text="체중">{selectedDayData.weight || 0} kg</Output>
        </div>
        <button
          className="graph-button"
          onClick={() => navigate('/pages/graphpage')}
        >
          그래프 확인하기
        </button>
      </section>
    </main>
  );
};

export default MainForm;
