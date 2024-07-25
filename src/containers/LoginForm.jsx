import React, { useEffect, useReducer, useState } from 'react';
import styles from "./styles/LoginForm.module.scss"
import Button from '../components/Button';
import Input from '../components/Input';
import { ActionType, initialState, LoginReducer } from '../reducers/Login';
import { useNavigate } from 'react-router-dom';
import useFormValidation from '../hooks/useValidation';
function LoginForm() {
   // 복잡한 상태관리 최적화
  const [state, dispatch] = useReducer(LoginReducer,initialState);
  const [error, setError] = useState(true);
  const { validateField, validateForm } = useFormValidation(state);
  const navigate=useNavigate()
  useEffect(() => {
    validateField('id', state.id);
    validateField('password', state.password);
  }, [state.id, state.password, validateField]);

  const submitForm = (e) => {
    e.preventDefault();
    validateForm();
    if (state.id.trim() !== '' && state.password.trim() !== '') {
      setError(false)
      console.log("hello")
    }
    else{
      setError(true)
    }
    
  };
  return (
    <main className={styles.main}>
      <div className={styles.loginmodal}>
        <div onClick={() => navigate("/")}>
          <Button variant={"loginback"} />
        </div>
        <div className={styles.logo}></div>
        <section className={styles.inputs}>
          <form className={styles.inputs} onSubmit={submitForm}>
            <Input  type="text"
            value={state.id}
            onChange={(e)=>dispatch({type:ActionType.SET_ID, payload:e.target.value})}
            placeholder="아이디"
            variant={"logininput"}></Input>
            <Input type="password"
            value={state.password}
            onChange={(e)=>dispatch({type:ActionType.SET_PASSWORD, payload:e.target.value})} 
            placeholder="비밀번호"
            variant={"logininput"}></Input>
            {error&&<div style={{ color: `var(--error-color)`, fontSize:"11px" }}>아이디/비밀번호를 확인해주세요</div>}
            <div type="submit">
              <Button variant={"login"}>로그인</Button>
            </div>
          </form>
          <Button>회원가입</Button>
        </section>
      </div>
      
    </main>
  );
}

export default LoginForm;