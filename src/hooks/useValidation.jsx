import { useState, useCallback } from 'react';
import { validateId, validateNickname, validatePassword, validateVerifyPassword, validateWeight } from '../config/validation';

const useFormValidation = (state) => {
    // 에러시 객체에 담음
    const [errors, setErrors] = useState({});

    // 유효성 검사
    const validateField = useCallback((field, value) => {
        let error = '';
        switch (field) {
            case 'id':
                error = validateId(value);
                break;
            case 'password':
                error = validatePassword(value);
                break;
            case 'verifyPassword':
                error = validateVerifyPassword(state.password, value);
                break;
            case 'nickname':
                error = validateNickname(value);
                break;
            case 'weight':
                error = validateWeight(value);
                break;
            default:
                break;
        }
        setErrors(prevErrors => ({ ...prevErrors, [field]: error }));
    }, [state.password]);

    return { errors, validateField };
};

export default useFormValidation;
