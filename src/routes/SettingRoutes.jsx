import { Routes, Route } from 'react-router-dom';
import SettingForm from '../containers/SettingForm';

// 시작 페이지 라우트
function SettingRoutes() {
  return (
    <Routes>
      <Route path="/setting" element={<SettingForm />} />
    </Routes>
  );
}

export default SettingRoutes;
