import api from '../config/apiConfig';

const useGetProfile = async () => {
  const accesstoken = localStorage.getItem('accesstoken');
  try {
    const response = await api.get('/api/profile', {
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
export default useGetProfile;
