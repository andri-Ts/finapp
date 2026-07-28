import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import {
  archiveCategory,
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
} from '../controllers/category.controller';

const categoryRoutes = Router();

categoryRoutes.post('/', authenticate, createCategory);

categoryRoutes.get('/', authenticate, getCategories);
categoryRoutes.get('/:id', authenticate, getCategory);

categoryRoutes.patch('/:id', authenticate, updateCategory);

categoryRoutes.delete('/:id', authenticate, archiveCategory);

export default categoryRoutes;
