import Button from './Button';
import styles from './styles/ProfileSetting.module.scss';
import messi from '../picture/messi.jpg';
import Input from './Input';
import { useEffect, useReducer, useState, useRef } from 'react';
import { ActionType, initialState, ProfileReducer } from '../reducers/Profile';
import useGetProfile from '../api/useGetProfile';
import useUpdateProfile from '../api/useUpdateProfile';
import logo from '../picture/logo.png';
import { useNavigate } from 'react-router-dom';
import useUpdateProfileImage from '../api/useUploadProfileImage';
const ProfileSetting = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(ProfileReducer, initialState);
  const [profileId, setProfileId] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
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
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log('Selected file:', file); // Debugging line

    const formData = new FormData();
    formData.append('profileImage', file);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await useUpdateProfileImage(formData);
      console.log('API Response:', response); // Debugging line
      if (response && response.message.imageUrl) {
        dispatch({
          type: ActionType.SET_IMAGEURL,
          payload: response.message.imageUrl,
        });
        alert('이미지가 성공적으로 업데이트 되었습니다.');
      }
    } catch (error) {
      console.error('이미지 업로드 실패', error);
      alert('이미지 업로드 실패');
    }
  };

  // Handle button click to trigger file input
  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
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
        <Button onClick={handleUploadButtonClick} variant={'profileupload'}>
          사진 업로드
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }} // Hide the file input
          onChange={handleImageChange}
          accept="image/*" // Restrict file types to images only
        />
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
