import Button from './Button';
import styles from './styles/ProfileSetting.module.scss';
import messi from '../picture/messi.jpg';
import Input from './Input';
const ProfileSetting = () => {
  return (
    <main className={styles.profile}>
      <header>
        <Button variant={'backBtn'}></Button>
        <span>설정</span>
      </header>
      <div className={styles.profileSettingWrapper}>
        <span>개인정보 수정</span>
        <div className={styles.profileImageWrapper}>
          <img src={messi} alt="profileImg"></img>
        </div>
        <Button variant={'profileupload'}>사진 업로드</Button>
        <Input variant={'name'} type="text" placeholder="이름"></Input>
        <textarea
          className={styles.statusmessage}
          placeholder={'다짐 한마디'}
        ></textarea>
        <Input variant={'id'} type="text" placeholder={'아이디'}></Input>
        <Button variant={'updateProfileBtn'}>수정하기</Button>
      </div>
    </main>
  );
};
export default ProfileSetting;
