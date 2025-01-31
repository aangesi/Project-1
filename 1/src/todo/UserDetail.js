import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  // Загружаем подробную информацию о пользователе
  useEffect(() => {
    fetch(`https://json-placeholder.mock.beeceptor.com/users/${userId}`)
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, [userId]);

  // Если данные о пользователе ещё не загружены
  if (!user) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <h1>Подробности о пользователе</h1>
      <img src={user.profile_picture} alt={user.name} width="150" />
      <h2>{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Website:</strong> {user.website}</p>
      <p><strong>Company:</strong> {user.company.name}</p>
      <p><strong>Address:</strong> {user.address.street}, {user.address.city}</p>
    </div>
  );
};

export default UserDetail;
