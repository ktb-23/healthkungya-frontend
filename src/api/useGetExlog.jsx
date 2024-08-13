import axios from 'axios';

const useGetExlog = async (date) => {
  const accesstoken = localStorage.getItem('accesstoken');
  try {
    const response = await axios.get(
      `http://localhost:8000/api/exercise_log/${date}`,
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

export default useGetExlog;
