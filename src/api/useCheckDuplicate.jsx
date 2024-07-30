import axios from 'axios';
const checkDuplicate = async (field, value) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/auth/check-duplicate`,
      {
        params: { field, value },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response.data);
    return response.data; // 서버에서 중복 여부를 반환
  } catch (error) {
    if (error.response && error.response.status === 409) {
      // 중복일 경우 서버에서 409 상태 코드를 반환하므로 이 경우를 처리
      return error.response.data;
    } else {
      console.error('중복 확인 에러', error);
      return { isDuplicate: false, message: '중복 확인 에러' };
    }
  }
};

export default checkDuplicate;
