import styled from "styled-components";
import { addDays, KDate } from "../utils";

type Props = {
  date: Date;
  setDate: (d: Date) => void;
};

export default function Navbar({ date, setDate }: Props) {
  const move = (days: number) => setDate(addDays(date, days));

  return (
    <Nav>
      <DateButton onClick={() => move(-7)}>⏮</DateButton>
      <DateButton onClick={() => move(-1)}>◀</DateButton>
      <span>{KDate(date)}</span>
      <DateButton onClick={() => move(1)}>▶</DateButton>
      <DateButton onClick={() => move(7)}>⏭</DateButton>
    </Nav>
  );
}

const Nav = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  margin: 20px 0;
`;

const DateButton = styled.button`
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
`;
