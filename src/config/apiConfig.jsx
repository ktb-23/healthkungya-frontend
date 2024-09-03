import axios from 'axios';

//토큰이 불필요한 경우
const api = axios.create({
  baseURL: `http://3.36.83.192:8000/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const requestData = {
  user_id: localStorage.getItem('user_id'),
  refreshToken: localStorage.getItem('refreshtoken'),
};
//리프레시토큰 요청 api
function postRefreshToken() {
  const response = api.post('/api/auth/refresh', requestData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
    },
  });
  return response;
}

//리프레시 토큰 구현
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    if (status === 401) {
      const originRequest = config;
      try {
        const tokenResponse = await postRefreshToken();
        console.log(tokenResponse);
        const newAccessToken = tokenResponse.data.accesstoken;
        console.log(newAccessToken);
        localStorage.setItem('accesstoken', newAccessToken);
        axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return { originRequest };
      } catch (error) {
        window.location.replace('/');
      }
    }
    return Promise.reject(error);
  }
);
export default api;
