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

  const addTodo = () => {
    if (inputValue.trim() === "") return;
    setTodos([...todos, inputValue]);
    setInputValue("");
  };

  return (
    <AppContainer>
      <TodoList>
        <Title>Todo List</Title>

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
            <TodoItem key={index}>{todo}</TodoItem>
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
          <button onClick={addTodo}>추가</button>
        </AddArea>
      </TodoList>
    </AppContainer>
  );
}

export default App;
