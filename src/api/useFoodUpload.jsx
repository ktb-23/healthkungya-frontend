import { useState } from 'react';
import axios from 'axios';

const foodClient = axios.create({
  baseURL: `http://localhost:8000/api/food`,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

const useFoodUpload = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log('진입3');
  const uploadFoodImage = async (file) => {
    try {
      setLoading(true);
      setError(null);
      // FormData 생성
      const formData = new FormData();
      formData.append('file', file);

      // 백엔드로 POST 요청 보내기
      const response = await foodClient.post('/uploadImage', formData);
      return response.data;
    } catch (error) {
      setError(error);
      console.error('Error uploading image:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { uploadFoodImage, error, loading };
};

export default useFoodUpload;
