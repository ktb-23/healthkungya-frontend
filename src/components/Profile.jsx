//NOTE: 캘린더 위에 프로필 컴포넌트
//TODO: 사진 넣어보기 해야함
//TODO: 입력받아서 이름/ 상태메세지 나오는 부분 다시 확인해야함
import React from 'react';
import './styles/Profile.scss';
import { useEffect, useReducer } from 'react';
import { ActionType, initialState, ProfileReducer } from '../reducers/Profile';
import useGetProfile from '../api/useGetProfile';
import logo from '../picture/logo.png';
const Profile = ({ profileImage, profileName, statusMessage }) => {
  const [state, dispatch] = useReducer(ProfileReducer, initialState);
  const getProfile = async () => {
    try {
      const response = await useGetProfile();
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
  return (
    <>
      <div className="profilebox">
        <img
          src={state.imageUrl || logo}
          alt="Profile"
          className="profile-image"
        />
        <div className="profile-info">
          <h2 className="profile-name">{state.name}</h2> {/* 프로필 이름 */}
          <p className="profile-status">{state.status_message}</p>{' '}
          {/* 상태 메시지 */}
        </div>
      </div>
    </>
  );
};

export default Profile;
