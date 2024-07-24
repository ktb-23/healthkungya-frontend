import React, { useState,useEffect, useReducer } from 'react';
import styles from './styles/SignupForm.module.scss';
import Input from '../components/Input';
import { handleBlur, handleSubmit } from '../config/validation';
import Button from '../components/Button';
import { ActionType, initialState, RegisterReducer } from '../reducers/Register';
import useSignup from '../api/useSignup';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';
import checkDuplicate from '../api/useCheckDuplicate';

function SignupForm() {
    // 복잡한 상태관리 최적화
    const [state,dispatch]=useReducer(RegisterReducer,initialState)

    // 에러시 객체에 담음
    const [errors, setErrors] = useState({});

    const [hasErrors, setHasErrors] = useState(false);

    const navigate=useNavigate()

    //아이디 디바운스
    const debouncedId = useDebounce(state.id, 500);
  
    useEffect(() => {
        if (debouncedId) {
            checkDuplicate('id', debouncedId).then(response => {
                if (response.message === '아이디가 이미 존재합니다.') {
                    alert("아이디가 이미 존재합니다.")
                    dispatch({type: ActionType.SET_ID, payload: ""})
                } 
            });
        }
    }, [debouncedId]);
      // 닉네임 디바운스
      const debouncedNickname = useDebounce(state.nickname, 500);
      useEffect(() => {
        if (debouncedNickname) {
            checkDuplicate('nickname', debouncedNickname).then(response => {
                if (response.message === '닉네임이 이미 존재합니다.') {
                    alert("닉네임이 이미 존재합니다.")
                    dispatch({type: ActionType.SET_NICKNAME, payload: ""})
                }
            });
        }
    }, [debouncedNickname]);


    useEffect(() => {
        setHasErrors(Object.values(errors).some(error => error !== ''));
    }, [errors]);

    // 유효성 검상 성공시 백엔드 요청
    const submitForm = async() => {
        const body={
            id:state.id,
            password:state.password,
            nickname:state.nickname,
            weight:parseFloat(state.weight)
        }
        const response = await useSignup(body)
        // Alert으로 성공 메시지 또는 오류 메시지 표시
        if (response.success) {
            alert(response.message); // 성공 메시지 표시
            navigate('/login'); // 로그인 페이지로 이동
        } else {
            alert(response.message); // 오류 메시지 표시
        }
        
    };

    return (
        <main className={styles.main}>
            <div className={styles.signupmodal}>
                <div onClick={()=>{navigate("/")}}>
                    <Button variant={"back"}/>
                </div>
                <div className={styles.logo}></div>
                {/* 에러 발생시 간격 줄임 */}
                <section className={styles.inputs} >
                    {/* 유효성 검사 */}
                    <form className={styles.inputs} 
                    onSubmit={(e) => handleSubmit(e, state.id, state.password, state.verifyPassword, state.nickname, state.weight, hasErrors, submitForm)}>
                        <Input
                            type="text"
                            value={state.id}
                            onChange={(e) => dispatch({type: ActionType.SET_ID, payload: e.target.value})}
                            onBlur={() => handleBlur('id', state.id, setErrors)}
                            placeholder="아이디는 4~20자의 알파벳과 숫자만 허용"
                            variant={"registerinput"}
                            error={errors.id}
                        />
                        <Input
                            type="password"
                            value={state.password}
                            onChange={(e) => dispatch({type: ActionType.SET_PASSWORD, payload: e.target.value})}
                            onBlur={() => handleBlur('password', state.password, setErrors)}
                            placeholder="비밀번호(8자 이상, 문자/숫자/기호 사용 가능)"
                            variant={"registerinput"}
                            error={errors.password}
                        />
                        <Input
                            type="password"
                            value={state.verifyPassword}
                            onChange={(e) => dispatch({type: ActionType.SET_VERIFYPASSWORD, payload: e.target.value})}
                            onBlur={() => handleBlur('verifyPassword', state.verifyPassword, setErrors, state.password)}
                            placeholder="비밀번호 확인"
                            variant={"registerinput"}
                            error={errors.verifyPassword}
                        />
                        <Input
                            type="text"
                            value={state.nickname}
                            onChange={(e) => dispatch({type: ActionType.SET_NICKNAME, payload: e.target.value})}
                            onBlur={() => handleBlur('nickname', state.nickname, setErrors)}
                            placeholder="닉네임(1~8자)"
                            variant={"registerinput"}
                            error={errors.nickname}
                        />
                        <Input
                            type="number"
                            value={state.weight}
                            onChange={(e) => dispatch({type: ActionType.SET_WEIGHT, payload: e.target.value})}
                            onBlur={() => handleBlur('weight', state.weight, setErrors)}
                            placeholder="몸무게"
                            variant={"registerinput"}
                            step="0.1"
                            error={errors.weight}
                        />
                        <div type="submit">
                            <Button variant={"signup"}>회원가입</Button>
                        </div>
                    </form>
                    <div onClick={()=>navigate("/login")}>
                        <Button>로그인</Button>
                    </div>
                    
                </section>
                
            </div>
        </main>
    );
}

export default SignupForm;