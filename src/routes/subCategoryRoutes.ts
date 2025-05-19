import { Router } from 'express';

import { createSubCategory } from '../controllers/subCategoryControllers/createSubCategory';
import { getAllSubCategories } from '../controllers/subCategoryControllers/getSubCategory';
import { deleteSubCategory } from '../controllers/subCategoryControllers/deleteSubCategory';
import { verifyToken } from '../middlewares/verifyToken';
import { onlyAdmin } from '../middlewares/onlyAdmin';

const router = Router();

// CRUD
router.post('/', verifyToken, onlyAdmin, createSubCategory);
router.get('/', verifyToken, getAllSubCategories);
router.delete('/:id', verifyToken, deleteSubCategory);

export default router;