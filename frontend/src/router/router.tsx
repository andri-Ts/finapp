import AppLayout from '@/layouts/appLayout/AppLayout';
import AccountsPage from '@/pages/account/AccountsPage';
import AddAccountPage from '@/pages/addAccount/AddAccountPage';
import AddTransactionPage from '@/pages/addTransaction/AddTransactionPage';
import CalendarPage from '@/pages/calendarPage/CalendarPage';
import CategoryPage from '@/pages/category/CategoryPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import EditAccountPage from '@/pages/editAccount/EditAccountPage';
import LoginPage from '@/pages/login/LoginPage';
import TransactionsPage from '@/pages/transaction/TransactionsPage';
import EditCategoryPage from '@/pages/updtadeCategory/EditCategoryPage';
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
        path: '/categories/:id/edit',
        element: <EditCategoryPage />,
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
      {
        path: '/accounts/new',
        element: <AddAccountPage />,
      },
      {
        path: '/accounts/:id/edit',
        element: <EditAccountPage />,
      },
    ],
  },
]);
