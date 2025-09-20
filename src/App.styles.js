import styled from "styled-components";

// 전체 레이아웃
export const AppContainer = styled.div`
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d9d9d9;
  padding: 40px;
  height: 100vh;
`;

// Todo 리스트 박스
export const TodoList = styled.div`
  background-color: white;
  width: 50%;
  font-family: "Pretendard", "Noto Sans KR", sans-serif;
  border-radius: 2rem;
  background-color: white;
`;

// 제목
export const Title = styled.h2`
  text-align: center;
  color: #5d3a00;
  cursor: pointer;

  &:hover {
    color: #6a0dad;
  }
`;

// 요일 달력
export const WeekCalendar = styled.div`
  display: flex;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
`;

// 요일 칸
export const Day = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "sunday" && prop !== "saturday",
})`
  font-size: 1.2rem;
  text-align: center;
  margin: 0 0.5rem;
  padding: 1rem;
  border-radius: 2rem;
  color: ${(props) =>
    props.sunday ? "red" : props.saturday ? "blue" : "#5d3a00"};
  width: 100%;
  shrink: 0;
`;

// 입력 및 버튼 영역
export const AddArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    box-sizing: border-box;
    font-size: 1rem;
    margin: 2rem 0.5rem 2rem 0;
    width: 20rem;
    height: 2.5rem;
    border-radius: 1rem;
    border: 0.1rem solid #d9d9d9;
    padding: 0 0 0 1rem;

    &:hover {
      border: 0.1rem solid #5d3a00;
    }
  }

  button {
    height: 2.5rem;
    background-color: #6a0dad;
    color: white;
    border: none;
    border-radius: 0.5rem;
    padding: 0 1rem;
    cursor: pointer;
    &:hover {
      background-color: #d9d9d9;
      color: #5d3a00;
    }
  }
`;

// Todo 리스트 영역
export const ListArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
  border-radius: 2rem;
`;

// Todo 아이템
export const TodoItem = styled.div`
  margin: 0.5rem 0;
  padding: 0.5rem;
  width: 25rem;
  height: 3rem;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  padding: 1rem 1rem 0 2rem;

  &:hover {
  }

  button {
    background: transparent;
    border: none;
    color: inherit;
    cursor: pointer;
    margin-left: auto;
  }
  button:hover,
  button:focus,
  button:active {
    background: transparent;
    color: inherit;
    border: none;
    outline: none;
  }
`;
