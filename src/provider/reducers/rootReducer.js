import { combineReducers } from 'redux';
import exItemReducer from '../slices/exitem';

// combineReducers 함수를 사용하여 루트 리듀서를 생성
const rootReducer = combineReducers({
  exItem: exItemReducer,
});

export default rootReducer;
