import api from '../config/apiConfig';
const useLogin = async (body) => {
  try {
    const response = await api.post('/api/auth/login', body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { user_id, nickname, weight, accesstoken, refreshtoken } =
      response.data;
    localStorage.setItem('user_id', user_id);
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
