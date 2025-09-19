import { useState } from "react";
import type { Todo } from "../types/todo";

export const useTodos = () => {
  // 각 날짜별 투두 저장
  const [todosForEachDay, setTodosForEachDay] = useState<{
    [key: string]: Todo[];
  }>({});

  //투두 추가
  const addTodo = (dateKey: string, text: string) => {
    const newTodo: Todo = { id: Date.now(), text, completed: false };
    const updatedTodos = {
      ...todosForEachDay,
      [dateKey]: [...(todosForEachDay[dateKey] || []), newTodo],
    };
    setTodosForEachDay(updatedTodos);
  };
  return { todosForEachDay, addTodo };
};
