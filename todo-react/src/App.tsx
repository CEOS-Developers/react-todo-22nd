import Navbar from "./components/Navbar";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <h1>To Do</h1>
      <Navbar />
      <TodoInput />
      <TodoList />
    </>
  );
}

export default App;
