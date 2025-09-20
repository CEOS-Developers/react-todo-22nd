import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { startDay, toKey } from "./utils";
import type { Book } from "./types";

const STORAGE_KEY = "todo-react";

function App() {
  const [date, setDate] = useState<Date>(() => startDay(new Date()));

  // 웹 다시 켰을때 로컬스토리지에서 복구
  const [book, setBook] = useState<Book>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  });

  // book을 감지해서 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(book));
  }, [book]);

  const key = toKey(date);
  const todos = book[key] || [];

  const addTodo = (text: string) =>
    setBook((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), { id: Date.now(), text, done: false }],
    }));

  const toggleTodo = (id: number) =>
    setBook((prev) => ({
      ...prev,
      [key]: (prev[key] || []).map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      ),
    }));

  const deleteTodo = (id: number) =>
    setBook((prev) => ({
      ...prev,
      [key]: (prev[key] || []).filter((t) => t.id !== id),
    }));

  const doneCount = todos.filter((t) => t.done).length;
  const todoCount = todos.length - doneCount;

  return (
    <>
      <h1 style={{ textAlign: "center" }}>To Do</h1>
      <Navbar date={date} setDate={setDate} />
      <TodoInput
        onAdd={addTodo}
        date={date}
        setDate={setDate}
        todoCount={todoCount}
        doneCount={doneCount}
      />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </>
  );
}

export default App;
