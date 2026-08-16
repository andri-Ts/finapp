import { Router } from 'express';
import { getMe, loginUser } from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const authRoutes = Router();

authRoutes.post('/login', loginUser);
authRoutes.get('/me', authenticate, getMe);

export default authRoutes;
