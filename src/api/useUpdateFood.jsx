import api from '../config/apiConfig';

const useUpdateFood = async (body, foodlog_id) => {
  const accesstoken = localStorage.getItem('accesstoken');
  try {
    const response = await api.put(`/api/food_log/${foodlog_id}`, body, {
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

export default useUpdateFood;
