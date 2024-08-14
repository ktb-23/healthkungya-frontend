import { Routes, Route } from 'react-router-dom';
import SettingForm from '../containers/SettingForm';
import ProfileSettingForm from '../containers/ProfileSettingForm';

// 시작 페이지 라우트
function SettingRoutes() {
  return (
    <Routes>
      <Route path="/setting" element={<SettingForm />} />
      <Route path="/setting/profile" element={<ProfileSettingForm />} />
    </Routes>
  );
}

export default SettingRoutes;
