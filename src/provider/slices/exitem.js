import { createSlice } from '@reduxjs/toolkit';

const exItemSlice = createSlice({
  name: 'exItem', // slice의 이름.
  initialState: {
    exItem: [], // 초기 상태 빈배열.
  },
  reducers: {
    addExItem: (state, action) => {
      // addExItem 액션을 처리하는 리듀서.
      // 액션 페이로드로 전달된 데이터로 상태를 업데이트.
      state.exItem.push(action.payload);
    },
    removeExItem: (state, action) => {
      state.exItem = action.payload;
    },
  },
});
export const { addExItem, removeExItem } = exItemSlice.actions;
export default exItemSlice.reducer;
