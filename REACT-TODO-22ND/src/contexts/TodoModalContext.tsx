import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { TodosState, Todo, DateKey } from '@/types/todoTypes';
import type { ModalState } from '@/types/modalTypes';
import useLocalStorage from '@/hooks/useLocalStorage';
import { generateId } from '@/utils/idUtils';
import { formatDateKorean } from '@/utils/dateUtils';

// Context 타입 정의
interface TodoModalContextType {
  // 모달 상태
  modalState: ModalState;
  openModal: (dateKey: DateKey) => void;
  closeModal: () => void;
  
  // Todo 관리
  todoInput: string;
  setTodoInput: (input: string) => void;
  addTodo: () => void;
  toggleTodo: (todoId: string) => void;
  deleteTodo: (todoId: string) => void;
  getCurrentTodos: () => Todo[];
  getTodos: () => TodosState; // Calendar에서 todos 가져오기용
  getModalTitle: () => string;
  handleKeyPress: (e: React.KeyboardEvent) => void;
}

// Context 생성
const TodoModalContext = createContext<TodoModalContextType | undefined>(undefined);

// Provider Props 타입
interface TodoModalProviderProps {
  children: ReactNode;
}

// Provider 컴포넌트
export function TodoModalProvider({ children }: TodoModalProviderProps) {
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
        const { [modalState.selectedDate!]: _, ...rest } = prevTodos;
        void _;
        return rest;
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

  // 전체 todos 가져오기 (Calendar에서 사용)
  const getTodos = (): TodosState => {
    return todos;
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

  const contextValue: TodoModalContextType = {
    modalState,
    openModal,
    closeModal,
    todoInput,
    setTodoInput,
    addTodo,
    toggleTodo,
    deleteTodo,
    getCurrentTodos,
    getTodos,
    getModalTitle,
    handleKeyPress
  };

  return (
    <TodoModalContext.Provider value={contextValue}>
      {children}
    </TodoModalContext.Provider>
  );
}

// Context 사용을 위한 커스텀 훅
// eslint-disable-next-line react-refresh/only-export-components
export const useTodoModalContext = (): TodoModalContextType => {
  const context = useContext(TodoModalContext);

  if (context === undefined) {
    throw new Error('useTodoModalContext는 TodoModalProvider 내부에서 사용되어야 합니다');
  }

  return context;
};