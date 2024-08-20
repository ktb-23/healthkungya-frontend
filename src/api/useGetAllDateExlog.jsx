import api from '../config/apiConfig';

const useGetAllDateExlog = async () => {
  const accesstoken = localStorage.getItem('accesstoken');
  try {
    const response = await api.get('/api/exercise_log/date/exlog', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accesstoken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export default useGetAllDateExlog;
