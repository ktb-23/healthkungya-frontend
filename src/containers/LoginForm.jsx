import React from 'react';
import styles from "./styles/LoginForm.module.scss"
function LoginForm() {
  return (
    <main className={styles.main}>
      <div className={styles.logo}></div>
      <section className={styles.buttons}>
        <Button variant={"loginsubmit"}>로그인</Button>
      </section>
    </main>
  );
}

export default LoginForm;