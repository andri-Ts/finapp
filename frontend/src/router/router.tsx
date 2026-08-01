import AppLayout from '@/layouts/appLayout/AppLayout';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import { createBrowserRouter } from 'react-router-dom';

export const myRouter = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <DashboardPage />,
      },
    ],
  },
]);
