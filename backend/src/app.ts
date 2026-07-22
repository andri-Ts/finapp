import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import healthRouter from './routes/health.routes';

const app = express();

app.use(helmet()); // Sécurité HTTP
app.use(cors({ origin: 'http://localhost:5173' })); // Autoriser les requêtes de frontend
app.use(express.json()); // Lire JSON
app.use(morgan('dev')); // Logs développement

app.use('/api/v1/health', healthRouter);

export default app;
