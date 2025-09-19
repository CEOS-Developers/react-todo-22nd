import { useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react'
import './App.css'
import { GlobalStyle } from './styles/GlobalStyles'


function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  
  return (
    <>
      <GlobalStyle />
      
    </>
  )
}

export default App
