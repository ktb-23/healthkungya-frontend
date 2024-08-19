import api from '../config/apiConfig';

const useInsertWeight = async (body) => {
  const accesstoken = localStorage.getItem('accesstoken');
  try {
    const response = await api.post('/api/weight', body, {
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
export default useInsertWeight;
