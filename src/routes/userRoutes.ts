import { Router } from 'express';

import { login } from '../controllers/authControllers/loginController';
import { verifyToken } from '../middlewares/verifyToken';
import { onlyAdmin } from '../middlewares/onlyAdmin';

import { createUser } from '../controllers/userControllers/createUserController';
import { getAllUsers } from '../controllers/userControllers/getUserController';
import { updateUserByAdmin } from '../controllers/userControllers/updateUserController';


const router = Router();

// CRUD
router.post('/', createUser);
router.get('/', verifyToken, onlyAdmin, getAllUsers);
router.put('/:id', verifyToken, onlyAdmin, updateUserByAdmin);

// AUTH
router.post('/login', login);

export default router;