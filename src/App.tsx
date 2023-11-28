import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import './globals.scss';
import { MantineProvider } from '@mantine/core';
import { useUser } from './stores/userStore';
import Login from './pages/Login';
import styles from './Layout.module.scss';

export default function App() {
  const { user } = useUser();

  return (
    <MantineProvider>
      <main className={styles.mainWrapper}>
        {
          user ?
          <div className={styles.mainContainer} /> : <Login />
        }
      </main>
    </MantineProvider>
  );
}
