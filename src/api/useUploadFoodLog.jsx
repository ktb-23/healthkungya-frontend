import api from '../config/apiConfig';
const useUploadFoodLog = async (data, foodlogId) => {
  const accesstoken = localStorage.getItem('accesstoken');
  try {
    const response = await api.put(`/api/food/save/${foodlogId}`, data, {
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
export default useUploadFoodLog;
