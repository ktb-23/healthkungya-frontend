import React, { useReducer, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FixForm from './FixForm';
import UseDailyData from '../components/UseDailyData';
import { FoodReducer, InitialState } from './reducers/FoodReducer';
import './styles/FoodForm.scss';

const FoodForm = () => {
  const [state, dispatch] = useReducer(FoodReducer, InitialState);
  const [currentDate, setCurrentDate] = useState(new Date());

  const navigate = useNavigate();
  const location = useLocation();
  const {
    selectedDate,
    checkKcal,
    setSelectedDate,
    updateDietInfo,
    getDietInfo,
    checkExercise,
  } = UseDailyData();

  useEffect(() => {
    if (selectedDate && selectedDate !== currentDate) {
      setCurrentDate(selectedDate);
      const dietInfo = getDietInfo(selectedDate);
      dispatch({
        type: 'SET_ALL_MEALS',
        payload: {
          아침: dietInfo['아침'] || 0,
          점심: dietInfo['점심'] || 0,
          저녁: dietInfo['저녁'] || 0,
        },
      });
    }
  }, [selectedDate, currentDate, getDietInfo]);

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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) =>
        dispatch({ type: 'SET_IMAGE', payload: e.target.result });
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
            <span>[음식이름]</span>
            <select
              value={state.selectedFood}
              onChange={handleFoodSelect}
              className="food-select"
            >
              <option value="">선택하세요</option>
              <option value="500">500kcal</option>
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
