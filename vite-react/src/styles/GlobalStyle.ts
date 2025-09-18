import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  html, body, #root { height: 100%; }
  body {
    margin: 0;
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans KR", "Apple SD Gothic Neo", "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji";
    background: #f7f7fb;
    color: #111;
  }
  button { cursor: pointer; }
  ul { list-style: none; padding: 0; margin: 0; }
  input, button { font: inherit; }
`

export default GlobalStyle
