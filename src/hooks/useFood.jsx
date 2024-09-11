import { useEffect, useState } from 'react';
import useGetFoodlog from '../api/useGetFoodlog';
import useInsertFood from '../api/useInsertFoodLog';
import useUpdateFood from '../api/useUpdateFood';

const useFood = (selectedDate) => {
  const [foodId, setFoodId] = useState('');
  const [logId, setLogId] = useState('');
  const [dateId, setDateId] = useState('');
  const [foodLogs, setFoodLogs] = useState([]);
  const [mealTypes, setMealTypes] = useState(['아침', '점심', '저녁']);
  const [kcal, setKcal] = useState({
    아침: 0,
    점심: 0,
    저녁: 0,
  });

  const fetchFoodLogs = async () => {
    try {
      const response = await useGetFoodlog(selectedDate);
      if (response.length > 0 && response[0].food) {
        setFoodId(response[0].food_id);
        setLogId(response[0].log_id);
        setDateId(response[0].date_id);
        setFoodLogs(response[0].food);

        // 칼로리 계산
        const newKcal = { 아침: 0, 점심: 0, 저녁: 0 };
        response[0].food.forEach((log) => {
          if (newKcal.hasOwnProperty(log.meal_type)) {
            newKcal[log.meal_type] += parseFloat(log.kcal) || 0;
          }
        });
        setKcal(newKcal);
      } else {
        setFoodId('');
        setLogId('');
        setDateId('');
        setFoodLogs([]);
        setKcal({ 아침: 0, 점심: 0, 저녁: 0 });
      }
    } catch (error) {
      console.error('음식 데이터를 가져오는 중 오류 발생:', error);
      setFoodId('');
      setLogId('');
      setDateId('');
      setFoodLogs([]);
      setKcal({ 아침: 0, 점심: 0, 저녁: 0 });
    }
  };

  useEffect(() => {
    fetchFoodLogs();
  }, [selectedDate]);

  const handleFoodUpload = async (mealType, foodData) => {
    const uploadData = {
      date: selectedDate,
      meal_type: mealType,
      ...foodData,
    };

    try {
      const existingLog = foodLogs.find((log) => log.meal_type === mealType);
      if (existingLog) {
        const response = await useUpdateFood(
          uploadData,
          existingLog.food_log_id
        );
        alert(response.message);
      } else {
        const response = await useInsertFood(uploadData);
        alert(response.message);
      }
      await fetchFoodLogs(); // 데이터 업데이트 후 다시 불러오기
    } catch (error) {
      console.error('음식 데이터 업로드 중 오류 발생:', error);
    }
  };

  return {
    foodId,
    logId,
    dateId,
    foodLogs,
    mealTypes,
    kcal,
    handleFoodUpload,
  };
};

export default useFood;
