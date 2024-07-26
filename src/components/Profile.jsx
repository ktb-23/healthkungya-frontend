//NOTE: 캘린더 위에 프로필 컴포넌트
//TODO: 사진 넣어보기 해야함
//TODO: 입력받아서 이름/ 상태메세지 나오는 부분 다시 확인해야함
import React from 'react';
import './styles/Profile.scss';

const Profile = ({ profileImage, profileName, statusMessage }) => {
  return (
    <>
      <div className="profilebox">
        <img src={profileImage} alt="Profile" className="profile-image" />
        <div className="profile-info">
          <h2 className="profile-name">name</h2> {/* 프로필 이름 */}
          <p className="profile-status">상태메세지</p> {/* 상태 메시지 */}
        </div>
      </div>
    </>
  );
};

export default Profile;
