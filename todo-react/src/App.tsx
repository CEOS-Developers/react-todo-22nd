import { useState } from "react";
import Navbar from "./components/Navbar";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { startDay } from "./utils";

function App() {
  const [date, setDate] = useState<Date>(() => startDay(new Date()));
  return (
    <>
      <h1>To Do</h1>
      <Navbar date={date} setDate={setDate} />
      <TodoInput />
      <TodoList />
    </>
  );
}

export default App;
