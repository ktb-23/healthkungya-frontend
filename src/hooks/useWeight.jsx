import { useEffect, useState } from 'react';
import useGetWeight from '../api/useGetWeight';
import useInsertWeight from '../api/useInsertWeight';
import useUpdateWeight from '../api/useUpdateWeight';

const useWeight = (selectedDate) => {
  const [weightId, setWeightId] = useState('');
  const [weight, setWeight] = useState('');
  console.log(weight);

  const fetchWeight = async () => {
    try {
      const response = await useGetWeight(selectedDate);
      setWeightId(response[0].weight_id);
      setWeight(response[0].weight);
    } catch (error) {
      console.log(error);
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
