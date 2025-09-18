import { useEffect, useMemo, useState } from 'react';
import './App.css'; // 바닐라 style.css를 여기에 복사

// Helpers
const daysKo = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
];
const dateToStr = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};
const formatKoreanDate = (d) =>
  `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 ${
    daysKo[d.getDay()]
  }`;

export default function App() {
  // ==== state ====
  const [todosByDate, setTodosByDate] = useState(() => {
    try {
      const saved = localStorage.getItem('todosByDate');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [nextId, setNextId] = useState(() => {
    const savedId = localStorage.getItem('nextId');
    const n = parseInt(savedId || '1', 10);
    return Number.isNaN(n) ? 1 : n;
  });

  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [inputText, setInputText] = useState('');

  // 현재 날짜 문자열/목록
  const dateStr = useMemo(() => dateToStr(currentDate), [currentDate]);
  const todos = useMemo(
    () => todosByDate[dateStr] || [],
    [todosByDate, dateStr]
  );

  // 로컬스토리지 저장 (todos/nextId 바뀔 때마다)
  useEffect(() => {
    try {
      localStorage.setItem('todosByDate', JSON.stringify(todosByDate));
      localStorage.setItem('nextId', String(nextId));
    } catch (e) {
      console.error('저장 오류:', e);
    }
  }, [todosByDate, nextId]);

  // ==== actions ====
  const moveToDate = (deltaDay) => {
    setCurrentDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + deltaDay);
      return d;
    });
  };

  const selectDate = (value) => {
    // value: "YYYY-MM-DD"
    const d = new Date(value + 'T00:00:00');
    if (!Number.isNaN(d.getTime())) setCurrentDate(d);
  };

  const addTodo = (e) => {
    e.preventDefault();
    const text = inputText.trim();
    if (!text) {
      alert('할일을 입력해주세요!');
      return;
    }
    const newTodo = { id: nextId, text, completed: false, date: dateStr };

    setTodosByDate((prev) => {
      const list = prev[dateStr] || [];
      return { ...prev, [dateStr]: [...list, newTodo] };
    });
    setNextId((n) => n + 1);
    setInputText('');
  };

  const toggleTodo = (id) => {
    setTodosByDate((prev) => {
      const list = prev[dateStr] || [];
      const updated = list.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      return { ...prev, [dateStr]: updated };
    });
  };

  const deleteTodo = (id) => {
    setTodosByDate((prev) => {
      const list = prev[dateStr] || [];
      const updated = list.filter((t) => t.id !== id);
      return { ...prev, [dateStr]: updated };
    });
  };

  // 진행 텍스트
  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const todayStr = dateToStr(new Date());
  const prefix = dateStr === todayStr ? '오늘' : dateStr;
  const progressText = `${prefix} 할일 ${totalCount}개 중 ${completedCount}개 완료`;

  // ==== UI ====
  return (
    <main className="appContainer">
      <header className="appHeader">
        <h1 className="appTitle">✔️TO DO LIST✔️</h1>

        <div className="dateSelector">
          <button
            className="dateNavBtn"
            id="prevDay"
            onClick={() => moveToDate(-1)}
          >
            ◀
          </button>

          <div className="dateDisplay">
            <input
              type="date"
              className="dateInput"
              id="dateInput"
              value={dateStr}
              onChange={(e) => selectDate(e.target.value)}
            />
            <p className="dateInfo" id="dateInfo">
              {formatKoreanDate(currentDate)}
            </p>
          </div>

          <button
            className="dateNavBtn"
            id="nextDay"
            onClick={() => moveToDate(1)}
          >
            ▶
          </button>
        </div>
      </header>

      <section className="todoInputSection">
        <form className="todoForm" id="todoForm" onSubmit={addTodo}>
          <input
            type="text"
            className="todoInput"
            id="todoInput"
            placeholder="할일을 입력하세요"
            maxLength={100}
            required
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button type="submit" className="addButton">
            ➕ 추가
          </button>
        </form>
      </section>

      <section className="todoProgress">
        <p className="progressText" id="progressText">
          {progressText}
        </p>
      </section>

      <section className="todoListSection">
        {/* 목록 */}
        <ul className="todoList" id="todoList">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`todoItem ${todo.completed ? 'completed' : ''}`}
            >
              <label className="todoLabel">
                <input
                  type="checkbox"
                  className="todoCheckbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span className="todoText">{todo.text}</span>
              </label>

              <button className="deleteBtn" onClick={() => deleteTodo(todo.id)}>
                🗑️
              </button>
            </li>
          ))}
        </ul>

        {/* 빈 상태 */}
        {todos.length === 0 && (
          <div className="emptyState" id="emptyState">
            <p>📝 할일을 추가해보세요 📝</p>
          </div>
        )}
      </section>
    </main>
  );
}
