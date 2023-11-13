import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home';
import { CalendarPage } from './pages/CalendarPage';
import { GroupsSelectorPage } from './pages/GroupsSelectorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/calendario',
    element: <CalendarPage />,
  },
  {
    path: '/grupos',
    element: <GroupsSelectorPage />,
  },
  {
    path: '*',
    element: <div>Not Found</div>,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
