import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import {
  createTransaction,
  getTransaction,
  getAllTransaction,
} from '../controllers/transaction.controller';

const transactionRoutes = Router();

transactionRoutes.post('/', authenticate, createTransaction);

transactionRoutes.get('/:id', authenticate, getTransaction);
transactionRoutes.get('/', authenticate, getAllTransaction);

export default transactionRoutes;
