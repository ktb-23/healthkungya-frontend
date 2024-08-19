import api from '../config/apiConfig';

const useUpdateProfile = async (body) => {
  const accesstoken = localStorage.getItem('accesstoken');
  try {
    const response = await api.put(`/api/profile/`, body, {
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
export default useUpdateProfile;
