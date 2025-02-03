import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import ReactSwitch from 'react-switch';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background-color: ${(props) => (props.theme === 'dark' ? '#121212' : '#ffffff')};
    color: ${(props) => (props.theme === 'dark' ? '#ffffff' : '#121212')};
    transition: all 0.3s ease;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ThemeSwitcher = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AboutSection = styled.section`
  padding: 20px;
  max-width: 800px;
  margin-top: 50px;
  text-align: center;
  background-color: ${(props) => (props.theme === 'dark' ? '#333' : '#f5f5f5')};
  border-radius: 10px;
  box-shadow: ${(props) => (props.theme === 'dark' ? '0 4px 8px rgba(0, 0, 0, 0.1)' : '0 4px 8px rgba(0, 0, 0, 0.1)')};
  transition: all 0.3s ease;
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
  color: ${(props) => (props.theme === 'dark' ? '#fff' : '#333')};
`;

const Text = styled.p`
  font-size: 1.2em;
  color: ${(props) => (props.theme === 'dark' ? '#ccc' : '#666')};
  line-height: 1.6;
`;

const App = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Сохраняем тему в localStorage, чтобы она сохранялась после перезагрузки страницы
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <Wrapper>
      <GlobalStyle theme={theme} />
      <ThemeSwitcher>
        <ReactSwitch
          checked={theme === 'dark'}
          onChange={toggleTheme}
          offColor="#bbb"
          onColor="#333"
          height={20}
          width={50}
        />
      </ThemeSwitcher>

      <AboutSection theme={theme}>
        <Title theme={theme}>Обо мне</Title>
        <Text theme={theme}>
          Привет! Я разработчик, увлекающийся веб-разработкой и созданием красивых
          интерфейсов. Моя цель — создавать удобные и функциональные приложения,
          которые при этом выглядят красиво и стильно. Я всегда в поиске новых
          технологий и подходов для улучшения опыта пользователей.
        </Text>
        <Text theme={theme}>
          В свободное время я изучаю новые фреймворки и инструменты, а также люблю
          экспериментировать с дизайном и анимациями. Мой подход к разработке всегда
          основывается на принципах простоты и удобства.
        </Text>
      </AboutSection>
    </Wrapper>
  );
};

export default App;
