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
import EditCategoryPage from '@/pages/editCategory/EditCategoryPage';
import { createBrowserRouter } from 'react-router-dom';
import EditTransactionPage from '@/pages/editTransaction/EditTransactionPage';
import AuthLayout from '@/layouts/authLayout/AuthLayout';
import RegisterPage from '@/pages/register/RegisterPage';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AccountDetailPage from '@/pages/accountDetailPage/AccountDetailPage';

export const myRouter = createBrowserRouter([
  // Route protéger, pas accessible sans authentification (via login)
  {
    element: <ProtectedRoute />,
    children: [
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
            path: '/transactions/:id/edit',
            element: <EditTransactionPage />,
          },
          {
            path: '/categories',
            element: <CategoryPage />,
          },
          {
            path: '/categories/:id',
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
            path: '/accounts/:id',
            element: <AccountDetailPage />,
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
    ],
  },

  // Route pas protéger
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
    ],
  },
]);
