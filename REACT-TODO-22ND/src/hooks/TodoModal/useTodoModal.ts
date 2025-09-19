import { useState } from 'react';
import type { TodosState, Todo, DateKey } from '@/types/todoTypes';
import type { ModalState } from '@/types/modalTypes';
import useLocalStorage from '@/hooks/useLocalStorage';
import { generateId } from '@/utils/idUtils';
import { formatDateKorean } from '@/utils/dateUtils';

export const useTodoModal = () => {
  const [todos, setTodos] = useLocalStorage<TodosState>('todos', {});
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    selectedDate: null
  });
  const [todoInput, setTodoInput] = useState('');

  // 모달 열기
  const openModal = (dateKey: DateKey) => {
    setModalState({
      isOpen: true,
      selectedDate: dateKey
    });
    setTodoInput('');
  };

  // 모달 닫기
  const closeModal = () => {
    setModalState({
      isOpen: false,
      selectedDate: null
    });
    setTodoInput('');
  };

  // 할 일 추가
  const addTodo = () => {
    const trimmedInput = todoInput.trim();
    if (!trimmedInput || !modalState.selectedDate) return;

    const newTodo: Todo = {
      id: generateId(),
      text: trimmedInput,
      completed: false
    };

    setTodos(prevTodos => ({
      ...prevTodos,
      [modalState.selectedDate!]: [
        ...(prevTodos[modalState.selectedDate!] || []),
        newTodo
      ]
    }));

    setTodoInput('');
  };

  // 할 일 완료/취소 토글
  const toggleTodo = (todoId: string) => {
    if (!modalState.selectedDate) return;

    setTodos(prevTodos => ({
      ...prevTodos,
      [modalState.selectedDate!]: prevTodos[modalState.selectedDate!].map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    }));
  };

  // 할 일 삭제
  const deleteTodo = (todoId: string) => {
    if (!modalState.selectedDate) return;

    setTodos(prevTodos => {
      const updatedTodos = prevTodos[modalState.selectedDate!].filter(
        todo => todo.id !== todoId
      );

      // 할 일이 없으면 해당 날짜 키 자체를 삭제
      if (updatedTodos.length === 0) {
        const newTodos = { ...prevTodos };
        delete newTodos[modalState.selectedDate!];
        return newTodos;
      }

      return {
        ...prevTodos,
        [modalState.selectedDate!]: updatedTodos
      };
    });
  };

  // 현재 선택된 날짜의 할 일 목록 가져오기
  const getCurrentTodos = (): Todo[] => {
    if (!modalState.selectedDate) return [];
    return todos[modalState.selectedDate] || [];
  };

  // 모달 제목 생성 (날짜 포맷팅)
  const getModalTitle = (): string => {
    if (!modalState.selectedDate) return '';
    
    const [year, month, day] = modalState.selectedDate.split('-').map(Number);
    return formatDateKorean(year, month - 1, day); // month는 1부터 시작하므로 -1
  };

  // Enter 키 핸들러
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return {
    modalState,
    todoInput,
    setTodoInput,
    openModal,
    closeModal,
    addTodo,
    toggleTodo,
    deleteTodo,
    getCurrentTodos,
    getModalTitle,
    handleKeyPress
  };
};