import axios from 'axios';

const useGetProfile = async () => {
  const accesstoken = localStorage.getItem('accesstoken');
  try {
    const response = await axios.get('http://localhost:8000/api/profile', {
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
