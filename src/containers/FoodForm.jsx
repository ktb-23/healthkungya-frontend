import React, { useState, useEffect, useReducer } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FixForm from './FixForm';
import UseDailyData from '../components/UseDailyData';
import { FoodReducer, InitialState } from './reducers/FoodReducer';
import './styles/FoodForm.scss';
import useUploadFoodImage from '../api/useUploadFoodImage';
import usePollFoodImageStatus from '../api/usePollFoodImage';
import useUploadFoodLog from '../api/useUploadFoodLog';
import useGetFoodLog from '../api/useGetFoodLog';

const FoodForm = () => {
  const [state, dispatch] = useReducer(FoodReducer, InitialState);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mealData, setMealData] = useState({
    아침: { imageUrl: null, foodAnalysis: null, selectedQuantity: 1 },
    점심: { imageUrl: null, foodAnalysis: null, selectedQuantity: 1 },
    저녁: { imageUrl: null, foodAnalysis: null, selectedQuantity: 1 },
  });
  const [foodlogId, setFoodlogId] = useState(null);
  const { status: pollStatus, error: pollError } =
    usePollFoodImageStatus(foodlogId);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const getFoodLog = async () => {
    try {
      const response = await useGetFoodLog(selectedDate, state.selectedMeal);
      if (response) {
        setMealData((prevData) => ({
          ...prevData,
          [state.selectedMeal]: {
            ...prevData[state.selectedMeal],
            imageUrl: response.imageUrl,
            foodAnalysis: {
              Final_label: response.food,
              calories: response.kcal,
            },
            selectedQuantity: response.quantity,
          },
        }));
        setFoodlogId(response.foodlog_id);
      }
    } catch (error) {
      console.error('음식 기록 조회 중 오류 발생:', error);
    }
  };
  const {
    selectedDate,
    checkKcal,
    setSelectedDate,
    updateDietInfo,
    getDietInfo,
    checkExercise,
  } = UseDailyData();

  useEffect(() => {
    getFoodLog();
  }, [selectedDate, state.selectedMeal]);
  useEffect(() => {
    if (foodlogId && pollStatus) {
      if (pollStatus.status === 'complete') {
        const { food, kcal, food_photo } = pollStatus;
        setMealData((prevData) => ({
          ...prevData,
          [state.selectedMeal]: {
            ...prevData[state.selectedMeal],
            foodAnalysis: { Final_label: food, calories: kcal },
            imageUrl: food_photo,
          },
        }));
      } else if (pollError) {
        console.error('Polling Error:', pollError);
      }
    }
  }, [foodlogId, pollStatus, pollError, state.selectedMeal]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.date) {
      const dateFromMainForm = new Date(location.state.date);

      if (currentDate.getTime() !== dateFromMainForm.getTime()) {
        setCurrentDate(dateFromMainForm);
        setSelectedDate(dateFromMainForm);
      }
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
  }, [location.state, currentDate, setSelectedDate, getDietInfo]);

  const handleImageUpload = async (event, meal) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log('Selected file:', file); // Debugging line

    const formData = new FormData();
    formData.append('foodImage', file);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await useUploadFoodImage(
        formData,
        selectedDate,
        state.selectedMeal
      );
      console.log('API Response:', response); // Debugging line

      if (response) {
        setMealData((prevData) => ({
          ...prevData,
          [meal]: { ...prevData[meal], imageUrl: response.imageUrl },
        }));
        setFoodlogId(response.foodlog_id); // Start polling with the foodlog_id
      }
    } catch (error) {
      console.error('이미지 업로드 실패', error);
      alert('이미지 업로드 실패');
    }
  };

  const handleQuantityChange = (meal, quantity) => {
    setMealData((prevData) => ({
      ...prevData,
      [meal]: { ...prevData[meal], selectedQuantity: Number(quantity) },
    }));

    // 칼로리 정보 업데이트
    const calories = mealData[meal].foodAnalysis
      ? mealData[meal].foodAnalysis.calories * Number(quantity)
      : 0;
    dispatch({
      type: 'SET_MEAL_CALORIES',
      payload: {
        meal,
        calories,
      },
    });
  };

  const calculateTotalCalories = (meal) => {
    const { foodAnalysis, selectedQuantity } = mealData[meal];
    if (foodAnalysis && foodAnalysis.calories) {
      return (foodAnalysis.calories * selectedQuantity).toFixed(2);
    }
    return 0;
  };

  const handleSaveMeal = async () => {
    const meals = ['아침', '점심', '저녁'];

    for (const meal of meals) {
      const { imageUrl, foodAnalysis, selectedQuantity } = mealData[meal];
      if (imageUrl && foodAnalysis) {
        const totalCalories = calculateTotalCalories(meal);
        const mealData = {
          food: foodAnalysis.Final_label,
          kcal: totalCalories,
          quantity: selectedQuantity,
        };

        try {
          const response = await useUploadFoodLog(mealData, foodlogId);
          alert(response.message);
        } catch (error) {
          console.error(`Error saving ${meal} information:`, error);
          alert(`${meal} 정보 저장 중 오류가 발생했습니다.`);
        }
      }
    }
  };

  const handleSaveAndNavigate = () => {
    handleSaveMeal();
    navigate('/mainpage', { state: { date: currentDate } });
  };

  return (
    <div className="fixform-wrapper">
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
              className={`meal-button ${
                state.selectedMeal === meal ? 'selected' : ''
              }`}
              onClick={() =>
                dispatch({ type: 'SET_SELECTED_MEAL', payload: meal })
              }
            >
              {meal}
            </button>
          ))}
        </div>
        <div className="picture-box">
          {mealData[state.selectedMeal].imageUrl ? (
            <div className="uploaded-image-container">
              <img
                src={mealData[state.selectedMeal].imageUrl}
                alt={`Uploaded ${state.selectedMeal} food`}
                className="uploaded-image"
              />
              <label
                htmlFor={`image-upload-${state.selectedMeal}`}
                className="change-image-button"
              >
                사진 변경
                <input
                  id={`image-upload-${state.selectedMeal}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, state.selectedMeal)}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          ) : (
            <div className="upload-container">
              <label
                htmlFor={`image-upload-${state.selectedMeal}`}
                className="upload-button"
              >
                <span className="upload-text">
                  {state.selectedMeal} 사진 업로드
                </span>
                <input
                  id={`image-upload-${state.selectedMeal}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, state.selectedMeal)}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          )}
        </div>

        <div className="list-box">
          <div className="list-header">
            <h3>음식목록</h3>
          </div>
          <div className="list-content">
            {mealData[state.selectedMeal].foodAnalysis ? (
              <>
                <span>
                  {mealData[state.selectedMeal].foodAnalysis.Final_label}
                </span>
                <select
                  value={mealData[state.selectedMeal].selectedQuantity}
                  onChange={(e) =>
                    handleQuantityChange(state.selectedMeal, e.target.value)
                  }
                  className="food-select"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <span>업로드된 음식이 없습니다</span>
            )}
          </div>
        </div>
        <div className="total-kal">
          섭취 칼로리: {calculateTotalCalories(state.selectedMeal)} kcal
        </div>
        <button className="save" onClick={handleSaveMeal}>
          수정 완료
        </button>
        <button className="edit" onClick={handleSaveAndNavigate}>
          저장
        </button>
      </section>
    </div>
  );
};

export default FoodForm;
