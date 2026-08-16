import { Router } from 'express';
import {
  archiveAccount,
  createAccount,
  getAccount,
  getAllAccount,
  setDefaultAccount,
  updateAccount,
} from '../controllers/account.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const accountRoutes = Router();

accountRoutes.post('/', authenticate, createAccount);

accountRoutes.get('/', authenticate, getAllAccount);
accountRoutes.get('/:id', authenticate, getAccount);

accountRoutes.patch('/:id', authenticate, updateAccount);
accountRoutes.patch('/:id/archive', authenticate, archiveAccount);
accountRoutes.patch('/:id/default', authenticate, setDefaultAccount);

export default accountRoutes;
