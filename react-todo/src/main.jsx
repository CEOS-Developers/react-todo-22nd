import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
//import "./index.css"; // 기본 전역 초기화 (선택)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
