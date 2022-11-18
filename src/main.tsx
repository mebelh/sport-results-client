import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from 'App';
import 'typeface-roboto/index.css';
import SnakeBarWrapper from 'app/snakeBar/snakeBarWrapper';

export const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
    <SnakeBarWrapper />
  </React.StrictMode>
);
