import GlobalStyle from "./styles/globalStyle";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  return (
    <>
      <GlobalStyle />
      <div className="app-container">
        <h2>투두 리스트</h2>
        <TodoList />
      </div>
    </>
  );
}

export default App;
