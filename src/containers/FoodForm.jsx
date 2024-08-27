import React, { useState, useEffect, useReducer } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FixForm from './FixForm';
import UseDailyData from '../components/UseDailyData';
import useFoodUpload from '../api/useFoodUpload';
import { FoodReducer, InitialState } from './reducers/FoodReducer';
import axios from 'axios';
import './styles/FoodForm.scss';

const inferenceClient = axios.create({
  baseURL: `http://localhost:5000/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const FoodForm = () => {
  const [state, dispatch] = useReducer(FoodReducer, InitialState);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mealData, setMealData] = useState({
    아침: { imageUrl: null, foodAnalysis: null, selectedQuantity: 1 },
    점심: { imageUrl: null, foodAnalysis: null, selectedQuantity: 1 },
    저녁: { imageUrl: null, foodAnalysis: null, selectedQuantity: 1 },
  });
  const {
    uploadFoodImage,
    error: uploadError,
    loading: uploadLoading,
  } = useFoodUpload();

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
    if (file) {
      try {
        // 파일을 선택하자마자 즉시 미리보기 표시
        const localImageUrl = URL.createObjectURL(file);
        setMealData((prevData) => ({
          ...prevData,
          [meal]: { ...prevData[meal], imageUrl: localImageUrl },
        }));

        const result = await uploadFoodImage(file);
        const imageUrl = result.imageUrl;

        const response = await inferenceClient.get(
          `/api/predict?image_url=${imageUrl}`
        );
        console.log('Python 서버 응답:', response.data);

        const analysisResponse = await inferenceClient.post('/result');
        console.log('분석 결과:', analysisResponse.data);

        const foodAnalysis =
          analysisResponse.data.tag && analysisResponse.data.kcal
            ? {
                Final_label: analysisResponse.data.tag,
                calories: parseFloat(analysisResponse.data.kcal),
              }
            : null;

        setMealData((prevData) => ({
          ...prevData,
          [meal]: {
            ...prevData[meal],
            imageUrl, // 서버에서 반환된 URL로 업데이트
            foodAnalysis,
            selectedQuantity: 1,
          },
        }));
      } catch (error) {
        console.error('업로드 또는 분석 중 오류 발생:', error);
        alert(`오류: ${error.message}`);
      }
    }
  };

  const handleQuantityChange = (meal, quantity) => {
    setMealData((prevData) => ({
      ...prevData,
      [meal]: { ...prevData[meal], selectedQuantity: Number(quantity) },
    }));
  };

  const calculateTotalCalories = (meal) => {
    const { foodAnalysis, selectedQuantity } = mealData[meal];
    if (foodAnalysis && foodAnalysis.calories) {
      return (foodAnalysis.calories * selectedQuantity).toFixed(2);
    }
    return 0;
  };

  const handleSaveMeal = async () => {
    const dateString = currentDate.toISOString().split('T')[0];
    const meals = ['아침', '점심', '저녁'];

    for (const meal of meals) {
      const { imageUrl, foodAnalysis, selectedQuantity } = mealData[meal];
      if (imageUrl && foodAnalysis) {
        const totalCalories = calculateTotalCalories(meal);
        const mealData = {
          userId: '사용자ID', // 실제 사용자 ID로 대체해야 함
          date: dateString,
          mealType: meal,
          foodName: foodAnalysis.Final_label,
          calories: totalCalories,
          imageUrl: imageUrl,
          quantity: selectedQuantity,
        };

        try {
          await axios.post('/api/food/save', mealData);
          updateDietInfo(dateString, meal, totalCalories, imageUrl);
        } catch (error) {
          console.error(`Error saving ${meal} information:`, error);
          alert(`${meal} 정보 저장 중 오류가 발생했습니다.`);
        }
      }
    }

    alert('모든 식사 정보가 저장되었습니다.');
    // 여기서 상태를 초기화하지 않음
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
            <label
              htmlFor={`image-upload-${state.selectedMeal}`}
              className="upload-button"
            >
              {state.selectedMeal} 사진 업로드
              <input
                id={`image-upload-${state.selectedMeal}`}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, state.selectedMeal)}
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
