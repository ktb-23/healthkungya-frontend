import Button from './Button';
import styles from './styles/ProfileSetting.module.scss';
import messi from '../picture/messi.jpg';
import Input from './Input';
import { useEffect, useReducer, useState } from 'react';
import { ActionType, initialState, ProfileReducer } from '../reducers/Profile';
import useGetProfile from '../api/useGetProfile';
import useUpdateProfile from '../api/useUpdateProfile';
import logo from '../picture/logo.png';
import { useNavigate } from 'react-router-dom';
const ProfileSetting = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(ProfileReducer, initialState);
  const [profileId, setProfileId] = useState();
  const getProfile = async () => {
    try {
      const response = await useGetProfile();
      setProfileId(response[0].profile_id);
      dispatch({ type: ActionType.SET_NAME, payload: response[0].nickname });
      dispatch({ type: ActionType.SET_ID, payload: response[0].id });
      dispatch({
        type: ActionType.SET_STATUS_MESSAGE,
        payload: response[0].statusMessage,
      });
      dispatch({
        type: ActionType.SET_IMAGEURL,
        payload: response[0].imageUrl,
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  const updateProfile = async () => {
    const body = {
      profile_id: profileId,
      id: state.id,
      nickname: state.name,
      statusMessage: state.status_message,
    };
    try {
      const response = await useUpdateProfile(body);
      alert(response.message.message);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main className={styles.profile}>
      <header>
        <Button
          onClick={() => navigate('/setting')}
          variant={'backBtn'}
        ></Button>
        <span>설정</span>
      </header>
      <div className={styles.profileSettingWrapper}>
        <span>개인정보 수정</span>
        <div className={styles.profileImageWrapper}>
          <img src={state.imageUrl || logo} alt="profileImg"></img>
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
