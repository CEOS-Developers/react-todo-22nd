import type { Todo } from "../types/todo";
import {
  TodoItemWrapper,
  TodoText,
  DeleteButton,
  CompleteButton,
} from "../styles/todoStyle";
import trashIcon from "../assets/trash.svg";

type Props = {
  todo: Todo;
  dateKey: string;
  toggleTodo: (dateKey: string, id: number) => void;
  deleteTodo: (dateKey: string, id: number) => void;
};

export default function TodoItem({
  todo,
  dateKey,
  toggleTodo,
  deleteTodo,
}: Props) {
  return (
    <TodoItemWrapper completed={todo.completed}>
      <CompleteButton
        completed={todo.completed}
        onClick={(e) => {
          e.stopPropagation();
          toggleTodo(dateKey, todo.id);
        }}
      />
      <TodoText>{todo.text}</TodoText>
      <DeleteButton onClick={() => deleteTodo(dateKey, todo.id)}>
        <img src={trashIcon} alt="삭제" width={18} height={18} />
      </DeleteButton>
    </TodoItemWrapper>
  );
}
