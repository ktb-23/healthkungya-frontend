import { Routes, Route } from 'react-router-dom';
import StartForm from '../containers/StartForm';
import LoginForm from '../containers/LoginForm';
import SignupForm from '../containers/SignupForm';
import MainForm from '../containers/MainForm';

// 시작 페이지 라우트
function StartRoutes() {
  return (
    <Routes>
      <Route path="/" element={<StartForm />} />
      <Route path="login" element={<LoginForm />} />
      <Route path="signup" element={<SignupForm />} />
      <Route path="mainpage" element={<MainForm />} />
    </Routes>
  );
}

export default StartRoutes;
