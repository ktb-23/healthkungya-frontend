import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartRoutes from './routes/StartRoutes';
import './App.css';
import PageRoutes from './routes/PageRoutes';
import { Provider } from 'react-redux';
import store from './provider/store';
function App() {
  return (
    <Router>
      <Provider store={store}>
        <StartRoutes />
        <PageRoutes />
      </Provider>
    </Router>
  );
}

export default App;
