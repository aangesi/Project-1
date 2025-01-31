import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage'; // Импортируем компонент MainPage
import UserDetail from './UserDetail'; // Импортируем компонент UserDetail

const App = () => {
  return (
    <Router>
      <div>
        <h1>Приложение с пользователями</h1>
        <Routes>
          {/* Главная страница с списком пользователей */}
          <Route path="/" element={<MainPage />} />
          
          {/* Страница с подробной информацией о пользователе */}
          <Route path="/users/:userId" element={<UserDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
