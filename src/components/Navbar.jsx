//NOTE: 상단 로고, 네비게이션바

import React from 'react';
import Logo from '../picture/logo.png';
import Home from '../picture/homeicon.png';
import Search from '../picture/searchicon.png';
import Alert from '../picture/alerticon.png';
import Profile from '../picture/profileicon.png';
import './styles/Navbar.scss';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <header className="navHeader">
      <img className="logo" src={Logo} alt="Logo" />
      <div className="navicon">
        <img
          onClick={() => navigate('/mainpage')}
          className="home"
          src={Home}
          alt="Home"
        />
        <img className="search" src={Search} alt="Search" />
        <img className="alert" src={Alert} alt="Alert" />
        <img
          onClick={() => navigate('/setting')}
          className="profile"
          src={Profile}
          alt="Profile"
        />
      </div>
    </header>
  );
};

// default export 추가
export default Navbar;
