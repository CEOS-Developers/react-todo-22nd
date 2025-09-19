import TodoItem from "./TodoItem";
import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import { InputWrapper, TodoInput, AddButton } from "../styles/inputStyle";
import { TodoListWrapper } from "../styles/todoStyle";

export default function TodoList() {
  const { todosForEachDay, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [input, setInput] = useState("");

  const dateKey = "2025-09-20";
  const todos = todosForEachDay[dateKey] || [];

  const handleAdd = () => {
    if (!input.trim()) return;
    addTodo(dateKey, input.trim());
    setInput("");
  };

  return (
    <div>
      <TodoListWrapper>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            dateKey={dateKey}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </TodoListWrapper>

      <InputWrapper>
        <TodoInput
          type="text"
          value={input}
          placeholder="할 일을 입력해주세요 . . !"
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleAdd();
            }
          }}
        />
        <AddButton onClick={handleAdd}>+</AddButton>
      </InputWrapper>
    </div>
  );
}
