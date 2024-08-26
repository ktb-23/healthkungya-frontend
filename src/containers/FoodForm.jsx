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
  const [foodAnalysis, setFoodAnalysis] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const {
    uploadFoodImage,
    error: uploadError,
    loading: uploadLoading,
  } = useFoodUpload(); // 훅 사용
  const [imageUrl, setImageUrl] = useState(null);
  const [predictions, setPredictions] = useState(null);

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

  const handleSaveMeal = async () => {
    const totalCalories = calculateTotalCalories();
    const mealData = {
      userId: '사용자ID', // 실제 사용자 ID로 대체해야 함
      date: currentDate.toISOString().split('T')[0],
      mealType: state.selectedMeal,
      foodName: foodAnalysis ? foodAnalysis.Final_label : '',
      calories: totalCalories,
      imageUrl: imageUrl, // state.image 대신 imageUrl 사용
    };

    try {
      await axios.post('/api/food/save', mealData);
      alert('식사 정보가 저장되었습니다.');
      // 저장 후 상태 초기화
      setImageUrl(null);
      setPredictions(null);
      setFoodAnalysis(null);
      setSelectedQuantity(1);
      dispatch({ type: 'SET_IMAGE', payload: null });
    } catch (error) {
      console.error('Error saving meal information:', error);
      alert('식사 정보 저장 중 오류가 발생했습니다.');
    }
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
      try {
        const result = await uploadFoodImage(file);
        setImageUrl(result.imageUrl);

        // 이미지 URL을 Python 서버로 전송
        const response = await inferenceClient.get(
          `/api/predict?image_url=${result.imageUrl}`
        );
        console.log('Python 서버 응답:', response.data);

        // 태그 정보 설정
        if (response.data.tags) {
          setPredictions(
            response.data.tags.map((tag) => ({ tag, probability: 1 }))
          );
        }

        // 분석 결과 가져오기
        const analysisResponse = await inferenceClient.post('/result');
        console.log('분석 결과:', analysisResponse.data);

        if (analysisResponse.data.tag && analysisResponse.data.kcal) {
          setFoodAnalysis({
            Final_label: analysisResponse.data.tag,
            calories: parseFloat(analysisResponse.data.kcal),
          });
        }

        dispatch({ type: 'SET_IMAGE', payload: result.imageUrl });
      } catch (error) {
        console.error('업로드 또는 분석 중 오류 발생:', error);
        alert(`오류: ${error.message}`);
      }
    }
  };

  const handleQuantityChange = (event) => {
    setSelectedQuantity(Number(event.target.value));
  };

  const calculateTotalCalories = () => {
    if (foodAnalysis && foodAnalysis.calories) {
      return (foodAnalysis.calories * selectedQuantity).toFixed(2);
    }
    return 0;
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
          {imageUrl ? (
            <img
              src={imageUrl}
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
            {foodAnalysis ? (
              <>
                <span>{foodAnalysis.Final_label}</span>
                <select
                  value={selectedQuantity}
                  onChange={handleQuantityChange}
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
          섭취 칼로리: {calculateTotalCalories()} kcal
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
