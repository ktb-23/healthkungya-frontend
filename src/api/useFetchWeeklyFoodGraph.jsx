import api from '../config/apiConfig';

const useFetchWeeklyFoodGraph = async (type = 'weekly', date) => {
  const accesstoken = localStorage.getItem('accesstoken');
  try {
    const response = await api.get(
      `/api/graph/food?type=${type}&date=${date}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accesstoken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export default useFetchWeeklyFoodGraph;
