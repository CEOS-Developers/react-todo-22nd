import { useTodoModalContext } from '@/contexts/TodoModalContext';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  TodoList,
  EmptyMessage,
  TodoItem,
  TodoText,
  TodoActions,
  ToggleButton,
  DeleteButton,
  InputContainer,
  TodoInput,
  AddButton
} from '@/components/TodoModal/TodoModal.Styled';

const TodoModal = () => {
  const {
    modalState,
    closeModal,
    todoInput,
    setTodoInput,
    addTodo,
    toggleTodo,
    deleteTodo,
    getCurrentTodos,
    getModalTitle,
    handleKeyPress
  } = useTodoModalContext();

  if (!modalState.isOpen) {
    return null;
  }

  const todos = getCurrentTodos();

  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{getModalTitle()}</ModalTitle>
          <CloseButton onClick={closeModal}>x</CloseButton>
        </ModalHeader>

        <ModalBody>
          <TodoList>
            {todos.length === 0 ? (
              <EmptyMessage>할 일이 없습니다.</EmptyMessage>
            ) : (
              todos.map((todo) => (
                <TodoItem key={todo.id} $completed={todo.completed}>
                  <TodoText $completed={todo.completed}>
                    {todo.text}
                  </TodoText>
                  <TodoActions>
                    <ToggleButton
                      onClick={() => toggleTodo(todo.id)}
                      $completed={todo.completed}
                    >
                      {todo.completed ? '취소' : '완료'}
                    </ToggleButton>
                    <DeleteButton onClick={() => deleteTodo(todo.id)}>
                      삭제
                    </DeleteButton>
                  </TodoActions>
                </TodoItem>
              ))
            )}
          </TodoList>
          
          <InputContainer>
            <TodoInput
              type="text"
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="할 일을 입력하세요"
              autoFocus
            />
            <AddButton onClick={addTodo}>추가</AddButton>
          </InputContainer>
        </ModalBody>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default TodoModal;