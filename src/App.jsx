import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartRoutes from './routes/StartRoutes';
import PageRoutes from './routes/PageRoutes';
import './App.css';
import { Provider } from 'react-redux';
import store from './provider/store';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path="/*" element={<StartRoutes />} />
          <Route path="/pages/*" element={<PageRoutes />} />
        </Routes>
      </Provider>
    </Router>
  );
}

export default App;
