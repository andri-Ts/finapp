import AppLayout from '@/layouts/appLayout/AppLayout';
import AccountsPage from '@/pages/account/AccountsPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import TransactionsPage from '@/pages/transaction/TransactionsPage';
import { createBrowserRouter } from 'react-router-dom';

export const myRouter = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <DashboardPage />,
      },
      {
        path: '/transactions',
        element: <TransactionsPage />,
      },
      {
        path: '/accounts',
        element: <AccountsPage />,
      },
    ],
  },
]);
