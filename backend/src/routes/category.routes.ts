import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import {
  archiveCategory,
  createCategory,
  getAllCategory,
  getCategory,
  updateCategory,
} from '../controllers/category.controller.js';

const categoryRoutes = Router();

categoryRoutes.post('/', authenticate, createCategory);

categoryRoutes.get('/', authenticate, getAllCategory);
categoryRoutes.get('/:id', authenticate, getCategory);

categoryRoutes.patch('/:id', authenticate, updateCategory);

categoryRoutes.patch('/:id/archive', authenticate, archiveCategory);

export default categoryRoutes;
