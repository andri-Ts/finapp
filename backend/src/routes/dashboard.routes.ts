import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { getDashboard } from '../controllers/dashboard.controller';

const dashboardRoutes = Router();

dashboardRoutes.get('/', authenticate, getDashboard);

export default dashboardRoutes;
