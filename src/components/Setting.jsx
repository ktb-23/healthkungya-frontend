import { useNavigate } from 'react-router-dom';
import Button from './Button';
import styles from './styles/Setting.module.scss';
import useDeleteProfile from '../api/useDeleteProfile';
const Setting = () => {
  const navigate = useNavigate();
  const handleProfileSetting = () => {
    navigate('/setting/profile');
  };
  const handleLogout = () => {
    localStorage.removeItem('nickname');
    localStorage.removeItem('accesstoken');
    localStorage.removeItem('refreshtoken');
    localStorage.removeItem('weight');
    navigate('/');
  };
  const handleResign = async () => {
    try {
      const response = await useDeleteProfile();
      console.log(response);
      alert(response.message);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main className={styles.setting}>
      <header>
        <Button variant={'backBtn'}></Button>
        <span>설정</span>
      </header>
      <div className={styles.buttonWrapper}>
        <div onClick={handleProfileSetting}>
          <Button variant={'setting'}>개인정보 수정</Button>
        </div>
        <div onClick={handleLogout}>
          <Button variant={'setting'}>로그아웃</Button>
        </div>
        <div onClick={handleResign}>
          <Button variant={'setting'}>회원탈퇴</Button>
        </div>
      </div>
    </main>
  );
};
export default Setting;
