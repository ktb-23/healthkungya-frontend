import React from 'react';
import styles from './styles/StartForm.module.scss';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
function StartForm() {
  const navigate = useNavigate();
  // 로그인 페이지 이동
  const handleLoginPage = () => {
    navigate('/login');
  };

  // 회원가입 페이지 이동
  const handleSignupPage = () => {
    navigate('/signup');
  };
  return (
    <main className={styles.main}>
      <header className={styles.logoContainer}>
        <div className={styles.logo}></div>
      </header>
      <section className={styles.buttons}>
        <Button onClick={handleLoginPage} variant={'login'}>
          로그인하기
        </Button>
        <Button onClick={handleSignupPage} variant={'signup'}>
          회원가입하기
        </Button>
      </section>
    </main>
  );
}

export default StartForm;
