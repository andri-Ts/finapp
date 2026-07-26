import { Router } from 'express';
import { createAccount } from '../controllers/account.controller';
import { authenticate } from '../middlewares/auth.middleware';

const accountRoutes = Router();

accountRoutes.post('/', authenticate, createAccount);

export default accountRoutes;
