import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartRoutes from './routes/StartRoutes';
import './App.css';
import PageRoutes from './routes/PageRoutes';
function App() {
  return (
    <Router>
      <StartRoutes />
      <PageRoutes />
    </Router>
  );
}

export default App;
