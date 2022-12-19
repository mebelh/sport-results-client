import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from 'App';
import 'typeface-roboto/index.css';
import SnakeBarWrapper from 'app/snakeBar/snakeBarWrapper';
import { BrowserRouter } from 'react-router-dom';

export const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <App />
    <SnakeBarWrapper />
  </BrowserRouter>
);

// Авторизация - DONE
// Доработать дизайн списка результатов DONE
// Поправить дабл клик по кнопке !!! create workout, create exercise
// График динамики по упражнениям
// Заполнение данных о пользователе
// Динамика веса
// Рефакторинг dal - оставить только запросы, а хранение данных перенести во viewStore
