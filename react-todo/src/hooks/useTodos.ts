import { useState, useEffect } from "react";
import type { Todo } from "../types/todo";

const STORAGE_KEY = "todos_by_date";

export const useTodos = () => {
  const [todosForEachDay, setTodosForEachDay] = useState<{
    [key: string]: Todo[];
  }>({});

  // localStorage에서 불러오기
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setTodosForEachDay(JSON.parse(saved));
    }
  }, []);

  // 바뀔때마다 localStorage 저장
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todosForEachDay));
  }, [todosForEachDay]);

  // 투두 추가
  const addTodo = (dateKey: string, text: string) => {
    const newTodo: Todo = { id: Date.now(), text, completed: false };
    setTodosForEachDay({
      ...todosForEachDay,
      [dateKey]: [...(todosForEachDay[dateKey] || []), newTodo],
    });
  };

  // 투두 완료
  const toggleTodo = (dateKey: string, id: number) => {
    setTodosForEachDay({
      ...todosForEachDay,
      [dateKey]: todosForEachDay[dateKey].map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    });
  };

  // 투두 삭제
  const deleteTodo = (dateKey: string, id: number) => {
    setTodosForEachDay({
      ...todosForEachDay,
      [dateKey]: todosForEachDay[dateKey].filter((todo) => todo.id !== id),
    });
  };

  return { todosForEachDay, addTodo, toggleTodo, deleteTodo };
};
