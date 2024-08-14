import { Routes, Route } from 'react-router-dom';
import ExForm from '../containers/ExForm';

// 시작 페이지 라우트
function PageRoutes() {
  return (
    <Routes>
      <Route path="/exercise_log" element={<ExForm />} />
    </Routes>
  );
}

export default PageRoutes;
