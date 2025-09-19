import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]); // 할 일 목록 상태
  const [inputValue, setInputValue] = useState(""); // 입력창 상태

  const addTodo = () => {
    if (inputValue.trim() === "") return; // 빈 값은 무시
    setTodos([...todos, inputValue]); // 기존 todos에 새 항목 추가
    setInputValue(""); // 입력창 비우기
  };
  return (
    <div id="Todo-list">
      <h2 id="title">Todo List</h2>
      <div id="week-calendar">
        <div className="day sunday">일</div>
        <div className="day">월</div>
        <div className="day">화</div>
        <div className="day">수</div>
        <div className="day">목</div>
        <div className="day">금</div>
        <div className="day saturday">토</div>
      </div>
      <div id="listArea">
        {todos.map((todo, index) => (
          <div key={index} className="todo-item">
            {todo}
          </div>
        ))}
      </div>
      <div id="addArea">
        <input
          type="text"
          placeholder="할 일을 입력하세요!"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <button onClick={addTodo}>추가</button>
      </div>
    </div>
  );
}

export default App;
