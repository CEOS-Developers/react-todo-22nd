import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  html, body, #root { height: 100%; }
  body {
    padding: 100px;
    background: orange; /* 바닐라와 동일 */
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    color: #111;
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans KR", Arial;
  }
  button { cursor: pointer; }
  ul { list-style: none; padding: 0; margin: 0; }
  input, button { font: inherit; }
  .visually-hidden {
    position: absolute !important;
    width: 1px; height: 1px; padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
  }
`

export default GlobalStyle
