import api from '../config/apiConfig';

const useInsertExlog = async (body) => {
  const accesstoken = localStorage.getItem('accesstoken');
  try {
    const response = await api.post('/api/exercise_log', body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accesstoken}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export default useInsertExlog;
