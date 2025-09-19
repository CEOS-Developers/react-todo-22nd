import TodoItem from "./TodoItem";
import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import { InputWrapper, TodoInput, AddButton } from "../styles/inputStyle";
import {
  TodoListWrapper,
  DateNav,
  NavButton,
  DateHeading,
} from "../styles/todoStyle";

export default function TodoList() {
  const { todosForEachDay, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [input, setInput] = useState("");
  const [date, setDate] = useState(new Date());
  const dateKey = date.toISOString().slice(0, 10);
  const formattedDate = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  const todos = todosForEachDay[dateKey] || [];
  const remainingCount = todos.filter((todo) => !todo.completed).length;

  const changeDate = (days: number) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    setDate(newDate);
  };

  const handleAdd = () => {
    if (!input.trim()) return;
    addTodo(dateKey, input.trim());
    setInput("");
  };

  return (
    <div>
      <DateNav>
        <NavButton onClick={() => changeDate(-1)}>◀</NavButton>
        <DateHeading>{formattedDate}</DateHeading>
        <NavButton onClick={() => changeDate(1)}>▶</NavButton>
      </DateNav>
      <p>오늘의 남은 할 일은 {remainingCount}개 입니다!</p>
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
