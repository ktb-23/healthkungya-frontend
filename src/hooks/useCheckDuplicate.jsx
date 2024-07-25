import { useState, useEffect } from 'react';
import checkDuplicate from '../api/useCheckDuplicate';
import useDebounce from './useDebounce';

const useCheckDuplicates = (state) => {
    const [checkErrors, setCheckErrors] = useState({});
    const debouncedId = useDebounce(state.id, 500);
    const debouncedNickname = useDebounce(state.nickname, 500);

    // 아이디 디바운스를 통한 결과값으로 중복 확인
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
                    console.error("아이디 체크시 오류:", error);
                }
            };
            checkId();
        }
    }, [debouncedId]);

    // 닉네임 디바운스를 통한 결과값으로 중복 확인
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
                    console.error("닉네임 체크시 오류", error);
                }
            };
            checkNickname();
        }
    }, [debouncedNickname]);

    return { checkErrors };
};

export default useCheckDuplicates;
