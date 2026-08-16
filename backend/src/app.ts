import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import healthRouter from './routes/health.routes';
import userRoutes from './routes/users.routes';
import authRoutes from './routes/auth.routes';
import accountRoutes from './routes/account.routes';
import categoryRoutes from './routes/category.routes';
import transactionRoutes from './routes/transaction.routes';
import dashboardRoutes from './routes/dashboard.routes';

const app = express();

const allowedOrigins: string[] = [
  'http://localhost:5173',
  process.env.FRONTEND_URL,
].filter((origin): origin is string => Boolean(origin)); // apres filter(), origin est forcément un string

app.use(helmet()); // Sécurité HTTP
app.use(cors({ origin: allowedOrigins })); // Autoriser les requêtes de frontend
app.use(express.json()); // Lire JSON
app.use(morgan('dev')); // Logs développement

// =========================
// Routes publiques / générales
// =========================
app.use('/api/v1/health', healthRouter);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);

// =========================
// Routes de l'application
// =========================
app.use('/api/v1/accounts', accountRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/transactions', transactionRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

export default app;
