import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import {
  createTransaction,
  getTransaction,
  getAllTransaction,
  updateTransaction,
  deleteTransaction,
} from '../controllers/transaction.controller.js';

const transactionRoutes = Router();

transactionRoutes.post('/', authenticate, createTransaction);

transactionRoutes.get('/:id', authenticate, getTransaction);
transactionRoutes.get('/', authenticate, getAllTransaction);

transactionRoutes.patch('/:id', authenticate, updateTransaction);

transactionRoutes.delete('/:id', authenticate, deleteTransaction);

export default transactionRoutes;
