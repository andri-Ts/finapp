import { Router } from 'express';
import { getMe, loginUser } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';

const authRoutes = Router();

authRoutes.post('/login', loginUser);
authRoutes.get('/me', authenticate, getMe);

export default authRoutes;
