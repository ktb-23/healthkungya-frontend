import { useEffect, useState } from 'react';
import useGetWeight from '../api/useGetWeight';
import useInsertWeight from '../api/useInsertWeight';
import useUpdateWeight from '../api/useUpdateWeight';

const useWeight = (selectedDate) => {
  const [weightId, setWeightId] = useState('');
  const [weight, setWeight] = useState();

  const fetchWeight = async () => {
    try {
      const response = await useGetWeight(selectedDate);

      if (response.length > 0 && response[0].weight) {
        setWeightId(response[0].weight_id);
        setWeight(response[0].weight);
      } else {
        // 데이터가 없는 경우 상태 초기화
        setWeightId('');
        setWeight('');
      }
    } catch (error) {
      console.error('몸무게 데이터를 가져오는 중 오류 발생:', error);
      // 오류 발생 시 상태 초기화
    }
  };

  useEffect(() => {
    fetchWeight();
  }, [selectedDate]);
  const handleUploadClick = async () => {
    const uploadData = {
      date: selectedDate,
      weight: weight,
    };
    const updateData = {
      weight: weight,
    };
    try {
      const response = await useInsertWeight(uploadData);
      if (response.message === '해당 날짜에 대한 기록이 이미 존재합니다.') {
        const response = await useUpdateWeight(updateData, weightId);
        alert(response.message);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleUploadClick,
    weight,
    setWeight,
  };
};

export default useWeight;
