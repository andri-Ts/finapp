import { Router } from 'express';
import { createUsers, getUsers } from '../controllers/users.controller.js';

const userRoutes = Router();

userRoutes.get('/', getUsers);
userRoutes.post('/', createUsers);

export default userRoutes;
