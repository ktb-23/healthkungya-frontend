import React from 'react';
import styles from "./styles/StartForm.module.scss"
import Button from '../components/Button';
import {useNavigate } from 'react-router-dom';
function StartForm() {
    const navigate=useNavigate()
    // 로그인 페이지 이동
    const handleLoginPage=()=>{
        navigate("/login")
    }

    const handleSignupPage=()=>{
        navigate("/signup")
    }
  return (
    <main className={styles.main}>
      <div className={styles.logo}></div>
      <section className={styles.buttons}>
        <div onClick={handleLoginPage}>
            <Button variant={"login"}>로그인하기</Button>
        </div>
        <div onClick={handleSignupPage}>
            <Button variant={"signup"}>회원가입하기</Button>
        </div>
       
      </section>
    </main>
  );
}

export default StartForm;