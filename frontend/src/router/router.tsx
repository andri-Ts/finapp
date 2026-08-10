import AppLayout from '@/layouts/appLayout/AppLayout';
import AccountsPage from '@/pages/account/AccountsPage';
import AddTransactionPage from '@/pages/addTransaction/AddTransactionPage';
import CalendarPage from '@/pages/calendarPage/CalendarPage';
import CategoryPage from '@/pages/category/CategoryPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import LoginPage from '@/pages/login/LoginPage';
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
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/transactions',
        element: <TransactionsPage />,
      },
      {
        path: '/categories',
        element: <CategoryPage />,
      },
      {
        path: '/accounts',
        element: <AccountsPage />,
      },
      {
        path: '/calendar',
        element: <CalendarPage />,
      },
      {
        path: '/transactions/new',
        element: <AddTransactionPage />,
      },
    ],
  },
]);
