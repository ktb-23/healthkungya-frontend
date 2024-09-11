import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartRoutes from './routes/StartRoutes';
import PageRoutes from './routes/PageRoutes';
import './App.css';
import { Provider } from 'react-redux';
import store from './provider/store';
import SettingRoutes from './routes/SettingRoutes';
function App() {
  return (
    <Router>
      <Provider store={store}>
        <StartRoutes />
        <PageRoutes />
        <SettingRoutes />
      </Provider>
    </Router>
  );
}

export default App;
