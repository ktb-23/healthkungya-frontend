import api from '../config/apiConfig';

const useGetFoodLog = async (date, mealtype) => {
  const accesstoken = localStorage.getItem('accesstoken');
  try {
    const response = await api.get(
      `/api/food?date=${date}&mealtype=${mealtype}`,
      {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default useGetFoodLog;
