import styled from "styled-components";

export const InputWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  margin: 20px auto;
  background: #fffef1;
  border-radius: 90px;
  padding: 10px 15px;
  height: 50px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const TodoInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  padding: 5px 20px;
  border-radius: 30px;
`;

export const AddButton = styled.button`
  width: 55px;
  height: 55px;
  margin-left: 15px;
  background: #fff2af;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);

  &:focus {
    outline: none;
  }

  &:active {
    background: #fff2af;
  }

  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.05);
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    background: #ffd7e9;
    border-radius: 2px;
    box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.3);
  }

  &::before {
    width: 80%;
    height: 3px;
  }
  &::after {
    width: 3px;
    height: 80%;
  }
`;
