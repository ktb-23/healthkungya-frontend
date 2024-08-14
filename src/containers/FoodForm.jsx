import React, { useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FixForm from './FixForm';
import UseDailyData from '../components/UseDailyData';
import './styles/FoodForm.scss';

// 초기 상태
const initialState = {
  image: null,
  selectedMeal: '아침',
  foodList: [],
  selectedFood: '',
  mealCalories: 0,
};

// 리듀서 함수
function reducer(state, action) {
  switch (action.type) {
    case 'SET_IMAGE':
      return { ...state, image: action.payload };
    case 'SET_SELECTED_MEAL':
      return { ...state, selectedMeal: action.payload };
    case 'SET_FOOD_LIST':
      return { ...state, foodList: action.payload };
    case 'SET_SELECTED_FOOD':
      return { ...state, selectedFood: action.payload };
    case 'SET_MEAL_CALORIES':
      return { ...state, mealCalories: action.payload };
    case 'CLEAR_FOOD_LIST':
      return { ...state, foodList: [] };
    case 'RESET_FORM':
      return { ...initialState, selectedMeal: state.selectedMeal };
    default:
      return state;
  }
}

const FoodForm = () => {
  const navigate = useNavigate();
  const {
    selectedDate,
    checkKcal,
    checkExercise,
    setSelectedDate,
    updateDietInfo,
  } = UseDailyData();

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // 샘플 데이터 설정
    dispatch({ type: 'SET_MEAL_CALORIES', payload: 500 });
    // 샘플 데이터를 UseDailyData에 저장
    updateDietInfo(state.selectedMeal, 500);
  }, []);

  const handleSaveMeal = () => {
    if (state.selectedMeal && state.mealCalories) {
      updateDietInfo(state.selectedMeal, state.mealCalories);
      dispatch({ type: 'RESET_FORM' });
    }
  };

  const handleUpdate = () => {
    handleSaveMeal();
  };

  const handleSaveAndNavigate = () => {
    updateDietInfo(state.selectedMeal, state.mealCalories);
    console.log(
      'Saved meal:',
      state.selectedMeal,
      'Calories:',
      state.mealCalories
    );
    navigate('/mainpage');
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

  const handleClearList = () => {
    dispatch({ type: 'CLEAR_FOOD_LIST' });
  };

  const handleFoodSelect = (event) => {
    dispatch({ type: 'SET_SELECTED_FOOD', payload: event.target.value });
  };

  return (
    <>
      <FixForm
        checkKcal={checkKcal}
        checkExercise={checkExercise}
        selectDate={setSelectedDate}
        selectedDate={selectedDate}
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
            <button onClick={handleClearList} className="clear-button">
              비우기
            </button>
          </div>
          <div className="list-content">
            <div className="list-title">
              <span>[음식이름]</span>
              <select
                value={state.selectedFood}
                onChange={handleFoodSelect}
                className="food-select"
              >
                <option value="">선택하세요</option>
                {state.foodList.map((food, index) => (
                  <option key={index} value={food}>
                    {food}
                  </option>
                ))}
              </select>
            </div>
            <ul className="food-list">
              {state.foodList.map((food, index) => (
                <li key={index}>{food}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="total-kal">섭취 칼로리: {state.mealCalories} kcal</div>
        <button className="save" onClick={handleUpdate}>
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
