import GlobalStyle from "./styles/globalStyle";
import TodoList from "./components/TodoList";
import { TitleWrapper, TitleText } from "./styles/titleStyle";
import "./App.css";

function App() {
  return (
    <>
      <GlobalStyle />
      <div className="app-container">
        <TitleWrapper>
          <TitleText>투두 리스트</TitleText>
        </TitleWrapper>
        <TodoList />
      </div>
    </>
  );
}

export default App;
