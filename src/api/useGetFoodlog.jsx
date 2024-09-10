import api from '../config/apiConfig';

const useGetFood = async (date) => {
  const accesstoken = localStorage.getItem('accesstoken');
  try {
    const response = await api.get(`/api/food_log/${date}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accesstoken}`,
      },
    });
    console.log(response.data); // 응답 데이터를 콘솔에 출력합니다.
    return response.data; // 데이터를 반환합니다.
  } catch (error) {
    console.error('Error fetching food log:', error);
    throw error; // 에러 발생 시 호출한 쪽에서 처리할 수 있도록 에러를 던집니다.
  }
};

export default useGetFood;
