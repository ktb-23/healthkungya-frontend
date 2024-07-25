import React, { useReducer } from 'react';
import styles from './styles/SignupForm.module.scss';
import Input from '../components/Input';
import Button from '../components/Button';
import { ActionType, initialState, RegisterReducer } from '../reducers/Register';
import useSignup from '../api/useSignup';
import { useNavigate } from 'react-router-dom';
import useFormHandlers from '../hooks/useFormHandler';
import useCheckDuplicates from '../hooks/useCheckDuplicate';

function SignupForm() {
    // 복잡한 상태관리 최적화
    const [state, dispatch] = useReducer(RegisterReducer, initialState);
    const navigate = useNavigate();
    
    const { handleInputChange, validateField, errors } = useFormHandlers(state, dispatch);
    const { checkErrors } = useCheckDuplicates(state);

    // 유효성 검상 성공시 회원가입 요청
    const submitForm = async (e) => {
        e.preventDefault();

        // errors 객체와 checkErrors 객체를 통해 입력값의 오류를 확인.
        // errors 객체의 값 중 하나라도 빈 문자열이 아니면 오류가 있으면
        // checkErrors 객체의 값 중 하나라도 '사용 가능합니다.'가 아니면 오류가 있으면
        if (Object.values(errors).some(error => error !== '') || 
            Object.values(checkErrors).some(error => error !== '사용 가능합니다.')) {
            alert("회원가입에 실패 했습니다.");
            return;
        }

        const body = {
            id: state.id,
            password: state.password,
            nickname: state.nickname,
            weight: parseFloat(state.weight)
        };

        try {
            const response = await useSignup(body);
            if (response.success) {
                alert(response.message);
                navigate('/login');
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.error("회원가입 중 오류 발생:", error);
            alert("회원가입 중 오류가 발생했습니다.");
        }
    };

    return (
        <main className={styles.main}>
            <div className={styles.signupmodal}>
                <div onClick={() => navigate("/")}>
                    <Button variant={"registerback"} />
                </div>
                <div className={styles.logo}></div>
                <section className={styles.inputs}>
                    <form className={styles.inputs} onSubmit={submitForm}>
                        <Input
                            type="text"
                            value={state.id}
                            onChange={(e) => handleInputChange(ActionType.SET_ID, e.target.value)}
                            onBlur={() => validateField('id', state.id)}
                            placeholder="아이디는 4~20자의 알파벳과 숫자만 허용"
                            variant={"registerinput"}
                            error={errors.id || checkErrors.id}
                        />
                        <Input
                            type="password"
                            value={state.password}
                            onChange={(e) => handleInputChange(ActionType.SET_PASSWORD, e.target.value)}
                            onBlur={() => validateField('password', state.password)}
                            placeholder="비밀번호(8자 이상, 문자/숫자/기호 사용 가능)"
                            variant={"registerinput"}
                            error={errors.password}
                        />
                        <Input
                            type="password"
                            value={state.verifyPassword}
                            onChange={(e) => handleInputChange(ActionType.SET_VERIFYPASSWORD, e.target.value)}
                            onBlur={() => validateField('verifyPassword', state.verifyPassword)}
                            placeholder="비밀번호 확인"
                            variant={"registerinput"}
                            error={errors.verifyPassword}
                        />
                        <Input
                            type="text"
                            value={state.nickname}
                            onChange={(e) => handleInputChange(ActionType.SET_NICKNAME, e.target.value)}
                            onBlur={() => validateField('nickname', state.nickname)}
                            placeholder="닉네임(1~8자)"
                            variant={"registerinput"}
                            error={errors.nickname || checkErrors.nickname}
                        />
                        <Input
                            type="number"
                            value={state.weight}
                            onChange={(e) => handleInputChange(ActionType.SET_WEIGHT, e.target.value)}
                            onBlur={() => validateField('weight', state.weight)}
                            placeholder="몸무게"
                            variant={"registerinput"}
                            step="0.1"
                            error={errors.weight}
                        />
                        <div type="submit">
                            <Button variant={"signup"}>회원가입</Button>
                        </div>
                    </form>
                    <div onClick={() => navigate("/login")}>
                        <Button>로그인</Button>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default SignupForm;
