import api from '../config/apiConfig';

const useFetchWeeklyWeightGraph = async (type = 'weekly', date) => {
  const accesstoken = localStorage.getItem('accesstoken');
  try {
    const response = await api.get(
      `/api/graph/weight?type=${type}&date=${date}`,
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
export default useFetchWeeklyWeightGraph;
