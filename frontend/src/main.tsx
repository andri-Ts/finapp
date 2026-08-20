import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import './styles/globals.css';
import App from './App.tsx';
import { AuthContextProvider } from './features/auth/context/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <App />
      <Toaster />
    </AuthContextProvider>
  </StrictMode>,
);
