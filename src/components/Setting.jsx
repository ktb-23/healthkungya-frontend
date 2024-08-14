import Button from './Button';
import styles from './styles/Setting.module.scss';
const Setting = () => {
  return (
    <main className={styles.setting}>
      <header>
        <Button variant={'backBtn'}></Button>
        <span>설정</span>
      </header>
      <div className={styles.buttonWrapper}>
        <Button variant={'setting'}>개인정보 수정</Button>
        <Button variant={'setting'}>로그아웃</Button>
        <Button variant={'setting'}>회원탈퇴</Button>
      </div>
    </main>
  );
};
export default Setting;
