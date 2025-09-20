import React from 'react';
import styled from 'styled-components';
import { type Todo } from '../Type';

interface TodoListProps {
  todos: Todo[];
  onDelete: (index: number) => void;
}

const List = styled.ul`
  border: 1px solid black;
  border-radius: 5px;
  list-style: none;
  padding: 10px;
`;

const ListItem = styled.li`
  background: white;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  gap: 20px;
  width: 200px;
  justify-content: space-between;
  align-items: center;
`;
const TodoText = styled.span`
  width: 120px;
`;

const DeleteButton = styled.button`
  background: gray;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #b6b6b6;
    color: gray;
  }
`;

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete }) => {
  return (
    <List>
      {todos.length > 0 ? (
        todos.map((todo, index) => (
          <ListItem key={index}>
            <TodoText>{todo.text}</TodoText>
            <DeleteButton onClick={() => onDelete(index)}>삭제</DeleteButton>
          </ListItem>
        ))
      ) : (
        <ListItem>
          <TodoText>비었어요</TodoText>
        </ListItem>
      )}
    </List>
  );
};
export default TodoList;
