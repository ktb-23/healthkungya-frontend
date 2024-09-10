import api from '../config/apiConfig';

// Function to upload food image
const useUploadFoodImage = async (formData, date) => {
  const accesstoken = localStorage.getItem('accesstoken');
  try {
    const response = await api.post(`/api/food/image/${date}`, formData, {
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

export default useUploadFoodImage;
