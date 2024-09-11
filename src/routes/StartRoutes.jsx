import { Routes, Route } from 'react-router-dom';
import StartForm from '../containers/StartForm';
import LoginForm from '../containers/LoginForm';
import SignupForm from '../containers/SignupForm';
import MainForm from '../containers/MainForm';

function StartRoutes() {
  return (
    <Routes>
      <Route index element={<StartForm />} />
      <Route path="login" element={<LoginForm />} />
      <Route path="signup" element={<SignupForm />} />
      <Route path="mainpage" element={<MainForm />} />
    </Routes>
  );
}

export default StartRoutes;
