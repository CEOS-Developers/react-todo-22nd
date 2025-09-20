import { useEffect, useState } from "react";
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
  // 주 시작일(일요일)을 구하는 함수
  const getStartOfWeek = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - d.getDay());
    return d;
  };

  const [currentWeekStart, setCurrentWeekStart] = useState(() =>
    getStartOfWeek(new Date())
  );

  //선택된 날짜 관리
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.getTime();
  });

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  //현재 선택된 날짜 개수 관리
  const todosOfSelectedDate = todos.filter(
    (todo) => todo.date === selectedDate
  );

  const [inputValue, setInputValue] = useState("");

  // 일~토 날짜 배열 만들기 (currentWeekStart 기준)
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(currentWeekStart);
    d.setDate(currentWeekStart.getDate() + i);
    d.setHours(0, 0, 0, 0);
    return d;
  });

  //투두 추가하기
  const addTodo = () => {
    if (inputValue.trim() === "") return;
    setTodos([
      ...todos,
      {
        text: inputValue,
        isDone: false,
        date: selectedDate,
      },
    ]);
    setInputValue("");
  };

  //투두 삭제하기
  const deleteTodo = (indexToDelete) => {
    setTodos(todos.filter((_, idx) => idx !== indexToDelete));
  };

  //투두 완료 체크 표시하기
  const completeTodo = (index) => {
    setTodos(
      todos.map((todo, idx) =>
        idx === index ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  // 전체 투두 개수와 완료된 투두 개수 계산
  const totalCount = todosOfSelectedDate.length;
  const doneCount = todosOfSelectedDate.filter((todo) => todo.isDone).length;

  // 제목 클릭 시 오늘 기준 이번 주로 이동
  const TitleClick = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startOfThisWeek = getStartOfWeek(today);
    setCurrentWeekStart(startOfThisWeek);
    setSelectedDate(today.getTime());
  };
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <AppContainer>
      <TodoList>
        <Title onClick={TitleClick} style={{ cursor: "pointer" }}>
          Todo List
        </Title>
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
          <button
            style={{
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              marginRight: "0.5rem",
            }}
            onClick={() => {
              const prev = new Date(currentWeekStart);
              prev.setDate(currentWeekStart.getDate() - 7);
              setCurrentWeekStart(prev);
              setSelectedDate(prev.getTime());
            }}
            aria-label="이전 주"
          >
            ◀
          </button>
          {"일월화수목금토".split("").map((day, i) => (
            <Day
              key={day}
              sunday={i === 0}
              saturday={i === 6}
              style={{
                cursor: "pointer",
                fontWeight: weekDates[i].getTime() === selectedDate ? 700 : 400,
                background:
                  weekDates[i].getTime() === selectedDate
                    ? "#f3e9ff"
                    : "inherit",
              }}
              onClick={() => setSelectedDate(weekDates[i].getTime())}
            >
              <div style={{ fontSize: "0.9rem", color: "#888" }}>
                {weekDates[i].getMonth() + 1}/{weekDates[i].getDate()}
              </div>
              <div>{day}</div>
            </Day>
          ))}
          <button
            style={{
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              marginLeft: "0.5rem",
            }}
            onClick={() => {
              const next = new Date(currentWeekStart);
              next.setDate(currentWeekStart.getDate() + 7);
              setCurrentWeekStart(next);
              setSelectedDate(next.getTime());
            }}
            aria-label="다음 주"
          >
            ▶
          </button>
        </WeekCalendar>

        <ListArea>
          {todos
            .map((todo, index) => ({ ...todo, index }))
            .filter((todo) => todo.date === selectedDate)
            .map((todo) => (
              <TodoItem
                key={todo.index}
                style={{
                  textDecoration: todo.isDone ? "line-through" : "none",
                  color: todo.isDone ? "#aaa" : "inherit",
                }}
              >
                <input
                  type="checkbox"
                  checked={todo.isDone}
                  onChange={() => completeTodo(todo.index)}
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "1rem",
                    accentColor: "#6a0dad",
                  }}
                />
                {todo.text}
                <button
                  onClick={() => deleteTodo(todo.index)}
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
            maxLength={40}
          />
          <button onClick={addTodo}>Add</button>
        </AddArea>
      </TodoList>
    </AppContainer>
  );
}

export default App;
