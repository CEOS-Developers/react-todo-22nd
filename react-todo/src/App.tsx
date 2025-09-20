import { useEffect, useMemo, useState } from 'react'
import React from 'react'
import './App.css'
import { GlobalStyle } from './styles/GlobalStyles'
import Header from './components/Header/Header'
import TaskInput from './components/TaskInput/TaskInput'
import TaskList from './components/TaskList/TaskList'

const STORAGE_KEY = 'todoByDate';

const today = new Date().toISOString().split('T')[0];

export type Todo = {
  id: string;
  text: string;
  done: boolean;
};

function App() {
  type TodoByDate = Record<string, Todo[]>;
  type Update = (prev: Todo[]) => Todo[];
  // const [todos, setTodos] = useState<Todo[]>([]);
  const [mode, setMode] = useState<'all' | 'todo' | 'done'>('all');
  const [selectedDate, setSelectedDate] = useState<string>(today);

  //structure: [date: string]: todo[]
  const [todosByDate, setTodosByDate] = useState<Record<string, Todo[]>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw): {};
    } catch {
      return {};
    }
  });

  const todos = todosByDate[selectedDate] || [];

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todosByDate));
  }, [todosByDate]);

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

  

  const updateTodos = (date: string, update: Update) => {
    if(!date) return;
    setTodosByDate((prev) => {
      const current = prev[date] ?? [];
      const next = update(current);
      return { ...prev, [date]: next};
    });
  };

  const addTodo = (text: string) => {
    if(!text.trim()) return;
    updateTodos(selectedDate, tasks => [
      {
        id: Date.now().toString(),
        text: text.trim(),
        done: false,
      },
      ...tasks,
    ]);
  };

  const toggleTodo = (id: string) => {
    updateTodos(selectedDate, tasks =>
    tasks.map(task =>
    task.id === id ? {...task, done: !task.done} : task));
  };

  const removeTodo = (id: string) => {
    updateTodos(selectedDate, tasks => tasks.filter((task) => task.id !== id));
  };

  return (
    <>
      <GlobalStyle />
      <div style={{marginBottom:'20px', textAlign:'center'}}>
        <input type='date' value={selectedDate} onChange={(e)=> setSelectedDate(e.target.value)} />
      </div>
      <Header
        total={todoCount.total}
        todo={todoCount.todo}
        done={todoCount.done}
        filter={mode}
        onChangeFilter={setMode}
      />
      <TaskInput onAdd={addTodo} />
      <TaskList items={filtered} onToggle={toggleTodo} onRemove={removeTodo} />
    </>
  )
}

export default App
