import React, { useState } from "react";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);  // Хранение задач
  const [task, setTask] = useState("");  // Значение для новой задачи

  // Функция для добавления задачи
  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);  // Добавляем задачу в список
      setTask("");  // Очищаем поле ввода
    }
  };

  // Функция для удаления задачи
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);  // Удаляем задачу по индексу
    setTasks(newTasks);
  };

  return (
    <div>
      <h2>Список задач</h2>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}  // Обновление значения задачи
        placeholder="Введите задачу"
      />
      <button onClick={addTask}>Добавить</button>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => deleteTask(index)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
