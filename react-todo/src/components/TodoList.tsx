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
  // 커스텀 훅에서 todos 상태 조작 함수들 불러옴
  const { todosForEachDay, addTodo, toggleTodo, deleteTodo } = useTodos();
  // 입력창 상태
  const [input, setInput] = useState("");
  // 날짜 관련
  const [date, setDate] = useState(new Date());
  const dateKey = date.toISOString().slice(0, 10);
  const formattedDate = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  // 현재 날짜의 todos 가져오기
  const todos = todosForEachDay[dateKey] || [];
  // todos 개수 count
  const remainingCount = todos.filter((todo) => !todo.completed).length;

  // 낳짜 이동 함수
  const changeDate = (days: number) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    setDate(newDate);
  };

  // 할 일 추가 관련 (입력창 이용)
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
