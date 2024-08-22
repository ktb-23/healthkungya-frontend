import React, { useReducer, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FixForm from './FixForm';
import UseDailyData from '../components/UseDailyData';
import { FoodReducer, InitialState } from './reducers/FoodReducer';
import './styles/FoodForm.scss';
import axios from 'axios'; // axios를 사용하여 API 요청을 보냅니다.

const FoodForm = () => {
  const [state, dispatch] = useReducer(FoodReducer, InitialState);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [foodAnalysis, setFoodAnalysis] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const {
    checkKcal,
    setSelectedDate,
    updateDietInfo,
    getDietInfo,
    checkExercise,
  } = UseDailyData();

  useEffect(() => {
    if (location.state?.date) {
      const dateFromMainForm = new Date(location.state.date);
      setCurrentDate(dateFromMainForm);
      setSelectedDate(dateFromMainForm);
      const dietInfo = getDietInfo(location.state.date);
      dispatch({
        type: 'SET_ALL_MEALS',
        payload: {
          아침: dietInfo['아침'] || 0,
          점심: dietInfo['점심'] || 0,
          저녁: dietInfo['저녁'] || 0,
        },
      });
    }
  }, [location.state, setSelectedDate, getDietInfo]);

  const handleSaveMeal = () => {
    updateDietInfo(
      currentDate,
      state.selectedMeal,
      state.mealCalories[state.selectedMeal]
    );
    alert('수정이 완료되었습니다.');
  };

  const handleSaveAndNavigate = () => {
    handleSaveMeal();
    navigate('/mainpage', { state: { date: currentDate } });
  };

  const handleFoodSelect = (event) => {
    const selectedCalories = parseInt(event.target.value, 10);
    if (!isNaN(selectedCalories)) {
      dispatch({
        type: 'SET_MEAL_CALORIES',
        payload: { meal: state.selectedMeal, value: selectedCalories },
      });
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageData = e.target.result;
        dispatch({ type: 'SET_IMAGE', payload: imageData });

        // 이미지 데이터를 서버로 전송
        try {
          const response = await axios.post('YOUR_AI_SERVICE_URL', {
            image: imageData,
          });
          setFoodAnalysis(response.data);
        } catch (error) {
          console.error('Error analyzing food image:', error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <FixForm
        checkKcal={checkKcal}
        checkExercise={checkExercise}
        selectDate={setSelectedDate}
        selectedDate={currentDate}
      />
      <section className="Food-right">
        <div className="food-nav">
          {['아침', '점심', '저녁'].map((meal) => (
            <button
              key={meal}
              className={`meal-button ${state.selectedMeal === meal ? 'selected' : ''}`}
              onClick={() =>
                dispatch({ type: 'SET_SELECTED_MEAL', payload: meal })
              }
            >
              {meal}
            </button>
          ))}
        </div>
        <div className="picture-box">
          {state.image ? (
            <img
              src={state.image}
              alt="Uploaded food"
              className="uploaded-image"
            />
          ) : (
            <label htmlFor="image-upload" className="upload-button">
              사진 업로드
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </label>
          )}
        </div>
        <div className="list-box">
          <div className="list-header">
            <h3>음식목록</h3>
          </div>
          <div className="list-content">
            <span>
              {foodAnalysis
                ? foodAnalysis.Final_label
                : '업로드된 음식이 없습니다'}
            </span>
            <select
              value={state.selectedFood}
              onChange={handleFoodSelect}
              className="food-select"
            >
              <option value="">선택하세요</option>
              {foodAnalysis && (
                <option value={foodAnalysis.calories}>
                  {foodAnalysis.calories}kcal
                </option>
              )}
            </select>
          </div>
        </div>
        <div className="total-kal">
          섭취 칼로리: {state.mealCalories[state.selectedMeal] || 0} kcal
        </div>
        <button className="save" onClick={handleSaveMeal}>
          수정 완료
        </button>
        <button className="edit" onClick={handleSaveAndNavigate}>
          저장
        </button>
      </section>
    </>
  );
};

export default FoodForm;
