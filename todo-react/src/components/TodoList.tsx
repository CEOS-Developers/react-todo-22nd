import type { Todo } from "../types";
import styled, { css } from "styled-components";

type Props = {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TodoList({ todos, onToggle, onDelete }: Props) {
  return (
    <List>
      {todos.map((t) => (
        <ToDo key={t.id} $done={t.done}>
          <input
            type="checkbox"
            checked={t.done}
            onChange={() => onToggle(t.id)}
          />
          <Label>{t.text}</Label>
          <DeleteButton onClick={() => onDelete(t.id)}>삭제</DeleteButton>
        </ToDo>
      ))}
    </List>
  );
}

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 16px auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 500px;
`;

const ToDo = styled.li<{ $done: boolean }>`
  display: flex;
  align-items: center;
  gap: 14px;
  background: whitesmoke;
  color: black;
  border-radius: 28px;
  padding: 14px 16px;
  margin: 16px 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  ${({ $done }) =>
    $done &&
    css`
      ${Label}, input {
        opacity: 0.5;
      }
      ${Label} {
        text-decoration: line-through;
      }
    `}
`;

const Label = styled.span`
  flex: 1;
  font-size: 18px;
  text-overflow: ellipsis;
`;

const DeleteButton = styled.button`
  border: none;
  padding: 10px 20px;
  border-radius: 12px;
  background: white;
  color: #486ad0;
  font-weight: 800;
  cursor: pointer;
`;
