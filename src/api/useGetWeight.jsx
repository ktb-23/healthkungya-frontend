import api from '../config/apiConfig';

const useGetWeight = async (date) => {
  const accesstoken = localStorage.getItem('accesstoken');
  try {
    const response = await api.get(`/api/weight/${date}`, {
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

export default useGetWeight;
