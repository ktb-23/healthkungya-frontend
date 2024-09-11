import api from '../config/apiConfig';

const useGetAllFoodLog = async (date) => {
  const accesstoken = localStorage.getItem('accesstoken');
  console.log(date);
  try {
    const response = await api.get(`/api/food/all?date=${date}`, {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default useGetAllFoodLog;
