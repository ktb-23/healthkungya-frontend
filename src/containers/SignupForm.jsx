//회원가입 폼
import React from 'react';
import styles from "./styles/LoginForm.module.scss"
function SignupForm() {
  return (
    <main className={styles.main}>
      <div className={styles.logo}></div>
      <section className={styles.buttons}>
        <Button variant={"loginsubmit"}>회원가입</Button>
      </section>
    </main>
  );
}

export default SignupForm;