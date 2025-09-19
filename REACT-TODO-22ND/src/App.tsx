import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@/styles/GlobalStyles';
import { theme } from '@/styles/theme';
import { TodoModalProvider }  from '@/contexts/TodoModalContext';
import Home from '@/pages/Home';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <TodoModalProvider>
          <GlobalStyles />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </TodoModalProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;