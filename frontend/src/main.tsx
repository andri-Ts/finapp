import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import './styles/globals.css';
import App from './App.tsx';
import { AuthContextProvider } from './features/auth/context/AuthContext.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <App />
        <Toaster />
      </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>,
);
