import api from '../config/apiConfig';

const useUpdateProfileImage = async (formData) => {
  console.log(formData);
  const accesstoken = localStorage.getItem('accesstoken');
  try {
    const response = await api.post(`/api/profile/image`, formData, {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export default useUpdateProfileImage;
