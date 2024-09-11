import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // App 컴포넌트를 가져옵니다.

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found!');
}

// React 18의 새로운 방식으로 root를 렌더링합니다:
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
