import Button from './Button';
import styles from './styles/ProfileSetting.module.scss';
import messi from '../picture/messi.jpg';
import Input from './Input';
import { useReducer } from 'react';
import { ActionType, initialState, ProfileReducer } from '../reducers/Profile';
const ProfileSetting = () => {
  const [state, dispatch] = useReducer(ProfileReducer, initialState);
  const updateProfile = () => {
    const body = {
      name: state.name,
      status_message: state.status_message,
      id: state.id,
    };
    console.log(body);
  };
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
        <Input
          value={state.name}
          onChange={(e) =>
            dispatch({ type: ActionType.SET_NAME, payload: e.target.value })
          }
          variant={'name'}
          type="text"
          placeholder="이름"
        ></Input>
        <textarea
          value={state.status_message}
          onChange={(e) =>
            dispatch({
              type: ActionType.SET_STATUS_MESSAGE,
              payload: e.target.value,
            })
          }
          className={styles.statusmessage}
          placeholder={'다짐 한마디'}
        ></textarea>
        <Input
          value={state.id}
          onChange={(e) =>
            dispatch({ type: ActionType.SET_ID, payload: e.target.value })
          }
          variant={'id'}
          type="text"
          placeholder={'아이디'}
        ></Input>
        <Button onClick={updateProfile} variant={'updateProfileBtn'}>
          수정하기
        </Button>
      </div>
    </main>
  );
};
export default ProfileSetting;
