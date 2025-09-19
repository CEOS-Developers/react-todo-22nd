import { useState, useEffect } from 'react';
import styled from 'styled-components';
import './App.css';

const Container = styled.div`
  text-align: center;
  font-family: Pretendard, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  padding: 2rem;
  padding-bottom: 1.5rem;
`;

const H1 = styled.h1`
  cursor: pointer;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 0.5rem;
  gap: 0.5rem;

  margin-bottom: 0.3rem;
`;

const PrevWeekButton = styled.button`
  position: relative;
  top: -0.05rem;

  border: none;
  background: none;

  font-weight: 900;
  cursor: pointer;
`;

const PrevButton = styled.button`
  position: relative;
  top: -0.05rem;
  margin-left: -0.5rem;

  border: none;
  background: none;

  font-weight: 900;
  cursor: pointer;
`;

const DateInput = styled.input`
  position: relative;
  top: -0.1rem;

  border: none;
  font-size: 1rem;
  font-family: Pretendard, sans-serif;

  &::-webkit-calendar-picker-indicator {
    margin-left: -0.5rem;
    cursor: pointer;
  }
`;

const NextButton = styled.button`
  position: relative;
  top: -0.05rem;
  margin-right: -0.5rem;

  border: none;
  background: none;

  font-weight: 900;
  cursor: pointer;
`;

const NextWeekButton = styled.button`
  position: relative;
  top: -0.05rem;

  border: none;
  background: none;

  font-weight: 900;
  cursor: pointer;
`;

const TodoCount = styled.span`
  margin-left: 0.3rem;
`;

const Main = styled.main`
  display: flex;
  align-items: center;
  justify-content: space-between;

  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;

  padding: 0.5rem;
  margin-bottom: 0.8rem;
  width: 100%;
  max-width: 19.7rem;
`;

const TodoInput = styled.input`
  text-align: start;
  padding: 0.6rem;
  padding-left: 0.7rem;
  flex: 1;

  border: 1px solid grey;
  border-radius: 5px;

  &: placeholder {
    color: b8b8b8;
  }

  /* 유효한 값일 때 형제 버튼 스타일 */
  &:valid + button {
    color: black;
    curosr: pointer;
  }

  /* 무효한 값일 때 형제 버튼 스타일 */
  &:invalid + button {
    color: grey;
    cursor: not-allowed;
  }
`;

const AppendButton = styled.button`
  all: unset; /* 기본 스타일 제거*/
  position: relative;
  top: -0.1rem;

  margin-left: 0.9rem;
  color: grey;
  font-size: 1.5rem;

  &:hover {
    color: black;
    cursor: pointer;
  }
`;

const ListContainer = styled.div`
  display: flex;
  align-items: center;

  padding: 0.1rem 0.3rem;
  margin-bottom: 10px;
  margin-left: 1px;
  width: 20rem;
`;

const CheckboxButton = styled.input`
  margin-top: 1.5px;
  margin-right: 13px;
  transform: scale(1.4);
  accent-color: #808080; /* 체크 시 배경색 기본 파랑->회색 */

  cursor: pointer;
`;

const TodoContent = styled.span`
  flex: 1;
  text-align: left;
  word-break: break-all; /* 문자열 길어지면 강제 줄바꿈*/

  ${({ checked }) =>
    checked &&
    `
      text-decoration: line-through;
      color: #8b8b8b;
    `}
`;

const DeleteButton = styled.button`
  position: relative;
  top: -2px;
  margin-left: 0.9rem;

  font-size: 1.3rem;
  border: none;
  background: none;

  cursor: pointer;

  &:hover {
    color: #d1a29f;
  }

  ${({ checked }) =>
    checked &&
    `
     color: #8b8b8b;
    `}
`;

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
    <Container>
      <Header>
        <H1 onClick={goToday}>Todo-List</H1>
      </Header>
      <Nav>
        <PrevWeekButton onClick={() => changeDateButton(-7)}>&lt;&lt;</PrevWeekButton>
        <PrevButton onClick={() => changeDateButton(-1)}>&lt;</PrevButton>
        <DateInput type="date" value={currentDate} onChange={changeDateIcon} />
        <NextButton onClick={() => changeDateButton(1)}>&gt;</NextButton>
        <NextWeekButton onClick={() => changeDateButton(7)}>&gt;&gt;</NextWeekButton>
        <TodoCount>{todoCount} 개</TodoCount>
      </Nav>
      <Main>
        <InputContainer>
          <TodoInput
            placeholder="할 일을 입력해주세요"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            onKeyDown={handleKeyDown}
            required
          />
          <AppendButton onClick={addTodo}>+</AppendButton>
        </InputContainer>
        {list.map((todo, index) => (
          <ListContainer key={index}>
            <CheckboxButton type="checkbox" checked={todo.checked} onChange={() => toggleTodo(index)} />
            <TodoContent checked={todo.checked}>{todo.todoInputText}</TodoContent>
            <DeleteButton checked={todo.checked} onClick={() => deleteTodo(index)}>
              x
            </DeleteButton>
          </ListContainer>
        ))}
      </Main>
    </Container>
  );
}

export default App;
