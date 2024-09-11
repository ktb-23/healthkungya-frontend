import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
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
import useWeight from '../hooks/useWeight.jsx';
import Input from '../components/Input.jsx';
import useExerciseLog from '../hooks/useExerciseLog.jsx';

import useGetAllFoodLog from '../api/useGetAllFoodLog.jsx';
const MainForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedDate, setSelectedDate, dailyData, checkKcal, checkExercise } =
    UseDailyData();
  const { weight, setWeight, handleUploadClick } = useWeight(selectedDate);
  const [foodLogs, setFoodLogs] = useState({
    아침: null,
    점심: null,
    저녁: null,
  });
  useEffect(() => {
    if (location.state?.date) {
      setSelectedDate(location.state.date);
    }
  }, [location.state?.date, setSelectedDate]);

  useEffect(() => {
    const fetchFoodLogs = async () => {
      try {
        const mealTypes = ['morning', 'lunch', 'dinner'];
        const logs = {};
        for (const mealType of mealTypes) {
          const response = await axios.get('/api/food', {
            params: { date: selectedDate, mealtype: mealType },
          });
          logs[mealType] = response.data;
        }
        setFoodLogs(logs);
      } catch (error) {
        console.error('Error fetching food logs:', error);
      }
    };

    fetchFoodLogs();
  }, [selectedDate]);

  const selectedDayData = dailyData[selectedDate] || {
    diet: {},
    exercise: '',
    weight: '',
    photos: {},
  };
  const { durations, exItem } = useExerciseLog(selectedDate);
  const fetchFoodLogData = async () => {
    const response = await useGetAllFoodLog(selectedDate);

    const newFoodLogs = {
      아침: null,
      점심: null,
      저녁: null,
    };

    response.forEach((log) => {
      newFoodLogs[log.mealtype] = log;
    });

    setFoodLogs(newFoodLogs);
  };
  useEffect(() => {
    fetchFoodLogData();
  }, [selectedDate]);
  //met를 몸무게로 시간당 칼로리 계산
  const calculateCalories = (met, duration) => {
    if (weight > 0) {
      return ((met * weight * 3.5) / 200) * duration;
    }
    return 0;
  };

  const totalCalories = exItem.reduce((total, item) => {
    const duration = durations[item.exitem_id] || item.extime;
    const calories = calculateCalories(item.met, duration);
    return total + calories;
  }, 0);

  const handleFoodChangeClick = () => {
    navigate('/foodupdate', { state: { date: selectedDate } });
  };

  const handleExChangeClick = () => {
    navigate('/pages/exercise_log');
  };

  const handleWeightChangeClick = () => {
    console.log('Navigating to /weight');
  };
  const getDietKcal = (meal) => {
    return foodLogs[meal]?.kcal || 0;
  };

  const getFoodPhoto = (meal) => {
    return foodLogs[meal]?.food_photo || '';
  };
  const handleWeightChange = (e) => {
    const newWeight = e.target.value;
    setWeight(newWeight);
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
          <Button
            variant={'exchange'}
            onClick={() => navigate('/exercise_log')}
          >
            수정하기
          </Button>
          <Button onClick={handleUploadClick} variant={'weightchange'}>
            수정하기
          </Button>
        </div>
        <div className="photo-container">
          <Photo meal="morning" imageSrc={getFoodPhoto('아침')} />
          <Photo meal="lunch" imageSrc={getFoodPhoto('점심')} />
          <Photo meal="dinner" imageSrc={getFoodPhoto('저녁')} />
        </div>

        <div className="mainoutput-container">
          <Output text="식단-아침" kcal={foodLogs.morning.kcal || 0}>
            {foodLogs.morning.food || '아침'}
          </Output>
          <Output text="식단-점심" kcal={foodLogs.lunch.kcal || 0}>
            {foodLogs.lunch.food || '점심'}
          </Output>
          <Output text="식단-저녁" kcal={foodLogs.dinner.kcal || 0}>
            {foodLogs.dinner.food || '저녁'}
          </Output>
        </div>
        <div className="mainexouput">
          <Output text="운동">
            종목:
            <div className="exWrapper">
              <div>
                {exItem.map((i) => (
                  <span key={i.exitem_id}>
                    {i.extime} 분 {i.ex}
                  </span>
                ))}
              </div>
            </div>
          </Output>
          <Output text="운동소모">
            소모칼로리:{totalCalories.toFixed(2)} kcal{' '}
          </Output>
          <Input
            variant="weight"
            type="number"
            value={weight}
            placeholder={'체중:'}
            onChange={handleWeightChange}
          />
        </div>
        <div className="graphbuttonwrapper">
          <button
            className="graph-button"
            onClick={() => navigate('/graphpage')}
          >
            그래프 확인하기
          </button>
        </div>
      </section>
    </main>
  );
};

export default MainForm;
