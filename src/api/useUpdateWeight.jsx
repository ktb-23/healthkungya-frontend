import api from '../config/apiConfig';

const useUpdateWeight = async (body, weight_id) => {
  const accesstoken = localStorage.getItem('accesstoken');
  try {
    const response = await api.put(`/api/weight/${weight_id}`, body, {
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
export default useUpdateWeight;
