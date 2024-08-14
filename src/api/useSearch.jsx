import axios from 'axios';

const useSearch = async (type) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/exercise/search?type=${type}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('검색 조회 에러', error);
    return error;
  }
};
export default useSearch;
