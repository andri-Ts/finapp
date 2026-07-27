import { Router } from 'express';
import {
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

export default accountRoutes;
