import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { getDashboard } from '../controllers/dashboard.controller.js';

const dashboardRoutes = Router();

dashboardRoutes.get('/', authenticate, getDashboard);

export default dashboardRoutes;
