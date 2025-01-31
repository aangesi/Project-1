import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  const [users, setUsers] = useState([]);

  // Загружаем список пользователей
  useEffect(() => {
    fetch('https://json-placeholder.mock.beeceptor.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h1>Список пользователей</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainPage;
