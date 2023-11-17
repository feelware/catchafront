import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import './globals.scss';
import { MantineProvider } from '@mantine/core';
import { Route, Switch } from 'wouter';
import { theme } from './theme';
import Sidebar from './components/Sidebar/Sidebar';
import styles from './Layout.module.scss';
import { CalendarPage } from './pages/CalendarPage';
import { GroupsSelectorPage } from './pages/GroupsSelectorPage';
import SemestersPage from './pages/SemestersPage';
import { useUser } from './stores/userStore';
import Login from './pages/Login';
import Aulaspage from './pages/Aulaspage';

export default function App() {
  const { user } = useUser();

  return (
    <MantineProvider theme={theme}>
      <main className={styles.mainWrapper}>
        {
          user ?
          <div className={styles.mainContainer}>
          <Sidebar />
            <Switch>
              <Route path="/semestres" component={SemestersPage} />
              <Route path="/horarios" component={CalendarPage} />
              <Route path="/grupos" component={GroupsSelectorPage} />
              <Route path="/aulas" component={Aulaspage} />
              <Route path="*" component={() => <div>Not found</div>} />
            </Switch>
          </div> : <Login />
        }
      </main>
    </MantineProvider>
  );
}
