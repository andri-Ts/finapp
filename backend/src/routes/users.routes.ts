import { Router } from 'express';
import { getUsers } from '../controllers/users.controller';

const userRoutes = Router();

userRoutes.get('/', getUsers);

export default userRoutes;
