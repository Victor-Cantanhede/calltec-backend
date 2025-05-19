import { Router } from 'express';

import { createCategory } from '../controllers/categoryControllers/createCategoryController';
import { getAllCategories } from '../controllers/categoryControllers/getCategoryController';
import { deleteCategory } from '../controllers/categoryControllers/deleteCategoryController';
import { verifyToken } from '../middlewares/verifyToken';
import { onlyAdmin } from '../middlewares/onlyAdmin';

const router = Router();

// CRUD
router.post('/', verifyToken, onlyAdmin, createCategory);
router.get('/', verifyToken, getAllCategories);
router.delete('/:id', verifyToken, onlyAdmin, deleteCategory);

export default router;