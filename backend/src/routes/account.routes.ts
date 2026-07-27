import { Router } from 'express';
import {
  archiveAccount,
  createAccount,
  getAccount,
  getAccounts,
  updateAccount,
} from '../controllers/account.controller';
import { authenticate } from '../middlewares/auth.middleware';

const accountRoutes = Router();

accountRoutes.post('/', authenticate, createAccount);

accountRoutes.get('/', authenticate, getAccounts);
accountRoutes.get('/:id', authenticate, getAccount);

accountRoutes.patch('/:id', authenticate, updateAccount);
accountRoutes.patch('/:id/archive', authenticate, archiveAccount);

export default accountRoutes;
