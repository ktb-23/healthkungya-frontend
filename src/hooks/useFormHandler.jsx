import { useCallback } from 'react';
import { ActionType } from '../reducers/Register';
import useFormValidation from './useValidation';

const useFormHandlers = (state, dispatch) => {
  const { validateField, errors } = useFormValidation(state);

  const handleInputChange = useCallback(
    (type, value) => {
      dispatch({ type, payload: value });

      // 인풋 값이 change 될때 유효성 검사
      switch (type) {
        case ActionType.SET_ID:
          validateField('id', value);
          break;
        case ActionType.SET_NICKNAME:
          validateField('nickname', value);
          break;
        case ActionType.SET_PASSWORD:
          validateField('password', value);
          break;
        case ActionType.SET_VERIFYPASSWORD:
          validateField('verifyPassword', value);
          break;
        case ActionType.SET_WEIGHT:
          validateField('weight', value);
          break;
        default:
          break;
      }
    },
    [dispatch, validateField]
  );

  return { handleInputChange, validateField, errors };
};

export default useFormHandlers;
