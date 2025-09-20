import { useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react'
import './App.css'
import { GlobalStyle } from './styles/GlobalStyles'
import Header from './components/Header'
import TaskInput from './components/TaskInput'
import TaskItem from './components/TaskItem'
import TaskList from './components/TaskList'

export type Todo = {
  id: string;
  text: string;
  done: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [mode, setMode] = useState<'all' | 'todo' | 'done'>('all');

  const todoCount = useMemo(() => {
    const done = todos.filter((task) => task.done).length;
    const todo = todos.length - done;
    return { done, todo, total: todos.length};
  }, [todos]);

  const filtered = useMemo(() => {
    if(mode === 'todo') return todos.filter((task) => !task.done);
    if(mode === 'done') return todos.filter((task) => task.done);
    return todos;
  }, [todos,mode]);

  const addTodo = (text: string) => {
    if(!text.trim()) return;
    setTodos((tasks) => [
      {
        id: Date.now().toString(),
        text: text.trim(),
        done: false,
      },
      ...tasks,
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos(tasks =>
    tasks.map(task =>
    task.id === id ? {...TaskItem, done: !task.done} : task));
  };

  const removeTodo = (id: string) => {
    setTodos((tasks) => tasks.filter((task) => task.id !== id));
  };

  return (
    <>
      <GlobalStyle />
      <Header
        total={todoCount.total}
        todo={todoCount.todo}
        done={todoCount.done}
        filter={mode}
        onChangeFilter={setMode}
      />
    </>
  )
}

export default App
