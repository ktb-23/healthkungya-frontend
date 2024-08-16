import axios from 'axios';

const useDeleteProfile = async () => {
  const accesstoken = localStorage.getItem('accesstoken');
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/auth/delete`,
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
export default useDeleteProfile;
