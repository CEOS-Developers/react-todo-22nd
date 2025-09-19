import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <li>
      <span>{todo.text}</span>
      <span>{todo.completed ? "✔" : ""}</span>
    </li>
  );
}
