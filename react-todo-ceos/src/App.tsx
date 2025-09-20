import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import styled from 'styled-components';
import TodoList from './components/List';
import type { Todos } from './Type';
import TodoInput from './components/Input';

const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0]; // 'YYYY-MM-DDThh:mm:ss.sssZ' -> 'YYYY-MM-DD'
};

const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todos>(() => {
    const stored = localStorage.getItem('todos');
    if (stored) {
      const parsed = JSON.parse(stored);
      const fixed: Todos = {};
      for (const date in parsed) {
        fixed[date] = parsed[date].map((item: any) =>
          typeof item === 'string' ? { text: item, completed: false } : item
        );
      }
      return fixed;
    }
    return {};
  });
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [inputValue, setInputValue] = useState<string>('');

  // useEffect(() => {
  //   const stored = localStorage.getItem('todos');
  //   if (stored) {
  //     setTodos(JSON.parse(stored));
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const dateKey = formatDate(currentDate);
  const todayTodos = todos[dateKey] || [];

  const addTodo = () => {
    const text = inputValue.trim();
    if (!text) return;

    setTodos((prev) => {
      const updated = { ...prev };
      if (!updated[dateKey]) {
        updated[dateKey] = [];
      }
      updated[dateKey] = [...updated[dateKey], { text, completed: false }];

      return updated;
    });
    setInputValue('');
  };

  const deleteTodo = (index: number) => {
    setTodos((prev) => {
      const updated = { ...prev };
      updated[dateKey] = updated[dateKey].filter((_, i) => i !== index);
      return updated;
    });
  };

  const goPrevDate = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  const goNextDate = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  };

  return (
    <TodoContainer>
      <Header currentDate={dateKey} onPrev={goPrevDate} onNext={goNextDate} />
      <TodoInput value={inputValue} onChange={setInputValue} onAdd={addTodo} />
      <TodoList todos={todos[dateKey] || []} onDelete={deleteTodo} />
    </TodoContainer>
  );
};

export default TodoApp;
