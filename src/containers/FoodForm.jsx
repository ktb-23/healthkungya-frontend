import React, { useState } from 'react';
import FixForm from './FixForm';
import UseDailyData from '../components/UseDailyData';
import './styles/FoodForm.scss';

const FoodForm = () => {
  const { selectedDate, checkKcal, checkExercise, setSelectedDate } =
    UseDailyData();
  const [image, setImage] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [foodList, setFoodList] = useState([]);
  const [selectedFood, setSelectedFood] = useState('');

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
              <span>음식목록</span>
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
        <div className="total-kal">섭취 칼로리: </div>
      </section>
    </>
  );
};

export default FoodForm;
