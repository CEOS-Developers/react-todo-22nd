import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // 오늘 날짜
  const setToday = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const [currentDate, setCurrentDate] = useState(() => sessionStorage.getItem('lastSelectedDate') || setToday());
  const [todoInput, setTodoInput] = useState('');
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : {};
  });
  const list = todos[currentDate] || [];
  const todoCount = list.filter((todo) => !todo.checked).length;

  // 날짜 변경 (버튼)
  const changeDateButton = (days) => {
    const [year, month, day] = currentDate.split('-').map(Number);
    const selectedDate = new Date(year, month - 1, day);
    selectedDate.setDate(selectedDate.getDate() + days);

    const yyyy = selectedDate.getFullYear();
    const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const dd = String(selectedDate.getDate()).padStart(2, '0');

    // selectedDate = Date 객체 -> 문자열로 변경
    const stringDate = `${yyyy}-${mm}-${dd}`;
    setCurrentDate(stringDate);
    sessionStorage.setItem('lastSelectedDate', stringDate);
  };
  // 날짜 변경 (아이콘)
  const changeDateIcon = (e) => {
    const selectedDate = e.target.value;
    setCurrentDate(selectedDate);
    sessionStorage.setItem('lastSelectedDate', selectedDate);
  };

  // Todo 추가
  const addTodo = () => {
    const todoInputText = todoInput.trim();
    if (!todoInputText) return;

    setTodos((prev) => {
      const todoList = { ...prev };
      if (!todoList[currentDate]) todoList[currentDate] = [];
      todoList[currentDate] = [...todoList[currentDate], { todoInputText, checked: false }];
      return todoList;
    });
    setTodoInput('');
  };
  // 한글 입력 enter 처리
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) addTodo();
  };

  // Todo 완료여부
  const toggleTodo = (index) => {
    setTodos((prev) => {
      const todoList = { ...prev };
      todoList[currentDate] = todoList[currentDate].map((todo, i) =>
        i === index ? { ...todo, checked: !todo.checked } : todo,
      );
      return todoList;
    });
  };

  // Todo 삭제
  const deleteTodo = (index) => {
    setTodos((prev) => {
      const todoList = { ...prev };
      // todoList[currentDate].splice(index, 1);
      todoList[currentDate] = todoList[currentDate].filter((_, i) => i !== index);
      return todoList;
    });
  };

  // 오늘 날짜로 (로고클릭)
  const goToday = () => {
    const today = setToday();
    setCurrentDate(today);
    sessionStorage.setItem('lastSelectedDate', today);
  };

  // todo 저장
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <header>
        <h1 id="goToday" onClick={goToday}>
          Todo-List
        </h1>
      </header>
      <nav>
        <button className="dateButton" id="prevButton" onClick={() => changeDateButton(-1)}>
          &lt;
        </button>
        <input type="date" id="currentDate" value={currentDate} onChange={changeDateIcon} />
        <button className="dateButton" id="nextButton" onClick={() => changeDateButton(1)}>
          &gt;
        </button>
        <span className="todoCount">{todoCount} 개</span>
      </nav>
      <main>
        <div className="inputContainer">
          <input
            placeholder="할 일을 입력해주세요"
            id="todoInput"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            onKeyDown={handleKeyDown}
            required
          />
          <button className="appendTodo" onClick={addTodo}>
            +
          </button>
        </div>
        <div className="todoListContainer">
          {list.map((todo, index) => (
            <div key={index} className="listContainer">
              <input
                type="checkbox"
                className="checkboxButton"
                checked={todo.checked}
                onChange={() => toggleTodo(index)}
              />
              <span className="todoContent">{todo.todoInputText}</span>
              <button className="deleteButton" onClick={() => deleteTodo(index)}>
                x
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
