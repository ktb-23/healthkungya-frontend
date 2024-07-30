import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartRoutes from './routes/StartRoutes';
import './App.css';

function App() {
  return (
    <Router>
      <StartRoutes />
    </Router>
  );
}

export default App;
