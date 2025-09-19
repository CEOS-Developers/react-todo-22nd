import type { Todo } from '@/types/todoTypes';

// 완료된 할 일 개수 계산
export const getCompletedCount = (todos: Todo[]): number => {
  return todos.filter(todo => todo.completed).length;
};

// 미완료된 할 일 개수 계산  
export const getIncompleteCount = (todos: Todo[]): number => {
  return todos.filter(todo => !todo.completed).length;
};