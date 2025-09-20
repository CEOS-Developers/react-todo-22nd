import React from "react";
import type { Todo } from "../types";

type Props = {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TodoList({ todos, onToggle, onDelete }: Props) {
  return (
    <div>
      <ul>
        {todos.map((t) => (
          <li key={t.id} className={t.done ? "done" : ""}>
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => onToggle(t.id)}
            />
            <label title={t.text}>{t.text}</label>
            <button onClick={() => onDelete(t.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
