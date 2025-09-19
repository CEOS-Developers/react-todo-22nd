import type { Todo } from '@/types/todoTypes';

// 할 일 목록이 비어있는지 확인
export const isEmptyTodoList = (todos: Todo[]): boolean => {
  return todos.length === 0;
};

// 완료된 할 일 개수 계산
export const getCompletedCount = (todos: Todo[]): number => {
  return todos.filter(todo => todo.completed).length;
};

// 미완료된 할 일 개수 계산  
export const getIncompleteCount = (todos: Todo[]): number => {
  return todos.filter(todo => !todo.completed).length;
};

// 할 일 완료율 계산 (0-100)
export const getCompletionRate = (todos: Todo[]): number => {
  if (todos.length === 0) return 0;
  return Math.round((getCompletedCount(todos) / todos.length) * 100);
};

// 입력값 유효성 검사
export const validateTodoInput = (input: string): boolean => {
  const trimmed = input.trim();
  return trimmed.length > 0 && trimmed.length <= 100; // 최대 100자 제한
};