import { useState } from "react";
import {
  AppContainer,
  TodoList,
  Title,
  WeekCalendar,
  Day,
  AddArea,
  ListArea,
  TodoItem,
} from "./App.styles";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  //투두 추가하기
  const addTodo = () => {
    if (inputValue.trim() === "") return;
    setTodos([...todos, { text: inputValue, isDone: false }]);
    setInputValue("");
  };

  //투두 삭제하기
  const deleteTodo = (indexToDelete) => {
    setTodos(todos.filter((_, idx) => idx !== indexToDelete));
  };

  //투두 완료표시하기
  const completeTodo = (index) => {
    setTodos(
      todos.map((todo, idx) =>
        idx === index ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };
  // 전체 투두 개수와 완료된 투두 개수 계산
  const totalCount = todos.length;
  const doneCount = todos.filter((todo) => todo.isDone).length;

  return (
    <AppContainer>
      <TodoList>
        <Title>Todo List</Title>
        <div
          style={{
            textAlign: "center",
            marginBottom: "1rem",
            fontWeight: 500,
            color: "black",
          }}
        >
          전체: {totalCount} | 완료: {doneCount}
        </div>

        <WeekCalendar>
          <Day sunday>일</Day>
          <Day>월</Day>
          <Day>화</Day>
          <Day>수</Day>
          <Day>목</Day>
          <Day>금</Day>
          <Day saturday>토</Day>
        </WeekCalendar>

        <ListArea>
          {todos.map((todo, index) => (
            <TodoItem
              key={index}
              style={{
                textDecoration: todo.isDone ? "line-through" : "none",
                color: todo.isDone ? "#aaa" : "inherit",
              }}
            >
              <input
                type="checkbox"
                checked={todo.isDone}
                onChange={() => completeTodo(index)}
                style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "1rem",
                  accentColor: "#6a0dad",
                }}
              />
              {todo.text}
              <button
                onClick={() => deleteTodo(index)}
                style={{ marginLeft: "auto" }}
              >
                ❌
              </button>
            </TodoItem>
          ))}
        </ListArea>

        <AddArea>
          <input
            type="text"
            placeholder="할 일을 입력하세요!"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
          <button onClick={addTodo}>Add</button>
        </AddArea>
      </TodoList>
    </AppContainer>
  );
}

export default App;
