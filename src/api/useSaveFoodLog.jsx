import api from '../config/apiConfig';

const useSaveFoodLog = async (mealData) => {
  const accesstoken = localStorage.getItem('accesstoken');
  try {
    const response = await api.post('/api/food_log', mealData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accesstoken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error saving food log:', error);
    throw error;
  }
};

export default useSaveFoodLog;
