import axios from 'axios';

// 회원가입 API
const useSignup = async (body) => {
  try {
    const response = await axios.post(
      'http://localhost:8000/api/auth/register',
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return {
      success: true,
      message: response.data.message || '회원가입이 완료되었습니다.',
    };
  } catch (error) {
    let errorMsg = '알 수 없는 오류가 발생했습니다';

    if (error.response) {
      // 서버가 200번대 외의 상태로 응답한 경우
      errorMsg = error.response.data.message || error.response.statusText;
    } else if (error.request) {
      // 요청이 전송되었으나 응답이 없는 경우
      errorMsg = '서버로부터 응답을 받지 못했습니다';
    } else {
      // 요청 설정 중에 발생한 기타 오류
      errorMsg = error.message;
    }

    return { success: false, message: errorMsg };
  }
};

export default useSignup;
