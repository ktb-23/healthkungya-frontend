import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FixForm from './FixForm';
import UseDailyData from '../components/UseDailyData';
import './styles/FoodForm.scss';

const FoodForm = () => {
  const navigate = useNavigate();
  const {
    selectedDate,
    checkKcal,
    checkExercise,
    setSelectedDate,
    updateDietInfo,
  } = UseDailyData();
  const [image, setImage] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState('아침');
  const [foodList, setFoodList] = useState([]);
  const [selectedFood, setSelectedFood] = useState('');
  const [mealCalories, setMealCalories] = useState(0);

  const handleAddFood = () => {
    if (selectedFood) {
      setFoodList([...foodList, selectedFood]);
      setSelectedFood('');
    }
  };

  const handleSaveMeal = () => {
    if (selectedMeal && mealCalories) {
      updateDietInfo(selectedMeal, mealCalories);
      // 저장 후 초기화
      setMealCalories(0);
      setFoodList([]);
      setSelectedMeal(null);
    }
  };

  const handleUpdate = () => {
    handleSaveMeal(); // 현재 입력된 정보 저장
  };

  const handleSaveAndNavigate = () => {
    handleSaveMeal(); // 현재 입력된 정보 저장
    navigate('/mainpage'); // MainForm으로 이동
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleClearList = () => {
    setFoodList([]);
  };

  const handleFoodSelect = (event) => {
    setSelectedFood(event.target.value);
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
          <button
            className={`meal-button ${selectedMeal === '아침' ? 'selected' : ''}`}
            onClick={() => setSelectedMeal('아침')}
          >
            아침
          </button>
          <button
            className={`meal-button ${selectedMeal === '점심' ? 'selected' : ''}`}
            onClick={() => setSelectedMeal('점심')}
          >
            점심
          </button>
          <button
            className={`meal-button ${selectedMeal === '저녁' ? 'selected' : ''}`}
            onClick={() => setSelectedMeal('저녁')}
          >
            저녁
          </button>
        </div>
        <div className="picture-box">
          {image ? (
            <img src={image} alt="Uploaded food" className="uploaded-image" />
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
                value={selectedFood}
                onChange={handleFoodSelect}
                className="food-select"
              >
                <option value="">선택하세요</option>
                {foodList.map((food, index) => (
                  <option key={index} value={food}>
                    {food}
                  </option>
                ))}
              </select>
            </div>
            <ul className="food-list">
              {foodList.map((food, index) => (
                <li key={index}>{food}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="total-kal">섭취 칼로리:</div>
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
