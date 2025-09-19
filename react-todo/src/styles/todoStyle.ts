import styled from "styled-components";

// 전체 투두 리스트 공간
export const TodoListWrapper = styled.div`
  width: 90%;
  max-width: 500px;
  min-width: 500px;
  min-height: 400px;
  max-height: 400px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// 삭제 버튼
export const DeleteButton = styled.button`
  flex-shrink: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  display: block;
  width: 32px;
  height: 32px;
  padding: 0;
  opacity: 0;
  border-radius: 8px;
`;

// 각 투두 아이템
export const TodoItemWrapper = styled.li<{ completed: boolean }>`
  width: 90%;
  max-width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 16px;
  color: ${({ completed }) => (completed ? "#999" : "#333")};
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
  cursor: pointer;
  &:hover ${DeleteButton} {
    opacity: 1;
  }
`;

// 텍스트 영역
export const TodoText = styled.span`
  flex: 1;
  text-align: left;
  word-break: break-word;
  overflow-wrap: break-word;
  padding-right: 40px;
`;

// 완료 버튼
export const CompleteButton = styled.button<{ completed: boolean }>`
  width: 20px;
  height: 20px;
  min-width: 0;
  min-height: 0;
  padding: 0;
  flex-shrink: 0;
  border-radius: 50%;
  border: none;
  background-color: ${({ completed }) => (completed ? "#EB89B5" : "#FFFEF1")};
  margin-right: 8px;
  cursor: pointer;

  &:hover,
  &:focus,
  &:focus-visible,
  &:active {
    outline: 0;
    box-shadow: none;
  }

  &:active {
    background-color: #ffb6c1;
  }
`;
