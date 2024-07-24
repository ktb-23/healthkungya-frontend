// 상단 로고, 네비게이션바

import React from 'react';
import Logo from '../picture/logo.png';
import Home from '../picture/homeicon.png';
import Search from '../picture/searchicon.png';
import Alert from '../picture/alerticon.png';
import Profile from '../picture/profileicon.png';
import './styles/Navbar.scss';

const Navbar = () => {
  return (
    <>
      <img className="logo" src={Logo} alt="Logo" />
      <img className="home" src={Home} alt="Home" />
      <img className="search" src={Search} alt="Search" />
      <img className="alert" src={Alert} alt="Alert" />
      <img className="profile" src={Profile} alt="Profile" />
    </>
  );
};

// default export 추가
export default Navbar;
