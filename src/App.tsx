import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import Sidebar from './components/Sidebar/Sidebar';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Sidebar />
      <Router />
    </MantineProvider>
  );
}
