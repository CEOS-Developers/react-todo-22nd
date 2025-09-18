import React from "react";
import { addDays, KDate } from "../utils";

type Props = {
  date: Date;
  setDate: (d: Date) => void;
};

export default function Navbar({ date, setDate }: Props) {
  const move = (days: number) => setDate(addDays(date, days));

  return (
    <>
      <button onClick={() => move(-7)}>⏮</button>
      <button onClick={() => move(-1)}>◀</button>
      <span>{KDate(date)}</span>
      <button onClick={() => move(1)}>▶</button>
      <button onClick={() => move(7)}>⏭</button>
    </>
  );
}
