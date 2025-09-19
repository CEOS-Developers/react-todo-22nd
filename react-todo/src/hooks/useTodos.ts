import { useState } from "react";
import type { Todo } from "../types/todo";

export const useTodos = () => {
  const [todosForEachDay, setTodosForEachDay] = useState<{
    [key: string]: Todo[];
  }>({});

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
