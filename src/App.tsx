import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import './globals.scss';
import { MantineProvider } from '@mantine/core';
import { Route, Switch } from 'wouter';
import { theme } from './theme';
import Sidebar from './components/Sidebar/Sidebar';
import styles from './Layout.module.scss';
import Header from './components/Header/Header';
import { HomePage } from './pages/Home';
import { CalendarPage } from './pages/CalendarPage';
import { GroupsSelectorPage } from './pages/GroupsSelectorPage';
import SemestersPage from './pages/SemestersPage';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <main className={styles.mainWrapper}>
        {/* <Header /> */}
        <div className={styles.mainContainer}>
          <Sidebar />
          <Switch>
            <Route path="/" component={HomePage} />
            {/* SUM-like view of the past semesters */}
            <Route path="/semestres" component={SemestersPage} />
            {/* Only active when  */}
            <Route path="/horarios" component={CalendarPage} />
            <Route path="/grupos" component={GroupsSelectorPage} />
            <Route path="*" component={() => <div>Not found</div>} />
          </Switch>
        </div>
      </main>
    </MantineProvider>
  );
}
