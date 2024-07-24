import { useState, useEffect } from 'react';
import checkDuplicate from '../api/useCheckDuplicate';
import useDebounce from './useDebounce';

const useCheckDuplicates = (state) => {
    const [checkErrors, setCheckErrors] = useState({});
    const debouncedId = useDebounce(state.id, 500);
    const debouncedNickname = useDebounce(state.nickname, 500);

    useEffect(() => {
        if (debouncedId) {
            const checkId = async () => {
                try {
                    const response = await checkDuplicate('id', debouncedId);
                    if (response.message === '아이디가 이미 존재합니다.') {
                        setCheckErrors(prev => ({ ...prev, id: "아이디가 이미 존재합니다." }));
                    } else {
                        setCheckErrors(prev => ({ ...prev, id: "사용 가능합니다." }));
                    }
                } catch (error) {
                    console.error("Error checking ID:", error);
                }
            };
            checkId();
        }
    }, [debouncedId]);

    useEffect(() => {
        if (debouncedNickname) {
            const checkNickname = async () => {
                try {
                    const response = await checkDuplicate('nickname', debouncedNickname);
                    if (response.message === '닉네임이 이미 존재합니다.') {
                        setCheckErrors(prev => ({ ...prev, nickname: "닉네임이 이미 존재합니다." }));
                    } else {
                        setCheckErrors(prev => ({ ...prev, nickname: "사용 가능합니다." }));
                    }
                } catch (error) {
                    console.error("Error checking nickname:", error);
                }
            };
            checkNickname();
        }
    }, [debouncedNickname]);

    return { checkErrors };
};

export default useCheckDuplicates;
