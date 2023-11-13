import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home';
import { CalendarPage } from './pages/Calendar';
import { Checkboxes } from './pages/Checkboxes';

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
    path: '/checkboxes',
    element: <Checkboxes />,
  },
  {
    path: '*',
    element: <div>Not Found</div>,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
