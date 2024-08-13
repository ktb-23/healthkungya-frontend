import axios from 'axios';
const useLogin = async (body) => {
  try {
    const response = await axios.post(
      'http://localhost:8000/api/auth/login',
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const { nickname, weight, accesstoken, refreshtoken } = response.data;
    localStorage.setItem('nickname', nickname);
    localStorage.setItem('accesstoken', accesstoken);
    localStorage.setItem('refreshtoken', refreshtoken);
    localStorage.setItem('weight', weight);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export default useLogin;
