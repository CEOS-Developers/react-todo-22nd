import React from 'react';
import styled from 'styled-components';

interface TodoInputProps {
  value: string;
  onChange: (text: string) => void;
  onAdd: () => void;
}

const InputContainer = styled.div`
  display: flex;
  margin-bottom: 20px;

  input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    flex: 1;
  }

  button {
    margin-left: 10px;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: gray;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #1565c0;
    }
  }
`;

const TodoInput: React.FC<TodoInputProps> = ({ value, onChange, onAdd }) => {
  return (
    <InputContainer>
      <input
        type="text"
        placeholder="할 일을 적어주세요."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button onClick={onAdd}>등록</button>
    </InputContainer>
  );
};

export default TodoInput;
