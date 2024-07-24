import React from 'react';
import styles from "./styles/StartForm.module.scss"
import Button from '../components/Button';
function StartForm() {
  return (
    <main className={styles.main}>
      <div className={styles.logo}></div>
      <section className={styles.buttons}>
        <Button variant={"login"}>로그인하기</Button>
        <Button variant={"register"}>회원가입하기</Button>
      </section>
    </main>
  );
}

export default StartForm;