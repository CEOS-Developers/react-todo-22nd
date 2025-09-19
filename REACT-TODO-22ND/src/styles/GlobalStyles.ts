import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url("https://cdn.jsdelivr.net/npm/pretendard/dist/web/static/pretendard.css");

  * {
    font-family: "Pretendard", sans-serif;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default GlobalStyles;