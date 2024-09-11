import api from '../config/apiConfig';

const useDeleteExlog = async (log_id, date_id) => {
  const accesstoken = localStorage.getItem('accesstoken');
  try {
    const response = await api.delete(
      `/api/exercise_log/${log_id}/${date_id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accesstoken}`,
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
export default useDeleteExlog;
