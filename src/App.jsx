import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartRoutes from './routes/StartRoutes';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        {/* 시작 페이지 정의 */}
        <Route path="/" element={<StartRoutes />} />
      </Routes>
  </Router>
  );
}

export default App;
