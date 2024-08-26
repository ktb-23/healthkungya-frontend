// src/api/useFoodUpload.js

import { useState } from 'react';
import axios from 'axios';

const useFoodUpload = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadFoodImage = async (file) => {
    try {
      setLoading(true);
      setError(null);

      // FormData 생성
      const formData = new FormData();
      formData.append('file', file);

      // 백엔드로 POST 요청 보내기
      const response = await axios.post('/api/food', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

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
